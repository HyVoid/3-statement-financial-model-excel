import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { ModelInputs } from '../types';
import { parseCSVLeads } from '../utils/storage';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: ModelInputs;
  onApplyLeads: (leads: Record<string, number[]>) => void;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({
  isOpen,
  onClose,
  inputs,
  onApplyLeads,
}) => {
  const [csvText, setCsvText] = useState('');
  const [parseStatus, setParseStatus] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<Record<string, number[]> | null>(null);

  if (!isOpen) return null;

  const sampleCsv = `Stream,M01,M02,M03,M04,M05,M06,M07,M08,M09,M10,M11,M12
pipe_abseil,45,48,50,52,55,58,60,62,65,68,70,72
pipe_hsafety,38,40,42,45,48,50,52,54,56,58,60,62
pipe_haccess,25,26,28,30,32,34,35,36,38,40,42,44
pipe_blinds,52,55,58,60,64,66,68,70,72,75,78,80
pipe_consult,32,34,36,38,40,42,44,46,48,50,52,54
pipe_int_sales,30,32,35,38,40,42,44,46,48,50,52,55
pipe_ext_sales,20,22,24,25,26,28,30,32,34,35,36,38`;

  const handleValidate = () => {
    const streamIds = inputs.pipelineStreams.map((s) => s.id);
    const parsed = parseCSVLeads(csvText, streamIds);
    if (parsed) {
      setParsedData(parsed);
      setParseStatus(`Successfully parsed ${Object.keys(parsed).length} streams of lead data.`);
    } else {
      setParsedData(null);
      setParseStatus('Failed to parse CSV. Please check formatting against the sample.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        setCsvText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleApply = () => {
    if (parsedData) {
      onApplyLeads(parsedData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,28,44,0.45)] backdrop-blur-sm p-4 animate-fade-up">
      <div
        className="bg-white rounded-[14px] max-w-2xl w-full p-6 relative flex flex-col max-h-[90vh] overflow-hidden"
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[20px] font-bold text-[#051C2C] tracking-tight">
              Bulk CSV Import — Project Pipeline Leads
            </h3>
            <p className="text-[12px] text-[#888888] mt-0.5">
              Paste or upload CSV rows to populate multi-month raw sales leads for all 7 engineering lines.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#888888] hover:text-[#051C2C] hover:bg-[rgba(5,28,44,0.05)] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-4 space-y-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-semibold text-[#051C2C]">CSV Content</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCsvText(sampleCsv)}
                className="text-[11px] text-[#2251FF] hover:underline cursor-pointer"
              >
                Load Sample Template
              </button>
              <label className="text-[11px] text-[#051C2C] font-medium bg-[rgba(5,28,44,0.06)] hover:bg-[rgba(5,28,44,0.1)] px-2 py-0.5 rounded cursor-pointer">
                Upload .CSV
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={8}
            placeholder="Stream,M01,M02,M03..."
            className="w-full font-mono text-[11px] p-3 rounded-[6px] border border-[#E8E8E6] bg-[#FFFDE7] text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-white resize-none"
          />

          {parseStatus && (
            <div
              className={`p-2.5 rounded-[6px] text-[12px] flex items-center gap-2 ${
                parsedData
                  ? 'bg-[rgba(0,200,83,0.08)] text-[#051C2C]'
                  : 'bg-[rgba(211,47,47,0.08)] text-[#D32F2F]'
              }`}
            >
              {parsedData ? <CheckCircle size={15} className="text-[#00C853]" /> : <AlertTriangle size={15} className="text-[#D32F2F]" />}
              <span>{parseStatus}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#E8E8E6] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-[6px] text-[12px] font-medium text-[#888888] hover:text-[#051C2C] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleValidate}
            className="px-4 py-1.5 rounded-[6px] text-[12px] font-medium bg-[rgba(5,28,44,0.06)] text-[#051C2C] hover:bg-[rgba(5,28,44,0.12)] transition-colors cursor-pointer"
          >
            Validate
          </button>
          <button
            onClick={handleApply}
            disabled={!parsedData}
            className="px-4 py-1.5 rounded-[6px] text-[12px] font-medium bg-[#2251FF] text-white hover:bg-blue-600 disabled:opacity-40 transition-colors cursor-pointer"
          >
            Apply to Model
          </button>
        </div>
      </div>
    </div>
  );
};

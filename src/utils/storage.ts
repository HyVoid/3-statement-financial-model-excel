import { ModelInputs } from '../types';
import { getDefaultModelInputs } from '../models/defaultData';

const STORAGE_KEY = 'opmodel_saas_data_v1';
const TIMESTAMP_KEY = 'opmodel_saas_last_saved';

export function loadStoredModelInputs(): { inputs: ModelInputs; lastSaved: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ts = localStorage.getItem(TIMESTAMP_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Validate basic structure
      if (parsed && parsed.recurringStreams && parsed.pipelineStreams) {
        return {
          inputs: parsed as ModelInputs,
          lastSaved: ts || 'Previously saved',
        };
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored model data from localStorage', err);
  }

  const defaultData = getDefaultModelInputs();
  const initTs = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  saveModelInputs(defaultData);
  return { inputs: defaultData, lastSaved: `Initial (${initTs})` };
}

export function saveModelInputs(inputs: ModelInputs): string {
  try {
    const nowStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    localStorage.setItem(TIMESTAMP_KEY, nowStr);
    return nowStr;
  } catch (err) {
    console.error('Failed to save to localStorage', err);
    return 'Error saving';
  }
}

export function resetToBenchmarkData(): ModelInputs {
  const defaults = getDefaultModelInputs();
  saveModelInputs(defaults);
  return defaults;
}

export const resetStoredModelInputs = resetToBenchmarkData;
export const saveStoredModelInputs = saveModelInputs;
export const exportModelBackup = exportBackupJSON;

export function exportBackupJSON(inputs: ModelInputs) {
  const dataStr = JSON.stringify(inputs, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().split('T')[0];
  a.download = `OpModel_Backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseCSVLeads(csvText: string, streamIds: string[]): Record<string, number[]> | null {
  try {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return null;

    // Header might be: Stream, M01, M02, ...
    const result: Record<string, number[]> = {};
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map((s) => s.trim());
      if (row.length < 2) continue;
      const streamIdOrName = row[0];
      const matchedStreamId = streamIds.find((id) =>
        streamIdOrName.toLowerCase().includes(id.toLowerCase()) ||
        id.toLowerCase().includes(streamIdOrName.toLowerCase())
      ) || streamIdOrName;

      const values = row.slice(1).map((val) => {
        const num = parseFloat(val.replace(/[^\d.-]/g, ''));
        return isNaN(num) ? 0 : Math.round(num);
      });
      if (values.length > 0) {
        result[matchedStreamId] = values;
      }
    }
    return Object.keys(result).length > 0 ? result : null;
  } catch (err) {
    console.error('CSV parse error', err);
    return null;
  }
}

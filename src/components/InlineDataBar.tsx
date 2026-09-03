import React from 'react';

interface InlineDataBarProps {
  value: number;
  max: number;
  width?: string;
}

export const InlineDataBar: React.FC<InlineDataBarProps> = ({ value, max, width = '60px' }) => {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      className="h-[6px] rounded-full overflow-hidden inline-block align-middle ml-2"
      style={{
        width,
        backgroundColor: 'var(--table-track-bg)',
      }}
      title={`${percentage.toFixed(1)}% of max`}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${percentage}%`,
          backgroundColor: 'var(--color-accent)',
        }}
      />
    </div>
  );
};

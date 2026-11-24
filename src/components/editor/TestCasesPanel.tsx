import React, { useState } from 'react';
import { TestCase } from '../../types';
import { Plus } from 'lucide-react';

interface TestCasesPanelProps {
  testCases: TestCase[];
  customInput: string;
  onCustomInputChange: (val: string) => void;
}

export const TestCasesPanel: React.FC<TestCasesPanelProps> = ({
  testCases,
  customInput,
  onCustomInputChange,
}) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  return (
    <div className="h-full flex flex-col bg-slate-950/90 text-xs">
      {/* Test cases tabs */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 bg-slate-900/40 shrink-0">
        {testCases.map((tc, idx) => {
          const isActive = !isCustomMode && selectedCaseIdx === idx;
          return (
            <button
              key={tc.id}
              onClick={() => {
                setSelectedCaseIdx(idx);
                setIsCustomMode(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600/20 text-purple-200 border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Case {idx + 1}
            </button>
          );
        })}

        {/* Custom Input Tab */}
        <button
          onClick={() => setIsCustomMode(true)}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            isCustomMode
              ? 'bg-cyan-600/20 text-cyan-200 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Plus className="w-3 h-3" />
          Custom Test
        </button>
      </div>

      {/* Test Case Content Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-mono">
        {!isCustomMode ? (
          <>
            <div>
              <p className="text-[11px] font-sans font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Input
              </p>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-cyan-300 whitespace-pre-wrap">
                {testCases[selectedCaseIdx]?.input}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-sans font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Expected Output
              </p>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-emerald-300 whitespace-pre-wrap">
                {testCases[selectedCaseIdx]?.expectedOutput}
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="text-[11px] font-sans font-bold text-slate-400 mb-1 uppercase tracking-wider">
              Enter Custom Test Arguments
            </p>
            <textarea
              value={customInput}
              onChange={(e) => onCustomInputChange(e.target.value)}
              placeholder="e.g. nums = [1, 5, 9, 12], target = 14"
              rows={4}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

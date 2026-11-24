import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Database, Terminal } from 'lucide-react';
import { RunCodeResult, SubmissionResult } from '../../types';

interface OutputConsoleProps {
  runResult: RunCodeResult | null;
  submissionResult: SubmissionResult | null;
  isRunning: boolean;
  isSubmitting: boolean;
}

export const OutputConsole: React.FC<OutputConsoleProps> = ({
  runResult,
  submissionResult,
  isRunning,
  isSubmitting,
}) => {
  const [activeTab, setActiveTab] = useState<'results' | 'stdout'>('results');
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);

  if (isRunning) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-400 text-xs">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-semibold text-slate-200">Executing test suite in sandbox...</p>
        <p className="text-[11px] text-slate-500 mt-1">Compiling and running against test cases</p>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-400 text-xs">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-semibold text-slate-200">Judging submission on CodeQuest Engine...</p>
        <p className="text-[11px] text-slate-500 mt-1">Verifying 48 hidden test cases & performance benchmarks</p>
      </div>
    );
  }

  if (!runResult && !submissionResult) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-500 text-xs">
        <Terminal className="w-8 h-8 text-slate-700 mb-2" />
        <p className="text-slate-400 font-medium">No execution output yet</p>
        <p className="text-[11px] text-slate-600 mt-0.5">Click "Run" to test your code or "Submit" for judging.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-950 text-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-900/60 shrink-0">
        <div className="flex items-center gap-2">
          {submissionResult ? (
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Submission: {submissionResult.status}</span>
            </div>
          ) : runResult?.status === 'passed' ? (
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Test Cases Passed</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
              <XCircle className="w-4 h-4" />
              <span>Test Cases Failed</span>
            </div>
          )}
        </div>

        {/* Runtime & Memory stats */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-400" />
            {submissionResult?.runtime || runResult?.executionTimeMs} ms
          </span>
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3 text-purple-400" />
            {submissionResult?.memory || runResult?.memoryUsageMb} MB
          </span>
        </div>
      </div>

      {/* Submission stats spotlight if submitted */}
      {submissionResult && (
        <div className="p-3 bg-gradient-to-r from-emerald-950/40 via-purple-950/20 to-slate-950 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-300">
              Passed {submissionResult.passedTestCases} / {submissionResult.totalTestCases} Test Cases
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Beats <span className="text-purple-300 font-bold">{submissionResult.runtimeBeatsPercentage}%</span> of submissions in speed
            </p>
          </div>
          <div className="text-right font-mono">
            <span className="text-sm font-bold text-purple-300">+{submissionResult.xpEarned} XP</span>
            <span className="text-[10px] text-slate-500 block">Awarded</span>
          </div>
        </div>
      )}

      {/* Case Tabs if Run results exist */}
      {runResult && (
        <div className="flex items-center gap-1 px-3 py-1.5 border-b border-slate-800 bg-slate-900/30 shrink-0">
          {runResult.testCaseResults.map((tc, idx) => (
            <button
              key={tc.caseIndex}
              onClick={() => setSelectedCaseIdx(idx)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedCaseIdx === idx
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${tc.passed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              Case {tc.caseIndex}
            </button>
          ))}
          <button
            onClick={() => setActiveTab(activeTab === 'results' ? 'stdout' : 'results')}
            className={`ml-auto px-2 py-0.5 text-[11px] rounded transition-colors ${
              activeTab === 'stdout' ? 'text-purple-300 bg-purple-500/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Terminal Stdout
          </button>
        </div>
      )}

      {/* Body content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-mono">
        {activeTab === 'results' && runResult && (
          <>
            <div>
              <p className="text-[11px] font-sans font-bold text-slate-500 uppercase">Input</p>
              <div className="bg-slate-900 p-2 rounded text-cyan-300 mt-1">
                {runResult.testCaseResults[selectedCaseIdx]?.input}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[11px] font-sans font-bold text-slate-500 uppercase">Your Output</p>
                <div className="bg-slate-900 p-2 rounded text-slate-200 mt-1">
                  {runResult.testCaseResults[selectedCaseIdx]?.actualOutput}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-sans font-bold text-slate-500 uppercase">Expected Output</p>
                <div className="bg-slate-900 p-2 rounded text-emerald-300 mt-1">
                  {runResult.testCaseResults[selectedCaseIdx]?.expectedOutput}
                </div>
              </div>
            </div>
          </>
        )}

        {(activeTab === 'stdout' || (!runResult && submissionResult)) && (
          <div className="bg-slate-900 p-3 rounded text-slate-300 text-xs whitespace-pre-wrap leading-relaxed">
            {runResult?.consoleOutput || `[CodeQuest Judging Engine v2.4]\nAll 48 test cases completed successfully.\nMemory: 14.1 MB\nRuntime: 39ms`}
          </div>
        )}
      </div>
    </div>
  );
};

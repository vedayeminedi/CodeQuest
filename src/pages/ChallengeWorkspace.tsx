import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  Play,
  Send,
  Lightbulb,
  Sparkles,
  ArrowLeft,
  Terminal,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { Challenge, ProgrammingLanguage, RunCodeResult, SubmissionResult } from '../types';
import { challengeService } from '../services/challengeService';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import { ProblemDescription } from '../components/editor/ProblemDescription';
import { CodeEditor } from '../components/editor/CodeEditor';
import { TestCasesPanel } from '../components/editor/TestCasesPanel';
import { OutputConsole } from '../components/editor/OutputConsole';
import { AIHelperDrawer } from '../components/editor/AIHelperDrawer';
import { Button } from '../components/ui/Button';

export const ChallengeWorkspace: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { solveChallenge } = useUser();
  const { addToast } = useToast();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [language, setLanguage] = useState<ProgrammingLanguage>('python');
  const [code, setCode] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [runResult, setRunResult] = useState<RunCodeResult | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [activeBottomTab, setActiveBottomTab] = useState<'testcases' | 'console'>('testcases');
  const [isAIHelperOpen, setIsAIHelperOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch challenge on mount
  useEffect(() => {
    // [BACKEND INTEGRATION POINT] GET /api/v1/challenges/{id}
    const loadChallenge = async () => {
      setIsLoading(true);
      try {
        const res = await challengeService.getChallengeById(challengeId || 'cq-101');
        if (res.success && res.data) {
          setChallenge(res.data);
          setCode(res.data.codeTemplates[language] || res.data.codeTemplates.python);
          if (res.data.testCases.length > 0) {
            setCustomInput(res.data.testCases[0].input);
          }
        }
      } catch (err) {
        console.error('Failed to load challenge:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadChallenge();
  }, [challengeId]);

  // Handle language switch
  const handleLanguageChange = (newLang: ProgrammingLanguage) => {
    setLanguage(newLang);
    if (challenge && challenge.codeTemplates[newLang]) {
      setCode(challenge.codeTemplates[newLang]);
      addToast({
        type: 'info',
        title: `Switched to ${newLang.toUpperCase()}`,
        message: 'Editor loaded with language starter boilerplate.',
        duration: 2500,
      });
    }
  };

  const handleResetCode = () => {
    if (challenge && challenge.codeTemplates[language]) {
      setCode(challenge.codeTemplates[language]);
      addToast({
        type: 'info',
        title: 'Code Reset',
        message: 'Reverted back to starter boilerplate.',
        duration: 2000,
      });
    }
  };

  // Simulate Running Code
  const handleRunCode = async () => {
    if (!challenge) return;
    setIsRunning(true);
    setActiveBottomTab('console');

    try {
      const res = await challengeService.runCode(challenge.id, language, code);
      if (res.success) {
        setRunResult(res.data);
        setSubmissionResult(null);
        addToast({
          type: 'success',
          title: 'Code Run Completed',
          message: `All test cases passed in ${res.data.executionTimeMs}ms.`,
          duration: 3000,
        });
      }
    } catch (err) {
      console.error('Run failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  // Simulate Submitting Code
  const handleSubmitCode = async () => {
    if (!challenge) return;
    setIsSubmitting(true);
    setActiveBottomTab('console');

    try {
      const res = await challengeService.submitCode(challenge.id, language, code);
      if (res.success) {
        setSubmissionResult(res.data);
        setRunResult(null);

        // Award XP and celebrate via UserContext
        await solveChallenge(challenge.id, challenge.xpReward, challenge.title);
      }
    } catch (err) {
      console.error('Submit failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-300">Challenge not found.</p>
        <NavLink to="/challenges" className="text-purple-400 hover:underline">
          Return to Challenge Directory
        </NavLink>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-4.5rem)] flex flex-col -m-4 md:-m-6 lg:-m-8 bg-[#080b12] text-slate-100 overflow-hidden relative">
      {/* Workspace Top Toolbar */}
      <div className="h-12 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 select-none">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/challenges"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            title="Back to Problem List"
          >
            <ArrowLeft className="w-4 h-4" />
          </NavLink>

          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
              {challenge.title}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              +{challenge.xpReward} XP
            </span>
          </div>
        </div>

        {/* Right: AI & Hint buttons + Run & Submit */}
        <div className="flex items-center gap-2">
          {/* AI Explanation Button */}
          <button
            onClick={() => setIsAIHelperOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-semibold shadow-sm shadow-purple-950/50 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Run Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRunCode}
            isLoading={isRunning}
            leftIcon={<Play className="w-3.5 h-3.5 text-slate-300 fill-slate-300" />}
          >
            Run
          </Button>

          {/* Submit Button */}
          <Button
            variant="emerald"
            size="sm"
            onClick={handleSubmitCode}
            isLoading={isSubmitting}
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Main Split Body: Left Description Pane | Right Editor & Console */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Left Pane: Problem Description */}
        <div className="w-full lg:w-[45%] h-1/2 lg:h-full shrink-0 overflow-hidden">
          <ProblemDescription
            challenge={challenge}
            onOpenAIHelper={() => setIsAIHelperOpen(true)}
          />
        </div>

        {/* Right Pane: Code Editor + Bottom Testcases/Output Panel */}
        <div className="w-full lg:w-[55%] h-1/2 lg:h-full flex flex-col overflow-hidden bg-[#0d1117] min-h-0">
          {/* Editor Area (Top 62%) */}
          <div className="flex-[62] overflow-hidden min-h-0 border-b border-slate-800">
            <CodeEditor
              language={language}
              code={code}
              onChange={setCode}
              onLanguageChange={handleLanguageChange}
              onResetCode={handleResetCode}
            />
          </div>

          {/* Bottom Panel (Bottom 38%): Test Cases & Output Console */}
          <div className="flex-[38] flex flex-col overflow-hidden min-h-0 bg-slate-950">
            {/* Panel Tabs Bar */}
            <div className="h-9 px-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveBottomTab('testcases')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeBottomTab === 'testcases'
                      ? 'text-white bg-slate-900 border border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Test Cases
                </button>
                <button
                  onClick={() => setActiveBottomTab('console')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                    activeBottomTab === 'console'
                      ? 'text-white bg-slate-900 border border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  Execution Console
                  {(runResult || submissionResult) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              </div>

              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                {language.toUpperCase()} Sandbox
              </span>
            </div>

            {/* Panel Content Area */}
            <div className="flex-1 overflow-hidden min-h-0">
              {activeBottomTab === 'testcases' ? (
                <TestCasesPanel
                  testCases={challenge.testCases}
                  customInput={customInput}
                  onCustomInputChange={setCustomInput}
                />
              ) : (
                <OutputConsole
                  runResult={runResult}
                  submissionResult={submissionResult}
                  isRunning={isRunning}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Side Drawer */}
      <AIHelperDrawer
        isOpen={isAIHelperOpen}
        onClose={() => setIsAIHelperOpen(false)}
        challenge={challenge}
        language={language}
        code={code}
      />
    </div>
  );
};

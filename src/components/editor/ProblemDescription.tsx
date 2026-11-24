import React, { useState } from 'react';
import {
  FileText,
  Lightbulb,
  History,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Challenge } from '../../types';
import { Badge } from '../ui/Badge';
import { Tabs } from '../ui/Tabs';

interface ProblemDescriptionProps {
  challenge: Challenge;
  onOpenAIHelper?: () => void;
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  challenge,
  onOpenAIHelper,
}) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'editorial' | 'submissions' | 'discuss'>('desc');
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);
  const [liked, setLiked] = useState<boolean | null>(null);

  const toggleHint = (idx: number) => {
    if (unlockedHints.includes(idx)) {
      setUnlockedHints(unlockedHints.filter((i) => i !== idx));
    } else {
      setUnlockedHints([...unlockedHints, idx]);
    }
  };

  const tabs = [
    { id: 'desc', label: 'Description', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'editorial', label: 'Editorial', icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { id: 'submissions', label: 'Submissions', icon: <History className="w-3.5 h-3.5" />, badge: 3 },
    { id: 'discuss', label: 'Discussions', icon: <MessageSquare className="w-3.5 h-3.5" />, badge: 14 },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950/70 border-r border-slate-800/80 overflow-hidden">
      {/* Tabs Header */}
      <div className="p-2 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={(id: any) => setActiveTab(id)} />
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {activeTab === 'desc' && (
          <div className="space-y-6">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge difficulty={challenge.difficulty} size="sm" />
                <Badge variant="outline" size="sm">
                  {challenge.topic}
                </Badge>
                {challenge.status === 'Solved' && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                  </span>
                )}
              </div>

              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {challenge.title}
              </h1>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-1">
                  <span>Acceptance:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {challenge.acceptanceRate}%
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span>XP Reward:</span>
                  <span className="font-mono font-bold text-purple-300">
                    +{challenge.xpReward} XP
                  </span>
                </div>

                {/* Like / Dislike */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setLiked(liked === true ? null : true)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
                      liked === true
                        ? 'text-purple-400 bg-purple-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{challenge.likes + (liked === true ? 1 : 0)}</span>
                  </button>
                  <button
                    onClick={() => setLiked(liked === false ? null : false)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
                      liked === false
                        ? 'text-rose-400 bg-rose-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>{challenge.dislikes}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Companies Tags */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                <Building className="w-3 h-3" /> Asked In:
              </span>
              {challenge.companies.map((comp) => (
                <span
                  key={comp}
                  className="text-xs px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {comp}
                </span>
              ))}
            </div>

            {/* Description Text */}
            <div className="prose prose-invert max-w-none text-xs md:text-sm text-slate-300 leading-relaxed space-y-3 font-normal whitespace-pre-line">
              {challenge.description}
            </div>

            {/* Examples */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Examples
              </h3>
              {challenge.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5 font-mono text-xs"
                >
                  <p className="text-[11px] font-bold text-purple-300 font-sans uppercase">
                    Example {idx + 1}
                  </p>
                  <div className="text-slate-300">
                    <span className="text-slate-500 font-sans font-semibold">Input: </span>
                    <span className="text-cyan-300">{ex.input}</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500 font-sans font-semibold">Output: </span>
                    <span className="text-emerald-300">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="text-slate-400 font-sans text-xs pt-1 border-t border-slate-800/60 mt-1">
                      <span className="text-slate-500 font-semibold">Explanation: </span>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Constraints
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono">
                {challenge.constraints.map((c, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <code>{c}</code>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progressive Hints */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  Progressive Hints
                </h3>
                {onOpenAIHelper && (
                  <button
                    onClick={onOpenAIHelper}
                    className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Ask AI Tutor
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {challenge.hints.map((hint, idx) => {
                  const isUnlocked = unlockedHints.includes(idx);
                  return (
                    <div
                      key={idx}
                      className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60"
                    >
                      <button
                        onClick={() => toggleHint(idx)}
                        className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                          Hint {idx + 1}
                        </span>
                        {isUnlocked ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      {isUnlocked && (
                        <div className="p-3 pt-0 text-xs text-slate-300 border-t border-slate-800/40 bg-slate-950/40 leading-relaxed">
                          {hint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editorial' && (
          <div className="space-y-4 text-xs md:text-sm text-slate-300">
            <h3 className="text-base font-bold text-white">Optimal Algorithmic Approach</h3>
            <p className="leading-relaxed">
              To achieve optimal performance on <strong>{challenge.title}</strong>, we avoid the naive
              quadratic approach by using a Hash Map or Two-Pointer strategy.
            </p>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Complexity Analysis
              </h4>
              <p className="font-mono text-xs text-emerald-400">Time Complexity: O(N)</p>
              <p className="font-mono text-xs text-cyan-400">Space Complexity: O(N) auxiliary space</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full editorial video breakdown and interactive step-through are available in the
              Learning Path for this topic.
            </p>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white">Your Past Submissions</h3>
            <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-400">Accepted</span>
                <p className="text-slate-400 text-[11px]">Runtime: 42ms (Beats 91.4%) · Python</p>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">2 days ago</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-rose-400">Wrong Answer</span>
                <p className="text-slate-400 text-[11px]">Failed on test case 14/48 · Python</p>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">2 days ago</span>
            </div>
          </div>
        )}

        {activeTab === 'discuss' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white">Community Discussion</h3>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300">Clean Python 3 O(N) 3-liner with dict</span>
                <span className="text-slate-500 text-[10px]">142 upvotes</span>
              </div>
              <p className="text-slate-400 text-xs">
                You do not need two passes! Maintain the dictionary while iterating.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

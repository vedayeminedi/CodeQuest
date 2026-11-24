import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Bug,
  Lightbulb,
  Gauge,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  Code2,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { aiService } from '../services/aiService';
import { mockChallenges } from '../data/mockChallenges';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedChallenge, setSelectedChallenge] = useState<string>('Two Sum');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // [BACKEND INTEGRATION POINT] GET /api/v1/ai/messages
    const loadMessages = async () => {
      const res = await aiService.getMessages();
      if (res.success) {
        setMessages(res.data);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;
    const text = textToSend.trim();
    setInput('');
    setIsTyping(true);

    try {
      // [BACKEND INTEGRATION POINT] POST /api/v1/ai/chat
      const res = await aiService.sendMessage(text, {
        challengeTitle: selectedChallenge,
        language: 'python',
      });
      if (res.success) {
        // Refresh message list
        const updated = await aiService.getMessages();
        if (updated.success) setMessages(updated.data);
      }
    } catch (err) {
      console.error('AI chat failed:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const quickPrompts = [
    { label: 'Explain Code', icon: BookOpen, text: 'Explain how the optimal solution for this problem works step-by-step.' },
    { label: 'Debug Code', icon: Bug, text: 'Help me find the potential edge cases or bugs in my solution.' },
    { label: 'Ask for Hint', icon: Lightbulb, text: 'Give me a subtle hint without spoiling the full solution.' },
    { label: 'Time & Space Complexity', icon: Gauge, text: 'Explain the Time and Space Complexity (Big-O analysis) for this problem.' },
  ];

  return (
    <div className="h-[calc(100vh-6.5rem)] md:h-[calc(100vh-5rem)] flex flex-col bg-slate-950/70 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/40">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">CodeQuest AI Tutor</h1>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Gemini-Flash 2.4 Ready
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Socratic algorithms coach · Complexity analysis · Interactive hints
            </p>
          </div>
        </div>

        {/* Problem Context Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Active Context:</span>
          <select
            value={selectedChallenge}
            onChange={(e) => setSelectedChallenge(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 text-purple-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500 font-medium"
          >
            {mockChallenges.map((c) => (
              <option key={c.id} value={c.title}>
                {c.title} ({c.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 text-xs md:text-sm">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3.5 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 space-y-3 leading-relaxed shadow-lg ${
                  isAI
                    ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                }`}
              >
                {/* Text Content with Markdown formatting */}
                <div className="whitespace-pre-wrap font-normal leading-relaxed">
                  {msg.text}
                </div>

                {/* Big-O Complexity Badge Card if present */}
                {msg.complexityAnalysis && (
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-slate-900/60 border border-purple-500/20">
                      <span className="text-slate-400 block text-[10px] uppercase font-sans">
                        Time Complexity
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {msg.complexityAnalysis.time}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900/60 border border-purple-500/20">
                      <span className="text-slate-400 block text-[10px] uppercase font-sans">
                        Space Complexity
                      </span>
                      <span className="text-cyan-400 font-bold">
                        {msg.complexityAnalysis.space}
                      </span>
                    </div>
                  </div>
                )}

                {/* Code Snippet if present */}
                {msg.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] text-xs font-mono">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border-b border-slate-800 text-slate-400">
                      <span>{msg.codeSnippet.language}</span>
                      <button
                        onClick={() => handleCopyCode(msg.codeSnippet!.code, msg.id)}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        {copiedSnippetId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 overflow-x-auto text-purple-200">
                      {msg.codeSnippet.code}
                    </pre>
                  </div>
                )}

                {/* Follow-up suggestions */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((f, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(f)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 transition-colors text-left"
                      >
                        {f} →
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[10px] text-slate-500 block text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-purple-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>AI Tutor is formulating hints and analyzing complexity...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
        {quickPrompts.map((qp) => {
          const Icon = qp.icon;
          return (
            <button
              key={qp.label}
              onClick={() => handleSend(qp.text)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-white text-xs whitespace-nowrap transition-colors"
            >
              <Icon className="w-3.5 h-3.5 text-purple-400" />
              <span>{qp.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input Box Footer */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask AI Tutor about ${selectedChallenge} or request a subtle hint...`}
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

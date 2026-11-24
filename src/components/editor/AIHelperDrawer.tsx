import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, Lightbulb, Bug, Gauge, ArrowRight } from 'lucide-react';
import { Challenge, ProgrammingLanguage } from '../../types';
import { aiService } from '../../services/aiService';

interface AIHelperDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge;
  language: ProgrammingLanguage;
  code: string;
}

export const AIHelperDrawer: React.FC<AIHelperDrawerProps> = ({
  isOpen,
  onClose,
  challenge,
  language,
  code,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Hi! I'm your AI Workspace Assistant. I'm looking at your **${challenge.title}** code in **${language.toUpperCase()}**. How can I help?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;
    const userText = textToSend.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const res = await aiService.sendMessage(userText, {
        challengeTitle: challenge.title,
        language,
        code,
      });
      if (res.success) {
        setMessages((prev) => [...prev, { sender: 'ai', text: res.data.text }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Error contacting AI Tutor service. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPills = [
    { label: 'Explain Code', prompt: 'Explain my code logic step by step and verify correctness.', icon: Lightbulb },
    { label: 'Find Bugs', prompt: 'Check my current code for any potential edge case bugs or mistakes.', icon: Bug },
    { label: 'Complexity', prompt: 'Analyze time and space complexity of this implementation.', icon: Gauge },
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col animate-slide-left">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
            <Bot className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              CodeQuest AI Assistant
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">Context: {challenge.title}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-3 bg-slate-900/40 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
        {quickPills.map((pill) => {
          const Icon = pill.icon;
          return (
            <button
              key={pill.label}
              onClick={() => handleSend(pill.prompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-white text-xs whitespace-nowrap transition-colors"
            >
              <Icon className="w-3.5 h-3.5 text-purple-400" />
              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-950/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-purple-400 bg-slate-900 border border-slate-800 p-3 rounded-2xl w-fit">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>AI Tutor is formulating analysis...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about edge cases, complexity, hints..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

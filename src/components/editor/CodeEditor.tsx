import React from 'react';
import Editor from '@monaco-editor/react';
import {
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Settings,
  Code2,
} from 'lucide-react';
import { ProgrammingLanguage } from '../../types';

interface CodeEditorProps {
  language: ProgrammingLanguage;
  code: string;
  onChange: (value: string) => void;
  onLanguageChange: (lang: ProgrammingLanguage) => void;
  onResetCode: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  onChange,
  onLanguageChange,
  onResetCode,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [fontSize, setFontSize] = React.useState<number>(14);
  const [showMinimap, setShowMinimap] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMonacoLanguage = (lang: ProgrammingLanguage): string => {
    switch (lang) {
      case 'python':
        return 'python';
      case 'javascript':
        return 'javascript';
      case 'typescript':
        return 'typescript';
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      default:
        return 'python';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1117] overflow-hidden">
      {/* Editor Control Toolbar */}
      <div className="h-11 px-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
        {/* Left: Language Selector */}
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-purple-400" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as ProgrammingLanguage)}
            className="bg-slate-900 border border-slate-700/80 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-purple-500 font-medium"
          >
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript (ES6)</option>
            <option value="typescript">TypeScript</option>
            <option value="cpp">C++ 20</option>
            <option value="java">Java 17</option>
          </select>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          {/* Font size toggle */}
          <button
            onClick={() => setFontSize((prev) => (prev === 16 ? 12 : prev + 2))}
            className="px-2 py-1 hover:text-white rounded hover:bg-slate-800 transition-colors font-mono"
            title="Toggle Font Size"
          >
            {fontSize}px
          </button>

          {/* Minimap toggle */}
          <button
            onClick={() => setShowMinimap(!showMinimap)}
            className={`px-2 py-1 rounded transition-colors ${
              showMinimap ? 'text-purple-400 bg-purple-500/20' : 'hover:text-white hover:bg-slate-800'
            }`}
            title="Toggle Minimap"
          >
            Map
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="p-1.5 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Code */}
          <button
            onClick={onResetCode}
            className="p-1.5 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Reset to Template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monaco Code Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          theme="vs-dark"
          onChange={(val) => onChange(val || '')}
          options={{
            fontSize,
            minimap: { enabled: showMinimap },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            padding: { top: 12, bottom: 12 },
            fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
          }}
          loading={
            <div className="h-full flex items-center justify-center bg-slate-950 text-xs text-slate-400">
              <span className="animate-pulse">Initializing CodeQuest Editor...</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

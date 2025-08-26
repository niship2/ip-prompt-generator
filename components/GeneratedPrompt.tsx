
import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface GeneratedPromptProps {
  prompt: string;
}

const GeneratedPrompt: React.FC<GeneratedPromptProps> = ({ prompt }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="relative flex-grow">
        <pre className="w-full h-full p-4 bg-slate-100 rounded-md text-sm whitespace-pre-wrap overflow-auto font-mono text-slate-700 border border-slate-200">
          {prompt || <span className="text-slate-400">左のメニューから業務を選択し、情報を入力してください。</span>}
        </pre>
      </div>
      <button
        onClick={handleCopy}
        disabled={!prompt}
        className={`mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
          isCopied 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200`}
      >
        {isCopied ? (
          <>
            <CheckIcon className="h-5 w-5 mr-2" />
            コピーしました
          </>
        ) : (
          <>
            <ClipboardIcon className="h-5 w-5 mr-2" />
            プロンプトをコピー
          </>
        )}
      </button>
    </div>
  );
};

export default GeneratedPrompt;

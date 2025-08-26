import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import GeneratedPrompt from './GeneratedPrompt';
import TextAreaInput from './TextAreaInput';

// 型定義
interface PolishedChange {
  polishedText: string;
  reason: string;
}

interface PolishedResult {
  polishedPrompt: string;
  changes: PolishedChange[];
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    polishedPrompt: {
      type: Type.STRING,
      description: "改善されたプロンプトの全文です。",
    },
    changes: {
      type: Type.ARRAY,
      description: "プロンプトの具体的な変更点と、その理由のリストです。",
      items: {
        type: Type.OBJECT,
        properties: {
          polishedText: {
            type: Type.STRING,
            description: "改善されたプロンプト内で、ハイライトされるべき具体的なテキスト断片です。",
          },
          reason: {
            type: Type.STRING,
            description: "このテキスト断片がなぜそのように変更・追加されたのか、その理由を簡潔に説明します。",
          },
        },
        required: ["polishedText", "reason"],
      },
    },
  },
  required: ["polishedPrompt", "changes"],
};

const PromptPolisher: React.FC = () => {
  const [originalPrompt, setOriginalPrompt] = useState<string>('');
  const [polishedResult, setPolishedResult] = useState<PolishedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPolishPrompt = (userPrompt: string): string => {
    return `# Role
あなたは、世界クラスのプロンプトエンジニアです。不明確で効果の低いプロンプトを、LLMが最高のパフォーマンスを発揮できるような、明確で構造化された、効果的なプロンプトに変換することを専門としています。

# Goal
以下の「元のプロンプト」を分析し、より高品質な結果を生み出すための「改善されたプロンプト」を生成することが目的です。改善にあたっては、どの部分をどのような理由で変更したのかも明確に示してください。

# Instructions
1.  **分析**: 「元のプロンプト」が何を達成しようとしているのか、その意図を深く理解してください。
2.  **構造化**: 私のアプリケーション(知財業務支援LLMプロンプトジェネレーター)で使われているような、以下のベストプラクティスを適用してプロンプトを再構築してください。
    -   **Role**: LLMに特定の役割（ペルソナ）を明確に与える。
    -   **Goal**: プロンプトの最終的な目的を具体的に定義する。
    -   **Context**: 背景情報、入力データ、制約条件などを提供する。
    -   **Instructions**: 実行すべきタスクを、明確で、順を追った、曖昧さのない指示（Chain of Thoughtなど）で記述する。
    -   **Quality Guidelines / Output Format**: 期待する出力の品質基準や、JSONのような特定のフォーマットを指示する。
3.  **改善**: 元のプロンプトの意図を維持しつつ、より明確で、具体的で、文脈に富んだ表現に書き換えてください。不要な曖昧さを排除してください。
4.  **出力**: 最終的な結果を、指定されたJSONスキーマに従って出力してください。あなたの思考プロセスや解説はJSONに含めないでください。

# 元のプロンプト
---
${userPrompt}
---
`;
  };

  const handlePolish = async () => {
    if (!originalPrompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setPolishedResult(null);

    try {
      const prompt = createPolishPrompt(originalPrompt);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.5,
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        }
      });
      
      const jsonStr = response.text.trim();
      const result: PolishedResult = JSON.parse(jsonStr);
      setPolishedResult(result);

    } catch (e) {
      console.error(e);
      setError('プロンプトの改善中にエラーが発生しました。しばらくしてからもう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPolishedPromptWithDiff = (result: PolishedResult) => {
    const separator = `___${Date.now()}___`;
    let processedText = result.polishedPrompt;

    // 各変更箇所をユニークなセパレータで囲む
    for (const change of result.changes) {
      const escapedText = change.polishedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      processedText = processedText.replace(new RegExp(escapedText, 'g'), `${separator}${change.polishedText}${separator}`);
    }

    const parts = processedText.split(separator);
    
    return parts.map((part, index) => {
      if (!part) return null;
      const change = result.changes.find(c => c.polishedText === part);
      if (change) {
        return (
          <span key={index} className="relative group bg-blue-100 rounded px-1 py-0.5 cursor-help">
            {part}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              {change.reason}
              <svg className="absolute text-slate-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
              </svg>
            </span>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const renderOutput = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full p-4 bg-slate-100 rounded-md flex items-center justify-center">
          <div className="flex flex-col items-center text-slate-500">
             <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>改善案を生成中...</span>
          </div>
        </div>
      );
    }
    if (error) {
      return (
         <div className="w-full h-full p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
            <p className="font-semibold">エラー</p>
            <p>{error}</p>
        </div>
      );
    }
    
    return (
      <GeneratedPrompt
        prompt={polishedResult?.polishedPrompt || ''}
        placeholder="左のフォームに改善したいプロンプトを入力し、「プロンプトをブラッシュアップ」ボタンを押してください。"
      >
        {polishedResult ? renderPolishedPromptWithDiff(polishedResult) : undefined}
      </GeneratedPrompt>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. プロンプトを入力</h2>
        <div className="space-y-4">
          <TextAreaInput
            id="original-prompt"
            label="改善したいプロンプト"
            value={originalPrompt}
            onChange={(e) => setOriginalPrompt(e.target.value)}
            placeholder="ここにプロンプトを入力してください..."
            required={true}
            rows={15}
          />
        </div>
        <button
          onClick={handlePolish}
          disabled={!originalPrompt.trim() || isLoading}
          className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? '生成中...' : 'プロンプトをブラッシュアップ'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. ブラッシュアップされたプロンプト</h2>
        <div className="flex-grow">
          {renderOutput()}
        </div>
      </div>
    </div>
  );
};

export default PromptPolisher;
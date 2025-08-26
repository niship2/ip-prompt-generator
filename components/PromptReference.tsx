
import React from 'react';
import { REFERENCE_PROMPTS } from '../referencePrompts';
import type { ReferencePrompt } from '../types';

const PromptReference: React.FC = () => {
  const groupedPrompts = REFERENCE_PROMPTS.reduce((acc, prompt) => {
    (acc[prompt.category] = acc[prompt.category] || []).push(prompt);
    return acc;
  }, {} as Record<string, ReferencePrompt[]>);

  return (
    <div className="max-w-4xl mx-auto">
      {Object.entries(groupedPrompts).map(([category, prompts]) => (
        <section key={category} className="mb-12" aria-labelledby={`category-heading-${category.replace(/\s+/g, '-')}`}>
          <h2 id={`category-heading-${category.replace(/\s+/g, '-')}`} className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6">{category}</h2>
          <div className="space-y-6">
            {prompts.map((prompt, index) => (
              <article key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900">{prompt.task}</h3>
                <pre className="mt-4 p-4 bg-slate-50 rounded-md text-sm whitespace-pre-wrap overflow-auto font-mono text-slate-700 border border-slate-200">
                  {prompt.prompt}
                </pre>
                <footer className="mt-4 text-xs text-slate-600 bg-slate-100 p-3 rounded-md border border-slate-200">
                  <p>
                    <span className="font-semibold text-slate-700">プロンプトの種類:</span> {prompt.type}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-slate-700">ソース情報:</span>{' '}
                    {prompt.source.url ? (
                      <a href={prompt.source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {prompt.source.text}
                      </a>
                    ) : (
                      prompt.source.text
                    )}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
export default PromptReference;

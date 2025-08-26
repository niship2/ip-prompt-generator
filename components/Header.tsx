
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          知財業務支援LLMプロンプトジェネレーター
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          知的財産業務に特化した高品質なプロンプトを簡単作成
        </p>
      </div>
    </header>
  );
};

export default Header;

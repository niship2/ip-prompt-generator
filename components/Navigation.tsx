
import React from 'react';

interface NavigationProps {
  currentView: 'generator' | 'reference';
  setView: (view: 'generator' | 'reference') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const activeClasses = 'border-blue-500 text-blue-600';
  const inactiveClasses = 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300';

  return (
    <div className="bg-white border-b border-slate-200">
      <nav className="container mx-auto -mb-px flex space-x-8 px-4" aria-label="Tabs">
        <button
          onClick={() => setView('generator')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out ${currentView === 'generator' ? activeClasses : inactiveClasses}`}
          aria-current={currentView === 'generator' ? 'page' : undefined}
        >
          プロンプト生成
        </button>
        <button
          onClick={() => setView('reference')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out ${currentView === 'reference' ? activeClasses : inactiveClasses}`}
          aria-current={currentView === 'reference' ? 'page' : undefined}
        >
          プロンプト参考集
        </button>
      </nav>
    </div>
  );
};

export default Navigation;

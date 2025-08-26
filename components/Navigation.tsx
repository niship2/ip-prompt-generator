import React from 'react';

type View = 'generator' | 'reference' | 'materials';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const activeClasses = 'border-blue-500 text-blue-600';
  const inactiveClasses = 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300';

  const tabs: { view: View; label: string }[] = [
    { view: 'generator', label: 'プロンプト生成' },
    { view: 'reference', label: 'プロンプト参考集' },
    { view: 'materials', label: '参考資料' },
  ];

  return (
    <div className="bg-white border-b border-slate-200">
      <nav className="container mx-auto -mb-px flex space-x-8 px-4" aria-label="Tabs">
        {tabs.map(tab => (
          <button
            key={tab.view}
            onClick={() => setView(tab.view)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out ${currentView === tab.view ? activeClasses : inactiveClasses}`}
            aria-current={currentView === tab.view ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;

import React, { useState } from 'react';
import Header from './components/Header';
import PromptGenerator from './components/PromptGenerator';
import PromptReference from './components/PromptReference';
import Navigation from './components/Navigation';
import ReferenceMaterials from './components/ReferenceMaterials';

type View = 'generator' | 'reference' | 'materials';

const App: React.FC = () => {
  const [view, setView] = useState<View>('generator');

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <Header />
      <Navigation currentView={view} setView={setView} />
      <main className="container mx-auto px-4 py-8">
        {view === 'generator' && <PromptGenerator />}
        {view === 'reference' && <PromptReference />}
        {view === 'materials' && <ReferenceMaterials />}
      </main>
      <footer className="text-center py-4 text-sm text-slate-500">
        <p>&copy; 2024 IP Prompt Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
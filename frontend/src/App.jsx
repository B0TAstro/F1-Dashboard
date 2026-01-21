// App.jsx
import React, { useState } from 'react';
import Statistics from './pages/Statistics';
import ThisWeekend from './pages/ThisWeekend';

function App() {
  const [activeTab, setActiveTab] = useState('weekend');

  return (
    <div className="min-h-screen bg-[var(--f1-black)] text-[var(--f1-white)] font-sans selection:bg-[var(--f1-red)] selection:text-white pb-20">

      {/* Header / Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--f1-black)]/80 border-b border-[var(--f1-dark-gray)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* F1 Logo Placeholder or Text */}
          <div className="text-3xl font-black italic tracking-tighter text-[var(--f1-red)]">
            F1<span className="text-[var(--f1-white)]">DASH</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('weekend')}
            className={`text-sm tracking-widest uppercase font-bold transition-all duration-300 ${activeTab === 'weekend'
                ? 'text-[var(--f1-red)] scale-105'
                : 'text-[var(--f1-light-gray)] hover:text-white'
              }`}
          >
            This Weekend
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`text-sm tracking-widest uppercase font-bold transition-all duration-300 ${activeTab === 'statistics'
                ? 'text-[var(--f1-red)] scale-105'
                : 'text-[var(--f1-light-gray)] hover:text-white'
              }`}
          >
            Statistiques
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8 max-w-7xl animate-fade-in">
        {activeTab === 'statistics' && <Statistics />}
        {activeTab === 'weekend' && <ThisWeekend />}
      </main>

    </div>
  );
}

export default App;
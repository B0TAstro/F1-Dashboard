// App.jsx
import React, { useState } from 'react';
import Home from './pages/Home';
import DriversStandings from './pages/DriversStandings';
import ConstructorsStandings from './pages/ConstructorsStandings';
import Teams from './pages/Teams';
import Calendar from './pages/Calendar';
import Replay from './pages/Replay';
import DevLab from './pages/DevLab';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [classementOpen, setClassementOpen] = useState(false);

  const NavButton = ({ tab, children, special }) => (
    <button
      onClick={() => { setActiveTab(tab); setClassementOpen(false); }}
      className={`text-sm tracking-widest uppercase font-bold transition-all duration-300 ${activeTab === tab
          ? special ? `text-[${special}] scale-105` : 'text-[var(--f1-red)] scale-105'
          : 'text-[var(--f1-light-gray)] hover:text-white'
        }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--f1-black)] text-[var(--f1-white)] font-sans selection:bg-[var(--f1-red)] selection:text-white pb-20">

      {/* Header / Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--f1-black)]/90 border-b border-[var(--f1-dark-gray)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="text-3xl font-black italic tracking-tighter text-[var(--f1-red)]">
            F1<span className="text-[var(--f1-white)]">DASH</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <NavButton tab="home">Accueil</NavButton>

          {/* Classement Dropdown */}
          <div className="relative">
            <button
              onClick={() => setClassementOpen(!classementOpen)}
              className={`text-sm tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-1 ${activeTab === 'drivers' || activeTab === 'constructors'
                  ? 'text-[var(--f1-red)]'
                  : 'text-[var(--f1-light-gray)] hover:text-white'
                }`}
            >
              Classements
              <svg className={`w-3 h-3 transition-transform ${classementOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {classementOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[#1f1f29] border border-[#333] rounded-lg shadow-xl overflow-hidden min-w-[160px] z-50">
                <button
                  onClick={() => { setActiveTab('drivers'); setClassementOpen(false); }}
                  className="w-full px-4 py-3 text-left text-sm font-bold hover:bg-[var(--f1-red)] hover:text-white transition"
                >
                  🏆 Pilotes
                </button>
                <button
                  onClick={() => { setActiveTab('constructors'); setClassementOpen(false); }}
                  className="w-full px-4 py-3 text-left text-sm font-bold hover:bg-[var(--f1-red)] hover:text-white transition border-t border-[#333]"
                >
                  🏎️ Écuries
                </button>
              </div>
            )}
          </div>

          <NavButton tab="teams">Écuries</NavButton>
          <NavButton tab="calendar">Calendrier</NavButton>

          {/* Replay with blinking dot */}
          <button
            onClick={() => { setActiveTab('replay'); setClassementOpen(false); }}
            className={`text-sm tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'replay'
                ? 'text-[var(--f1-red)] scale-105'
                : 'text-[var(--f1-light-gray)] hover:text-white'
              }`}
          >
            <span className="w-2 h-2 bg-[var(--f1-red)] rounded-full animate-pulse"></span>
            Replay
          </button>

          <NavButton tab="devlab" special="#00D2BE">DevLab 🧪</NavButton>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8 max-w-7xl animate-fade-in">
        {activeTab === 'home' && <Home />}
        {activeTab === 'drivers' && <DriversStandings />}
        {activeTab === 'constructors' && <ConstructorsStandings />}
        {activeTab === 'teams' && <Teams />}
        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'replay' && <Replay />}
        {activeTab === 'devlab' && <DevLab />}
      </main>

      {/* Click outside to close dropdown */}
      {classementOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setClassementOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
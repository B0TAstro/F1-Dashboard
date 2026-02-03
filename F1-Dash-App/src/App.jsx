// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import DriversStandings from './pages/DriversStandings';
import ConstructorsStandings from './pages/ConstructorsStandings';
import Teams from './pages/Teams';
import Calendar from './pages/Calendar';
import Replay from './pages/Replay';
import DevLab from './pages/DevLab';

function App() {
  return (
    <div className="min-h-screen bg-[var(--f1-black)] text-[var(--f1-white)] font-sans selection:bg-[var(--f1-red)] selection:text-white flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 mt-8 max-w-7xl animate-fade-in flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/standings/drivers" element={<DriversStandings />} />
          <Route path="/standings/constructors" element={<ConstructorsStandings />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/replay" element={<Replay />} />
          <Route path="/devlab" element={<DevLab />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
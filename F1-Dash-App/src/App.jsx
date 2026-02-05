import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import Home from './pages/Home';
import DriversStandings from './pages/DriversStandings';
import ConstructorsStandings from './pages/ConstructorsStandings';
import Teams from './pages/Teams';
import Calendar from './pages/Calendar';
import Replay from './pages/Replay';
import DevLab from './pages/DevLab';

function App() {
  return (
    <div className="min-h-screen bg-(--f1-black) text-(--f1-white) font-sans selection:bg-(--f1-red) selection:text-white flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 mt-8 max-w-7xl animate-fade-in grow">
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
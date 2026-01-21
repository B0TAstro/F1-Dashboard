// components/Layout.jsx

import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700 text-white' : 'hover:bg-gray-200';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">F1 Dashboard</h1>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-md ${isActive('/')}`}>Accueil</Link>
            <Link to="/this-weekend" className={`px-3 py-2 rounded-md ${isActive('/this-weekend')}`}>Ce Weekend</Link>
            <Link to="/standings" className={`px-3 py-2 rounded-md ${isActive('/standings')}`}>Classements</Link>
            <Link to="/statistics" className={`px-3 py-2 rounded-md ${isActive('/statistics')}`}>Statistiques</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>Dashboard F1 utilisant l'API OpenF1 | {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
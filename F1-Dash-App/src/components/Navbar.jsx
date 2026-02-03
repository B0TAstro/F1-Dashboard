import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [classementOpen, setClassementOpen] = useState(false);

    const navLinkClasses = ({ isActive }) =>
        `text-sm tracking-widest uppercase font-bold transition-all duration-300 ${isActive
            ? 'text-[var(--f1-red)] scale-105'
            : 'text-[var(--f1-light-gray)] hover:text-white'
        }`;

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--f1-black)]/90 border-b border-[var(--f1-dark-gray)] px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-4 cursor-pointer">
                <div className="text-3xl font-black italic tracking-tighter text-[var(--f1-red)]">
                    F1<span className="text-[var(--f1-white)]">DASH</span>
                </div>
            </NavLink>

            <div className="flex items-center gap-8">

                {/* Classement Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setClassementOpen(!classementOpen)}
                        className={`text-sm tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-1 ${
                            // Simple check if we are in a sub-route of standings
                            location.pathname?.includes('standings')
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
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setClassementOpen(false)} />
                            <div className="absolute top-full left-0 mt-2 bg-[#1f1f29] border border-[#333] rounded-lg shadow-xl overflow-hidden min-w-[160px] z-50">
                                <NavLink
                                    to="/standings/drivers"
                                    onClick={() => setClassementOpen(false)}
                                    className={({ isActive }) =>
                                        `w-full block px-4 py-3 text-left text-sm font-bold transition ${isActive ? 'bg-[var(--f1-red)] text-white' : 'hover:bg-[var(--f1-red)] hover:text-white'
                                        }`
                                    }
                                >
                                    🏆 Pilotes
                                </NavLink>
                                <NavLink
                                    to="/standings/constructors"
                                    onClick={() => setClassementOpen(false)}
                                    className={({ isActive }) =>
                                        `w-full block px-4 py-3 text-left text-sm font-bold transition border-t border-[#333] ${isActive ? 'bg-[var(--f1-red)] text-white' : 'hover:bg-[var(--f1-red)] hover:text-white'
                                        }`
                                    }
                                >
                                    🏎️ Écuries
                                </NavLink>
                            </div>
                        </>
                    )}
                </div>

                <NavLink to="/teams" className={navLinkClasses}>
                    Écuries
                </NavLink>

                <NavLink to="/calendar" className={navLinkClasses}>
                    Calendrier
                </NavLink>

                {/* Replay with blinking dot */}
                <NavLink
                    to="/replay"
                    className={({ isActive }) =>
                        `text-sm tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-2 ${isActive
                            ? 'text-[var(--f1-red)] scale-105'
                            : 'text-[var(--f1-light-gray)] hover:text-white'
                        }`
                    }
                >
                    <span className="w-2 h-2 bg-[var(--f1-red)] rounded-full animate-pulse"></span>
                    Replay
                </NavLink>

                <NavLink
                    to="/devlab"
                    className={({ isActive }) =>
                        `text-sm tracking-widest uppercase font-bold transition-all duration-300 ${isActive
                            ? 'text-[#00D2BE] scale-105'
                            : 'text-[var(--f1-light-gray)] hover:text-white'
                        }`
                    }
                >
                    DevLab 🧪
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;

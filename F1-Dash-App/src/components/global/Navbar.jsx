import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Trophy, Car, Beaker } from 'lucide-react';

const Navbar = () => {
    const [classementOpen, setClassementOpen] = useState(false);
    const location = useLocation();

    const navLinkClasses = ({ isActive }) =>
        `text-sm tracking-widest uppercase font-bold transition-all duration-300 ${isActive
            ? 'text-(--f1-red) scale-105'
            : 'text-(--f1-light-gray) hover:text-white'
        }`;

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-(--f1-black)/90 border-b border-(--f1-dark-gray) px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-4 cursor-pointer">
                <div className="text-3xl font-black italic tracking-tighter text-(--f1-red)">
                    F1<span className="text-(--f1-white)">DASH</span>
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
                                ? 'text-(--f1-red)'
                                : 'text-(--f1-light-gray) hover:text-white'
                            }`}
                    >
                        Classements
                        <ChevronDown className={`w-3 h-3 transition-transform ${classementOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {classementOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setClassementOpen(false)} />
                            <div className="absolute top-full left-0 mt-2 bg-[#1f1f29] border border-[#333] rounded-lg shadow-xl overflow-hidden min-w-[170px] z-50">
                                <NavLink
                                    to="/standings/drivers"
                                    onClick={() => setClassementOpen(false)}
                                    className={({ isActive }) =>
                                        `w-full block px-4 py-3 text-left text-sm font-bold transition flex items-center gap-2 ${isActive ? 'bg-(--f1-red) text-white' : 'hover:bg-(--f1-red) hover:text-white'
                                        }`
                                    }
                                >
                                    <Trophy className="w-4 h-4" /> Pilotes
                                </NavLink>
                                <NavLink
                                    to="/standings/constructors"
                                    onClick={() => setClassementOpen(false)}
                                    className={({ isActive }) =>
                                        `w-full block px-4 py-3 text-left text-sm font-bold transition border-t border-[#333] flex items-center gap-2 ${isActive ? 'bg-(--f1-red) text-white' : 'hover:bg-(--f1-red) hover:text-white'
                                        }`
                                    }
                                >
                                    <Car className="w-4 h-4" /> Écuries
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
                            ? 'text-(--f1-red) scale-105'
                            : 'text-(--f1-light-gray) hover:text-white'
                        }`
                    }
                >
                    <span className="w-2 h-2 bg-(--f1-red) rounded-full animate-pulse"></span>
                    Replay
                </NavLink>

                <NavLink
                    to="/devlab"
                    className={({ isActive }) =>
                        `text-sm tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-2 ${isActive
                            ? 'text-[#00D2BE] scale-105'
                            : 'text-(--f1-light-gray) hover:text-white'
                        }`
                    }
                >
                    DevLab <Beaker className="w-4 h-4" />
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;

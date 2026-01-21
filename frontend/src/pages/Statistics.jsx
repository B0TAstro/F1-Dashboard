// pages/Statistics.jsx

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchDriverStandings, fetchConstructorStandings } from '../api/openF1Api';

function Statistics() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('drivers');
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                // Attempt to fetch data for current year
                // If it fails or returns empty (start of season), we could fallback to previous year,
                // but user requested to fix "fetching 2023", so we default to current real time.

                const [drivers, constructors] = await Promise.all([
                    fetchDriverStandings(currentYear),
                    fetchConstructorStandings(currentYear)
                ]);

                // Sort by position just in case
                setDriverStandings(drivers.sort((a, b) => a.position - b.position));
                setConstructorStandings(constructors.sort((a, b) => a.position - b.position));
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les données de la saison " + currentYear);
                setLoading(false);
            }
        };

        loadData();
    }, [currentYear]);

    // Prepare chart data from standings
    const driverWins = driverStandings
        .filter(d => d.wins > 0)
        .map(d => ({ name: d.driver_name || d.name_acronym, value: d.wins }));

    const teamWins = constructorStandings
        .filter(t => t.wins > 0)
        .map(t => ({ name: t.team_name, value: t.wins }));

    // For points distribution (Pie or Bar)
    const topDriversPoints = driverStandings.slice(0, 10).map(d => ({
        name: d.name_acronym,
        value: d.points
    }));

    // For team points
    const teamPoints = constructorStandings.map(t => ({
        name: t.team_name,
        value: t.points
    }));

    const COLORS = ['#FF1801', '#FFFFFF', '#38383F', '#949498', '#E10600', '#F596C8', '#2293D1', '#B6BABD'];

    if (loading) return <div className="p-10 text-center text-xl font-bold text-[var(--f1-white)] animate-pulse">Chargement des statistiques {currentYear}...</div>;
    if (error) return <div className="p-10 text-center text-[var(--f1-red)] font-bold bg-[var(--f1-dark-gray)] rounded-lg m-4">{error}</div>;

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-[var(--f1-dark-gray)] pb-4">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-[var(--f1-white)]">
                    Saison <span className="text-[var(--f1-red)]">{currentYear}</span>
                </h1>

                <div className="inline-flex bg-[var(--f1-dark-gray)] p-1 rounded-lg">
                    <button
                        type="button"
                        className={`px-6 py-2 text-sm font-bold uppercase italic transition-all duration-300 rounded-md ${activeTab === 'drivers' ? 'bg-[var(--f1-red)] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('drivers')}
                    >
                        Pilotes
                    </button>
                    <button
                        type="button"
                        className={`px-6 py-2 text-sm font-bold uppercase italic transition-all duration-300 rounded-md ${activeTab === 'teams' ? 'bg-[var(--f1-red)] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('teams')}
                    >
                        Équipes
                    </button>
                </div>
            </div>

            {/* DRIVERS TAB */}
            {activeTab === 'drivers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Points Distribution */}
                    <div className="bg-[var(--f1-dark-gray)] rounded-xl shadow-lg p-6 border-t-2 border-[var(--f1-red)]">
                        <h2 className="text-xl font-bold mb-6 uppercase italic text-[var(--f1-white)]">Classement (Top 10)</h2>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topDriversPoints} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={40} tick={{ fill: '#fff', fontWeight: 'bold' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#15151E', border: '1px solid #333', color: '#fff' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar dataKey="value" fill="#FF1801" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#fff', fontWeight: 'bold' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Wins Distribution */}
                    <div className="bg-[var(--f1-dark-gray)] rounded-xl shadow-lg p-6 border-t-2 border-[var(--f1-red)]">
                        <h2 className="text-xl font-bold mb-6 uppercase italic text-[var(--f1-white)]">Victoires</h2>
                        {driverWins.length > 0 ? (
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={driverWins}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, value }) => `${name} (${value})`}
                                            stroke="none"
                                        >
                                            {driverWins.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#15151E', border: '1px solid #333', color: '#fff' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-72 flex items-center justify-center text-gray-500 italic">
                                Pas encore de victoires cette saison
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* TEAMS TAB */}
            {activeTab === 'teams' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Team Points */}
                    <div className="bg-[var(--f1-dark-gray)] rounded-xl shadow-lg p-6 border-t-2 border-[var(--f1-red)]">
                        <h2 className="text-xl font-bold mb-6 uppercase italic text-[var(--f1-white)]">Classement Constructeurs</h2>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={teamPoints} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={90} tick={{ fill: '#fff', fontWeight: 'bold', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#15151E', border: '1px solid #333', color: '#fff' }} cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" fill="#FFFFFD" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#fff', fontWeight: 'bold' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Team Wins */}
                    <div className="bg-[var(--f1-dark-gray)] rounded-xl shadow-lg p-6 border-t-2 border-[var(--f1-red)]">
                        <h2 className="text-xl font-bold mb-6 uppercase italic text-[var(--f1-white)]">Victoires par Écurie</h2>
                        {teamWins.length > 0 ? (
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={teamWins}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, value }) => `${name} (${value})`}
                                            stroke="none"
                                        >
                                            {teamWins.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#15151E', border: '1px solid #333', color: '#fff' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-72 flex items-center justify-center text-gray-500 italic">
                                Pas encore de victoires cette saison
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Statistics;
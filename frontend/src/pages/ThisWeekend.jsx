// pages/ThisWeekend.jsx

import React, { useState, useEffect } from 'react';
import { fetchCurrentSession, fetchSessionResults } from '../api/openF1Api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CircuitMap from '../components/CircuitMap';

function ThisWeekend() {
    const [session, setSession] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const currentSession = await fetchCurrentSession().catch(() => null);
                setSession(currentSession);

                if (currentSession && currentSession.session_key) {
                    const sessionResults = await fetchSessionResults(currentSession.session_key);
                    setResults(sessionResults);
                }

                setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des données');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fallback data if API returns nothing for demo visualization
    const demoLapTimes = [
        { driver: 'HAM', lapTime: 96.5 },
        { driver: 'VER', lapTime: 95.7 },
        { driver: 'LEC', lapTime: 96.2 },
        { driver: 'SAI', lapTime: 96.8 },
        { driver: 'RUS', lapTime: 97.1 },
        { driver: 'PER', lapTime: 96.0 },
        { driver: 'ALO', lapTime: 97.3 },
        { driver: 'NOR', lapTime: 96.9 },
        { driver: 'GAS', lapTime: 98.1 },
        { driver: 'STR', lapTime: 98.6 },
    ];

    if (loading) return <div className="flex justify-center items-center h-64 text-2xl font-bold italic text-[var(--f1-white)]">Chargement des données...</div>;
    if (error) return <div className="text-[var(--f1-red)] text-center font-bold text-xl mt-10">{error}</div>;

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-[var(--f1-dark-gray)] rounded-tr-3xl rounded-bl-sm rounded-tl-sm rounded-br-sm p-8 border-l-4 border-[var(--f1-red)] shadow-2xl">
                <h2 className="text-4xl font-black mb-6 uppercase italic tracking-tighter text-[var(--f1-white)]">
                    {session ? `${session.meeting_name} - ${session.session_type}` : 'Aucune session en cours'}
                </h2>

                {session && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-2">
                        <div className="bg-[var(--f1-black)] p-4 rounded border border-[#333]">
                            <p className="text-xs text-[var(--f1-light-gray)] uppercase font-bold tracking-widest mb-1">Circuit</p>
                            <p className="font-bold text-xl text-[var(--f1-white)]">{session.circuit_short_name}</p>
                        </div>
                        <div className="bg-[var(--f1-black)] p-4 rounded border border-[#333]">
                            <p className="text-xs text-[var(--f1-light-gray)] uppercase font-bold tracking-widest mb-1">Date</p>
                            <p className="font-bold text-xl text-[var(--f1-white)]">{new Date(session.date).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-[var(--f1-black)] p-4 rounded border border-[#333]">
                            <p className="text-xs text-[var(--f1-light-gray)] uppercase font-bold tracking-widest mb-1">Heure</p>
                            <p className="font-bold text-xl text-[var(--f1-white)]">{new Date(session.date).toLocaleTimeString()}</p>
                        </div>
                        <div className="bg-[var(--f1-black)] p-4 rounded border border-[#333]">
                            <p className="text-xs text-[var(--f1-light-gray)] uppercase font-bold tracking-widest mb-1">Statut</p>
                            <p className="font-bold text-xl text-[var(--f1-red)]">{session.status || 'À venir'}</p>
                        </div>
                    </div>
                )}
            </div>

            {session ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Live Telemetry Map */}
                    <div className="col-span-1 lg:col-span-2">
                        <CircuitMap
                            year={new Date(session.date).getFullYear()}
                            race={session.circuit_short_name}
                            session="R"
                        />
                    </div>

                    <div className="bg-[var(--f1-dark-gray)] rounded-xl p-6 border-t-2 border-[var(--f1-red)] shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 uppercase italic text-[var(--f1-white)]">Temps (Simu)</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={demoLapTimes}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                                    <XAxis dataKey="driver" stroke="#999" tick={{ fill: '#ccc' }} />
                                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} stroke="#999" tick={{ fill: '#ccc' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#15151E', border: '1px solid #333', color: '#fff' }}
                                        formatter={(value) => [`${value} sec`, 'Temps']}
                                    />
                                    <Bar dataKey="lapTime" name="Meilleur temps" fill="#FF1801" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-[var(--f1-dark-gray)] rounded-xl p-6 border-t-2 border-[var(--f1-red)] shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 uppercase italic text-[var(--f1-white)]">Programme</h2>
                        <div className="space-y-4">
                            {/* Static Schedule for Demo */}
                            <div className="flex justify-between items-center border-b border-[#444] pb-3">
                                <span className="font-bold text-[var(--f1-white)]">Essais Libres 1</span>
                                <span className="text-[var(--f1-light-gray)]">Vendredi 14:00</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#444] pb-3">
                                <span className="font-bold text-[var(--f1-white)]">Essais Libres 2</span>
                                <span className="text-[var(--f1-light-gray)]">Vendredi 17:00</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#444] pb-3">
                                <span className="font-bold text-[var(--f1-white)]">Essais Libres 3</span>
                                <span className="text-[var(--f1-light-gray)]">Samedi 13:00</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#444] pb-3">
                                <span className="font-bold text-[var(--f1-white)]">Qualifications</span>
                                <span className="text-[var(--f1-light-gray)]">Samedi 16:00</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="font-black text-[var(--f1-red)] italic text-lg">COURSE</span>
                                <span className="text-[var(--f1-white)] font-bold">Dimanche 15:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center p-12 bg-[var(--f1-dark-gray)] rounded-xl border border-[#333]">
                    <p className="text-xl italic text-gray-400 mb-8">En attente du prochain Grand Prix...</p>
                    {/* Demo Fallback if no live session */}
                    <div className="mt-8 p-6 bg-[var(--f1-black)]/50 rounded-lg inline-block w-full max-w-4xl">
                        <h3 className="text-lg font-bold mb-6 text-[var(--f1-red)] uppercase tracking-widest">Visualisation Télémétrie</h3>
                        <CircuitMap year={2023} race="Bahrain" session="R" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ThisWeekend;
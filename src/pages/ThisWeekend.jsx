// pages/ThisWeekend.jsx

import React, { useState, useEffect } from 'react';
import { fetchCurrentSession, fetchSessionResults } from '../api/openF1Api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

    // Données de démonstration pour les temps au tour
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

    if (loading) return <div className="flex justify-center items-center h-64">Chargement des données...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">
                    {session ? `${session.meeting_name} - ${session.session_type}` : 'Aucune session en cours'}
                </h2>

                {session && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Circuit</p>
                            <p className="font-semibold">{session.circuit_short_name}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-semibold">{new Date(session.date).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Heure</p>
                            <p className="font-semibold">{new Date(session.date).toLocaleTimeString()}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Statut</p>
                            <p className="font-semibold">{session.status || 'À venir'}</p>
                        </div>
                    </div>
                )}

                {!session && (
                    <p className="text-center text-gray-500 my-8">
                        Aucune session n'est en cours actuellement. Consultez le calendrier pour voir les prochaines courses.
                    </p>
                )}
            </div>

            {session && (
                <>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Temps au tour les plus rapides</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={demoLapTimes}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="driver" />
                                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                                    <Tooltip formatter={(value) => [`${value} sec`, 'Temps']} />
                                    <Legend />
                                    <Bar dataKey="lapTime" name="Meilleur temps" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Programme du weekend</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Essais Libres 1</span>
                                    <span className="text-gray-600">Vendredi 14:00</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Essais Libres 2</span>
                                    <span className="text-gray-600">Vendredi 17:00</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Essais Libres 3</span>
                                    <span className="text-gray-600">Samedi 13:00</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Qualifications</span>
                                    <span className="text-gray-600">Samedi 16:00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Course</span>
                                    <span className="text-gray-600">Dimanche 15:00</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Informations sur le circuit</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Longueur</span>
                                    <span className="text-gray-600">5.303 km</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Tours</span>
                                    <span className="text-gray-600">58</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Distance totale</span>
                                    <span className="text-gray-600">307.574 km</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Record du tour</span>
                                    <span className="text-gray-600">1:14.415 (Hamilton, 2023)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Dernier vainqueur</span>
                                    <span className="text-gray-600">Max Verstappen (2023)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ThisWeekend;
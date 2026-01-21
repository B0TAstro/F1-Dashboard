// pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { fetchCurrentSession, fetchNextSession } from '../api/openF1Api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Home() {
    const [currentSession, setCurrentSession] = useState(null);
    const [nextSession, setNextSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const currentData = await fetchCurrentSession().catch(() => null);
                const nextData = await fetchNextSession().catch(() => null);

                setCurrentSession(currentData);
                setNextSession(nextData);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des données');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Données de démonstration pour le graphique
    const demoData = [
        { name: 'Australie', Hamilton: 25, Verstappen: 18, Leclerc: 15, Pérez: 12 },
        { name: 'Bahreïn', Hamilton: 18, Verstappen: 25, Leclerc: 15, Pérez: 10 },
        { name: 'Arabie S.', Hamilton: 15, Verstappen: 25, Leclerc: 18, Pérez: 12 },
        { name: 'Italie', Hamilton: 18, Verstappen: 25, Leclerc: 10, Pérez: 12 },
        { name: 'Miami', Hamilton: 25, Verstappen: 18, Leclerc: 15, Pérez: 10 },
    ];

    if (loading) return <div className="flex justify-center items-center h-64">Chargement des données...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Session en cours</h2>
                    {currentSession ? (
                        <div>
                            <p><span className="font-semibold">Grand Prix:</span> {currentSession.meeting_name}</p>
                            <p><span className="font-semibold">Circuit:</span> {currentSession.circuit_short_name}</p>
                            <p><span className="font-semibold">Type:</span> {currentSession.session_type}</p>
                            <p><span className="font-semibold">Date:</span> {new Date(currentSession.date).toLocaleDateString()}</p>
                        </div>
                    ) : (
                        <p>Aucune session en cours</p>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Prochaine session</h2>
                    {nextSession ? (
                        <div>
                            <p><span className="font-semibold">Grand Prix:</span> {nextSession.meeting_name}</p>
                            <p><span className="font-semibold">Circuit:</span> {nextSession.circuit_short_name}</p>
                            <p><span className="font-semibold">Type:</span> {nextSession.session_type}</p>
                            <p><span className="font-semibold">Date:</span> {new Date(nextSession.date).toLocaleDateString()}</p>
                        </div>
                    ) : (
                        <p>Aucune prochaine session trouvée</p>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Évolution du championnat</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={demoData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Hamilton" stroke="#3b82f6" />
                            <Line type="monotone" dataKey="Verstappen" stroke="#ef4444" />
                            <Line type="monotone" dataKey="Leclerc" stroke="#eab308" />
                            <Line type="monotone" dataKey="Pérez" stroke="#10b981" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Actualités F1</h2>
                    <div className="space-y-4">
                        <div className="pb-2 border-b">
                            <h3 className="font-semibold">Les nouveaux règlements 2025 dévoilés</h3>
                            <p className="text-gray-600">La FIA a présenté les changements majeurs pour la saison...</p>
                        </div>
                        <div className="pb-2 border-b">
                            <h3 className="font-semibold">Transfert de pilotes : qui va où ?</h3>
                            <p className="text-gray-600">Le marché des transferts s'anime avec plusieurs changements...</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">GP d'Australie : retour sur la course</h3>
                            <p className="text-gray-600">Une course mouvementée à Melbourne avec plusieurs rebondissements...</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Faits marquants de la saison</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Premier podium pour Piastri au GP de Monaco</li>
                        <li>Record de victoires consécutives pour Verstappen (9)</li>
                        <li>Retour de Ricciardo chez Red Bull Racing</li>
                        <li>Mercedes confirme son retour en forme avec 3 victoires</li>
                        <li>Ferrari révèle sa nouvelle stratégie pour 2026</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
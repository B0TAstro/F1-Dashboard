// pages/Standings.jsx

import React, { useState, useEffect } from 'react';
import { fetchDriverStandings, fetchConstructorStandings } from '../api/openF1Api';

function Standings() {
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [activeTab, setActiveTab] = useState('drivers');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const drivers = await fetchDriverStandings(2024);
                const constructors = await fetchConstructorStandings(2024);
                setDriverStandings(drivers);
                setConstructorStandings(constructors);
            } catch (err) {
                setError('Erreur lors de la récupération des classements');
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    
    return (
        <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6">Classement F1 - Saison 2024</h1>
                <div className="flex justify-center space-x-4 mb-6">
                    <button className={`px-4 py-2 text-lg rounded-lg transition-all ${activeTab === 'drivers' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`} onClick={() => setActiveTab('drivers')}>Pilotes</button>
                    <button className={`px-4 py-2 text-lg rounded-lg transition-all ${activeTab === 'constructors' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`} onClick={() => setActiveTab('constructors')}>Constructeurs</button>
                </div>
                {loading && <p className="text-gray-500">Chargement des classements...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <div className="overflow-hidden rounded-lg shadow-md">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-gray-600 font-medium">Pos</th>
                                    <th className="py-3 px-4 text-gray-600 font-medium">{activeTab === 'drivers' ? 'Pilote' : 'Écurie'}</th>
                                    <th className="py-3 px-4 text-gray-600 font-medium">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(activeTab === 'drivers' ? driverStandings : constructorStandings).map((entry, index) => (
                                    <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-900 font-semibold">{entry.position}</td>
                                        <td className="py-3 px-4 text-gray-700">{activeTab === 'drivers' ? entry.driver_name : entry.team_name}</td>
                                        <td className="py-3 px-4 text-gray-900 font-semibold text-right">{entry.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Standings;
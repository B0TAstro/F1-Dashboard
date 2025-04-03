// pages/Standings.jsx

import React, { useState, useEffect } from 'react';
import { fetchDriverStandings, fetchConstructorStandings } from '../api/openF1Api';

function Standings() {
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [activeTab, setActiveTab] = useState('drivers');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const drivers = await fetchDriverStandings(selectedYear);
                const constructors = await fetchConstructorStandings(selectedYear);
                setDriverStandings(drivers);
                setConstructorStandings(constructors);
            } catch (err) {
                setError('Erreur lors de la récupération des classements');
            }
            setLoading(false);
        };

        fetchData();
    }, [selectedYear]);

    const years = [2025, 2024, 2023, 2022, 2021, 2020];

    return (
        <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white p-4 rounded-lg shadow">
                <h1 className="text-2xl font-bold">Classements {selectedYear}</h1>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'drivers' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('drivers')}
                        >Pilotes</button>
                        <button
                            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'constructors' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('constructors')}
                        >Constructeurs</button>
                    </div>
                    <select
                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:border-red-500"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && <div className="flex justify-center items-center h-64 text-lg font-semibold">Chargement des classements...</div>}
            {error && <div className="text-red-500 text-center text-lg">{error}</div>}

            {!loading && !error && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pos</th>
                                {activeTab === 'drivers' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Numéro</th>}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{activeTab === 'drivers' ? 'Pilote' : 'Écurie'}</th>
                                {activeTab === 'drivers' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Écurie</th>}
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Points</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {(activeTab === 'drivers' ? driverStandings : constructorStandings).map((entry) => (
                                <tr key={entry.position} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 text-sm font-medium">{entry.position}</td>
                                    {activeTab === 'drivers' && <td className="px-6 py-4 text-sm text-gray-500">{entry.driver_number}</td>}
                                    <td className="px-6 py-4 text-sm font-medium">{activeTab === 'drivers' ? entry.driver_name : entry.team_name}</td>
                                    {activeTab === 'drivers' && <td className="px-6 py-4 text-sm text-gray-500">{entry.team_name}</td>}
                                    <td className="px-6 py-4 text-sm text-right font-bold">{entry.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Standings;

// pages/Standings.jsx

import React, { useState, useEffect } from 'react';
import { fetchDriverStandings, fetchConstructorStandings } from '../api/openF1Api';

function Standings() {
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [activeTab, setActiveTab] = useState('drivers');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Utilisation de données de démo car l'API peut ne pas avoir les classements complets
                setDriverStandings([
                    { position: 1, driver_number: 1, driver_name: 'Max Verstappen', team_name: 'Red Bull Racing', points: 345 },
                    { position: 2, driver_number: 11, driver_name: 'Sergio Pérez', team_name: 'Red Bull Racing', points: 225 },
                    { position: 3, driver_number: 44, driver_name: 'Lewis Hamilton', team_name: 'Mercedes', points: 187 },
                    { position: 4, driver_number: 16, driver_name: 'Charles Leclerc', team_name: 'Ferrari', points: 182 },
                    { position: 5, driver_number: 55, driver_name: 'Carlos Sainz', team_name: 'Ferrari', points: 178 },
                    { position: 6, driver_number: 4, driver_name: 'Lando Norris', team_name: 'McLaren', points: 160 },
                    { position: 7, driver_number: 63, driver_name: 'George Russell', team_name: 'Mercedes', points: 157 },
                    { position: 8, driver_number: 14, driver_name: 'Fernando Alonso', team_name: 'Aston Martin', points: 128 },
                    { position: 9, driver_number: 81, driver_name: 'Oscar Piastri', team_name: 'McLaren', points: 91 },
                    { position: 10, driver_number: 18, driver_name: 'Lance Stroll', team_name: 'Aston Martin', points: 65 },
                ]);

                setConstructorStandings([
                    { position: 1, team_name: 'Red Bull Racing', points: 570 },
                    { position: 2, team_name: 'Ferrari', points: 360 },
                    { position: 3, team_name: 'Mercedes', points: 344 },
                    { position: 4, team_name: 'McLaren', points: 251 },
                    { position: 5, team_name: 'Aston Martin', points: 193 },
                    { position: 6, team_name: 'Alpine', points: 45 },
                    { position: 7, team_name: 'Williams', points: 25 },
                    { position: 8, team_name: 'RB', points: 16 },
                    { position: 9, team_name: 'Haas F1 Team', points: 7 },
                    { position: 10, team_name: 'Kick Sauber', points: 0 },
                ]);

                setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des classements');
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedYear]);

    const years = [2025, 2024, 2023, 2022, 2021, 2020];

    if (loading) return <div className="flex justify-center items-center h-64">Chargement des classements...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold">Classements {selectedYear}</h1>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'drivers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('drivers')}
                        >
                            Pilotes
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'constructors' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('constructors')}
                        >
                            Constructeurs
                        </button>
                    </div>

                    <select
                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {activeTab === 'drivers' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pilote</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Écurie</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {driverStandings.map((driver) => (
                                <tr key={driver.driver_number}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{driver.position}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.driver_number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{driver.driver_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.team_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold">{driver.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Écurie</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {constructorStandings.map((team) => (
                                <tr key={team.team_name}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{team.position}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{team.team_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold">{team.points}</td>
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
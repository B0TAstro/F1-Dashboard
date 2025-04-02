// pages/Statistics.jsx

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Statistics() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('drivers');

    // Données de démonstration pour les statistiques
    const driverWins = [
        { name: 'Verstappen', value: 19 },
        { name: 'Hamilton', value: 4 },
        { name: 'Leclerc', value: 2 },
        { name: 'Pérez', value: 2 },
        { name: 'Russell', value: 1 },
        { name: 'Piastri', value: 1 },
        { name: 'Norris', value: 1 },
    ];

    const teamWins = [
        { name: 'Red Bull', value: 21 },
        { name: 'Mercedes', value: 5 },
        { name: 'Ferrari', value: 2 },
        { name: 'McLaren', value: 2 },
    ];

    const polePositions = [
        { name: 'Verstappen', value: 14 },
        { name: 'Leclerc', value: 5 },
        { name: 'Norris', value: 3 },
        { name: 'Hamilton', value: 3 },
        { name: 'Russell', value: 2 },
        { name: 'Pérez', value: 2 },
        { name: 'Sainz', value: 1 },
    ];

    const fastestLaps = [
        { name: 'VER', laps: 12 },
        { name: 'HAM', laps: 5 },
        { name: 'RUS', laps: 4 },
        { name: 'LEC', laps: 3 },
        { name: 'SAI', laps: 2 },
        { name: 'PER', laps: 2 },
        { name: 'NOR', laps: 1 },
        { name: 'PIA', laps: 1 },
    ];

    const pointsProgression = [
        { race: 'Bahreïn', Verstappen: 25, Hamilton: 18, Leclerc: 15, Pérez: 12 },
        { race: 'Arabie S.', Verstappen: 50, Hamilton: 30, Leclerc: 33, Pérez: 37 },
        { race: 'Australie', Verstappen: 75, Hamilton: 48, Leclerc: 40, Pérez: 37 },
        { race: 'Japon', Verstappen: 100, Hamilton: 60, Leclerc: 55, Pérez: 49 },
        { race: 'Chine', Verstappen: 118, Hamilton: 72, Leclerc: 67, Pérez: 53 },
        { race: 'Miami', Verstappen: 143, Hamilton: 84, Leclerc: 85, Pérez: 53 },
        { race: 'Émilie-R.', Verstappen: 169, Hamilton: 102, Leclerc: 91, Pérez: 65 },
        { race: 'Monaco', Verstappen: 194, Hamilton: 114, Leclerc: 109, Pérez: 65 },
        { race: 'Canada', Verstappen: 219, Hamilton: 126, Leclerc: 109, Pérez: 73 },
        { race: 'Espagne', Verstappen: 244, Hamilton: 144, Leclerc: 123, Pérez: 73 },
    ];

    const tyreUsage = [
        { team: 'Red Bull', soft: 45, medium: 35, hard: 20 },
        { team: 'Ferrari', soft: 50, medium: 30, hard: 20 },
        { team: 'Mercedes', soft: 40, medium: 40, hard: 20 },
        { team: 'McLaren', soft: 48, medium: 32, hard: 20 },
        { team: 'Aston Martin', soft: 42, medium: 38, hard: 20 },
    ];

    // Couleurs pour les graphiques
    const COLORS = ['#FF5252', '#4285F4', '#FBBC05', '#34A853', '#9C27B0', '#00BCD4', '#607D8B', '#FF9800'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold">Statistiques de la saison 2023</h1>

                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'drivers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} rounded-l-lg`}
                        onClick={() => setActiveTab('drivers')}
                    >
                        Pilotes
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'teams' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('teams')}
                    >
                        Équipes
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'races' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} rounded-r-lg`}
                        onClick={() => setActiveTab('races')}
                    >
                        Courses
                    </button>
                </div>
            </div>

            {activeTab === 'drivers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Victoires par pilote</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={driverWins}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {driverWins.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} victoires`, 'Victoires']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Poles positions</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={polePositions}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`${value} poles`, 'Poles']} />
                                    <Legend />
                                    <Bar dataKey="value" name="Poles" fill="#FF5252" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Tours les plus rapides</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={fastestLaps}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`${value} tours rapides`, 'Tours rapides']} />
                                    <Legend />
                                    <Bar dataKey="laps" name="Tours rapides" fill="#4285F4" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Progression des points</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={pointsProgression}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="race" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Verstappen" stroke="#FF5252" />
                                    <Line type="monotone" dataKey="Hamilton" stroke="#4285F4" />
                                    <Line type="monotone" dataKey="Leclerc" stroke="#FBBC05" />
                                    <Line type="monotone" dataKey="Pérez" stroke="#34A853" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'teams' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Victoires par équipe</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={teamWins}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {teamWins.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} victoires`, 'Victoires']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Utilisation des pneus</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={tyreUsage} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="team" type="category" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="soft" name="Soft" stackId="a" fill="#f87171" />
                                    <Bar dataKey="medium" name="Medium" stackId="a" fill="#facc15" />
                                    <Bar dataKey="hard" name="Hard" stackId="a" fill="#60a5fa" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
                        <h2 className="text-xl font-bold mb-4">Performance par circuit</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { circuit: "Bahreïn", RedBull: 95, Ferrari: 88, Mercedes: 80, McLaren: 78 },
                                        { circuit: "Jeddah", RedBull: 97, Ferrari: 85, Mercedes: 82, McLaren: 79 },
                                        { circuit: "Melbourne", RedBull: 93, Ferrari: 90, Mercedes: 85, McLaren: 84 },
                                        { circuit: "Suzuka", RedBull: 98, Ferrari: 86, Mercedes: 83, McLaren: 85 },
                                        { circuit: "Shanghai", RedBull: 94, Ferrari: 87, Mercedes: 88, McLaren: 83 }
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="circuit" />
                                    <YAxis domain={[75, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="RedBull" name="Red Bull" fill="#FF5252" />
                                    <Bar dataKey="Ferrari" name="Ferrari" fill="#FBBC05" />
                                    <Bar dataKey="Mercedes" name="Mercedes" fill="#4285F4" />
                                    <Bar dataKey="McLaren" name="McLaren" fill="#34A853" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'races' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Nombre de dépassements par circuit</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { circuit: "Bahreïn", overtakes: 45 },
                                        { circuit: "Jeddah", overtakes: 34 },
                                        { circuit: "Melbourne", overtakes: 18 },
                                        { circuit: "Suzuka", overtakes: 22 },
                                        { circuit: "Shanghai", overtakes: 38 },
                                        { circuit: "Miami", overtakes: 27 },
                                        { circuit: "Imola", overtakes: 15 },
                                        { circuit: "Monaco", overtakes: 8 }
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="circuit" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="overtakes" name="Dépassements" fill="#9C27B0" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Abandons par course</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { circuit: "Bahreïn", abandons: 2 },
                                        { circuit: "Jeddah", abandons: 1 },
                                        { circuit: "Melbourne", abandons: 4 },
                                        { circuit: "Suzuka", abandons: 0 },
                                        { circuit: "Shanghai", abandons: 2 },
                                        { circuit: "Miami", abandons: 3 },
                                        { circuit: "Imola", abandons: 1 },
                                        { circuit: "Monaco", abandons: 2 }
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="circuit" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="abandons" name="Abandons" fill="#FF9800" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
                        <h2 className="text-xl font-bold mb-4">Temps moyen d'arrêt au stand</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { team: "Red Bull", pitTime: 2.31 },
                                        { team: "Ferrari", pitTime: 2.42 },
                                        { team: "Mercedes", pitTime: 2.38 },
                                        { team: "McLaren", pitTime: 2.45 },
                                        { team: "Aston Martin", pitTime: 2.55 },
                                        { team: "Alpine", pitTime: 2.60 },
                                        { team: "Williams", pitTime: 2.65 },
                                        { team: "RB", pitTime: 2.58 },
                                        { team: "Haas", pitTime: 2.70 },
                                        { team: "Kick Sauber", pitTime: 2.72 }
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="team" />
                                    <YAxis domain={[2.2, 2.8]} />
                                    <Tooltip formatter={(value) => [`${value} sec`, 'Temps moyen']} />
                                    <Bar dataKey="pitTime" name="Temps d'arrêt" fill="#607D8B" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Statistics;
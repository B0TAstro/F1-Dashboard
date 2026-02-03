// pages/DriversStandings.jsx
import React, { useState, useEffect } from 'react';
import { fetchDriverStandings } from '../api/openF1Api';
import { F1_2026_DRIVERS, TEAM_COLORS } from '../constants/f1Data';
import PageHeader from '../components/PageHeader';

function DriversStandings() {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchDriverStandings(currentYear).catch(() => []);
                if (data.length > 0) {
                    setStandings(data);
                } else {
                    const fallback = F1_2026_DRIVERS
                        .map((d) => ({ ...d, points: 0, wins: 0 }))
                        .sort((a, b) => a.name.localeCompare(b.name));
                    setStandings(fallback);
                }
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        load();
    }, [currentYear]);

    if (loading) {
        return <div className="text-center text-xl font-bold text-white animate-pulse p-10">Chargement...</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <PageHeader title="Classement Pilotes" rightElement={`Saison ${currentYear}`} />

            <div className="bg-[#1f1f29] rounded-xl border border-[#333] overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#15151E] text-gray-400 text-xs uppercase tracking-widest">
                        <tr>
                            <th className="p-4 text-left">Pos</th>
                            <th className="p-4 text-left">Pilote</th>
                            <th className="p-4 text-left">Écurie</th>
                            <th className="p-4 text-center">Victoires</th>
                            <th className="p-4 text-right">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((driver, index) => (
                            <tr key={driver.code || index} className="border-t border-[#333] hover:bg-[#15151E] transition">
                                <td className="p-4">
                                    <span className={`text-2xl font-black ${index < 3 ? 'text-[var(--f1-red)]' : 'text-gray-500'}`}>
                                        {index + 1}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{driver.country}</span>
                                        <div>
                                            <p className="font-bold text-white">{driver.name || driver.driver_name}</p>
                                            <p className="text-xs text-gray-500">{driver.code}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span
                                        className="px-2 py-1 rounded text-sm font-bold"
                                        style={{
                                            backgroundColor: TEAM_COLORS[driver.team || driver.team_name] || '#333',
                                            color: '#fff'
                                        }}
                                    >
                                        {driver.team || driver.team_name}
                                    </span>
                                </td>
                                <td className="p-4 text-center text-white font-bold">{driver.wins || 0}</td>
                                <td className="p-4 text-right">
                                    <span className="text-2xl font-black text-white">{driver.points}</span>
                                    <span className="text-gray-500 text-sm ml-1">PTS</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DriversStandings;

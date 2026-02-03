// pages/ConstructorsStandings.jsx
import React, { useState, useEffect } from 'react';
import { fetchConstructorStandings } from '../api/openF1Api';
import { F1_2026_TEAMS } from '../constants/f1Data';
import PageHeader from '../components/PageHeader';

function ConstructorsStandings() {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchConstructorStandings(currentYear).catch(() => []);
                if (data.length > 0) {
                    setStandings(data);
                } else {
                    const fallback = F1_2026_TEAMS
                        .map((t) => ({ ...t, points: 0, wins: 0 }))
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
            <PageHeader title="Classement Constructeurs" rightElement={`Saison ${currentYear}`} />

            <div className="grid grid-cols-1 gap-4">
                {standings.map((team, index) => (
                    <div
                        key={team.name || index}
                        className="bg-[#1f1f29] rounded-xl p-6 border-l-4 flex items-center justify-between hover:bg-[#252530] transition"
                        style={{ borderLeftColor: team.color || '#FF1801' }}
                    >
                        <div className="flex items-center gap-6">
                            <span className={`text-4xl font-black ${index < 3 ? 'text-[var(--f1-red)]' : 'text-gray-500'}`}>
                                {index + 1}
                            </span>
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase">{team.name || team.team_name}</h3>
                                <p className="text-sm text-gray-500">{team.wins || 0} victoire(s)</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-black text-white">{team.points}</span>
                            <span className="text-gray-500 text-lg ml-2">PTS</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConstructorsStandings;

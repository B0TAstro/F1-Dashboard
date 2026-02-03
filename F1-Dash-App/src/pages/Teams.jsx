// pages/Teams.jsx
import React, { useState } from 'react';
import { F1_2026_TEAMS } from '../constants/f1Data';
import PageHeader from '../components/PageHeader';
import TeamCard from '../components/TeamCard';

function Teams() {
    const [currentYear] = useState(new Date().getFullYear());

    return (
        <div className="space-y-6 animate-fade-in-up">
            <PageHeader title="Écuries" subtitle={`Saison - ${currentYear}`} rightElement={currentYear} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {F1_2026_TEAMS.map((team) => (
                    <TeamCard key={team.name} team={team} />
                ))}
            </div>
        </div>
    );
}

export default Teams;

// components/StandingRow.jsx
import React from 'react';
import { TEAM_COLORS } from '../constants/f1Data';

export function DriverStandingRow({ driver, position, compact = false }) {
    return (
        <div className={`flex items-center justify-between bg-[#15151E] ${compact ? 'p-3' : 'p-4'} rounded-lg border-l-2 border-[var(--f1-red)]`}>
            <div className="flex items-center gap-4">
                <span className={`${compact ? 'text-xl' : 'text-2xl'} font-black text-gray-500 w-8`}>{position}</span>
                <div>
                    <p className={`font-bold text-white ${compact ? 'text-sm' : ''}`}>{driver.name || driver.driver_name}</p>
                    <p className="text-xs text-gray-500">{driver.team || driver.team_name}</p>
                </div>
            </div>
            <div className="text-right">
                <span className={`${compact ? 'text-lg' : 'text-xl'} font-black text-white`}>{driver.points}</span>
                <span className="text-gray-500 text-sm ml-1">PTS</span>
            </div>
        </div>
    );
}

export function ConstructorStandingRow({ team, position, compact = false }) {
    return (
        <div
            className={`flex items-center justify-between bg-[#15151E] ${compact ? 'p-3' : 'p-4'} rounded-lg`}
            style={{ borderLeft: `3px solid ${team.color || TEAM_COLORS[team.name] || '#FF1801'}` }}
        >
            <div className="flex items-center gap-4">
                <span className={`${compact ? 'text-xl' : 'text-2xl'} font-black text-gray-500 w-8`}>{position}</span>
                <p className={`font-bold text-white ${compact ? 'text-sm' : ''}`}>{team.name || team.team_name}</p>
            </div>
            <div className="text-right">
                <span className={`${compact ? 'text-lg' : 'text-xl'} font-black text-white`}>{team.points}</span>
                <span className="text-gray-500 text-sm ml-1">PTS</span>
            </div>
        </div>
    );
}

export default { DriverStandingRow, ConstructorStandingRow };

// components/TeamCard.jsx
import React from 'react';

export function TeamCard({ team, onClick }) {
    return (
        <div
            onClick={onClick}
            className="rounded-xl p-6 min-h-[160px] flex flex-col justify-between relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
            style={{
                background: `linear-gradient(135deg, ${team.gradientFrom} 0%, ${team.gradientTo} 100%)`
            }}
        >
            {/* Team Name */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                        {team.name}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                        {team.drivers.join(' | ')}
                    </p>
                </div>
                <span className="text-3xl">{team.country}</span>
            </div>

            {/* Placeholder for F1 Car Image */}
            <div className="mt-4 h-16 flex items-end justify-center opacity-60">
                <div className="text-white/40 text-xs italic">
                    🏎️ F1 2026 Car
                </div>
            </div>

            {/* Subtle overlay pattern */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
                    backgroundSize: '20px 20px'
                }}
            />
        </div>
    );
}

export default TeamCard;

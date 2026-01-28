// components/RaceCard.jsx
import React from 'react';

export function RaceCard({ race, isNext, raceNumber }) {
    const formatDateRange = (start, end) => {
        const s = new Date(start);
        const e = new Date(end || start);
        const startDay = s.getDate().toString().padStart(2, '0');
        const endDay = e.getDate().toString().padStart(2, '0');
        const month = s.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase();
        return `${startDay} - ${endDay} ${month}`;
    };

    return (
        <div className={`relative rounded-lg p-4 min-h-[120px] flex flex-col justify-between overflow-hidden ${isNext
                ? 'bg-gradient-to-br from-[#2a0a0a] to-[#15151E] border border-[var(--f1-red)]'
                : 'bg-gradient-to-br from-[#15151E] to-[#1f1f29] border border-[#333]'
            }`}>
            {/* Race Number Badge */}
            <div className="flex justify-between items-start">
                <span className={`text-xs font-bold px-2 py-1 rounded ${isNext ? 'bg-[var(--f1-red)] text-white' : 'bg-[#333] text-gray-400'}`}>
                    {raceNumber}
                </span>
                <span className="text-xs text-gray-500">
                    {formatDateRange(race.date_start, race.date_end)}
                </span>
            </div>

            {/* Race Name */}
            <div className="mt-auto">
                <p className="text-xs text-[var(--f1-red)] uppercase font-bold">{race.country_name}</p>
                <h3 className="text-lg font-black text-white uppercase leading-tight">
                    {race.meeting_name?.replace('Grand Prix', 'GP') || race.meeting_official_name}
                </h3>
            </div>
        </div>
    );
}

export default RaceCard;

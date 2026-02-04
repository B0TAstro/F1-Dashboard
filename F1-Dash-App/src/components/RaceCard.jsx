const COUNTRY_IMAGE_MAP = {
    'united states': 'usa',
    'great britain': 'uk',
    'united arab emirates': 'uae',
    'testing': 'pre-season-testing'
};

const formatDateRange = (start, end) => {
    const s = new Date(start);
    const e = new Date(end || start);
    const startDay = s.getDate().toString().padStart(2, '0');
    const endDay = e.getDate().toString().padStart(2, '0');
    const month = s.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase();
    return `${startDay} - ${endDay} ${month}`;
};

export function RaceCard({ race, isNext, isLive, raceNumber }) {
    const normalizedCountry = race.country_name?.toLowerCase();
    const isTesting = race.meeting_name?.toLowerCase().includes('test');
    let filename = isTesting ? COUNTRY_IMAGE_MAP['testing'] : (COUNTRY_IMAGE_MAP[normalizedCountry] || normalizedCountry.replace(/\s+/g, '-'));
    const imagePath = `/flags/${filename}.webp`;

    return (
        <div className={`relative rounded-lg p-4 min-h-40 flex flex-col justify-between overflow-hidden group ${isNext || isLive
            ? 'bg-linear-to-br from-[#2a0a0a] to-[#15151E] border border-(--f1-red)'
            : 'bg-linear-to-br from-[#15151E] to-[#1f1f29] border border-[#333]'
            }`}>

            <img
                src={imagePath}
                onError={(e) => { e.target.onerror = null; e.target.src = '/flags/placeholder.webp'; }}
                alt={race.country_name || 'Race Flag'}
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale transition-transform duration-500 group-hover:scale-110 pointer-events-none mix-blend-overlay"
            />

            <div className="relative z-10 flex justify-between items-start">
                <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${isLive
                    ? 'bg-(--f1-red) text-white animate-pulse'
                    : isNext
                        ? 'bg-(--f1-red) text-white'
                        : 'bg-[#333] text-gray-400'
                    }`}>
                    {isLive ? 'LIVE' : isNext ? 'NEXT' : raceNumber}
                </span>
                <span className="text-xs text-gray-500 font-mono">
                    {formatDateRange(race.date_start, race.date_end)}
                </span>
            </div>

            <div className="relative z-10 mt-auto">
                <h3 className="text-lg font-black text-white uppercase leading-tight">
                    {race.meeting_name?.replace('Grand Prix', 'GP') || race.meeting_official_name}
                </h3>
                <p className="text-xs text-(--f1-red) uppercase font-bold mt-1">
                    {race.country_name}
                </p>
            </div>
        </div>
    );
}

export default RaceCard;

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Calendar } from 'lucide-react';
import RaceCard from './RaceCard';

export default function NextRaces({ nextRaces, currentYear }) {
    const racesRef = useRef(null);

    useEffect(() => {
        if (racesRef.current) {
            gsap.fromTo(racesRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            );
        }
    }, []);

    const processedRaces = (() => {
        let raceCounter = 0;
        let testCounter = 0;

        return nextRaces.map((race, index) => {
            const now = new Date();
            const startDate = new Date(race.date_start);
            const endDate = new Date(race.meeting_end_date || race.date_end || startDate.getTime() + 3 * 24 * 60 * 60 * 1000);

            const isTesting = race.meeting_name.toLowerCase().includes('test');
            let label;

            if (isTesting) {
                testCounter++;
                label = `T${testCounter}`;
            } else {
                raceCounter++;
                label = `R${raceCounter}`;
            }

            const isLive = now >= startDate && now <= endDate;
            const isNext = index === 0;

            return { ...race, label, isLive, isNext };
        });
    })();

    return (
        <section className="bg-[#1f1f29] rounded-xl p-6 border border-[#333]">
            <h2 className="text-lg font-bold text-gray-400 flex items-center gap-2 mb-6">
                <Calendar className="w-4.5 h-4.5" />
                <p className="uppercase tracking-widest">Prochaines Courses</p>
            </h2>
            <div ref={racesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {processedRaces.length > 0 ? (
                    processedRaces.map((race, index) => (
                        <RaceCard
                            key={race.meeting_key || index}
                            race={race}
                            isNext={race.isNext}
                            isLive={race.isLive}
                            raceNumber={race.label}
                        />
                    ))
                ) : (
                    <div className="col-span-full bg-linear-to-br from-[#15151E] to-[#1f1f29] rounded-lg p-8 border border-dashed border-[#444] flex flex-col items-center justify-center min-h-30 text-center">
                        <span className="text-gray-400 font-bold text-lg mb-1">Calendrier {currentYear} indisponible pour le moment</span>
                        <span className="text-gray-600 italic text-sm">Les données de la saison à venir seront bientôt disponibles</span>
                    </div>
                )}
            </div>
        </section>
    );
}

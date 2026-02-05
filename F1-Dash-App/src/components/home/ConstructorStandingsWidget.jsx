import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Car, ChevronRight } from 'lucide-react';
import { ConstructorStandingRow } from '../StandingRow';

export default function ConstructorStandingsWidget({ teams }) {
    const standingsRef = useRef(null);

    useEffect(() => {
        if (standingsRef.current) {
            gsap.fromTo(standingsRef.current.children,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out', delay: 0.4 }
            );
        }
    }, [teams]);

    return (
        <section className="bg-[#1f1f29] rounded-xl p-6 border border-[#333]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-400 flex items-center gap-2">
                    <Car className="w-5 h-5" /> <span className="uppercase tracking-widest">Championnat Constructeurs</span>
                </h2>
                <Link to="/standings/constructors" className="text-(--f1-red) text-sm font-bold hover:underline flex items-center gap-1">
                    Tout voir <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
            <div ref={standingsRef} className="space-y-3">
                {teams.map((team, index) => (
                    <ConstructorStandingRow key={team.name || index} team={team} position={index + 1} compact />
                ))}
            </div>
        </section>
    );
}

// pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { fetchMeetings, fetchDriverStandings, fetchConstructorStandings } from '../api/openF1Api';
import { F1_2026_TEAMS, F1_2026_DRIVERS } from '../constants/f1Data';
import PageHeader from '../components/PageHeader';
import RaceCard from '../components/RaceCard';
import { DriverStandingRow, ConstructorStandingRow } from '../components/StandingRow';
import gsap from 'gsap';

function Home() {
    const [lastRaces, setLastRaces] = useState([]);
    const [nextRace, setNextRace] = useState(null);
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentYear] = useState(new Date().getFullYear());

    // Refs for GSAP
    const headerRef = useRef(null);
    const newsRef = useRef(null);
    const racesRef = useRef(null);
    const standingsRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch last 3 races from previous year
                const prevYearMeetings = await fetchMeetings(currentYear - 1).catch(() => []);
                const pastMeetings = prevYearMeetings
                    .filter(m => new Date(m.date_start) < new Date())
                    .sort((a, b) => new Date(b.date_start) - new Date(a.date_start))
                    .slice(0, 3)
                    .reverse();
                setLastRaces(pastMeetings);

                // Fetch next race from current year
                const currentYearMeetings = await fetchMeetings(currentYear).catch(() => []);
                const futureMeetings = currentYearMeetings
                    .filter(m => new Date(m.date_start) > new Date())
                    .sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
                setNextRace(futureMeetings[0] || null);

                // Fetch Standings
                const drivers = await fetchDriverStandings(currentYear).catch(() => []);
                const constructors = await fetchConstructorStandings(currentYear).catch(() => []);

                if (drivers.length > 0) {
                    setDriverStandings(drivers.slice(0, 4));
                } else {
                    const fallbackDrivers = F1_2026_DRIVERS
                        .map((d) => ({ ...d, points: 0 }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .slice(0, 4);
                    setDriverStandings(fallbackDrivers);
                }

                if (constructors.length > 0) {
                    setConstructorStandings(constructors.slice(0, 4));
                } else {
                    const fallbackTeams = F1_2026_TEAMS
                        .map((t) => ({ ...t, points: 0 }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .slice(0, 4);
                    setConstructorStandings(fallbackTeams);
                }
            } catch (err) {
                console.error('Error loading home data:', err);
            }
            setLoading(false);
        };
        loadData();
    }, [currentYear]);

    // GSAP Animation
    useEffect(() => {
        if (!loading) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            if (headerRef.current) {
                tl.fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
            }
            if (newsRef.current) {
                tl.fromTo(newsRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.4");
            }
            if (racesRef.current) {
                tl.fromTo(racesRef.current.children,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
                    "-=0.2"
                );
            }
            if (standingsRef.current) {
                tl.fromTo(standingsRef.current.children,
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2 },
                    "-=0.2"
                );
            }
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="text-2xl font-bold italic text-white animate-pulse">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            <div ref={headerRef}>
                <PageHeader title="Accueil" rightElement={currentYear} />
            </div>

            {/* LATEST NEWS MINI-SECTION */}
            <div ref={newsRef} className="bg-gradient-to-r from-[#1f1f29] to-transparent border-l-4 border-[var(--f1-red)] p-4 rounded-r-xl">
                <h3 className="text-sm font-bold text-[var(--f1-red)] uppercase tracking-widest mb-1">Dernières News</h3>
                <p className="text-white italic text-lg">
                    "La saison {currentYear} s'annonce explosive avec les nouvelles réglementations techniques qui rebattent les cartes !"
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500 font-mono">
                    <span>Source: F1 Insider</span>
                    <span>•</span>
                    <span>Il y a 2h</span>
                </div>
            </div>

            {/* RACES GRID */}
            <section className="bg-[#1f1f29] rounded-xl p-6 border border-[#333]">
                <h2 className="text-lg font-bold text-gray-400 mb-4 flex items-center gap-2">
                    🏁 <span className="uppercase tracking-widest">Dernières Courses</span>
                </h2>
                <div ref={racesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {lastRaces.map((race, index) => (
                        <RaceCard key={race.meeting_key || index} race={race} isNext={false} raceNumber={`R${index + 1}`} />
                    ))}
                    {nextRace ? (
                        <RaceCard race={nextRace} isNext={true} raceNumber="NEXT" />
                    ) : (
                        <div className="bg-gradient-to-br from-[#15151E] to-[#1f1f29] rounded-lg p-4 border border-dashed border-[#444] flex items-center justify-center min-h-[120px]">
                            <span className="text-gray-500 italic">Calendrier 2026 à venir...</span>
                        </div>
                    )}
                </div>
            </section>

            {/* STANDINGS GRID */}
            <div ref={standingsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-[#1f1f29] rounded-xl p-6 border border-[#333]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-400 flex items-center gap-2">
                            🏆 <span className="uppercase tracking-widest">Championnat Pilotes</span>
                        </h2>
                        <span className="text-[var(--f1-red)] text-sm font-bold cursor-pointer hover:underline">Tout voir →</span>
                    </div>
                    <div className="space-y-3">
                        {driverStandings.map((driver, index) => (
                            <DriverStandingRow key={driver.code || index} driver={driver} position={index + 1} compact />
                        ))}
                    </div>
                </section>

                <section className="bg-[#1f1f29] rounded-xl p-6 border border-[#333]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-400 flex items-center gap-2">
                            🏎️ <span className="uppercase tracking-widest">Championnat Constructeurs</span>
                        </h2>
                        <span className="text-[var(--f1-red)] text-sm font-bold cursor-pointer hover:underline">Tout voir →</span>
                    </div>
                    <div className="space-y-3">
                        {constructorStandings.map((team, index) => (
                            <ConstructorStandingRow key={team.name || index} team={team} position={index + 1} compact />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
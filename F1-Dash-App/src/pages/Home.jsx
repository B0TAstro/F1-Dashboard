// pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchMeetings, fetchDriverStandings, fetchConstructorStandings } from '../api/openF1Api';
import { F1_2026_TEAMS, F1_2026_DRIVERS } from '../constants/f1Data';
import RaceCard from '../components/RaceCard';
import { DriverStandingRow, ConstructorStandingRow } from '../components/StandingRow';
import gsap from 'gsap';

function Home() {
    const [upcomingRaces, setUpcomingRaces] = useState([]);
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentYear] = useState(new Date().getFullYear());

    // Refs for GSAP
    const newsRef = useRef(null);
    const racesRef = useRef(null);
    const standingsRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch races for current year (2026)
                const meetings = await fetchMeetings(currentYear).catch(() => []);
                const futureMeetings = meetings
                    .filter(m => {
                        const endDate = new Date(m.meeting_end_date || m.date_end || new Date(m.date_start).getTime() + 3 * 24 * 60 * 60 * 1000);
                        return endDate > new Date();
                    }) // Future or Active races
                    .sort((a, b) => new Date(a.date_start) - new Date(b.date_start)) // Sort by date ascending
                    .slice(0, 4); // Take next 4 races

                setUpcomingRaces(futureMeetings);

                // Fetch Standings
                // Always try 2026 first. OpenF1 usually returns empty or error if season hasn't started.
                let drivers = await fetchDriverStandings(currentYear).catch(() => []);
                let constructors = await fetchConstructorStandings(currentYear).catch(() => []);

                // If empty or error, use fallback with 0 points
                if (!drivers || drivers.length === 0) {
                    const fallbackDrivers = F1_2026_DRIVERS
                        .map((d) => ({ ...d, points: 0 }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .slice(0, 5); // Top 5
                    setDriverStandings(fallbackDrivers);
                } else {
                    setDriverStandings(drivers.slice(0, 5));
                }

                if (!constructors || constructors.length === 0) {
                    const fallbackTeams = F1_2026_TEAMS
                        .map((t) => ({ ...t, points: 0 }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .slice(0, 5); // Top 5
                    setConstructorStandings(fallbackTeams);
                } else {
                    setConstructorStandings(constructors.slice(0, 5));
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

            if (newsRef.current) {
                tl.fromTo(newsRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 });
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
        <div className="space-y-8 pb-10 pt-4">

            {/* LATEST NEWS MINI-SECTION - MOCK */}
            <div ref={newsRef} className="bg-gradient-to-r from-[#1f1f29] to-transparent border-l-4 border-[var(--f1-red)] p-4 rounded-r-xl relative overflow-hidden group">
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase rounded border border-yellow-500/30">Mock Data</div>
                <h3 className="text-sm font-bold text-[var(--f1-red)] uppercase tracking-widest mb-1">À la une</h3>
                <p className="text-white italic text-lg md:text-xl">
                    "La saison {currentYear} s'annonce explosive avec les nouvelles réglementations techniques qui rebattent les cartes !"
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500 font-mono">
                    <span>Source: F1 Insider</span>
                    <span>•</span>
                    <span>Il y a 2h</span>
                </div>
            </div>

            {/* UPCOMING RACES GRID */}
            <section className="bg-[#1f1f29] rounded-xl p-6 border border-[#333]">
                <h2 className="text-lg font-bold text-gray-400 mb-4 flex items-center gap-2">
                    🗓️ <span className="uppercase tracking-widest">Prochaines Courses</span>
                </h2>
                <div ref={racesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {upcomingRaces.length > 0 ? (
                        (() => {
                            let raceCounter = 0;
                            let testCounter = 0;

                            return upcomingRaces.map((race, index) => {
                                const now = new Date();
                                const startDate = new Date(race.date_start);
                                const endDate = new Date(race.meeting_end_date || race.date_end || startDate.getTime() + 3 * 24 * 60 * 60 * 1000); // Fallback to +3 days if no end date

                                const isTesting = race.meeting_name.toLowerCase().includes('test');
                                let label;

                                if (isTesting) {
                                    testCounter++;
                                    label = `T${testCounter}`;
                                } else {
                                    raceCounter++;
                                    label = `R${raceCounter}`;
                                }

                                const isLive = index === 0 || (now >= startDate && now <= endDate); // DEBUG: Force first race LIVE
                                const isNext = index === 0;

                                return (
                                    <RaceCard
                                        key={race.meeting_key || index}
                                        race={race}
                                        isNext={isNext}
                                        isLive={isLive}
                                        raceNumber={label}
                                    />
                                );
                            });
                        })()
                    ) : (
                        <div className="col-span-full bg-gradient-to-br from-[#15151E] to-[#1f1f29] rounded-lg p-8 border border-dashed border-[#444] flex flex-col items-center justify-center min-h-[120px] text-center">
                            <span className="text-gray-400 font-bold text-lg mb-1">Calendrier {currentYear} indisponible pour le moment.</span>
                            <span className="text-gray-600 italic text-sm">Les données de la saison à venir seront bientôt disponibles.</span>
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
                        <Link to="/standings/drivers" className="text-[var(--f1-red)] text-sm font-bold hover:underline">
                            Tout voir →
                        </Link>
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
                        <Link to="/standings/constructors" className="text-[var(--f1-red)] text-sm font-bold hover:underline">
                            Tout voir →
                        </Link>
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
import React, { useState, useEffect } from 'react';
import { fetchMeetings, fetchDriverStandings, fetchConstructorStandings } from '../api/openF1Api';
import { F1_2026_TEAMS, F1_2026_DRIVERS } from '../constants/f1Data';
import LatestNews from '../components/home/LatestNews';
import NextRaces from '../components/home/NextRaces';
import DriverStandingsWidget from '../components/home/DriverStandingsWidget';
import ConstructorStandingsWidget from '../components/home/ConstructorStandingsWidget';

function Home() {
    const [upcomingRaces, setUpcomingRaces] = useState([]);
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const meetings = await fetchMeetings(currentYear).catch(() => []);
                const futureMeetings = meetings
                    .filter(m => {
                        const endDate = new Date(m.meeting_end_date || m.date_end || new Date(m.date_start).getTime() + 3 * 24 * 60 * 60 * 1000);
                        return endDate > new Date();
                    })
                    .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
                    .slice(0, 4);

                setUpcomingRaces(futureMeetings);

                let drivers = await fetchDriverStandings(currentYear).catch(() => []);
                if (!drivers || drivers.length === 0) {
                    const fallbackDrivers = F1_2026_DRIVERS
                        .map((d) => ({ ...d, points: 0 }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .slice(0, 5);
                    setDriverStandings(fallbackDrivers);
                } else {
                    setDriverStandings(drivers.slice(0, 5));
                }

                let constructors = await fetchConstructorStandings(currentYear).catch(() => []);
                if (!constructors || constructors.length === 0) {
                    const fallbackTeams = F1_2026_TEAMS
                        .map((t) => ({ ...t, points: 0 }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .slice(0, 5);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="text-2xl font-bold italic text-white animate-pulse">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10 pt-4">
            <LatestNews currentYear={currentYear} />

            <NextRaces nextRaces={upcomingRaces} currentYear={currentYear} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DriverStandingsWidget drivers={driverStandings} />
                <ConstructorStandingsWidget teams={constructorStandings} />
            </div>
        </div>
    );
}

export default Home;
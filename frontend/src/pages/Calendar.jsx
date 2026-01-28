// pages/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { fetchMeetings } from '../api/openF1Api';
import PageHeader from '../components/PageHeader';

function Calendar() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                let data = await fetchMeetings(currentYear).catch(() => []);
                if (data.length === 0) {
                    data = await fetchMeetings(currentYear - 1).catch(() => []);
                }
                data.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
                setMeetings(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        load();
    }, [currentYear]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }).toUpperCase();
    };

    const isPast = (dateStr) => new Date(dateStr) < new Date();
    const isNextRace = (meetings, index) => {
        if (index === 0) return !isPast(meetings[0].date_start);
        return isPast(meetings[index - 1].date_start) && !isPast(meetings[index].date_start);
    };

    if (loading) {
        return <div className="text-center text-xl font-bold text-white animate-pulse p-10">Chargement du calendrier...</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <PageHeader title={`Calendrier ${currentYear}`} rightElement={`${meetings.length} GP`} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {meetings.map((meeting, index) => {
                    const past = isPast(meeting.date_start);
                    const next = isNextRace(meetings, index);

                    return (
                        <div
                            key={meeting.meeting_key || index}
                            className={`rounded-xl p-4 border transition-all ${next
                                    ? 'border-[var(--f1-red)] bg-gradient-to-br from-[#2a0a0a] to-[#15151E]'
                                    : past
                                        ? 'border-[#333] bg-[#15151E] opacity-60'
                                        : 'border-[#333] bg-[#1f1f29] hover:border-[#555]'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${next ? 'bg-[var(--f1-red)] text-white' : 'bg-[#333] text-gray-400'
                                    }`}>
                                    R{index + 1}
                                </span>
                                <span className="text-xs text-gray-500">{formatDate(meeting.date_start)}</span>
                            </div>

                            <p className="text-xs text-[var(--f1-red)] uppercase font-bold">{meeting.country_name}</p>
                            <h3 className="text-lg font-black text-white uppercase leading-tight">
                                {meeting.meeting_name?.replace('Grand Prix', 'GP') || meeting.meeting_official_name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-2">{meeting.circuit_short_name}</p>

                            {next && (
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[var(--f1-red)] rounded-full animate-pulse"></span>
                                    <span className="text-xs text-[var(--f1-red)] font-bold uppercase">Prochaine course</span>
                                </div>
                            )}
                            {past && <p className="text-xs text-gray-500 mt-2 italic">Terminé</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;

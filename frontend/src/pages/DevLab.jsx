// pages/DevLab.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

function DevLab() {
    const [activeTab, setActiveTab] = useState('openf1');
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    // FastF1 State
    const [telemetryData, setTelemetryData] = useState(null);
    const [driver, setDriver] = useState('VER');

    // Generic OpenF1 Fetcher
    const fetchOpenF1 = async (endpoint, params = {}) => {
        setLoading(true);
        try {
            // Using a simple proxy or direct call if allowed. OpenF1 allows CORS usually.
            // Construct query string
            const query = new URLSearchParams(params).toString();
            const url = `https://api.openf1.org/v1/${endpoint}?${query}`;
            const res = await axios.get(url);
            setApiResponse(res.data.slice(0, 5)); // Limit to 5 items for display
        } catch (err) {
            setApiResponse({ error: err.message });
        }
        setLoading(false);
    };

    // FastF1 Fetcher
    const fetchFastF1Telemetry = async () => {
        setLoading(true);
        try {
            // Hardcoded demo session (Bahrain 2023) because we know it exists
            const res = await axios.get(`http://localhost:8000/api/lap_telemetry/2023/Bahrain/R/${driver}`);
            setTelemetryData(res.data);
        } catch (err) {
            console.error(err);
            setTelemetryData(null);
            alert("Erreur Backend: Assurez-vous que le serveur Python tourne (port 8000)");
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-[var(--f1-white)]">
                Dev<span className="text-[var(--f1-red)]">Lab</span> 🧪
            </h1>
            <p className="text-gray-400">Zone d'expérimentation pour explorer les capacités des API.</p>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-[#333] pb-4">
                <button
                    onClick={() => setActiveTab('openf1')}
                    className={`px-4 py-2 font-bold uppercase ${activeTab === 'openf1' ? 'text-[var(--f1-red)] border-b-2 border-[var(--f1-red)]' : 'text-gray-500'}`}
                >
                    Test OpenF1 (Data)
                </button>
                <button
                    onClick={() => setActiveTab('fastf1')}
                    className={`px-4 py-2 font-bold uppercase ${activeTab === 'fastf1' ? 'text-[var(--f1-red)] border-b-2 border-[var(--f1-red)]' : 'text-gray-500'}`}
                >
                    Test FastF1 (Advanced Viz)
                </button>
            </div>

            {/* OPENF1 CONTENT */}
            {activeTab === 'openf1' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white uppercase italic">Endpoints Disponibles</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => fetchOpenF1('drivers', { session_key: 'latest' })} className="api-btn">Drivers (Latest)</button>
                            <button onClick={() => fetchOpenF1('sessions', { year: 2024 })} className="api-btn">Sessions (2024)</button>
                            <button onClick={() => fetchOpenF1('laps', { session_key: 'latest', driver_number: 1 })} className="api-btn">Laps (Verstappen)</button>
                            <button onClick={() => fetchOpenF1('intervals', { session_key: 'latest', interval_type: 'gap' })} className="api-btn">Intervals</button>
                            <button onClick={() => fetchOpenF1('car_data', { session_key: 'latest', driver_number: 1 })} className="api-btn">Car Data (Raw)</button>
                            <button onClick={() => fetchOpenF1('weather', { session_key: 'latest' })} className="api-btn">Weather</button>
                            <button onClick={() => fetchOpenF1('race_control', { session_key: 'latest' })} className="api-btn">Race Control (Flags)</button>
                            <button onClick={() => fetchOpenF1('pit', { session_key: 'latest' })} className="api-btn">Pit Stops</button>
                        </div>
                    </div>

                    <div className="bg-[#1f1f29] p-4 rounded-lg overflow-auto max-h-[500px] border border-[#333] font-mono text-xs">
                        {loading && <div className="text-[var(--f1-red)] animate-pulse">Fetching connection...</div>}
                        {!loading && apiResponse && (
                            <pre className="text-green-400">
                                {JSON.stringify(apiResponse, null, 2)}
                            </pre>
                        )}
                        {!loading && !apiResponse && <div className="text-gray-500 italic">Cliquez sur un bouton pour voir la structure JSON.</div>}
                    </div>
                </div>
            )}

            {/* FASTF1 CONTENT */}
            {activeTab === 'fastf1' && (
                <div className="space-y-8">
                    <div className="bg-[#1f1f29] p-6 rounded-xl border-l-4 border-[var(--f1-red)]">
                        <h3 className="text-2xl font-bold text-white uppercase italic mb-4">FastF1 Capabilities</h3>
                        <p className="text-gray-400 mb-6">
                            FastF1 est une librairie Python puissante qui permet l'accès à la télémétrie complète, pas seulement aux temps au tour.
                            Voici une démonstration de ce qu'on peut récupérer : <strong>Vitesse, RPM, Rapport de boîte, Freinage, Accélération</strong>.
                        </p>

                        <div className="flex gap-4 items-center mb-6">
                            <select
                                value={driver}
                                onChange={(e) => setDriver(e.target.value)}
                                className="bg-black text-white p-2 rounded border border-[#333]"
                            >
                                <option value="VER">Verstappen</option>
                                <option value="HAM">Hamilton</option>
                                <option value="LEC">Leclerc</option>
                                <option value="ALO">Alonso</option>
                            </select>
                            <button
                                onClick={fetchFastF1Telemetry}
                                className="bg-[var(--f1-red)] text-white px-6 py-2 rounded font-bold uppercase hover:bg-red-700 transition"
                            >
                                Charger Télémétrie (Bahrain 2023)
                            </button>
                        </div>
                    </div>

                    {loading && <div className="text-center text-xl font-bold animate-pulse">Chargement de la télémétrie lourde (Python)...</div>}

                    {telemetryData && (
                        <div className="space-y-6">
                            {/* SPEED TRACE */}
                            <div className="bg-[#15151E] p-4 rounded-xl border border-[#333] shadow-lg">
                                <h4 className="text-lg font-bold text-white mb-2">Speed Trace (km/h)</h4>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={telemetryData.data}>
                                            <defs>
                                                <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={telemetryData.color || "#FF1801"} stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor={telemetryData.color || "#FF1801"} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                            <XAxis dataKey="Distance" stroke="#666" />
                                            <YAxis stroke="#666" domain={[0, 350]} />
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                            <Area type="monotone" dataKey="Speed" stroke={telemetryData.color || "#FF1801"} fillOpacity={1} fill="url(#colorSpeed)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* RPM & GEAR TRACE */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-[#15151E] p-4 rounded-xl border border-[#333] shadow-lg">
                                    <h4 className="text-lg font-bold text-white mb-2">RPM & Gear</h4>
                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={telemetryData.data}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                                <XAxis dataKey="Distance" hide />
                                                <YAxis yAxisId="left" stroke="#8884d8" domain={[0, 13000]} />
                                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 8]} />
                                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                                <Line yAxisId="left" type="monotone" dataKey="RPM" stroke="#8884d8" dot={false} strokeWidth={2} />
                                                <Line yAxisId="right" type="step" dataKey="Gear" stroke="#82ca9d" dot={false} strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-[#15151E] p-4 rounded-xl border border-[#333] shadow-lg">
                                    <h4 className="text-lg font-bold text-white mb-2">Pedal Inputs (Throttle vs Brake)</h4>
                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={telemetryData.data}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                                <XAxis dataKey="Distance" hide />
                                                <YAxis domain={[0, 110]} />
                                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                                <Area type="step" dataKey="Throttle" stackId="1" stroke="#00ff00" fill="#00ff00" fillOpacity={0.3} />
                                                <Area type="step" dataKey="Brake" stackId="2" stroke="#ff0000" fill="#ff0000" fillOpacity={0.3} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                .api-btn {
                    background-color: #38383F;
                    color: white;
                    padding: 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    text-transform: uppercase;
                    transition: all 0.2s;
                }
                .api-btn:hover {
                    background-color: #FF1801;
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
}

export default DevLab;

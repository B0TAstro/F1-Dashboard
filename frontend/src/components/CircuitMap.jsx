import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const CircuitMap = ({ year, race, session = 'R' }) => {
    const [telemetry, setTelemetry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    // Scaling factors
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchTelemetry = async () => {
            try {
                setLoading(true);
                // Default to a known race if parameters are missing for demo
                const y = year || 2023;
                const r = race || 'Bahrain';

                // Call the Python backend
                const response = await axios.get(`http://localhost:8000/api/telemetry/${y}/${r}/${session}`);
                setTelemetry(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch telemetry", err);
                setError("Impossible de charger la télémétrie. Vérifiez que le backend Python tourne.");
                setLoading(false);
            }
        };

        fetchTelemetry();
    }, [year, race, session]);

    useEffect(() => {
        if (!telemetry || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Calculate bounding box of the track to scale it
        // Using the first driver's telemetry path as the track reference roughly
        // Or preferably use circuit_info if available (corners)
        // Let's use the first driver's path to determine bounds
        if (telemetry.drivers.length > 0) {
            const allPoints = telemetry.drivers.flatMap(d => d.telemetry);
            const minX = Math.min(...allPoints.map(p => p.X));
            const maxX = Math.max(...allPoints.map(p => p.X));
            const minY = Math.min(...allPoints.map(p => p.Y));
            const maxY = Math.max(...allPoints.map(p => p.Y));

            const trackWidth = maxX - minX;
            const trackHeight = maxY - minY;

            const padding = 50;
            const scaleX = (width - padding * 2) / trackWidth;
            const scaleY = (height - padding * 2) / trackHeight;
            const s = Math.min(scaleX, scaleY);

            setScale(s);
            setOffset({
                x: padding - minX * s + (width - padding * 2 - trackWidth * s) / 2,
                y: padding - minY * s + (height - padding * 2 - trackHeight * s) / 2
            });
        }

    }, [telemetry]);

    // Animation Loop
    useEffect(() => {
        if (!telemetry || !canvasRef.current) return;

        let startTime = null;
        const duration = 90000; // 90 seconds loop (approx lap time)

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) % duration;
            const percentage = progress / duration; // 0 to 1

            const ctx = canvasRef.current.getContext('2d');
            const width = canvasRef.current.width;
            const height = canvasRef.current.height;

            // Clear
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#15151E'; // F1 Black bg
            ctx.fillRect(0, 0, width, height);

            // Draw Track (Static from one driver's full path)
            if (telemetry.drivers.length > 0) {
                const trackDriver = telemetry.drivers[0]; // Use winner or first driver
                ctx.beginPath();
                ctx.strokeStyle = '#38383F';
                ctx.lineWidth = 5;

                trackDriver.telemetry.forEach((point, i) => {
                    const x = point.X * scale + offset.x;
                    // Invert Y because canvas Y is down, coordinates usually Y up
                    // But actually FastF1 X/Y might be rotated. Let's just plot.
                    // Usually Y needs inversion if mapping to screen coords directly
                    const y = height - (point.Y * scale + offset.y);

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.stroke();
            }

            // Draw Drivers (Dots)
            telemetry.drivers.forEach(driver => {
                // Find current position based on time/percentage
                // This is a simplified "replay" where all cars start at t=0 of their fastest lap
                // In reality, they are offset. But for "visualizing dots moving", this is fine.

                const totalPoints = driver.telemetry.length;
                const index = Math.floor(percentage * totalPoints); // Simple index mapping
                const point = driver.telemetry[Math.min(index, totalPoints - 1)];

                if (point) {
                    const x = point.X * scale + offset.x;
                    const y = height - (point.Y * scale + offset.y);

                    ctx.beginPath();
                    ctx.fillStyle = '#' + (driver.color || 'FFFFFF');
                    ctx.arc(x, y, 6, 0, Math.PI * 2);
                    ctx.fill();

                    // Label
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 12px "Titillium Web"';
                    ctx.fillText(driver.driver, x + 8, y + 4);
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [telemetry, scale, offset]);


    if (loading) return <div className="text-white text-center p-10">Chargement de la télémétrie (FastF1)...</div>;
    if (error) return <div className="text-red-500 text-center p-10">{error}</div>;

    return (
        <div className="bg-[#15151E] rounded-xl p-4 shadow-lg border-2 border-[#FF1801]">
            <h3 className="text-white text-xl mb-4 font-bold italic uppercase">{dataLabel(year, race)}</h3>
            <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full h-auto bg-[#15151E] rounded-lg"
            />
            <p className="text-gray-400 text-sm mt-2 text-center italic">Données simulées basées sur les meilleurs tours (FastF1)</p>
        </div>
    );
};

const dataLabel = (y, r) => y && r ? `Circuit - ${r} ${y}` : "Circuit Télémétrie";

export default CircuitMap;

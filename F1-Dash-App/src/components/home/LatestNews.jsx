import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Newspaper } from 'lucide-react';

export default function LatestNews({ currentYear }) {
    const newsRef = useRef(null);

    useEffect(() => {
        if (newsRef.current) {
            gsap.fromTo(newsRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
            );
        }
    }, []);

    return (
        <div ref={newsRef} className="bg-linear-to-r from-[#1f1f29] to-transparent border-l-4 border-(--f1-red) p-4 rounded-r-xl relative overflow-hidden group">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase rounded border border-yellow-500/30">Mock Data</div>
            <h3 className="text-sm font-bold text-(--f1-red) uppercase tracking-widest mb-1 flex items-center gap-2">
                <Newspaper className="w-4 h-4" /> À la une
            </h3>
            <p className="text-white italic text-lg md:text-xl">
                "La saison {currentYear} s'annonce explosive avec les nouvelles réglementations techniques qui rebattent les cartes !"
            </p>
            <div className="flex gap-4 mt-2 text-xs text-gray-500 font-mono">
                <span>Source: F1 Insider</span>
                <span>•</span>
                <span>Il y a 2h</span>
            </div>
        </div>
    );
}

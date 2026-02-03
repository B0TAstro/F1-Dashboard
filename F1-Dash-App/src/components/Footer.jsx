import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[var(--f1-black)] border-t border-[#333] py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-4 text-2xl font-black italic tracking-tighter text-[var(--f1-red)] opacity-50">
                    F1<span className="text-[var(--f1-white)]">DASH</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">
                    Développé avec ❤️ pour les passionnés de Formule 1.
                </p>
                <div className="text-xs text-gray-600 space-y-1">
                    <p>Ce projet n'est pas affilié à la Formula 1 companies.</p>
                    <p>Données fournies par OpenF1 et FastF1.</p>
                </div>
                <div className="mt-6 flex justify-center gap-4 text-sm font-bold uppercase tracking-widest text-[#555]">
                    <a href="https://github.com/B0TAstro/F1-Dashboard" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--f1-red)] transition">GitHub</a>
                    <span>•</span>
                    <a href="#" className="hover:text-[var(--f1-red)] transition">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

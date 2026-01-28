// components/PageHeader.jsx
import React from 'react';

export function PageHeader({ title, subtitle, rightElement }) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white border-l-4 border-[var(--f1-red)] pl-4">
                    {title}
                </h1>
                {subtitle && <p className="text-gray-500 pl-5 mt-1">{subtitle}</p>}
            </div>
            {rightElement && (
                <div className="bg-[#1f1f29] px-4 py-2 rounded border border-[#333] text-white font-bold">
                    {rightElement}
                </div>
            )}
        </div>
    );
}

export default PageHeader;

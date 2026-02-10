import type { LucideIcon } from 'lucide-react';

interface ServiceTileProps {
    title: string;
    icon: LucideIcon;
    gradient: string;
    onClick: () => void;
    delay?: number;
}

export default function ServiceTile({ title, icon: Icon, gradient, onClick, delay = 0 }: ServiceTileProps) {
    return (
        <button
            onClick={onClick}
            style={{ 
                animationDelay: `${delay}s`,
                animationFillMode: 'both' // Ensures it stays visible after animating
            }}
            className={`
                group relative overflow-hidden rounded-3xl p-6 lg:p-8 
                flex flex-col items-center justify-center gap-6 text-center
                bg-white/40 backdrop-blur-md border border-white/60 shadow-lg
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                aspect-[4/3] w-full 
                animate-fade-in
            `}
        >
            {/* Icon Container with Gradient */}
            <div className={`
                p-5 rounded-2xl text-white shadow-lg bg-gradient-to-br ${gradient}
                group-hover:scale-110 transition-transform duration-300
            `}>
                <Icon size={48} strokeWidth={2} />
            </div>

            {/* Title */}
            <span className="text-2xl font-bold text-gray-800 group-hover:text-digital-blue transition-colors tracking-tight leading-tight">
                {title}
            </span>

            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
        </button>
    );
}
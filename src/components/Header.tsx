import { useEffect, useState } from 'react';
import { useKioskStore } from '../store/useKioskStore';
import { Globe, Clock, Accessibility } from 'lucide-react';

export default function Header() {
    const { language, setLanguage } = useKioskStore();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    return (
        <header className="glass-panel mx-6 mt-6 px-8 py-4 flex justify-between items-center z-50 shrink-0">
            {/* Branding */}
            <div className="flex items-center gap-6">
                <div className="bg-gradient-to-br from-digital-blue to-secondary text-white p-3 rounded-2xl shadow-lg">
                    {/* Simple Logo Placeholder */}
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-3xl tracking-tighter">S</div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-4xl font-extrabold text-digital-blue tracking-tight leading-none">
                        SUVIDHA
                    </h1>
                    <span className="text-gray-500 font-medium text-lg tracking-wide">
                        Smart Urban Virtual Interface
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
                {/* Time Display */}
                <div className="hidden lg:flex items-center gap-3 bg-white/50 border border-white/60 px-6 py-3 rounded-full shadow-sm backdrop-blur-sm">
                    <Clock className="w-8 h-8 text-digital-blue" />
                    <div className="flex flex-col leading-none">
                        <span className="text-2xl font-bold text-gray-800">
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-xs text-gray-500 font-medium uppercase">
                            {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                    </div>
                </div>

                {/* Accessibility (Placeholder) */}
                <button className="glass-btn p-4 rounded-full text-site-blue hover:text-digital-blue">
                    <Accessibility className="w-8 h-8" />
                </button>

                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-3 bg-gradient-to-r from-digital-blue to-secondary text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-transform hover:brightness-110"
                >
                    <Globe className="w-8 h-8" />
                    <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
            </div>
        </header>
    );
}

import { useKioskStore } from '../store/useKioskStore';
import { translations } from '../i18n/translations';
import { AlertCircle } from 'lucide-react';

export default function Footer() {
    const { language } = useKioskStore();

    return (
        <footer className="shrink-0 h-16 pointer-events-none relative z-50">
            <div className="absolute inset-x-6 bottom-6 glass-panel flex items-center overflow-hidden px-4 py-3 bg-white/90">
                <div className="flex items-center gap-3 bg-alert-red/10 px-4 py-1 rounded-full text-alert-red font-bold whitespace-nowrap z-10 mr-4">
                    <AlertCircle className="w-5 h-5" />
                    <span>ALERTS</span>
                </div>
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    <div className="animate-marquee whitespace-nowrap text-lg font-medium text-gray-700 w-max">
                        <span className="mx-8">📢 Power outage scheduled in Sector 4 from 2 PM to 4 PM tomorrow.</span>
                        <span className="mx-8">💧 Water supply maintenance in Swastik Nagar on Sunday.</span>
                        <span className="mx-8">🏥 Pulse Polio drive at all Community Centers this weekend.</span>
                        <span className="mx-8">📢 {translations[language].footerText}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

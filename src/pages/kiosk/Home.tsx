import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '../../store/useKioskStore';
import ServiceTile from '../../components/ServiceTile';
import {
    Zap,
    Droplets,
    FileText,
    Activity,
    Upload,
    Printer
} from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();
    const { t } = useKioskStore();

    const services = [
        { id: 'pay-bill', title: t('payBill'), icon: Zap, gradient: 'from-blue-500 to-indigo-600', path: '/pay-bill' },
        { id: 'new-conn', title: t('newConnection'), icon: Droplets, gradient: 'from-cyan-400 to-blue-500', path: '/new-connection' },
        { id: 'complaint', title: t('complaint'), icon: FileText, gradient: 'from-orange-400 to-red-500', path: '/complaint' },
        { id: 'status', title: t('trackStatus'), icon: Activity, gradient: 'from-emerald-400 to-green-600', path: '/status' },
        { id: 'upload', title: t('upload'), icon: Upload, gradient: 'from-violet-500 to-purple-600', path: '/upload' },
        { id: 'print', title: t('printReceipt'), icon: Printer, gradient: 'from-gray-600 to-gray-800', path: '/print' },
    ];

    return (
        <div className="h-full flex flex-col items-center justify-center py-8">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-extrabold text-digital-blue mb-4 tracking-tight drop-shadow-sm">
                    {t('selectService')}
                </h2>
                <p className="text-xl text-gray-500">{t('selectAnOptionBelow')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-6">
                {services.map((service, index) => (
                    <ServiceTile
                        key={service.id}
                        title={service.title}
                        icon={service.icon}
                        gradient={service.gradient}
                        onClick={() => navigate(service.path)}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </div>
    );
}

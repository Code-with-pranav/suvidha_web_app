
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TouchInput from '../../components/TouchInput';
import { Search, ChevronLeft, CheckCircle, Clock, Circle } from 'lucide-react';
import { api, type Complaint as ComplaintType } from '../../services/api';
import { useKioskStore } from '../../store/useKioskStore';

export default function TrackStatus() {
    const navigate = useNavigate();
    const { t } = useKioskStore();
    const [ticketId, setTicketId] = useState('');
    const [result, setResult] = useState<ComplaintType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!ticketId) return;
        setLoading(true);
        setError('');

        try {
            await new Promise(r => setTimeout(r, 1000));
            // Mock result
            setResult({
                id: ticketId,
                category: 'Electricity',
                details: 'Power outage report',
                status: 'In Progress',
                timestamp: new Date().toLocaleString()
            });
        } catch (e) {
            setError(t('ticketNotFound'));
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { label: t('submitted'), status: 'completed' },
        { label: t('inProgress'), status: result?.status === 'In Progress' || result?.status === 'Resolved' ? 'completed' : 'current' },
        { label: t('resolved'), status: result?.status === 'Resolved' ? 'completed' : 'pending' },
    ];

    return (
        <div className="h-full flex flex-col animate-fade-in pt-8 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/')} className="glass-btn p-4 rounded-full">
                    <ChevronLeft size={32} className="text-gray-600" />
                </button>
                <h2 className="text-4xl font-bold text-gray-800">{t('trackApplicationStatus')}</h2>
            </div>

            {!result ? (
                <div className="glass-panel p-12 mt-8 w-full">
                    <TouchInput
                        label={t('enterTicketConsumerId')}
                        placeholder={t('ticketIdPlaceholder')}
                        value={ticketId}
                        onChange={(e) => setTicketId(e.target.value)}
                        className="mb-8"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={loading || !ticketId}
                        className="w-full py-6 text-2xl font-bold text-white bg-digital-blue rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                        {loading ? t('searching') : <>{t('search')} <Search size={32} /></>}
                    </button>
                    {error && <p className="text-alert-red mt-4 text-center text-xl font-medium">{error}</p>}
                </div>
            ) : (
                <div className="glass-panel p-10 w-full">
                    <div className="flex justify-between items-start mb-12 pb-8 border-b border-gray-200/50">
                        <div>
                            <span className="text-gray-500 text-sm uppercase tracking-wider font-bold">{t('ticketId')}</span>
                            <div className="text-5xl font-extrabold text-digital-blue my-2">{result.id}</div>
                            <div className="text-xl text-gray-600">{result.category} • {result.timestamp}</div>
                        </div>
                        <div className={`px-6 py-3 rounded-full text-xl font-bold ${result.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                            result.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                            {result.status === 'Resolved' ? t('resolved') : result.status === 'In Progress' ? t('inProgress') : result.status}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative flex justify-between items-center px-12 py-8 mb-12">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 -z-10 translate-y-[-50%] rounded-full" />

                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl z-10">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-colors shadow-lg ${step.status === 'completed' ? 'bg-civic-green border-civic-green text-white' :
                                    step.status === 'current' ? 'bg-white border-digital-blue text-digital-blue' :
                                        'bg-white border-gray-300 text-gray-300'
                                    }`}>
                                    {step.status === 'completed' && <CheckCircle size={32} />}
                                    {step.status === 'current' && <Clock size={32} />}
                                    {step.status === 'pending' && <Circle size={32} />}
                                </div>
                                <span className={`text-xl font-bold ${step.status === 'completed' ? 'text-civic-green' :
                                    step.status === 'current' ? 'text-digital-blue' :
                                        'text-gray-400'
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => { setResult(null); setTicketId(''); }}
                            className="text-digital-blue font-bold text-xl hover:underline"
                        >
                            {t('trackAnotherTicket')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

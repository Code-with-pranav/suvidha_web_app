import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileWarning, Camera, Send, CheckCircle, ArrowRight } from 'lucide-react';
import TouchInput from '../../components/TouchInput';
import { mockApi } from '../../services/mockApi';
import { useKioskStore } from '../../store/useKioskStore';

export default function Complaint() {
    const navigate = useNavigate();
    const { t } = useKioskStore();
    const [step, setStep] = useState(1);
    const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [ticketId, setTicketId] = useState<string | null>(null);

    const ISSUES = [
        { id: 'street-light', label: t('streetLightNotWorking'), icon: FileWarning, color: 'text-yellow-500' },
        { id: 'water-leak', label: t('waterLeakage'), icon: FileWarning, color: 'text-blue-500' },
        { id: 'garbage', label: t('garbageNotCollected'), icon: FileWarning, color: 'text-green-500' },
        { id: 'pothole', label: t('roadPotholes'), icon: FileWarning, color: 'text-gray-500' },
        { id: 'other', label: t('otherIssue'), icon: FileWarning, color: 'text-purple-500' },
    ];

    const handleSubmit = async () => {
        setLoading(true);
        const res = await mockApi.submitComplaint({ issue: selectedIssue, desc, location });
        setTicketId(res.ticketId);
        setLoading(false);
        setStep(3);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
                    className="glass-btn p-4 rounded-full"
                >
                    <ChevronLeft size={32} className="text-gray-600" />
                </button>
                <h2 className="text-4xl font-bold text-gray-800">
                    {step === 1 && t('reportAnIssue')}
                    {step === 2 && t('provideDetails')}
                    {step === 3 && t('complaintRegistered')}
                </h2>
            </div>

            {/* Progress */}
            <div className="w-full h-4 bg-gray-200 rounded-full mb-12 flex overflow-hidden">
                <div
                    className="bg-alert-red transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="flex-1 flex flex-col items-center max-w-5xl mx-auto w-full">

                {/* Step 1: Select Issue */}
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-fade-in">
                        {ISSUES.map((issue) => (
                            <button
                                key={issue.id}
                                onClick={() => { setSelectedIssue(issue.id); setStep(2); }}
                                className="glass-panel p-8 flex flex-col items-center gap-4 hover:border-alert-red/50 hover:bg-red-50/50 transition-all text-center"
                            >
                                <div className="p-6 bg-red-100 rounded-full">
                                    <issue.icon size={48} className="text-alert-red" />
                                </div>
                                <span className="text-xl font-bold text-gray-700">{issue.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                    <div className="glass-panel p-10 w-full max-w-3xl animate-fade-in space-y-8">
                        <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3 text-alert-red mb-6">
                            <FileWarning />
                            <span className="font-bold text-xl uppercase tracking-wide">
                                {t('reporting')}: {ISSUES.find(i => i.id === selectedIssue)?.label}
                            </span>
                        </div>

                        <TouchInput
                            label={t('locationLandmark')}
                            placeholder={t('locationPlaceholder')}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />

                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold text-gray-700">{t('description')}</label>
                            <textarea
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                rows={4}
                                className="w-full px-6 py-4 text-xl rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-alert-red transition-colors"
                                placeholder={t('describeIssueBriefly')}
                            />
                        </div>

                        {/* Photo Attach Mock */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 gap-4 hover:bg-gray-50 cursor-pointer">
                            <Camera size={48} />
                            <span className="text-lg font-medium">{t('tapToTakePhoto')}</span>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!location || !desc || loading}
                            className="w-full py-6 bg-alert-red text-white text-2xl font-bold rounded-2xl shadow-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {loading ? t('submitting') : <>{t('submitComplaint')} <Send /></>}
                        </button>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="flex flex-col items-center animate-fade-in text-center">
                        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
                            <CheckCircle size={80} className="text-civic-green" />
                        </div>
                        <h2 className="text-5xl font-bold text-gray-800 mb-4">{t('complaintRegistered')}</h2>
                        <p className="text-2xl text-gray-600 mb-12 max-w-2xl">
                            {t('weHaveReceivedYourReport')}
                        </p>

                        <div className="bg-white border-2 border-dashed border-green-200 p-8 rounded-2xl mb-12 w-full max-w-md">
                            <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">{t('ticketNumber')}</p>
                            <p className="text-4xl font-mono font-bold text-digital-blue">{ticketId}</p>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="bg-digital-blue text-white px-12 py-6 rounded-full text-2xl font-bold shadow-lg flex items-center gap-3 hover:scale-105 transition-transform"
                        >
                            {t('backToHome')} <ArrowRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '../../store/useKioskStore';
import { Home, CheckCircle, User, Building2 } from 'lucide-react';

export default function NewConnection() {
    const navigate = useNavigate();
    const { t } = useKioskStore();
    const [step, setStep] = useState(1);
    const [type, setType] = useState<'domestic' | 'commercial' | null>(null);

    const handleSubmit = () => {
        // Mock API call simulation
        setTimeout(() => setStep(3), 1000);
    };

    return (
        <div className="h-full flex flex-col max-w-4xl mx-auto w-full animate-fade-in">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-4xl font-bold text-digital-blue">{t('newConnection')}</h2>
                    <p className="text-gray-500 mt-2 text-lg">{t('applyForNewConnection')}</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-600 font-medium shadow-sm active:scale-95 transition-transform"
                >
                    <Home size={20} /> {t('backToHome')}
                </button>
            </div>

            {/* Main Glass Card */}
            <div className="flex-1 glass-panel p-8 lg:p-12 rounded-3xl relative overflow-hidden">

                {/* Step 1: Select Type */}
                {step === 1 && (
                    <div className="h-full flex flex-col justify-center animate-fade-in">
                        <h3 className="text-2xl font-bold text-center mb-10 text-gray-700">{t('selectConnectionType')}</h3>
                        <div className="grid grid-cols-2 gap-8">
                            <button
                                onClick={() => { setType('domestic'); setStep(2); }}
                                className="group p-10 rounded-2xl border-2 border-transparent bg-blue-50 hover:bg-white hover:border-digital-blue hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4"
                            >
                                <div className="p-6 bg-white rounded-full shadow-md group-hover:scale-110 transition-transform">
                                    <User size={48} className="text-digital-blue" />
                                </div>
                                <span className="text-2xl font-bold text-gray-700 group-hover:text-digital-blue">{t('domestic')}</span>
                            </button>

                            <button
                                onClick={() => { setType('commercial'); setStep(2); }}
                                className="group p-10 rounded-2xl border-2 border-transparent bg-purple-50 hover:bg-white hover:border-imperial-purple hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4"
                            >
                                <div className="p-6 bg-white rounded-full shadow-md group-hover:scale-110 transition-transform">
                                    <Building2 size={48} className="text-imperial-purple" />
                                </div>
                                <span className="text-2xl font-bold text-gray-700 group-hover:text-imperial-purple">{t('commercial')}</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Form Details */}
                {step === 2 && (
                    <div className="h-full flex flex-col animate-fade-in">
                        <h3 className="text-2xl font-bold mb-8 text-gray-700">{t('applicantDetails')} ({type})</h3>
                        <div className="space-y-6 max-w-2xl mx-auto w-full">
                            <div>
                                <label className="block text-gray-500 mb-2 font-medium">{t('fullName')}</label>
                                <input type="text" className="w-full text-2xl p-4 rounded-xl border-2 border-gray-200 focus:border-digital-blue outline-none transition-colors" placeholder={t('enterYourName')} />
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-2 font-medium">{t('aadharNumber')}</label>
                                <input type="number" className="w-full text-2xl p-4 rounded-xl border-2 border-gray-200 focus:border-digital-blue outline-none transition-colors" placeholder={t('aadharNumberPlaceholder')} />
                            </div>

                            <div className="pt-8 flex gap-4">
                                <button onClick={() => setStep(1)} className="flex-1 py-4 text-xl text-gray-500 font-bold">{t('back')}</button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 py-4 bg-gradient-to-r from-digital-blue to-indigo-600 text-white rounded-xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
                                >
                                    {t('submitApplication')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="h-full flex flex-col items-center justify-center animate-fade-in text-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle size={60} className="text-civic-green" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">{t('applicationSubmitted')}</h2>
                        <p className="text-xl text-gray-500 mb-10">{t('yourReferenceIdIs')} <span className="font-mono font-bold text-digital-blue">NC-{Math.floor(Math.random() * 90000)}</span></p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-12 py-4 bg-gray-900 text-white rounded-xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
                        >
                            {t('returnHome')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
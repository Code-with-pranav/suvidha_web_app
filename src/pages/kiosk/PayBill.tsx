import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Zap, Droplets, Flame, Search, IndianRupee, Printer, ArrowRight, CheckCircle } from 'lucide-react';
import TouchInput from '../../components/TouchInput';
import { mockApi } from '../../services/mockApi';
import { useKioskStore } from '../../store/useKioskStore';

export default function PayBill() {
    const navigate = useNavigate();
    const { t } = useKioskStore();
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [consumerId, setConsumerId] = useState('');
    const [billData, setBillData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const SERVICES = [
        { id: 'electricity', label: t('electricity'), icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
        { id: 'water', label: t('waterSupply'), icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'gas', label: t('pipedGas'), icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    ];

    const handleFetchBill = async () => {
        setLoading(true);
        const data = await mockApi.fetchBill(consumerId);
        setBillData(data);
        setLoading(false);
        setStep(3);
    };

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(4);
        }, 2000);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header / Back */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
                    className="glass-btn p-4 rounded-full"
                >
                    <ChevronLeft size={32} className="text-gray-600" />
                </button>
                <h2 className="text-4xl font-bold text-gray-800">
                    {step === 1 && t('selectUtilityProvider')}
                    {step === 2 && t('enterConsumerDetails')}
                    {step === 3 && t('reviewAndPay')}
                    {step === 4 && t('paymentSuccessful')}
                </h2>
            </div>

            {/* Stepper Progress */}
            <div className="w-full h-4 bg-gray-200 rounded-full mb-12 flex overflow-hidden">
                <div
                    className="bg-digital-blue transition-all duration-500 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            <div className="flex-1 flex flex-col items-center max-w-5xl mx-auto w-full">

                {/* Step 1: Select Service */}
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full animate-fade-in">
                        {SERVICES.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => { setSelectedService(s.id); setStep(2); }}
                                className="glass-panel p-10 flex flex-col items-center gap-6 hover:scale-105 transition-transform group"
                            >
                                <div className={`p-8 rounded-full ${s.bg}`}>
                                    <s.icon size={64} className={s.color} />
                                </div>
                                <span className="text-3xl font-bold text-gray-700">{s.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 2: Consumer ID */}
                {step === 2 && (
                    <div className="glass-panel p-12 w-full max-w-2xl animate-fade-in">
                        <div className="mb-8 flex items-center gap-4 text-digital-blue bg-blue-50 p-4 rounded-xl">
                            {SERVICES.find(s => s.id === selectedService)?.icon && (
                                <div className="p-2 bg-white rounded-lg">
                                    {(() => {
                                        const ServiceIcon = SERVICES.find(s => s.id === selectedService)!.icon;
                                        return <ServiceIcon size={32} />;
                                    })()}
                                </div>
                            )}
                            <span className="text-2xl font-bold uppercase">{selectedService} {t('billPayment')}</span>
                        </div>

                        <TouchInput
                            label={t('consumerNumber')}
                            placeholder={t('consumerNumberPlaceholder')}
                            value={consumerId}
                            onChange={(e) => setConsumerId(e.target.value)}
                            className="mb-8"
                        />

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setConsumerId(prev => prev + num)}
                                    className="glass-btn py-6 text-3xl font-bold text-gray-700 rounded-xl"
                                >
                                    {num}
                                </button>
                            ))}
                            <button
                                onClick={() => setConsumerId(prev => prev.slice(0, -1))}
                                className="glass-btn py-6 text-xl font-bold text-red-500 rounded-xl"
                            >
                                ⌫
                            </button>
                            <button
                                onClick={() => setConsumerId(prev => prev + '0')}
                                className="glass-btn py-6 text-3xl font-bold text-gray-700 rounded-xl"
                            >
                                0
                            </button>
                            <button
                                onClick={handleFetchBill}
                                disabled={!consumerId}
                                className="bg-digital-blue text-white py-6 text-xl font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? t('fetching') : <span>{t('fetch')} <Search className="inline w-5 h-5" /></span>}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Review Bill */}
                {step === 3 && billData && (
                    <div className="w-full max-w-3xl animate-fade-in">
                        <div className="glass-panel p-10 mb-8 border-t-8 border-digital-blue">
                            <div className="flex justify-between items-start mb-8 border-b pb-6">
                                <div>
                                    <p className="text-gray-500 text-lg uppercase tracking-wider">{t('consumerName')}</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{billData.consumerName}</h3>
                                    <p className="text-gray-600 mt-1">{billData.address}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-lg uppercase tracking-wider">{t('dueDate')}</p>
                                    <h3 className="text-3xl font-bold text-alert-red">{billData.dueDate}</h3>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl mb-8">
                                <span className="text-2xl font-semibold text-gray-700">{t('totalAmount')}</span>
                                <span className="text-5xl font-extrabold text-digital-blue flex items-center">
                                    <IndianRupee size={40} strokeWidth={3} /> {billData.amount}
                                </span>
                            </div>

                            <button
                                onClick={handlePay}
                                disabled={loading}
                                className="w-full py-6 bg-gradient-to-r from-civic-green to-emerald-600 text-white text-3xl font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-4"
                            >
                                {loading ? t('processingPayment') : (
                                    <>{t('payNow')} <ArrowRight size={32} /></>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Success Receipt */}
                {step === 4 && (
                    <div className="flex flex-col items-center animate-fade-in">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <CheckCircle size={64} className="text-civic-green" />
                        </div>
                        <h2 className="text-5xl font-bold text-gray-800 mb-2">{t('paymentSuccessful')}!</h2>
                        <p className="text-xl text-gray-500 mb-12">{t('transactionId')}: TXN-{Math.floor(Math.random() * 10000000)}</p>

                        <div className="glass-panel p-16 bg-white w-[500px] relative border-dashed border-4 border-gray-300 transform rotate-1 mb-12">
                            <div className="border-b-2 border-dashed border-gray-200 pb-8 mb-8 text-center">
                                <h3 className="text-2xl font-bold uppercase tracking-widest text-gray-400">{t('suvidhaReceipt')}</h3>
                            </div>
                            <div className="space-y-4 text-xl">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{t('service')}</span>
                                    <span className="font-bold uppercase">{selectedService}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{t('consumerId')}</span>
                                    <span className="font-bold">{consumerId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{t('amountPaid')}</span>
                                    <span className="font-bold text-digital-blue">₹ {billData?.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{t('date')}</span>
                                    <span className="font-bold">{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="mt-12 text-center text-gray-400 text-sm">{t('thankYouForUsingSuvidhaKiosk')}</div>
                        </div>

                        <div className="flex gap-6">
                            <button onClick={() => window.print()} className="glass-btn px-10 py-5 rounded-full flex items-center gap-3 text-xl font-bold text-gray-700">
                                <Printer /> {t('printReceipt')}
                            </button>
                            <button onClick={() => navigate('/')} className="px-10 py-5 rounded-full bg-digital-blue text-white text-xl font-bold shadow-lg">
                                {t('backToHome')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

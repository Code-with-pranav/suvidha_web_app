
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '../../store/useKioskStore';
import { Printer, ArrowLeft, Search, Loader2, CheckCircle2 } from 'lucide-react';

export default function PrintReceipt() {
    const navigate = useNavigate();
    const { t } = useKioskStore();

    const [txnId, setTxnId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!txnId.trim()) return;

        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setShowReceipt(true);
        }, 1500);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="h-full flex flex-col p-6">
            {/* Header */}
            <div className="flex items-center mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="glass-btn p-3 rounded-full mr-4 text-digital-blue"
                >
                    <ArrowLeft size={28} />
                </button>
                <h1 className="text-4xl font-bold text-digital-blue drop-shadow-sm">
                    {t('printReceipt')}
                </h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start max-w-2xl mx-auto w-full">

                {/* Search Section */}
                {!showReceipt && (
                    <div className="glass-panel p-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                            {t('enterTicketConsumerId')}
                        </h2>
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                                    {t('transactionId')} / {t('consumerNumber')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={txnId}
                                        onChange={(e) => setTxnId(e.target.value)}
                                        placeholder="TXN-XXXX-XXXX"
                                        className="w-full text-2xl p-4 pl-12 rounded-xl bg-white/50 border border-gray-200 focus:ring-4 focus:ring-blue-400/30 focus:border-digital-blue transition-all outline-none"
                                        autoFocus
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!txnId.trim() || loading}
                                className={`w-full py-4 rounded-xl text-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98]
                  ${!txnId.trim() || loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30 hover:scale-[1.02]'
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin" /> {t('searching')}...
                                    </span>
                                ) : (
                                    t('search')
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Receipt Preview Section */}
                {showReceipt && (
                    <div className="w-full animate-in zoom-in-95 duration-500">
                        <div className="bg-white p-8 rounded-none shadow-xl border-t-8 border-digital-blue relative receipt-paper max-w-md mx-auto">
                            {/* Dashed Border Effect */}
                            <div className="absolute inset-x-0 bottom-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSZNMCAwSDEwTDUgNUwwIDBaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xMCAwSDIwTTE1IDVMMjAgMFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+')] bg-repeat-x translate-y-full"></div>

                            <div className="text-center border-b-2 border-dashed border-gray-200 pb-6 mb-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 size={32} className="text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-widest">Receipt</h2>
                                <p className="text-gray-500 text-sm mt-1">SUVIDHA KIOSK SERVICE</p>
                            </div>

                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{t('date')}</span>
                                    <span className="font-mono font-medium">{new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{t('transactionId')}</span>
                                    <span className="font-mono font-medium">{txnId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{t('service')}</span>
                                    <span className="font-medium">Electricity Bill</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-y-2 border-dashed border-gray-200 my-4">
                                    <span className="text-gray-800 font-bold">{t('amountPaid')}</span>
                                    <span className="text-3xl font-bold text-gray-900">₹ 2,450.00</span>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase tracking-wide border border-green-200">
                                        {t('success')}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
                                <p>Thank you for using SUVIDHA services.</p>
                                <p>Generated on {new Date().toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-8 max-w-md mx-auto">
                            <button
                                onClick={handlePrint}
                                className="w-full py-4 bg-gray-900 text-white rounded-xl text-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg"
                            >
                                <Printer size={24} />
                                {t('printReceipt')}
                            </button>
                            <button
                                onClick={() => {
                                    setShowReceipt(false);
                                    setTxnId('');
                                }}
                                className="w-full py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-all"
                            >
                                Scan Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TouchInput from '../../components/TouchInput';
import { Smartphone, ScanFace, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { mockApi } from '../../services/mockApi';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [method, setMethod] = useState<'mobile' | 'face'>('mobile');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
    const [scanning, setScanning] = useState(false);

    const handleMobileSubmit = () => {
        if (mobile.length === 10) setStep(2);
    };

    const handleLogin = async () => {
        const result = await mockApi.login(method, { mobile, otp });
        if (result.success) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            login(result.user as any);
            navigate('/');
        }
    };

    const startFaceScan = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            handleLogin();
        }, 3000); // 3s scan
    };

    return (
        <div className="flex h-full w-full">
            {/* Left Side - Welcome & Illustration */}
            <div className="w-1/2 flex flex-col justify-center p-12 pr-20 text-digital-blue relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-0 left-12 glass-btn px-6 py-3 rounded-full flex items-center gap-2 text-lg font-bold text-gray-600"
                >
                    <ChevronLeft /> Back to Home
                </button>

                <div className="mb-12">
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-digital-blue font-bold mb-6 tracking-wide uppercase text-sm">
                        Secure Authentication
                    </span>
                    <h1 className="text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-digital-blue to-imperial-purple">SUVIDHA</span>
                    </h1>
                    <p className="text-3xl text-gray-500 font-light leading-relaxed">
                        Your gateway to Smart Urban Services. <br />
                        Login to pay bills, track status, and more.
                    </p>
                </div>

                {/* Abstract Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-digital-blue/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
            </div>

            {/* Right Side - Login Forms */}
            <div className="w-1/2 flex items-center justify-center p-12 relative">
                <div className="glass-panel w-full max-w-xl p-10 shadow-2xl relative overflow-hidden">
                    {/* Background blob for card */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl" />

                    <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        {method === 'mobile' ? <Smartphone className="text-digital-blue" size={32} /> : <ScanFace className="text-digital-blue" size={32} />}
                        {method === 'mobile' ? 'Mobile Login' : 'Face ID Verification'}
                    </h3>

                    {/* Method Toggle */}
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-10">
                        <button
                            onClick={() => { setMethod('mobile'); setStep(1); }}
                            className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all ${method === 'mobile' ? 'bg-white text-digital-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Mobile OTP
                        </button>
                        <button
                            onClick={() => setMethod('face')}
                            className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all ${method === 'face' ? 'bg-white text-digital-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Face ID
                        </button>
                    </div>

                    <div className="min-h-[300px]">
                        {method === 'mobile' && (
                            <div className="space-y-8 animate-fade-in">
                                {step === 1 ? (
                                    <>
                                        <TouchInput
                                            label="Mobile Number"
                                            placeholder="Enter 10 digit number"
                                            type="tel"
                                            maxLength={10}
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value.replace(/\D/, ''))}
                                        />
                                        <button
                                            onClick={handleMobileSubmit}
                                            disabled={mobile.length !== 10}
                                            className="w-full py-5 text-xl font-bold text-white bg-gradient-to-r from-digital-blue to-secondary rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Get OTP <ArrowRight />
                                        </button>
                                    </>
                                ) : (
                                    <div className="animate-fade-in">
                                        <div className="text-center mb-8">
                                            <p className="text-gray-500 text-lg">OTP sent to +91 {mobile}</p>
                                            <button onClick={() => setStep(1)} className="text-digital-blue font-bold mt-2">Change Number</button>
                                        </div>
                                        <TouchInput
                                            label="Enter OTP"
                                            placeholder="XXXX"
                                            maxLength={4}
                                            className="tracking-[1em] text-center text-3xl h-20"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                        <button
                                            onClick={handleLogin}
                                            disabled={otp.length !== 4}
                                            className="w-full py-5 text-xl font-bold text-white bg-civic-green rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 mt-8 disabled:opacity-50"
                                        >
                                            Verify & Login <ShieldCheck />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {method === 'face' && (
                            <div className="flex flex-col items-center text-center animate-fade-in py-4">
                                {scanning ? (
                                    <div className="relative mb-8">
                                        <div className="w-64 h-64 rounded-3xl border-4 border-digital-blue/30 overflow-hidden relative bg-black/5">
                                            {/* Scanning Line Animation */}
                                            <div className="absolute inset-x-0 h-1 bg-digital-blue shadow-[0_0_20px_rgba(37,99,235,0.8)] animate-scan-line z-10" />
                                            <ScanFace size={100} className="text-digital-blue/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        </div>
                                        <p className="mt-6 text-xl font-semibold text-digital-blue animate-pulse">Verifying Identity...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-64 h-64 rounded-3xl bg-blue-50 border-4 border-dashed border-blue-200 flex items-center justify-center mb-8">
                                            <ScanFace size={80} className="text-blue-300" />
                                        </div>
                                        <button
                                            onClick={startFaceScan}
                                            className="w-full py-5 text-xl font-bold text-white bg-digital-blue rounded-xl shadow-lg active:scale-95 transition-transform"
                                        >
                                            Start Face Scan
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

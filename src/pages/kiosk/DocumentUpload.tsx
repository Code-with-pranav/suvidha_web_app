
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, FileText, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useKioskStore } from '../../store/useKioskStore';

export default function DocumentUpload() {
    const navigate = useNavigate();
    const { t } = useKioskStore();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center px-4">
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8 text-civic-green animate-bounce">
                    <CheckCircle size={80} />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('uploadSuccessful')}</h2>
                <p className="text-2xl text-gray-500 mb-12">{t('documentSubmittedForVerification')}</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-12 py-6 text-2xl font-bold text-white bg-digital-blue rounded-full shadow-xl active:scale-95 transition-transform"
                >
                    {t('returnHome')}
                </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col items-center justify-center animate-fade-in px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-12">{t('uploadSupportingDocuments')}</h2>

            <div className="glass-panel p-16 w-full max-w-2xl border-4 border-dashed border-gray-300 hover:border-digital-blue hover:bg-blue-50/30 transition-all text-center relative group">
                {!file ? (
                    <>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*,application/pdf"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center pointer-events-none">
                            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-8 text-digital-blue group-hover:scale-110 transition-transform">
                                <Upload size={64} />
                            </div>
                            <p className="text-3xl font-bold text-gray-700 mb-4">{t('tapToUpload')}</p>
                            <p className="text-xl text-gray-500">{t('supportedFormats')}</p>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mb-6 text-gray-600">
                            {file.type.includes('image') ? <ImageIcon size={64} /> : <FileText size={64} />}
                        </div>
                        <p className="text-2xl font-bold text-gray-800 mb-2">{file.name}</p>
                        <p className="text-xl text-gray-500 mb-10">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                        <div className="flex gap-6 w-full">
                            <button
                                onClick={() => setFile(null)}
                                className="flex-1 py-5 text-xl font-bold text-alert-red bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
                            >
                                {t('remove')}
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="flex-1 py-5 text-xl font-bold text-white bg-digital-blue rounded-2xl shadow-lg disabled:opacity-50"
                            >
                                {uploading ? t('uploading') : t('submitDocument')}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <button onClick={() => navigate('/')} className="mt-12 text-gray-500 hover:text-gray-800 text-xl font-bold">
                {t('cancelAndReturn')}
            </button>
        </div>
    );
}

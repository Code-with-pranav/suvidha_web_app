
import { useState } from 'react';
import { Settings, Save} from 'lucide-react';

export default function ContentManager() {
    const [tickerText, setTickerText] = useState('Unified Civic Services Kiosk - 24x7 Support | Helpline: 1800-123-4567');
    const [alertMessage, setAlertMessage] = useState('');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        // In real app, this would POST to backend
    };

    return (
        <div className="animate-fade-in max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Settings className="text-gray-600" /> Content Manager
            </h2>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">

                {/* Ticker Config */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bottom Marquee Text</label>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={tickerText}
                            onChange={(e) => setTickerText(e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">This text scrolls at the bottom of the kiosk screen.</p>
                </div>

                {/* Emergency Alert Config */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Banner Alert (Optional)</label>
                    <textarea
                        value={alertMessage}
                        onChange={(e) => setAlertMessage(e.target.value)}
                        placeholder="E.g. Heavy rain alert in Sector 4..."
                        className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <p className="text-sm text-gray-400 mt-2">Leave empty to hide the top banner.</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <button
                        onClick={handleSave}
                        className={`px-6 py-3 rounded-lg font-bold text-white transition-all flex items-center gap-2 ${saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        <Save size={20} />
                        {saved ? 'Saved Successfully!' : 'Save Changes'}
                    </button>
                </div>

            </div>
        </div>
    );
}

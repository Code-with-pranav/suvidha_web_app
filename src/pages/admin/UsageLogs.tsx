
import { Monitor, Clock } from 'lucide-react';

const MOCK_LOGS = [
    { id: 1, user: 'Citizen (Guest)', service: 'Pay Bill', duration: '2m 15s', time: '10:30 AM' },
    { id: 2, user: 'Citizen (Guest)', service: 'Complaint', duration: '4m 05s', time: '10:45 AM' },
    { id: 3, user: 'Citizen (Login)', service: 'Track Status', duration: '1m 20s', time: '11:00 AM' },
    { id: 4, user: 'Citizen (Guest)', service: 'Pay Bill', duration: '3m 10s', time: '11:15 AM' },
    { id: 5, user: 'Citizen (Guest)', service: 'Document Upload', duration: '5m 00s', time: '11:30 AM' },
];

export default function UsageLogs() {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Monitor className="text-blue-600" /> Kiosk Usage Logs
            </h2>

            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Time</th>
                            <th className="p-4">User Type</th>
                            <th className="p-4">Service Used</th>
                            <th className="p-4">Duration</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MOCK_LOGS.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-600">{log.time}</td>
                                <td className="p-4 font-medium text-gray-800">{log.user}</td>
                                <td className="p-4">
                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {log.service}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 flex items-center gap-1">
                                    <Clock size={16} /> {log.duration}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

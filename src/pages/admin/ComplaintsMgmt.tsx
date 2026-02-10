
import { useState, useEffect } from 'react';
import { api, type Complaint } from '../../services/api';
import { Filter, Search, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function ComplaintsMgmt() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const loadData = async () => {
            const data = await api.getComplaints();
            setComplaints(data);
            setLoading(false);
        };
        loadData();
    }, []);

    const filtered = filter === 'All' ? complaints : complaints.filter(c => c.status === filter);

    if (loading) return <div className="p-8">Loading complaints...</div>;

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <AlertCircle className="text-red-500" /> Complaint Management
            </h2>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    {['All', 'Open', 'In Progress', 'Resolved'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search ID..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Details</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-mono font-bold text-gray-700">{c.id}</td>
                                <td className="p-4">{c.category}</td>
                                <td className="p-4 max-w-xs truncate text-gray-500" title={c.details}>{c.details}</td>
                                <td className="p-4">
                                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide w-fit ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                        c.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {c.status === 'Resolved' && <CheckCircle size={12} />}
                                        {c.status === 'In Progress' && <Clock size={12} />}
                                        {c.status === 'Open' && <AlertCircle size={12} />}
                                        {c.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">{c.timestamp}</td>
                                <td className="p-4">
                                    <button className="text-blue-600 font-medium hover:underline text-sm">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No complaints found.</div>
                )}
            </div>
        </div>
    );
}

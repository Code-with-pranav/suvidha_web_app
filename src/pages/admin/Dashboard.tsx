import { BarChart3, TrendingUp, AlertCircle, Users } from 'lucide-react';

const STATS = [
    { label: 'Total Transactions', value: '₹ 12.5L', change: '+12%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Active Complaints', value: '24', change: '-5%', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Daily Footfall', value: '1,240', change: '+8%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Avg. Service Time', value: '2m 15s', change: '-10%', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
];

const RECENT_TXNS = [
    { id: 'TXN-9921', user: 'Ravi Kumar', service: 'Electricity Bill', amount: '₹ 2,450', status: 'Success', date: 'Just now' },
    { id: 'TXN-9920', user: 'Anita Singh', service: 'Water Bill', amount: '₹ 450', status: 'Success', date: '5 mins ago' },
    { id: 'TXN-9919', user: 'Vikram Malhotra', service: 'Piped Gas', amount: '₹ 1,100', status: 'Failed', date: '12 mins ago' },
    { id: 'TXN-9918', user: 'Suresh Raina', service: 'Electricity Bill', amount: '₹ 5,600', status: 'Success', date: '25 mins ago' },
];

export default function Dashboard() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
                    <p className="text-gray-500">Real-time usage statistics and transaction logs.</p>
                </div>
                <div className="text-sm text-gray-400 font-medium bg-gray-100 px-4 py-2 rounded-lg">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} bg-gray-50 px-2 py-1 rounded-md`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                    <th className="pb-4">Transaction ID</th>
                                    <th className="pb-4">User</th>
                                    <th className="pb-4">Service</th>
                                    <th className="pb-4">Amount</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4 text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {RECENT_TXNS.map((txn) => (
                                    <tr key={txn.id} className="group hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-50">
                                        <td className="py-4 font-mono text-gray-500">{txn.id}</td>
                                        <td className="py-4 font-medium text-gray-800">{txn.user}</td>
                                        <td className="py-4 text-gray-600">{txn.service}</td>
                                        <td className="py-4 font-bold text-gray-800">{txn.amount}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${txn.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right text-gray-400">{txn.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Health / Quick Actions (Placeholder) */}
                <div className="bg-gradient-to-br from-digital-blue to-imperial-purple rounded-2xl shadow-lg p-6 text-white flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">System Status</h3>
                        <div className="flex items-center gap-2 text-blue-100 mb-8">
                            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            All Systems Operational
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <p className="text-xs text-blue-200 uppercase mb-1">CPU Usage</p>
                                <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                                    <div className="bg-green-400 h-full w-[24%]" />
                                </div>
                                <p className="text-right text-xs mt-1 font-mono">24%</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <p className="text-xs text-blue-200 uppercase mb-1">Memory Usage</p>
                                <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                                    <div className="bg-yellow-400 h-full w-[65%]" />
                                </div>
                                <p className="text-right text-xs mt-1 font-mono">65%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

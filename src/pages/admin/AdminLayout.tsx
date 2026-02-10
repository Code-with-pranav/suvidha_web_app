import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Database, Users, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminLayout() {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: FileText, label: 'Complaints', path: '/admin/complaints' },
        { icon: Database, label: 'Logs', path: '/admin/logs' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Settings, label: 'Content', path: '/admin/content' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 mesh-bg font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-72 glass-panel m-4 flex flex-col">
                <div className="p-8 border-b border-gray-200">
                    <h1 className="text-2xl font-extrabold text-digital-blue tracking-tight">SUVIDHA</h1>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admin Portal</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-4 px-6 py-4 rounded-xl transition-all font-medium
                                ${isActive
                                    ? 'bg-digital-blue text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-600 hover:bg-white/50 hover:text-digital-blue'
                                }
                            `}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-6 py-4 rounded-xl text-alert-red hover:bg-red-50 w-full font-medium transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 pl-0 overflow-y-auto">
                <div className="h-full glass-panel p-8 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

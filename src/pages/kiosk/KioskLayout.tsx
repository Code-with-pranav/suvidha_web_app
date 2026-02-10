import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSessionTimeout } from '../../hooks/useSessionTimeout';

export default function KioskLayout() {
    // Auto-redirect to home after 2 minutes of inactivity
    useSessionTimeout(120000);

    return (
        <div className="fixed inset-0 w-full h-full mesh-bg flex flex-col overflow-hidden select-none text-gray-900 font-sans">
            <Header />
            <main className="flex-1 overflow-y-auto relative p-6 lg:p-10 flex flex-col">
                <div className="w-full max-w-7xl mx-auto flex-1 h-full flex flex-col">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}

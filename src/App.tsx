
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import KioskLayout from './pages/kiosk/KioskLayout';
import AdminLayout from './pages/admin/AdminLayout';
import KioskHome from './pages/kiosk/Home';
import AdminDashboard from './pages/admin/Dashboard';
import PayBill from './pages/kiosk/PayBill';
import Complaint from './pages/kiosk/Complaint';
import TrackStatus from './pages/kiosk/TrackStatus';
import Login from './pages/kiosk/Login';
import DocumentUpload from './pages/kiosk/DocumentUpload';
import UsageLogs from './pages/admin/UsageLogs';
import ComplaintsMgmt from './pages/admin/ComplaintsMgmt';
import ContentManager from './pages/admin/ContentManager';
import NewConnection from './pages/kiosk/NewConnection';
import PrintReceipt from './pages/kiosk/PrintReceipt';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Kiosk Routes */}
        <Route path="/" element={<KioskLayout />}>
          <Route index element={<KioskHome />} />
          <Route path="auth" element={<Login />} />
          <Route path="pay-bill" element={<PayBill />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="status" element={<TrackStatus />} />
          <Route path="upload" element={<DocumentUpload />} />
          <Route path="/new-connection" element={<NewConnection />} />
          <Route path="/print" element={<PrintReceipt />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="logs" element={<UsageLogs />} />
          <Route path="complaints" element={<ComplaintsMgmt />} />
          <Route path="content" element={<ContentManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

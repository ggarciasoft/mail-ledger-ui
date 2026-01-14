import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { queryClient } from './lib/query-client';
import { useAutoLogin } from './hooks/use-auto-login';
import { useSignalRJobs } from './hooks/use-signalr-jobs';
import { useAuthStore } from './store/auth-store';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import EmailsPage from './pages/EmailsPage';
import ExtractionCandidatesPage from './pages/ExtractionCandidatesPage';
import FinancialRecordsPage from './pages/FinancialRecordsPage';
import ProcessingPage from './pages/ProcessingPage';
import JobsPage from './pages/JobsPage';
import RulesPage from './pages/RulesPage';
import SettingsPage from './pages/SettingsPage';

// Component to handle home route redirect logic
function HomeRoute() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
}

function AppContent() {
  // Auto-login: fetch user data if authenticated
  useAutoLogin();

  // Connect to SignalR for real-time job updates
  useSignalRJobs();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />


        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/emails" element={<EmailsPage />} />
            <Route path="/extraction-candidates" element={<ExtractionCandidatesPage />} />
            <Route path="/financial-records" element={<FinancialRecordsPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;

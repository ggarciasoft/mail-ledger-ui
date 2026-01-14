import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { queryClient } from './lib/query-client';
import { useAutoLogin } from './hooks/use-auto-login';
import { useSignalRJobs } from './hooks/use-signalr-jobs';
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
import { WorkflowPage } from './pages/WorkflowPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SecurityPage from './pages/SecurityPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import ApiPage from './pages/ApiPage';
import PricingPage from './pages/PricingPage';

function AppContent() {
  // Auto-login: fetch user data if authenticated
  useAutoLogin();

  // Connect to SignalR for real-time job updates
  useSignalRJobs();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - Landing page accessible to everyone */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/pricing" element={<PricingPage />} />


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
            <Route path="/workflow" element={<WorkflowPage />} />
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

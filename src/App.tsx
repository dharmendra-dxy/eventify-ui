import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, Star } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { Dashboard } from '@/pages/Dashboard';
import { Events } from '@/pages/Events';
import { Attendees } from '@/pages/Attendees';
import { TicketsPage } from '@/pages/Tickets';
import { Finance } from '@/pages/Finance';
import { Analytics } from '@/pages/Analytics';
import { Calendar } from '@/pages/Calendar';
import { Team } from '@/pages/Team';
import { Settings } from '@/pages/Settings';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { TermsOfService } from '@/pages/TermsOfService';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { AuthProvider } from '@/context/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FFFDF5] font-sans">
          {/* Mobile Header */}
          <header className="lg:hidden bg-[#FFFDF5] border-b-4 border-black p-3 sm:p-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FF6B6B] border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black uppercase">Eventify</span>
                  <AuthStatus />
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 sm:p-3 bg-white border-4 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </header>

          <div className="flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <main className="flex-1 min-h-screen lg:ml-0 flex flex-col">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/attendees" element={<Attendees />} />
                  <Route path="/tickets" element={<TicketsPage />} />
                  <Route path="/finance" element={<Finance />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>

              {/* Footer */}
              <Footer />
            </main>
          </div>

          {/* Floating Chatbot */}
          <Chatbot />

          {/* Keyboard Shortcuts */}
          <KeyboardShortcuts />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

const AuthStatus = () => {
  const { isLoggedIn, user } = useAuth();
  return (
    <p className="text-xs text-black/60 font-medium">
      {isLoggedIn ? user?.name : 'Guest'}
    </p>
  );
};

export default App;
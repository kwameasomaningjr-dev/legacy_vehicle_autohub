import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PhoneProvider } from './context/PhoneContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Scroll to top automatically on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <PhoneProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
          <ScrollToTop />
          
          {/* Sticky Header Nav */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Persistent Floating WhatsApp CTA (hidden on admin pages for clean UI) */}
          {!isAdminRoute && <WhatsAppFloat />}

          {/* Global Footer */}
          <Footer />
        </div>
      </PhoneProvider>
    </ThemeProvider>
  );
}

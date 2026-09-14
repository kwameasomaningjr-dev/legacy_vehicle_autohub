import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

// Scroll to top automatically on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-dark-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
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
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Persistent Floating WhatsApp CTA */}
        <WhatsAppFloat />

        {/* Global Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

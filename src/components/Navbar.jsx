import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ShieldCheck, MessageSquare, Sun, Moon, Lock } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';
import { useTheme } from '../context/ThemeContext';
import { useCars } from '../context/CarContext';
import { usePhoneModal } from '../context/PhoneContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAdminAuthenticated } = useCars();
  const { openPhoneModal } = usePhoneModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Fleet', path: '/cars' },
    { name: 'About Us', path: '/about' },
    { name: 'Terms of Use', path: '/terms' },
    { name: 'Contact & Booking', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-2.5 shadow-md dark:shadow-xl' : 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-md py-3.5 border-b border-slate-200 dark:border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo Image */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white p-1 shadow-md dark:shadow-lg dark:shadow-brand-500/20 group-hover:scale-105 transition-transform border border-brand-500/30">
              <img
                src="/logo-gold-navy.jpg"
                alt="Legacy Vehicle Hub Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  LEGACY
                </span>
                <span className="font-bold text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/30 uppercase">
                  Ghana
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase">VEHICLE HUB</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-dark-800/80 p-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-brand-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Admin Portal Lock Icon Button */}
            <Link
              to={isAdminAuthenticated ? '/admin' : '/admin/login'}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 border border-slate-300 dark:border-slate-700 transition-colors"
              title={isAdminAuthenticated ? 'Admin Dashboard' : 'Admin Portal Login'}
            >
              <Lock className="w-4 h-4" />
            </Link>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-all hover:scale-105"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="hidden xl:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden xl:inline">Dark</span>
                </>
              )}
            </button>

            <button
              onClick={openPhoneModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-colors"
              title="View & Call Support Phone Numbers"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span className="hidden xl:inline">{DEFAULT_PHONE_DISPLAY}</span>
            </button>

            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile / Tablet Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to={isAdminAuthenticated ? '/admin' : '/admin/login'}
              className="p-2 rounded-lg bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
              title="Admin Portal"
            >
              <Lock className="w-4.5 h-4.5" />
            </Link>

            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-slate-100 dark:bg-dark-800 text-amber-500 dark:text-amber-400 border border-slate-300 dark:border-slate-700"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            <button
              onClick={openPhoneModal}
              className="p-2 rounded-lg bg-slate-100 dark:bg-dark-800 text-brand-500 border border-slate-300 dark:border-slate-700 hover:scale-105 transition-transform"
              aria-label="Open Phone Numbers"
              title="View & Call Support Phone Numbers"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive(link.path)
                    ? 'bg-brand-500 text-slate-950 font-bold'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <ShieldCheck className="w-5 h-5" />}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
            <Link
              to={isAdminAuthenticated ? '/admin' : '/admin/login'}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-brand-600 dark:text-brand-400 border border-brand-500/30 font-semibold text-xs"
            >
              <Lock className="w-4 h-4" />
              <span>{isAdminAuthenticated ? 'Admin Dashboard' : 'Admin Portal Login'}</span>
            </Link>

            {/* Theme toggle option inside mobile drawer */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-sm"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/30">
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPhoneModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-dark-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>Call Direct Lines ({DEFAULT_PHONE_DISPLAY})</span>
            </button>

            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us ({DEFAULT_PHONE_DISPLAY})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

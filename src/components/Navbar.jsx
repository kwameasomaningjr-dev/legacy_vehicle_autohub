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
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-2.5 shadow-md' : 'bg-card/90 backdrop-blur-md py-3.5 border-b border-border'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo Image */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden group-hover:scale-105 transition-transform flex items-center justify-center p-0.5">
              <img
                src="/logo-gold-navy.jpg"
                alt="Legacy Vehicle Hub Logo"
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen rounded-lg"
              />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground group-hover:text-primary transition-colors block leading-none">
                LEGACY
              </span>
              <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-0.5">VEHICLE HUB</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-muted/80 p-1.5 rounded-full border border-border shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-card/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons & Admin */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Admin Portal Lock Icon Button */}
            <Link
              to={isAdminAuthenticated ? '/admin' : '/admin/login'}
              className="p-2 rounded-xl bg-muted hover:bg-card text-foreground hover:text-primary border border-border transition-colors shrink-0"
              title={isAdminAuthenticated ? 'Admin Dashboard' : 'Admin Portal Login'}
            >
              <Lock className="w-4 h-4" />
            </Link>

            <button
              onClick={openPhoneModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted hover:bg-card text-foreground border border-border text-xs font-semibold whitespace-nowrap transition-colors shrink-0"
              title="View & Call Support Phone Numbers"
            >
              <Phone className="w-3.5 h-3.5 text-secondary" />
              <span className="hidden xl:inline whitespace-nowrap">{DEFAULT_PHONE_DISPLAY}</span>
            </button>

            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:opacity-90 text-primary-foreground text-xs font-bold whitespace-nowrap shadow-md transition-all hover:scale-[1.02] shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile / Tablet Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to={isAdminAuthenticated ? '/admin' : '/admin/login'}
              className="p-2 rounded-lg bg-muted text-foreground border border-border"
              title="Admin Portal"
            >
              <Lock className="w-4.5 h-4.5" />
            </Link>

            <button
              onClick={openPhoneModal}
              className="p-2 rounded-lg bg-muted text-secondary border border-border hover:scale-105 transition-transform"
              aria-label="Open Phone Numbers"
              title="View & Call Support Phone Numbers"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-muted text-foreground border border-border focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-border px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <ShieldCheck className="w-5 h-5" />}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2.5">
            <Link
              to={isAdminAuthenticated ? '/admin' : '/admin/login'}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-muted text-foreground border border-border font-semibold text-xs"
            >
              <Lock className="w-4 h-4" />
              <span>{isAdminAuthenticated ? 'Admin Dashboard' : 'Admin Portal Login'}</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPhoneModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-muted text-foreground border border-border font-semibold text-xs hover:bg-card transition-colors"
            >
              <Phone className="w-4 h-4 text-secondary" />
              <span>Call Direct Lines ({DEFAULT_PHONE_DISPLAY})</span>
            </button>

            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md"
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

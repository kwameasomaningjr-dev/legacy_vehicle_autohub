import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ShieldCheck, MessageSquare } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-2.5 shadow-xl' : 'bg-dark-900/90 backdrop-blur-md py-3.5 border-b border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo Image */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white p-1 shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform border border-brand-500/30">
              <img
                src="/logo.jpeg"
                alt="Legacy Vehicle Hub Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-500 transition-colors">
                  LEGACY
                </span>
                <span className="font-bold text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30 uppercase">
                  Ghana
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">VEHICLE HUB</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-dark-800/80 p-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-brand-500 text-dark-900 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href={`tel:${DEFAULT_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>{DEFAULT_PHONE_DISPLAY}</span>
            </a>

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

          {/* Mobile / Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${DEFAULT_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="p-2 rounded-lg bg-dark-800 text-brand-500 border border-slate-700"
              aria-label="Call Us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-800 text-slate-200 hover:text-white border border-slate-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive(link.path)
                    ? 'bg-brand-500 text-dark-900 font-bold'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <ShieldCheck className="w-5 h-5" />}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <a
              href={`tel:${DEFAULT_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-dark-800 text-slate-200 border border-slate-700 font-semibold text-xs"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>Call Main Line: {DEFAULT_PHONE_DISPLAY}</span>
            </a>

            <a
              href={`tel:${SECONDARY_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-dark-800 text-slate-200 border border-slate-700 font-semibold text-xs"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>Call Line 2: {SECONDARY_PHONE_DISPLAY}</span>
            </a>

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

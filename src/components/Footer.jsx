import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-slate-800 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 shadow-lg shadow-brand-500/20 border border-brand-500/30">
                <img
                  src="/logo.jpeg"
                  alt="Legacy Vehicle Hub Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">LEGACY</span>
                <p className="text-[10px] text-brand-400 font-bold tracking-widest uppercase">VEHICLE HUB GHANA</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ghana's premier self-drive and executive chauffeur vehicle rental service. Providing pristine SUVs, luxury sedans, and group shuttles across Greater Accra and all regional corridors.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <Shield className="w-4 h-4" />
              <span>Fully Insured & Sanitized Fleet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-500 transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-brand-500 transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                  <span>Explore Our Fleet</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-500 transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                  <span>About Legacy Vehicle Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-500 transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                  <span>Terms of Use & Policies</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-500 transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                  <span>Bookings & Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Travel Coverage */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold tracking-wide uppercase">Ghana Travel Scope</h3>
            <p className="text-xs text-slate-400">
              We operate transparent dual-tier pricing for local and long-distance travel:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span><strong className="text-slate-200">Inside Accra:</strong> Greater Accra Metro, KIA Airport, Tema, Spintex, East Legon.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span><strong className="text-slate-200">Outside Accra:</strong> Kumasi, Takoradi, Cape Coast, Ho, Sunyani, Tamale.</span>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold tracking-wide uppercase">Tema Office</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Redemption Road, Community 9, Tema, Ghana
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-500 shrink-0 mt-1" />
                <div className="space-y-1">
                  <a href={`tel:${DEFAULT_PHONE_DISPLAY.replace(/\s+/g, '')}`} className="hover:text-white transition-colors block">
                    <strong className="text-slate-200">WhatsApp/Main:</strong> {DEFAULT_PHONE_DISPLAY}
                  </a>
                  <a href={`tel:${SECONDARY_PHONE_DISPLAY.replace(/\s+/g, '')}`} className="hover:text-white transition-colors block text-xs">
                    <strong className="text-slate-200">Dispatch Line 2:</strong> {SECONDARY_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="mailto:info@legacyvehiclehubgh.com" className="hover:text-white transition-colors text-xs">
                  info@legacyvehiclehubgh.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="text-xs">Mon - Sun: 24/7 Dispatch Desk</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Legacy Vehicle Hub Ghana. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              WhatsApp Concierge ({DEFAULT_PHONE_DISPLAY})
            </a>
            <Link to="/terms" className="hover:text-slate-300">
              Terms of Use & Guidelines
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

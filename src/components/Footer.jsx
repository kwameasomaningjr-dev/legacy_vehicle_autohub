import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';
import { usePhoneModal } from '../context/PhoneContext';

export default function Footer() {
  const { openPhoneModal } = usePhoneModal();
  return (
    <footer className="bg-card text-card-foreground border-t border-border pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-border">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted p-1 shadow-lg border border-border">
                <img
                  src="/logo-gold-navy.jpg"
                  alt="Legacy Vehicle Hub Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-foreground">LEGACY</span>
                <p className="text-[10px] text-secondary font-bold tracking-widest uppercase">VEHICLE HUB GHANA</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ghana's premier self-drive and executive chauffeur vehicle rental service. Providing pristine SUVs, luxury sedans, and group shuttles across Greater Accra and all regional corridors.
            </p>
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-semibold">
              <Shield className="w-4 h-4" />
              <span>Fully Insured & Sanitized Fleet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground text-base font-bold tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  <span>Explore Our Fleet</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  <span>About Legacy Vehicle Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  <span>Terms of Use & Policies</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  <span>Bookings & Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Travel Coverage */}
          <div className="space-y-4">
            <h3 className="text-foreground text-base font-bold tracking-wide uppercase">Ghana Travel Scope</h3>
            <p className="text-xs text-muted-foreground">
              We operate transparent dual-tier pricing for local and long-distance travel:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Inside Accra:</strong> Greater Accra Metro, Tema, Spintex, East Legon, Cantonments.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Outside Accra:</strong> Kumasi, Takoradi, Cape Coast, Ho, Sunyani, Tamale.</span>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-foreground text-base font-bold tracking-wide uppercase">Tema Office</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Redemption Road, Community 9, Tema, Ghana
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0 mt-1" />
                <div className="space-y-1">
                  <button onClick={openPhoneModal} className="text-muted-foreground hover:text-foreground transition-colors block text-left">
                    <strong className="text-foreground">WhatsApp/Main:</strong> {DEFAULT_PHONE_DISPLAY}
                  </button>
                  <button onClick={openPhoneModal} className="text-muted-foreground hover:text-foreground transition-colors block text-xs text-left">
                    <strong className="text-foreground">Dispatch Line 2:</strong> {SECONDARY_PHONE_DISPLAY}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info%40legacyvehiclehubgh.com&su=Vehicle%20Rental%20Inquiry&body=Hello%20Legacy%20Vehicle%20Hub%2C%0A%0AI%20would%20like%20to%20make%20a%20vehicle%20rental%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                >
                  info@legacyvehiclehubgh.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-xs text-muted-foreground">Mon - Sun: 24/7 Dispatch Desk</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Legacy Vehicle Hub Ghana. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              WhatsApp Concierge ({DEFAULT_PHONE_DISPLAY})
            </a>
            <Link to="/terms" className="hover:text-foreground">
              Terms of Use & Guidelines
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

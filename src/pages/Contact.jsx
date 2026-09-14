import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Moon, Sun } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen pt-24 pb-16 space-y-12 transition-colors duration-300 ${isDark ? 'bg-dark-900 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-xs shadow-lg transition-all ${
              isDark ? 'border-white/10 bg-dark-700 text-white hover:bg-dark-600' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-100'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-brand-400" /> : <Moon className="w-4 h-4 text-brand-500" />}
            <span>{isDark ? 'White Theme' : 'Dark Theme'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`glass-card p-5 rounded-2xl border ${isDark ? 'border-white/10' : 'border-slate-200'} space-y-3`}>
            <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center`}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>WhatsApp & Main Line</h4>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Primary Booking Hotline</p>
            </div>
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-bold ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-900'} hover:underline block`}
            >
              {DEFAULT_PHONE_DISPLAY}
            </a>
          </div>

          <div className={`glass-card p-5 rounded-2xl border ${isDark ? 'border-white/10' : 'border-slate-200'} space-y-3`}>
            <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-brand-500/20 text-brand-400' : 'bg-amber-100 text-amber-700'} flex items-center justify-center`}>
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dispatch Line 2</h4>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Secondary Support Line</p>
            </div>
            <a href={`tel:${SECONDARY_PHONE_DISPLAY.replace(/\s+/g, '')}`} className={`text-xs font-bold ${isDark ? 'text-brand-400 hover:text-brand-300' : 'text-brand-700 hover:text-brand-900'} hover:underline block`}>
              {SECONDARY_PHONE_DISPLAY}
            </a>
          </div>

          <div className={`glass-card p-5 rounded-2xl border ${isDark ? 'border-white/10' : 'border-slate-200'} space-y-3`}>
            <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-brand-500/20 text-brand-400' : 'bg-amber-100 text-amber-700'} flex items-center justify-center`}>
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Tema Office</h4>
              <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className={`text-xs ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>
                Redemption Road, Community 9, Tema
              </a>
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} block`}>Greater Accra Region, Ghana</span>
          </div>

          <div className={`glass-card p-5 rounded-2xl border ${isDark ? 'border-white/10' : 'border-slate-200'} space-y-3`}>
            <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-brand-500/20 text-brand-400' : 'bg-amber-100 text-amber-700'} flex items-center justify-center`}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dispatch Hours</h4>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pickup & Drop-offs</p>
            </div>
            <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'} block`}>Open 24 Hours / 7 Days</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-12 space-y-4">
            <div className={`glass-card p-4 rounded-3xl border ${isDark ? 'border-white/10' : 'border-slate-200'} space-y-3 shadow-xl`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                  <MapPin className={`w-4 h-4 ${isDark ? 'text-brand-400' : 'text-brand-700'}`} />
                  <span>Tema Fleet Headquarters</span>
                </h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${isDark ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-emerald-700 bg-emerald-50 border border-emerald-200'}`}>Open 24/7</span>
              </div>

              <div className={`relative h-80 sm:h-96 rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-dark-900' : 'border-slate-200 bg-white'}`}>
                <iframe
                  title="Legacy Vehicle Hub, Driving School, Tema Location Map"
                  src="https://www.google.com/maps?q=Legacy+Vehicle+Hub%2C+Driving+School%2C+Tema&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} space-y-1`}>
                <p><strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>Address:</strong> <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className={isDark ? 'hover:text-white transition-colors' : 'hover:text-slate-900 transition-colors'}>Redemption Road, Community 9, Tema, Ghana.</a></p>
                <p><strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>WhatsApp / Main:</strong> {DEFAULT_PHONE_DISPLAY}</p>
                <p><strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>Dispatch Line 2:</strong> {SECONDARY_PHONE_DISPLAY}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

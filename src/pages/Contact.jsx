import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">WhatsApp & Main Line</h4>
              <p className="text-xs text-slate-400">Primary Booking Hotline</p>
            </div>
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-400 hover:underline block"
            >
              {DEFAULT_PHONE_DISPLAY}
            </a>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dispatch Line 2</h4>
              <p className="text-xs text-slate-400">Secondary Support Line</p>
            </div>
            <a href={`tel:${SECONDARY_PHONE_DISPLAY.replace(/\s+/g, '')}`} className="text-xs font-bold text-brand-400 hover:underline block">
              {SECONDARY_PHONE_DISPLAY}
            </a>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Tema Office</h4>
              <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors">
                Redemption Road, Community 9, Tema
              </a>
            </div>
            <span className="text-xs font-medium text-slate-300 block">Greater Accra Region, Ghana</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dispatch Hours</h4>
              <p className="text-xs text-slate-400">Pickup & Drop-offs</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 block">Open 24 Hours / 7 Days</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-12 space-y-4">
            <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  <span>Tema Fleet Headquarters</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Open 24/7
                </span>
              </div>

              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/10 bg-dark-900">
                <iframe
                  title="Legacy Vehicle Hub, Driving School, Tema Location Map"
                  src="https://www.google.com/maps?q=Legacy+Vehicle+Hub%2C+Driving+School%2C+Tema&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="text-xs text-slate-400 space-y-1">
                <p><strong className="text-slate-200">Address:</strong> <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Redemption Road, Community 9, Tema, Ghana.</a></p>
                <p><strong className="text-slate-200">WhatsApp / Main:</strong> {DEFAULT_PHONE_DISPLAY}</p>
                <p><strong className="text-slate-200">Dispatch Line 2:</strong> {SECONDARY_PHONE_DISPLAY}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

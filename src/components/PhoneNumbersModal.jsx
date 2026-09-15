import React, { useState } from 'react';
import { X, Phone, MessageSquare, Copy, Check, ShieldCheck, Clock, PhoneCall } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';

export default function PhoneNumbersModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const phoneLines = [
    {
      title: "Main Support & WhatsApp Line",
      number: DEFAULT_PHONE_DISPLAY,
      cleanNumber: DEFAULT_PHONE_DISPLAY.replace(/\s+/g, ''),
      tag: "Primary / 24-7",
      description: "For vehicle bookings, rental rate inquiries, availability & instant concierge support.",
    },
    {
      title: "Dispatch & Airport Transfer Line 2",
      number: SECONDARY_PHONE_DISPLAY,
      cleanNumber: SECONDARY_PHONE_DISPLAY.replace(/\s+/g, ''),
      tag: "Secondary Line",
      description: "Direct dispatch desk for driver routing, airport pickups & urgent assistance.",
    }
  ];

  const handleCopy = (number, index) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-dark-900/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-dark-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Contact & Support Lines</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Legacy Vehicle Hub Ghana</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-300 dark:border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            Select a phone number below to call directly, chat on WhatsApp, or copy to your clipboard:
          </p>

          <div className="space-y-3">
            {phoneLines.map((line, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 dark:bg-dark-900/70 p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3 hover:border-brand-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/15 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/30 uppercase tracking-wider">
                      {line.tag}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">{line.title}</h4>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>24/7 Active</span>
                  </div>
                </div>

                {/* Display Number Box */}
                <div className="flex items-center justify-between bg-white dark:bg-dark-800 p-3 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                  <a
                    href={`tel:${line.cleanNumber}`}
                    className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors tracking-wide"
                  >
                    {line.number}
                  </a>

                  <button
                    onClick={() => handleCopy(line.number, idx)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-dark-700 dark:hover:bg-dark-600 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 transition-colors shrink-0"
                    title="Copy phone number"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {line.description}
                </p>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${line.cleanNumber}`}
                    className="py-2.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={buildWhatsAppUrl(line.cleanNumber, generateGeneralInquiryMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white/20" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-dark-900/50 border border-slate-200 dark:border-white/5 flex items-center gap-2.5 text-[11px] text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
            <span>Official Ghana vehicle support desk. Fast response guaranteed.</span>
          </div>

        </div>

      </div>
    </div>
  );
}

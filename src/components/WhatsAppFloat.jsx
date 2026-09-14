import React from 'react';
import { MessageSquare } from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';

export default function WhatsAppFloat() {
  const whatsappUrl = buildWhatsAppUrl(
    DEFAULT_WHATSAPP_NUMBER,
    generateGeneralInquiryMessage()
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Legacy Auto Hub on WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 p-3.5 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 border border-emerald-400/40 transition-all duration-300 hover:scale-105 animate-pulse-subtle"
    >
      <div className="relative">
        <MessageSquare className="w-6 h-6 fill-white/20 stroke-[2.2]" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
      </div>

      <span className="hidden sm:inline-block text-xs font-bold tracking-wide pr-1">
        Need Instant Booking? Chat Us
      </span>
    </a>
  );
}

import React, { useState } from 'react';
import { Users, Fuel, ShieldAlert, Wind, MessageSquare, Eye, Mail } from 'lucide-react';
import { buildWhatsAppUrl, generateCarBookingMessage } from '../utils/whatsapp';
import EmailBookingModal from './EmailBookingModal';

export default function CarCard({ car, scope = "Inside Accra", onSelect }) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const currentRate = scope === "Outside Accra" ? car.rateOutsideAccra : car.rateInsideAccra;
  
  const whatsappUrl = buildWhatsAppUrl(
    undefined,
    generateCarBookingMessage({ carName: car.name, travelScope: scope })
  );

  return (
    <>
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-brand-500/50 dark:hover:border-brand-500/40 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-md dark:shadow-lg">
        
        {/* Vehicle Image Container */}
        <div className="relative h-52 overflow-hidden bg-slate-200 dark:bg-dark-800">
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Category & Status Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-dark-900/80 backdrop-blur-md text-brand-600 dark:text-brand-400 border border-brand-500/30 uppercase tracking-wider shadow-sm">
              {car.category}
            </span>
            {car.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-500 text-slate-950 shadow-md">
                Featured
              </span>
            )}
          </div>

          {/* AC Badge */}
          {car.hasAC && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-dark-900/80 backdrop-blur-md text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <Wind className="w-3 h-3" />
              <span>AirCon</span>
            </div>
          )}

          {/* Transmission Pill overlay */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900/80 dark:bg-dark-900/80 backdrop-blur-md text-white border border-white/10">
            {car.transmission}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {car.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{car.year} Model • {car.fuelType}</p>
              </div>
            </div>

            {/* Quick Specs Icons */}
            <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{car.seats} Seats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Fuel className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified</span>
              </div>
            </div>

            {/* Rate Section */}
            <div className="bg-slate-100/90 dark:bg-dark-800/80 p-3 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block uppercase tracking-wider">
                  {scope} Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                    GH₵ {currentRate.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ day</span>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-500 dark:text-slate-400">
                <span className="block text-slate-600 dark:text-slate-300">Alternate:</span>
                <span className="text-brand-600 dark:text-brand-400 font-medium">
                  GH₵ {(scope === "Outside Accra" ? car.rateInsideAccra : car.rateOutsideAccra).toLocaleString()} ({scope === "Outside Accra" ? "Inside" : "Outside"})
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelect(car)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-slate-800 dark:text-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300 dark:border-white/10 transition-colors"
              >
                <Eye className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>View Specs</span>
              </button>

              <button
                onClick={() => setEmailModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-brand-500 hover:text-slate-950 dark:bg-dark-700 dark:hover:bg-brand-500 dark:hover:text-dark-900 text-slate-800 dark:text-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5 border border-brand-500/30 transition-all"
              >
                <Mail className="w-4 h-4 text-brand-600 dark:text-brand-400 group-hover:text-slate-950 dark:group-hover:text-dark-900" />
                <span>Email Book</span>
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Book via WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

      {/* Email Booking Modal */}
      {emailModalOpen && (
        <EmailBookingModal
          car={car}
          defaultScope={scope}
          onClose={() => setEmailModalOpen(false)}
        />
      )}
    </>
  );
}

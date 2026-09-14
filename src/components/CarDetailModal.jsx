import React, { useState } from 'react';
import { X, CheckCircle2, Users, Fuel, Wind, Car, ShieldCheck, Phone, MessageSquare, Mail, Calendar, FileText } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, buildWhatsAppUrl, generateCarBookingMessage } from '../utils/whatsapp';
import EmailBookingModal from './EmailBookingModal';

export default function CarDetailModal({ car, defaultScope = "Inside Accra", onClose }) {
  if (!car) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [scope, setScope] = useState(defaultScope);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const currentRate = scope === "Outside Accra" ? car.rateOutsideAccra : car.rateInsideAccra;

  const whatsappUrl = buildWhatsAppUrl(
    undefined,
    generateCarBookingMessage({
      carName: car.name,
      travelScope: scope,
      pickupDate,
      returnDate
    })
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-slate-900/60 dark:bg-dark-900/80 backdrop-blur-md animate-in fade-in duration-200">
        
        {/* Backdrop overlay */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <div className="relative w-full max-w-4xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-900 dark:text-slate-100 flex flex-col max-h-[90vh] transition-colors duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-dark-900/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/30 uppercase">
                  {car.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{car.year} Model</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">{car.name}</h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-300 dark:border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
            
            {/* Gallery Section */}
            <div className="space-y-3">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10">
                <img
                  src={car.images[activeImageIndex] || car.images[0]}
                  alt={`${car.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 dark:bg-dark-900/80 backdrop-blur-md text-white border border-white/10">
                  Photo {activeImageIndex + 1} of {car.images.length}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {car.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {car.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? 'border-brand-500 scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rate Selector & Travel Scope */}
            <div className="bg-slate-100 dark:bg-gradient-to-r dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 p-5 rounded-2xl border border-slate-200 dark:border-brand-500/20 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider block">
                    Dynamic Travel Scope Rate
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      GH₵ {currentRate.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">/ day</span>
                  </div>
                </div>

                {/* Scope Toggle */}
                <div className="bg-white dark:bg-dark-900 p-1.5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-1 self-start sm:self-auto shadow-sm">
                  <button
                    onClick={() => setScope("Inside Accra")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      scope === "Inside Accra"
                        ? 'bg-brand-500 text-slate-950 shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Inside Accra (GH₵ {car.rateInsideAccra})
                  </button>
                  <button
                    onClick={() => setScope("Outside Accra")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      scope === "Outside Accra"
                        ? 'bg-brand-500 text-slate-950 shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Outside Accra (GH₵ {car.rateOutsideAccra})
                  </button>
                </div>
              </div>

              {/* Quick Optional Dates Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-white/5">
                <div>
                  <label className="text-xs text-slate-600 dark:text-slate-400 font-medium block mb-1">Pickup Date (Optional)</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 dark:text-slate-400 font-medium block mb-1">Return Date (Optional)</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-100 dark:bg-dark-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 space-y-1">
                <Users className="w-5 h-5 text-brand-600 dark:text-brand-400 mx-auto" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Passenger Seats</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{car.seats} Persons</span>
              </div>
              <div className="bg-slate-100 dark:bg-dark-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 space-y-1">
                <Car className="w-5 h-5 text-brand-600 dark:text-brand-400 mx-auto" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Transmission</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{car.transmission}</span>
              </div>
              <div className="bg-slate-100 dark:bg-dark-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 space-y-1">
                <Fuel className="w-5 h-5 text-brand-600 dark:text-brand-400 mx-auto" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Fuel Type</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{car.fuelType}</span>
              </div>
              <div className="bg-slate-100 dark:bg-dark-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 space-y-1">
                <Wind className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Air Conditioning</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{car.hasAC ? 'Full Climate AC' : 'Standard'}</span>
              </div>
            </div>

            {/* Overview Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Vehicle Description</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-100 dark:bg-dark-900/40 p-4 rounded-xl border border-slate-200 dark:border-white/5">
                {car.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Included Equipment & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {car.features.map((ft, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-dark-900/70 p-2.5 rounded-xl border border-slate-200 dark:border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ghana Rental Terms & Policies */}
            <div className="bg-slate-100 dark:bg-dark-900 p-4 rounded-2xl border border-slate-300 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Standard Ghana Rental Requirements & Policy</span>
              </div>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li><strong className="text-slate-900 dark:text-white">Identification:</strong> Valid Ghana Card, Passport, or International Driver's License required.</li>
                <li><strong className="text-slate-900 dark:text-white">Chauffeur Option:</strong> Professional background-checked Ghanaian driver available upon request.</li>
                <li><strong className="text-slate-900 dark:text-white">Security Deposit:</strong> Standard refundable security deposit required prior to key handoff.</li>
                <li><strong className="text-slate-900 dark:text-white">Fuel Policy:</strong> Vehicles are handed over with fuel and returned at identical level.</li>
              </ul>
            </div>

          </div>

          {/* Modal Footer CTAs */}
          <div className="p-4 sm:p-6 bg-slate-100 dark:bg-dark-900 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Rental Estimate ({scope}):</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">GH₵ {currentRate.toLocaleString()} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ day</span></span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowEmailModal(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-200 hover:bg-brand-500 hover:text-slate-950 dark:bg-dark-800 dark:hover:bg-brand-500 dark:hover:text-dark-900 border border-brand-500/40 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4 text-brand-600 dark:text-brand-400 group-hover:text-slate-950 dark:group-hover:text-dark-900" />
                <span>Email Booking Request</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>WhatsApp Booking Inquiry</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Email Booking Modal */}
      {showEmailModal && (
        <EmailBookingModal
          car={car}
          defaultScope={scope}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, Users, Fuel, Wind, Car, ShieldCheck, Phone, MessageSquare, Mail, Calendar, FileText, CalendarCheck, Ban } from 'lucide-react';
import { DEFAULT_PHONE_DISPLAY, buildWhatsAppUrl, generateCarBookingMessage } from '../utils/whatsapp';
import { useCars } from '../context/CarContext';
import EmailBookingModal from './EmailBookingModal';

export default function CarDetailModal({ car, defaultScope = "Inside Accra", onClose }) {
  if (!car) return null;

  const { addInquiry } = useCars();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [scope, setScope] = useState(defaultScope);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const isBookedOut = car.isAvailable === false;
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

  const handleWhatsAppClick = () => {
    addInquiry({
      customerName: 'WhatsApp Client (Modal Specs)',
      phone: 'Direct WhatsApp',
      email: 'N/A',
      carName: car.name,
      travelScope: scope,
      estimatedRate: `GH₵ ${currentRate.toLocaleString()}`,
      pickupDate: pickupDate || 'Not specified',
      returnDate: returnDate || 'Not specified',
      channel: 'WhatsApp',
      notes: 'Initiated from Car Detail Modal.'
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
        
        {/* Backdrop overlay */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <div className="relative w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-card-foreground flex flex-col max-h-[90vh] transition-colors duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-secondary/20 text-secondary-foreground border border-secondary/30 uppercase">
                  {car.category}
                </span>
                <span className="text-xs text-muted-foreground font-medium">{car.year} Model</span>
                {isBookedOut && (
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-destructive text-destructive-foreground flex items-center gap-1">
                    <Ban className="w-3.5 h-3.5" />
                    <span>Booked Out</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground mt-1">{car.name}</h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-muted hover:bg-card text-foreground transition-colors border border-border"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
            
            {/* Booked Out Banner if unavailable */}
            {isBookedOut && (
              <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive space-y-1">
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <Ban className="w-5 h-5" />
                  <span>Vehicle Currently Unavailable / Booked Out</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  This vehicle has been marked as booked out by our dispatch admin. Please check back later or select another available vehicle from our fleet.
                </p>
              </div>
            )}

            {/* Gallery Section */}
            <div className="space-y-3">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-muted border border-border">
                <img
                  src={car.images[activeImageIndex] || car.images[0]}
                  alt={`${car.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-card/90 backdrop-blur-md text-card-foreground border border-border">
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
                        activeImageIndex === idx ? 'border-primary scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rate Selector & Travel Scope */}
            <div className="bg-muted p-5 rounded-2xl border border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-primary font-bold uppercase tracking-wider block">
                    Dynamic Travel Scope Rate
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-foreground">
                      GH₵ {currentRate.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/ day</span>
                  </div>
                </div>

                {/* Scope Toggle */}
                <div className="bg-card p-1.5 rounded-xl border border-border flex items-center gap-1 self-start sm:self-auto shadow-sm">
                  <button
                    onClick={() => setScope("Inside Accra")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      scope === "Inside Accra"
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Inside Accra (GH₵ {car.rateInsideAccra})
                  </button>
                  <button
                    onClick={() => setScope("Outside Accra")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      scope === "Outside Accra"
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Outside Accra (GH₵ {car.rateOutsideAccra})
                  </button>
                </div>
              </div>

              {/* Quick Optional Dates Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border">
                <div>
                  <label className="text-xs text-muted-foreground font-medium block mb-1">Pickup Date (Optional)</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium block mb-1">Return Date (Optional)</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Quick Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-muted p-3.5 rounded-xl border border-border space-y-1">
                <Users className="w-5 h-5 text-primary mx-auto" />
                <span className="text-[11px] text-muted-foreground block">Passenger Seats</span>
                <span className="text-sm font-bold text-foreground">{car.seats} Persons</span>
              </div>
              <div className="bg-muted p-3.5 rounded-xl border border-border space-y-1">
                <Car className="w-5 h-5 text-primary mx-auto" />
                <span className="text-[11px] text-muted-foreground block">Transmission</span>
                <span className="text-sm font-bold text-foreground">{car.transmission}</span>
              </div>
              <div className="bg-muted p-3.5 rounded-xl border border-border space-y-1">
                <Fuel className="w-5 h-5 text-primary mx-auto" />
                <span className="text-[11px] text-muted-foreground block">Fuel Type</span>
                <span className="text-sm font-bold text-foreground">{car.fuelType}</span>
              </div>
              <div className="bg-muted p-3.5 rounded-xl border border-border space-y-1">
                <Wind className="w-5 h-5 text-emerald-600 mx-auto" />
                <span className="text-[11px] text-muted-foreground block">Air Conditioning</span>
                <span className="text-sm font-bold text-emerald-600">{car.hasAC ? 'Full Climate AC' : 'Standard'}</span>
              </div>
            </div>

            {/* Overview Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Vehicle Description</h3>
              <p className="text-sm text-foreground/90 leading-relaxed bg-muted p-4 rounded-xl border border-border">
                {car.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Included Equipment & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {car.features.map((ft, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-foreground bg-muted p-2.5 rounded-xl border border-border">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ghana Rental Terms & Policies */}
            <div className="bg-muted p-4 rounded-2xl border border-border space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Standard Ghana Rental Requirements & Policy</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
                <li><strong className="text-foreground">Identification:</strong> Valid Ghana Card, Passport, or International Driver's License required.</li>
                <li><strong className="text-foreground">Chauffeur Option:</strong> Professional background-checked Ghanaian driver available upon request.</li>
                <li><strong className="text-foreground">Security Deposit:</strong> Standard refundable security deposit required prior to key handoff.</li>
                <li><strong className="text-foreground">Fuel Policy:</strong> Vehicles are handed over with fuel and returned at identical level.</li>
              </ul>
            </div>

          </div>

          {/* Modal Footer CTAs */}
          <div className="p-4 sm:p-6 bg-muted border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-muted-foreground block">Total Rental Estimate ({scope}):</span>
              <span className="text-xl font-extrabold text-foreground">GH₵ {currentRate.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ day</span></span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {isBookedOut ? (
                <span className="px-5 py-2.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/30 font-bold text-xs">
                  Bookings Closed for this Vehicle
                </span>
              ) : (
                <Link
                  to={`/contact?car=${car.id}&scope=${encodeURIComponent(scope)}`}
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Now</span>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

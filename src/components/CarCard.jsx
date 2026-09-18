import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Fuel, ShieldAlert, Wind, MessageSquare, Eye, Mail, CalendarCheck, Ban } from 'lucide-react';
import { buildWhatsAppUrl, generateCarBookingMessage } from '../utils/whatsapp';
import { useCars } from '../context/CarContext';
import EmailBookingModal from './EmailBookingModal';

export default function CarCard({ car, scope = "Inside Accra", onSelect }) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const { addInquiry } = useCars();

  const isBookedOut = car.isAvailable === false;
  const currentRate = scope === "Outside Accra" ? car.rateOutsideAccra : car.rateInsideAccra;
  
  const whatsappUrl = buildWhatsAppUrl(
    undefined,
    generateCarBookingMessage({ carName: car.name, travelScope: scope })
  );

  const handleWhatsAppClick = () => {
    addInquiry({
      customerName: 'WhatsApp Client',
      phone: 'Direct WhatsApp',
      email: 'N/A',
      carName: car.name,
      travelScope: scope,
      estimatedRate: `GH₵ ${currentRate.toLocaleString()}`,
      channel: 'WhatsApp',
      notes: 'Initiated directly from vehicle fleet card.'
    });
  };

  return (
    <>
      <div className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-md ${
        isBookedOut ? 'border-destructive/40 bg-card/60 opacity-90' : 'border-border hover:border-primary'
      }`}>
        
        {/* Vehicle Image Container */}
        <div className="relative h-52 overflow-hidden bg-muted">
          <img
            src={car.images[0]}
            alt={car.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${isBookedOut ? 'grayscale-[20%]' : 'group-hover:scale-105'}`}
            loading="lazy"
          />

          {/* Category & Status Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-card/90 backdrop-blur-md text-primary border border-border uppercase tracking-wider shadow-sm">
              {car.category}
            </span>
            {car.featured && !isBookedOut && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground shadow-md">
                Featured
              </span>
            )}
            {isBookedOut && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-destructive text-destructive-foreground shadow-md flex items-center gap-1 animate-pulse">
                <Ban className="w-3.5 h-3.5" />
                <span>Booked Out</span>
              </span>
            )}
          </div>

          {/* AC Badge */}
          {car.hasAC && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-card/90 backdrop-blur-md text-emerald-600 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <Wind className="w-3 h-3" />
              <span>AirCon</span>
            </div>
          )}

          {/* Transmission Pill overlay */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-medium bg-card/90 backdrop-blur-md text-card-foreground border border-border">
            {car.transmission}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  <span>{car.name}</span>
                  {isBookedOut && <span className="text-xs text-destructive font-semibold uppercase">(Unavailable)</span>}
                </h3>
                <p className="text-xs text-muted-foreground font-medium">{car.year} Model • {car.fuelType}</p>
              </div>
            </div>

            {/* Quick Specs Icons */}
            <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary shrink-0" />
                <span>{car.seats} Seats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Fuel className="w-4 h-4 text-primary shrink-0" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified</span>
              </div>
            </div>

            {/* Rate Section */}
            <div className="bg-muted p-3 rounded-xl border border-border flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground font-medium block uppercase tracking-wider">
                  {scope} Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-foreground">
                    GH₵ {currentRate.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground font-normal">/ day</span>
                </div>
              </div>
              <div className="text-right text-[11px] text-muted-foreground">
                <span className="block text-foreground/80">Alternate:</span>
                <span className="text-secondary font-semibold">
                  GH₵ {(scope === "Outside Accra" ? car.rateInsideAccra : car.rateOutsideAccra).toLocaleString()} ({scope === "Outside Accra" ? "Inside" : "Outside"})
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            {isBookedOut ? (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-center space-y-2">
                <span className="text-xs font-bold block flex items-center justify-center gap-1">
                  <Ban className="w-4 h-4" />
                  <span>Currently Booked Out by Admin</span>
                </span>
                <button
                  onClick={() => onSelect(car)}
                  className="w-full py-2 rounded-lg bg-card text-foreground text-xs font-semibold border border-border"
                >
                  View Vehicle Details
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelect(car)}
                  className="w-full py-2.5 px-3 rounded-xl bg-muted hover:bg-card text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 border border-border transition-colors"
                >
                  <Eye className="w-4 h-4 text-primary" />
                  <span>View Specs</span>
                </button>

                <Link
                  to={`/contact?car=${car.id}&scope=${encodeURIComponent(scope)}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-[1.02]"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Now</span>
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </>
  );
}

import React from 'react';
import { ShieldCheck, FileText, CheckCircle, AlertTriangle, Scale, Clock, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY } from '../utils/whatsapp';

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-16 space-y-12 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="bg-card border-b border-border py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Official Rental Policies & Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground">Terms of Use & Rental Agreement</h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Please read our standard terms of use governing vehicle rentals, payments, security deposits, and travel compliance.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-xs text-muted-foreground">
        
        {/* Important Summary Alert */}
        <div className="bg-card p-5 rounded-2xl border border-primary/30 space-y-2 text-card-foreground shadow-md">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Legacy Vehicle Hub Rental Summary</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            By booking and operating any vehicle from Legacy Vehicle Hub, the renter agrees to comply with the terms and conditions below. These terms protect the company, the vehicle, and all users of the rental agreement.
          </p>
        </div>

        {/* Section 1: Driver Eligibility */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">1</span>
            <span>Driver Eligibility</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">Driver must be at least 21 years old.</strong></li>
            <li><strong className="text-foreground">Must hold a valid driver’s license</strong> with a minimum age of 1–2 years.</li>
            <li><strong className="text-foreground">Must provide a valid National ID or Passport.</strong></li>
            <li><strong className="text-foreground">International renters must present a valid International Driving Permit (IDP).</strong></li>
            <li><strong className="text-foreground">Only authorized drivers listed in the agreement may operate the vehicle.</strong></li>
          </ul>
        </div>

        {/* Section 2: Booking & Payment */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">2</span>
            <span>Booking & Payment</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">Full payment must be made before vehicle release.</strong></li>
            <li><strong className="text-foreground">Accepted methods:</strong> Cash, Mobile Money, and Bank Transfer.</li>
            <li><strong className="text-foreground">A refundable security deposit is required</strong> and may vary based on vehicle type and rental duration.</li>
            <li><strong className="text-foreground">Late returns attract additional hourly or daily charges.</strong></li>
            <li><strong className="text-foreground">Failure to return the vehicle without notice may be reported to authorities.</strong></li>
          </ul>
        </div>

        {/* Section 3: Rental Period */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">3</span>
            <span>Rental Period</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">Minimum rental period is 24 hours.</strong></li>
            <li><strong className="text-foreground">Extra hours are charged accordingly.</strong></li>
            <li><strong className="text-foreground">Early return does not qualify for a refund</strong> unless agreed in writing.</li>
            <li><strong className="text-foreground">Driving outside Accra requires written approval</strong> and may attract additional fees.</li>
          </ul>
        </div>

        {/* Section 4: Use of Vehicle */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">4</span>
            <span>Use of Vehicle</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">Vehicle must not be used for illegal activities.</strong></li>
            <li><strong className="text-foreground">No driving under the influence of alcohol or drugs.</strong></li>
            <li><strong className="text-foreground">No subleasing or unauthorized drivers.</strong></li>
            <li><strong className="text-foreground">No racing, towing, or commercial transport</strong> unless agreed.</li>
            <li><strong className="text-foreground">Vehicle must not be overloaded beyond capacity.</strong></li>
          </ul>
        </div>

        {/* Section 5: Insurance & Liability */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">5</span>
            <span>Insurance & Liability</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">Vehicles come with basic insurance coverage.</strong></li>
            <li><strong className="text-foreground">The renter shall be held responsible for any and all damages</strong> that occur during the rental period.</li>
            <li><strong className="text-foreground">Renter is liable for traffic fines and violations.</strong></li>
            <li><strong className="text-foreground">In case of accident, renter must inform the company immediately</strong> and obtain a police report.</li>
          </ul>
        </div>

        {/* Section 6: Security Deposit */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">6</span>
            <span>Security Deposit</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">Deposit covers damages, fines, fuel shortages, or contract violations.</strong></li>
            <li><strong className="text-foreground">Refund processed within 24–72 hours</strong> after inspection.</li>
            <li><strong className="text-foreground">Any deductions will be clearly explained.</strong></li>
          </ul>
        </div>

        {/* Section 7: Fuel Policy */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">7</span>
            <span>Fuel Policy</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">Vehicle must be returned with the same fuel level as received.</strong></li>
            <li><strong className="text-foreground">Fuel shortages will be charged at current market rates</strong> plus service charge.</li>
          </ul>
        </div>

        {/* Section 8: Breakdown & Maintenance */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">8</span>
            <span>Breakdown & Maintenance</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">Company covers mechanical faults</strong> not caused by misuse.</li>
            <li><strong className="text-foreground">Renter is responsible for negligence-related damages.</strong></li>
            <li><strong className="text-foreground">Unauthorized repairs are not permitted without approval.</strong></li>
          </ul>
        </div>

        {/* Section 9: Cancellation Policy */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">9</span>
            <span>Cancellation Policy</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-foreground">24–48 hours before pickup:</strong> Partial refund, admin charges may apply.</li>
            <li><strong className="text-foreground">Same-day cancellation:</strong> No refund.</li>
            <li><strong className="text-foreground">No-shows forfeit booking payment.</strong></li>
          </ul>
        </div>

        {/* Footer Contact CTA inside Terms */}
        <div className="bg-card p-6 rounded-2xl border border-border text-center space-y-3 shadow-md">
          <h3 className="text-sm font-bold text-foreground">Have Questions Regarding Our Terms?</h3>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            Our dispatch desk is available 24/7 to clarify any specific rental, payment, or vehicle policy requirement.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-extrabold text-xs shadow-md transition-colors"
            >
              Contact Dispatch Office
            </Link>
            <a
              href={`tel:${DEFAULT_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="px-5 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold text-xs border border-border transition-colors"
            >
              Call {DEFAULT_PHONE_DISPLAY}
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}

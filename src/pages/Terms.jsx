import React from 'react';
import { ShieldCheck, FileText, CheckCircle, AlertTriangle, Scale, Clock, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY } from '../utils/whatsapp';

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-16 space-y-12">
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-dark-800 to-dark-900 border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Official Rental Policies & Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Terms of Use & Rental Agreement</h1>
          <p className="text-sm text-slate-400 max-w-3xl">
            Please read our standard terms of use governing vehicle rentals, chauffeur services, security deposits, and regional travel clearances across Ghana.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-xs text-slate-300">
        
        {/* Important Summary Alert */}
        <div className="bg-dark-800 p-5 rounded-2xl border border-brand-500/30 space-y-2 text-slate-200">
          <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Legacy Vehicle Hub Rental Summary</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            By reserving or operating any vehicle provided by Legacy Vehicle Hub Ghana, you agree to comply with the terms and conditions outlined below. Our policies are designed to protect both client safety and vehicle integrity.
          </p>
        </div>

        {/* Section 1: Driver Eligibility & Identification */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs">1</span>
            <span>Driver Eligibility & Identification Requirements</span>
          </h2>
          <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-white">Minimum Age:</strong> Drivers must be at least 21 years of age for standard sedans and 25 years for luxury vehicles or heavy 4x4 SUVs.</li>
            <li><strong className="text-white">Ghanaian Citizens/Residents:</strong> Must present a valid Ghana Card and a valid Ghanaian Driver’s License (minimum 2 years driving experience).</li>
            <li><strong className="text-white">International Visitors:</strong> Must present a valid Passport and an International Driving Permit (IDP) or recognized national license.</li>
            <li><strong className="text-white">Chauffeur Service:</strong> When selecting our Chauffeur option, our assigned certified driver assumes primary responsibility for vehicle operation.</li>
          </ul>
        </div>

        {/* Section 2: Pricing Tiers & Travel Scope */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs">2</span>
            <span>Travel Scope & Dual Pricing Policy</span>
          </h2>
          <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-white">Inside Accra Rate:</strong> Applies strictly to travel within Greater Accra Metro area (KIA Airport, Tema, Spintex, East Legon, Ablekuma, Ga West).</li>
            <li><strong className="text-white">Outside Accra Rate:</strong> Applies to any journey extending beyond Greater Accra boundaries (e.g., Kumasi, Takoradi, Cape Coast, Volta Region, Tamale).</li>
            <li><strong className="text-white">Out-of-Town Clearance:</strong> Hirers must declare intent for regional travel prior to vehicle handover to enable out-of-town insurance coverage.</li>
            <li><strong className="text-white">Driver Overnight Allowance:</strong> For out-of-town chauffeur trips exceeding 24 hours, hirer provides driver accommodation allowance unless pre-arranged.</li>
          </ul>
        </div>

        {/* Section 3: Security Deposit & Payment Terms */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs">3</span>
            <span>Security Deposit & Refund Policy</span>
          </h2>
          <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-white">Deposit Handoff:</strong> A refundable security deposit is required upon key handover (via Mobile Money or Cash/Card transfer).</li>
            <li><strong className="text-white">Vehicle Inspection:</strong> Joints inspection of bodywork, tires, windshield, and fuel gauge takes place at pickup and drop-off.</li>
            <li><strong className="text-white">Deposit Refund Timeline:</strong> Security deposits are refunded within 24 to 48 hours following vehicle return and inspection verification.</li>
          </ul>
        </div>

        {/* Section 4: Fuel & Maintenance Policy */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs">4</span>
            <span>Fuel & Vehicle Care</span>
          </h2>
          <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-white">Same-to-Same Fuel Policy:</strong> Vehicles are dispatched with a recorded fuel level and must be returned at the identical level.</li>
            <li><strong className="text-white">Prohibited Uses:</strong> Vehicles must not be used for illegal activities, unapproved off-road rally racing, towing, or sub-leasing.</li>
            <li><strong className="text-white">Smoking & Pets:</strong> Smoking inside vehicles is strictly prohibited. Deep cleaning charges apply for violations.</li>
          </ul>
        </div>

        {/* Section 5: Insurance & Accident Procedures */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs">5</span>
            <span>Insurance Coverage & Roadside Incident Reporting</span>
          </h2>
          <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-white">Comprehensive Insurance:</strong> All vehicles in our fleet carry comprehensive commercial vehicle insurance.</li>
            <li><strong className="text-white">Immediate Reporting:</strong> In the event of a mechanical breakdown, collision, or accident, the hirer must immediately contact our 24/7 hotline ({DEFAULT_PHONE_DISPLAY} / {SECONDARY_PHONE_DISPLAY}).</li>
            <li><strong className="text-white">Police Report:</strong> Accident incidents require a formal Ghana Police Service report prior to insurance claims.</li>
          </ul>
        </div>

        {/* Section 6: Extensions & Cancellations */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs">6</span>
            <span>Rental Extension & Cancellation</span>
          </h2>
          <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed pl-2">
            <li><strong className="text-white">Rental Extension:</strong> Extensions must be requested at least 12 hours prior to scheduled return to verify fleet availability.</li>
            <li><strong className="text-white">Grace Period:</strong> A 1-hour grace period is granted for returns. Returns exceeding 2 hours incur a half-day rate charge.</li>
          </ul>
        </div>

        {/* Footer Contact CTA inside Terms */}
        <div className="bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 p-6 rounded-2xl border border-brand-500/30 text-center space-y-3">
          <h3 className="text-sm font-bold text-white">Have Questions Regarding Our Terms?</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Our dispatch desk is available 24/7 to clarify any specific regional clearance or corporate rental requirements.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-900 font-extrabold text-xs shadow-md transition-colors"
            >
              Contact Dispatch Office
            </Link>
            <a
              href={`tel:${DEFAULT_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="px-5 py-2.5 rounded-xl bg-dark-700 hover:bg-dark-600 text-slate-200 font-bold text-xs border border-white/10"
            >
              Call {DEFAULT_PHONE_DISPLAY}
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}

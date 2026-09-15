import React from 'react';
import { Shield, Award, Users, CheckCircle, MapPin, Fuel, FileText, Sparkles, HeartHandshake, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16 space-y-16 transition-colors duration-300">
      
      {/* Hero Header */}
      <div className="bg-muted/60 border-b border-border py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ghana's Preferred Car Hire Partner</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground">About Legacy Vehicle Hub</h1>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Founded with a commitment to reliability, luxury, and transparent rental pricing across Ghana. We connect corporate executives, tourists, and local travelers with clean, well-maintained vehicles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Our Heritage & Mission</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Redefining Car Rental Standards in Ghana
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At Legacy Vehicle Hub, we recognize that renting a car should be effortless and dependable. Whether navigating the vibrant streets of Accra or embarking on long-haul trips across Ashanti, Western, or Central regions, our clients deserve top-tier safety and comfort.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We operate a modern, rigorously-inspected fleet ranging from compact fuel-efficient sedans to commanding 4x4 SUVs and 15-seater executive shuttles.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-card p-4 rounded-2xl border border-border shadow-sm">
                <span className="text-2xl font-black text-primary block">500+</span>
                <span className="text-xs text-muted-foreground font-medium">Successful Rentals Managed</span>
              </div>
              <div className="bg-card p-4 rounded-2xl border border-border shadow-sm">
                <span className="text-2xl font-black text-emerald-600 block">16 Regions</span>
                <span className="text-xs text-muted-foreground font-medium">Nationwide Travel Clearance</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
              alt="Legacy Vehicle Hub Ghana Chauffeur Fleet"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card text-xs text-foreground border border-border">
              <span className="font-bold text-foreground block">Tema Office Dispatch:</span>
              <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                Redemption Road, Community 9, Tema, Ghana. Operating 24 Hours Daily.
              </a>
            </div>
          </div>

        </div>

        {/* Fleet Safety & Sanitization Standards */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Quality Assurance</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Safety, Maintenance & Sanitization</h2>
            <p className="text-xs text-muted-foreground">
              Every car that leaves our depot undergoes strict multi-point mechanical checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground">Full Comprehensive Insurance</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All vehicles carry valid comprehensive motor insurance policies for complete peace of mind on Ghanaian roads.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-foreground">Deep Sanitization & AC Service</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cleaned and sanitized before every pickup. Ice-cold air conditioning and fresh interiors guaranteed.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground">Certified Chauffeur Staff</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Background-checked, defensive-driving certified Ghanaian drivers fluent in English, Twi, and local languages.
              </p>
            </div>

          </div>
        </div>

        {/* Clear Rental Guidelines & Terms */}
        <div className="bg-card p-6 sm:p-10 rounded-3xl border border-border space-y-6 shadow-xl transition-colors duration-300">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Transparent Policies</span>
            </span>
            <h2 className="text-2xl font-bold text-foreground">Rental Guidelines & Requirements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-foreground">
            
            <div className="space-y-3 bg-muted p-5 rounded-2xl border border-border">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Identification & Eligibility</span>
              </h4>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Ghanaian Residents: Valid Ghana Card & Driver's License (minimum 2 years driving experience).</li>
                <li>International Visitors: Valid International Passport & Driving Permit.</li>
                <li>Minimum driver age requirement: 21 years old.</li>
              </ul>
            </div>

            <div className="space-y-3 bg-muted p-5 rounded-2xl border border-border">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Fuel className="w-4 h-4 text-primary" />
                <span>Fuel Policy & Security Deposit</span>
              </h4>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Vehicles are handed over with fuel and should be returned with equal level.</li>
                <li>Refundable security deposit is required prior to vehicle dispatch and refunded upon inspection.</li>
                <li>Chauffeur driver daily allowances are included in out-of-town rates.</li>
              </ul>
            </div>

          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
            <p className="text-xs text-muted-foreground">Have questions about specific travel routes or customized corporate terms?</p>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-xs transition-colors shadow-sm"
            >
              Contact Our Dispatch Team
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

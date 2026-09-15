import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car, Search, ShieldCheck, UserCheck, Clock, MapPin, Sparkles, Phone, MessageSquare, ArrowRight, Award, Compass, KeyRound, Briefcase, CheckCircle2 } from 'lucide-react';
import { CATEGORIES, TRANSMISSIONS } from '../data/cars';
import { useCars } from '../context/CarContext';
import CarCard from '../components/CarCard';
import CarDetailModal from '../components/CarDetailModal';
import { DEFAULT_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateGeneralInquiryMessage } from '../utils/whatsapp';

export default function Home() {
  const navigate = useNavigate();
  const { cars } = useCars();

  // Quick Filter State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [scope, setScope] = useState("Inside Accra");

  // Selected car for modal
  const [selectedCar, setSelectedCar] = useState(null);

  // Featured cars list (first 6)
  const featuredCars = cars.filter(car => car.featured).slice(0, 6);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (selectedTransmission !== "All") params.set("transmission", selectedTransmission);
    params.set("scope", scope);
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div className="min-h-screen space-y-16 sm:space-y-24 pb-12 transition-colors duration-300">

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">

        {/* Background Image with Brighter Visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://benjirentalservices.com/assets/images/s1.jpg"
            alt="Legacy Vehicle Hub Ghana Luxury Rental"
            className="w-full h-full object-cover object-center opacity-85 brightness-105 scale-105"
          />
          {/* Softened Overlays for Vibrant Image Visibility & Crisp Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6">

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/90 border border-secondary/40 text-secondary-foreground text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Ghana's Premier Chauffeur & Self-Drive Fleet</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1] drop-shadow-md">
              Drive Ghana in <span className="text-secondary">Absolute Comfort & Luxury</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-semibold drop-shadow">
              From business trips in Accra to regional journeys across Kumasi, Takoradi, and Cape Coast. Enjoy fully-maintained SUVs, executive sedans, and group shuttles with transparent rates and zero hidden charges.
            </p>

            {/* Quick Benefits */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-foreground pt-2 drop-shadow">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card/80 border border-border backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Flexible Daily & Weekly Terms</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card/80 border border-border backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Chauffeur Options</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card/80 border border-border backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Flexible Daily Rates</span>
              </div>
            </div>

            {/* QUICK FILTER BAR */}
            <div className="pt-4">
              <form onSubmit={handleQuickSearch} className="glass-card p-4 sm:p-5 rounded-3xl border border-border shadow-xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  {/* Category Filter */}
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Vehicle Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full theme-input rounded-xl px-3 py-2.5 text-xs focus:outline-none"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat} Vehicles</option>
                      ))}
                    </select>
                  </div>

                  {/* Transmission Filter */}
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Transmission</label>
                    <select
                      value={selectedTransmission}
                      onChange={(e) => setSelectedTransmission(e.target.value)}
                      className="w-full theme-input rounded-xl px-3 py-2.5 text-xs focus:outline-none"
                    >
                      {TRANSMISSIONS.map(trans => (
                        <option key={trans} value={trans}>{trans === "All" ? "All Transmissions" : trans}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location Scope */}
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Travel Scope</label>
                    <div className="grid grid-cols-2 bg-muted p-1 rounded-xl border border-border">
                      <button
                        type="button"
                        onClick={() => setScope("Inside Accra")}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${scope === "Inside Accra" ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        Inside Accra
                      </button>
                      <button
                        type="button"
                        onClick={() => setScope("Outside Accra")}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${scope === "Outside Accra" ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        Outside Accra
                      </button>
                    </div>
                  </div>

                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Showing vehicles configured for <strong className="text-primary">{scope}</strong>
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <Search className="w-4 h-4 stroke-[3]" />
                    <span>Find Available Cars</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED FLEET GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
              <Car className="w-4 h-4" />
              <span>Handpicked Vehicles</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mt-1">Featured Rental Fleet</h2>
          </div>

          {/* Scope Selector Bar for Grid */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Price Scope:</span>
            <div className="bg-card p-1 rounded-xl border border-border flex items-center gap-1 shadow-sm">
              <button
                onClick={() => setScope("Inside Accra")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${scope === "Inside Accra" ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Inside Accra Rates
              </button>
              <button
                onClick={() => setScope("Outside Accra")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${scope === "Outside Accra" ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Outside Accra Rates
              </button>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              scope={scope}
              onSelect={(c) => setSelectedCar(c)}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-card hover:bg-muted border border-border text-foreground font-bold text-sm transition-all hover:scale-105 shadow-md"
          >
            <span>View All Fleet Catalog ({cars.length} Cars)</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </div>

      </section>

      {/* SERVICE OFFERINGS */}
      <section className="bg-muted/60 py-16 border-y border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Tailored Mobility Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">Services We Offer Across Ghana</h2>
            <p className="text-sm text-muted-foreground">
              Whether you need luxury executive transport for corporate guests or a rugged 4x4 for regional field trips, we have you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Service 1 */}
            <div className="glass-card p-6 rounded-2xl border border-border hover:border-primary transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center border border-secondary/30">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Chauffeur Driven Rentals</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Professional, defensive-driving certified drivers who know Accra routes and regional highways thoroughly. Sit back and focus on business.
              </p>
            </div>

            {/* Service 2 */}
            <div className="glass-card p-6 rounded-2xl border border-border hover:border-primary transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center border border-secondary/30">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Self-Drive Fleet</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enjoy complete freedom behind the wheel of pristine, fully-insured sedans or SUVs. Flexible daily, weekly, and monthly terms.
              </p>
            </div>

            {/* Service 3 */}
            <div className="glass-card p-6 rounded-2xl border border-border hover:border-primary transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center border border-secondary/30">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Corporate & Event Transport</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Executive fleet dispatch for corporate events, weddings, state summits, and VIP delegation movement across Greater Accra.
              </p>
            </div>

            {/* Service 4 */}
            <div className="glass-card p-6 rounded-2xl border border-border hover:border-primary transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center border border-secondary/30">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Inter-City & Regional Trips</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Travel comfortably beyond Greater Accra to Kumasi, Takoradi, Cape Coast, Ho, or Tamale with dedicated out-of-town clearances.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Why Legacy Vehicle Hub?</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
              Built on Trust, Safety & Superior Fleet Quality
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We prioritize your peace of mind. Every vehicle in our fleet undergoes rigorous maintenance checks before and after every rental, ensuring optimal performance across Ghanaian roads.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Transparent Dual Pricing</h4>
                  <p className="text-xs text-muted-foreground">Clear rates for Inside Accra and Outside Accra trips. No sudden extra charges at drop-off.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Pristine Fleet Condition</h4>
                  <p className="text-xs text-muted-foreground">Deeply sanitized, chilling air-conditioning, clean leather or fabric interiors in every vehicle.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">24/7 Roadside Dispatch Support</h4>
                  <p className="text-xs text-muted-foreground">Our support dispatch team is always available via phone or WhatsApp for instant assistance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Image / Stats Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
              alt="Legacy Vehicle Hub Ghana Fleet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-card border border-border space-y-3">
              <div className="flex items-center justify-between text-foreground">
                <div>
                  <span className="text-2xl font-black text-primary">100%</span>
                  <span className="text-xs block text-muted-foreground font-medium">Verified Vehicles</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <span className="text-2xl font-black text-emerald-600">24/7</span>
                  <span className="text-xs block text-muted-foreground font-medium">Customer Support</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <span className="text-2xl font-black text-secondary">5/5★</span>
                  <span className="text-xs block text-muted-foreground font-medium">Client Rating</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-primary p-8 sm:p-12 text-primary-foreground shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl sm:text-4xl font-black text-primary-foreground">
                Ready to Reserve Your Car in Ghana?
              </h2>
              <p className="text-sm font-semibold opacity-90 max-w-xl">
                Get instant availability confirmation and book directly via WhatsApp or phone. No tedious paperwork!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={`tel:${DEFAULT_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-card text-card-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors shadow-lg"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Call {DEFAULT_PHONE_DISPLAY}</span>
              </a>

              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Instant WhatsApp Booking</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedCar && (
        <CarDetailModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          defaultScope={scope}
        />
      )}

    </div>
  );
}

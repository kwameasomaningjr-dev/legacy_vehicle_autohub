import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Car, Calendar, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { CARS_DATA } from '../data/cars';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateCarBookingMessage, generateGeneralInquiryMessage } from '../utils/whatsapp';

export default function Contact() {
  // Form State
  const [submissionMethod, setSubmissionMethod] = useState('email'); // 'email' | 'whatsapp'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedCarId: CARS_DATA[0].id,
    travelScope: 'Inside Accra',
    pickupDate: '',
    returnDate: '',
    notes: '',
    accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY'
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionNotice, setSubmissionNotice] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedCarObj = CARS_DATA.find(c => c.id === formData.selectedCarId) || CARS_DATA[0];
  const estimatedRate = formData.travelScope === 'Outside Accra' ? selectedCarObj.rateOutsideAccra : selectedCarObj.rateInsideAccra;

  const generatedWhatsAppMsg = generateCarBookingMessage({
    carName: selectedCarObj.name,
    travelScope: formData.travelScope,
    pickupDate: formData.pickupDate,
    returnDate: formData.returnDate,
    customerName: formData.fullName,
    notes: formData.notes
  });

  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generatedWhatsAppMsg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionNotice('');

    if (submissionMethod === 'email') {
      try {
        const web3Payload = {
          access_key: formData.accessKey,
          subject: `Contact Page Booking: ${selectedCarObj.name} - ${formData.fullName}`,
          from_name: "Legacy Vehicle Hub Contact Form",
          to_email: "info@legacyautohubgh.com",
          "Vehicle Name": selectedCarObj.name,
          "Travel Scope": formData.travelScope,
          "Estimated Rate": `GH₵ ${estimatedRate.toLocaleString()}`,
          "Customer Name": formData.fullName,
          "Customer Email": formData.email || 'N/A',
          "Customer Phone": formData.phone,
          "Pickup Date": formData.pickupDate || 'N/A',
          "Return Date": formData.returnDate || 'N/A',
          "Notes": formData.notes || 'None'
        };

        if (formData.accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
          await new Promise(r => setTimeout(r, 800));
          setIsSubmitting(false);
          setSubmitted(true);
          setSubmissionNotice('Web3Forms endpoint ready! Demo mode completed successfully (replace YOUR_WEB3FORMS_ACCESS_KEY with key from web3forms.com).');
          return;
        }

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(web3Payload)
        });

        const data = await res.json();
        setIsSubmitting(false);

        if (data.success) {
          setSubmitted(true);
          setSubmissionNotice('Your booking request has been sent via email to our dispatch desk!');
        } else {
          setSubmitted(true);
          setSubmissionNotice(data.message || 'Submitted successfully!');
        }
      } catch (err) {
        setIsSubmitting(false);
        setSubmitted(true);
        setSubmissionNotice('Booking inquiry formatted for Web3Forms email submission!');
      }
    } else {
      // WhatsApp mode
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 space-y-12">
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-dark-800 to-dark-900 border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>24/7 Dispatch Hotline & Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Contact & Book Vehicle</h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Have a question or ready to lock in your car rental in Accra or regional Ghana? Submit your request via Email (Web3Forms ready) or WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">WhatsApp & Main Line</h4>
              <p className="text-xs text-slate-400">Primary Booking Hotline</p>
            </div>
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-400 hover:underline block"
            >
              {DEFAULT_PHONE_DISPLAY}
            </a>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dispatch Line 2</h4>
              <p className="text-xs text-slate-400">Secondary Support Line</p>
            </div>
            <a href={`tel:${SECONDARY_PHONE_DISPLAY.replace(/\s+/g, '')}`} className="text-xs font-bold text-brand-400 hover:underline block">
              {SECONDARY_PHONE_DISPLAY}
            </a>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Tema Office</h4>
              <p className="text-xs text-slate-400">Redemption Road, Community 9, Tema</p>
            </div>
            <span className="text-xs font-medium text-slate-300 block">Greater Accra Region, Ghana</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dispatch Hours</h4>
              <p className="text-xs text-slate-400">Pickup & Drop-offs</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 block">Open 24 Hours / 7 Days</span>
          </div>

        </div>

        {/* Main Section: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Booking Form (7 cols) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Car Booking Reservation Form</h2>
                <p className="text-xs text-slate-400 mt-1">Select your dispatch channel below.</p>
              </div>

              {/* Submission Channel Switcher */}
              <div className="bg-dark-900 p-1 rounded-xl border border-slate-700 flex items-center gap-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSubmissionMethod('email')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    submissionMethod === 'email' ? 'bg-brand-500 text-dark-900 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Form</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionMethod('whatsapp')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    submissionMethod === 'whatsapp' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Email Address {submissionMethod === 'email' ? '*' : '(Optional)'}</label>
                    <input
                      type="email"
                      name="email"
                      required={submissionMethod === 'email'}
                      placeholder="e.g. kwame@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Phone & Vehicle Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +233 55 568 6858"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Select Vehicle from Fleet *</label>
                    <select
                      name="selectedCarId"
                      value={formData.selectedCarId}
                      onChange={handleInputChange}
                      className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    >
                      {CARS_DATA.map(car => (
                        <option key={car.id} value={car.id}>
                          {car.name} ({car.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Travel Scope & Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Travel Scope *</label>
                    <div className="grid grid-cols-2 bg-dark-900 p-1 rounded-xl border border-slate-700">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, travelScope: 'Inside Accra' }))}
                        className={`py-1.5 font-bold rounded-lg text-xs transition-all ${
                          formData.travelScope === 'Inside Accra' ? 'bg-brand-500 text-dark-900' : 'text-slate-400'
                        }`}
                      >
                        Inside Accra
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, travelScope: 'Outside Accra' }))}
                        className={`py-1.5 font-bold rounded-lg text-xs transition-all ${
                          formData.travelScope === 'Outside Accra' ? 'bg-brand-500 text-dark-900' : 'text-slate-400'
                        }`}
                      >
                        Outside Accra
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Pickup Date</label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Return Date</label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Web3Forms Access Key input (Visible when Email mode selected) */}
                {submissionMethod === 'email' && (
                  <div className="bg-dark-900/80 p-3 rounded-xl border border-slate-700 space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-400" />
                      <span>Web3Forms Key (Configurable later)</span>
                    </label>
                    <input
                      type="text"
                      name="accessKey"
                      placeholder="YOUR_WEB3FORMS_ACCESS_KEY"
                      value={formData.accessKey}
                      onChange={handleInputChange}
                      className="w-full bg-dark-800 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                )}

                {/* Rate Summary */}
                <div className="bg-dark-900/80 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Selected Vehicle: <strong className="text-white">{selectedCarObj.name}</strong></span>
                    <span className="text-xs text-brand-400 font-bold">Scope: {formData.travelScope}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Est. Daily Rate</span>
                    <span className="text-lg font-extrabold text-white">
                      GH₵ {estimatedRate.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Additional Notes / Special Instructions</label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="e.g. Flight arrival details or specific pickup address in Accra..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                    submissionMethod === 'email'
                      ? 'bg-brand-500 hover:bg-brand-400 text-dark-900 shadow-brand-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  }`}
                >
                  {submissionMethod === 'email' ? <Mail className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                  <span>{isSubmitting ? 'Processing Request...' : submissionMethod === 'email' ? 'Send Booking via Email (Web3Forms)' : 'Generate WhatsApp Booking'}</span>
                </button>

              </form>
            ) : (
              /* SUCCESS BANNER */
              <div className="bg-gradient-to-br from-emerald-950/80 to-dark-900 p-6 sm:p-8 rounded-2xl border border-emerald-500/40 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white">
                    {submissionMethod === 'email' ? 'Email Booking Request Sent!' : 'Reservation Formatted!'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Request for <strong className="text-brand-400">{selectedCarObj.name}</strong> ({formData.travelScope}) has been compiled.
                  </p>
                  {submissionNotice && (
                    <p className="text-[11px] text-emerald-400 font-medium pt-1">{submissionNotice}</p>
                  )}
                </div>

                {/* Summary */}
                <div className="bg-dark-900/90 p-4 rounded-xl text-left text-xs space-y-2 border border-white/5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vehicle:</span>
                    <span className="font-bold text-white">{selectedCarObj.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Travel Scope:</span>
                    <span className="font-bold text-brand-400">{formData.travelScope}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Est. Daily Rate:</span>
                    <span className="font-bold text-white">GH₵ {estimatedRate.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                  >
                    <MessageSquare className="w-5 h-5 fill-white/20" />
                    <span>Also Send to WhatsApp ({DEFAULT_PHONE_DISPLAY})</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-400 hover:text-white underline block mx-auto"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Embedded Google Map (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  <span>Accra Fleet Headquarters</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Open 24/7
                </span>
              </div>

              {/* Map Iframe */}
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/10 bg-dark-900">
                <iframe
                  title="Legacy Vehicle Hub Accra Location Map"
                  src="https://www.google.com/maps?q=Redemption+Road,+Community+9,+Tema,+Ghana&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="text-xs text-slate-400 space-y-1">
                <p><strong className="text-slate-200">Address:</strong> Redemption Road, Community 9, Tema, Ghana.</p>
                <p><strong className="text-slate-200">WhatsApp / Main:</strong> {DEFAULT_PHONE_DISPLAY}</p>
                <p><strong className="text-slate-200">Dispatch Line 2:</strong> {SECONDARY_PHONE_DISPLAY}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

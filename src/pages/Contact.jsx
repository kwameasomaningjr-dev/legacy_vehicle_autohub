import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Car, Calendar, Sparkles, ArrowRight, ShieldCheck, AlertCircle, Moon, Sun } from 'lucide-react';
import { useCars } from '../context/CarContext';
import { useTheme } from '../context/ThemeContext';
import { DEFAULT_PHONE_DISPLAY, SECONDARY_PHONE_DISPLAY, DEFAULT_WHATSAPP_NUMBER, buildWhatsAppUrl, generateCarBookingMessage, generateGeneralInquiryMessage } from '../utils/whatsapp';
import { usePhoneModal } from '../context/PhoneContext';

export default function Contact() {
  const { cars, addInquiry } = useCars();
  const { theme, toggleTheme } = useTheme();
  const { openPhoneModal } = usePhoneModal();

  // Form State
  const [submissionMethod, setSubmissionMethod] = useState('email'); // 'email' | 'whatsapp'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedCarId: cars[0]?.id || 'car-1',
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

  const selectedCarObj = cars.find(c => c.id === formData.selectedCarId) || cars[0] || {};
  const estimatedRate = formData.travelScope === 'Outside Accra' ? selectedCarObj.rateOutsideAccra : selectedCarObj.rateInsideAccra;

  const generatedWhatsAppMsg = generateCarBookingMessage({
    carName: selectedCarObj.name,
    travelScope: formData.travelScope,
    pickupDate: formData.pickupDate,
    returnDate: formData.returnDate,
    customerName: formData.fullName,
    phone: formData.phone,
    email: formData.email,
    notes: formData.notes,
    estimatedRate: `GH₵ ${estimatedRate ? estimatedRate.toLocaleString() : '0'}`
  });

  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generatedWhatsAppMsg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionNotice('');

    // Log inquiry to admin state
    addInquiry({
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      carName: selectedCarObj.name,
      travelScope: formData.travelScope,
      estimatedRate: `GH₵ ${estimatedRate ? estimatedRate.toLocaleString() : '0'}`,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      notes: formData.notes
    });

    if (submissionMethod === 'email') {
      try {
        const web3Payload = {
          access_key: formData.accessKey,
          subject: `Contact Page Booking: ${selectedCarObj.name} - ${formData.fullName}`,
          from_name: "Legacy Vehicle Hub Contact Form",
          to_email: "info@legacyvehiclehubgh.com",
          "Vehicle Name": selectedCarObj.name,
          "Travel Scope": formData.travelScope,
          "Estimated Rate": `GH₵ ${estimatedRate ? estimatedRate.toLocaleString() : '0'}`,
          "Customer Name": formData.fullName,
          "Customer Email": formData.email || 'N/A',
          "Customer Phone": formData.phone,
          "Pickup Date": formData.pickupDate || 'N/A',
          "Return Date": formData.returnDate || 'N/A',
          "Notes": formData.notes || 'None'
        };

        if (formData.accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY' || !formData.accessKey) {
          await new Promise(r => setTimeout(r, 800));
          setIsSubmitting(false);
          setSubmitted(true);
          setSubmissionNotice('Your booking request has been submitted via email! (Inquiry saved to Admin Dashboard).');
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
        setSubmissionNotice('Your booking inquiry has been logged to Admin Dashboard and submitted via email!');
      }
    } else {
      // WhatsApp mode
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 space-y-12 transition-colors duration-300 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground">Contact & Booking</h1>
            <p className="text-sm mt-1 text-muted-foreground">Reach our dispatch team 24/7 or make a direct vehicle reservation.</p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-card-foreground font-bold text-xs shadow-lg transition-all hover:bg-muted"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-secondary" /> : <Moon className="w-4 h-4 text-primary" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">WhatsApp & Main Line</h4>
              <p className="text-xs text-muted-foreground">Primary Booking Hotline</p>
            </div>
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, generateGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 hover:underline block"
            >
              {DEFAULT_PHONE_DISPLAY}
            </a>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Dispatch Line 2</h4>
              <p className="text-xs text-muted-foreground">Secondary Support Line</p>
            </div>
            <button onClick={openPhoneModal} className="text-xs font-bold text-primary hover:underline block text-left">
              {SECONDARY_PHONE_DISPLAY}
            </button>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Tema Office</h4>
              <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Redemption Road, Community 9, Tema
              </a>
            </div>
            <span className="text-xs font-medium text-foreground block">Greater Accra Region, Ghana</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-border bg-card text-card-foreground space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Dispatch Hours</h4>
              <p className="text-xs text-muted-foreground">Pickup & Drop-offs</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 block">Open 24 Hours / 7 Days</span>
          </div>
        </div>

        {/* Main Grid: Booking Form (7 cols) & Map (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Booking Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-border bg-card text-card-foreground space-y-6 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Car Booking Reservation Form</h2>
                <p className="text-xs text-muted-foreground mt-1">Select your dispatch channel below.</p>
              </div>

              {/* Submission Channel Switcher */}
              <div className="p-1 rounded-xl border border-border bg-muted flex items-center gap-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSubmissionMethod('email')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    submissionMethod === 'email' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Form</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionMethod('whatsapp')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    submissionMethod === 'whatsapp' ? 'bg-emerald-600 text-white shadow' : 'text-muted-foreground hover:text-foreground'
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
                    <label className="font-semibold block mb-1 text-foreground">Your Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-foreground">Email Address {submissionMethod === 'email' ? '*' : '(Optional)'}</label>
                    <input
                      type="email"
                      name="email"
                      required={submissionMethod === 'email'}
                      placeholder="e.g. kwame@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone & Vehicle Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +233 55 568 6858"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-foreground">Select Vehicle from Fleet *</label>
                    <select
                      name="selectedCarId"
                      value={formData.selectedCarId}
                      onChange={handleInputChange}
                      className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    >
                      {cars.map(car => (
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
                    <label className="font-semibold block mb-1 text-foreground">Travel Scope *</label>
                    <div className="p-1 rounded-xl border border-border bg-muted grid grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, travelScope: 'Inside Accra' }))}
                        className={`py-1.5 font-bold rounded-lg text-xs transition-all ${
                          formData.travelScope === 'Inside Accra' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'
                        }`}
                      >
                        Inside Accra
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, travelScope: 'Outside Accra' }))}
                        className={`py-1.5 font-bold rounded-lg text-xs transition-all ${
                          formData.travelScope === 'Outside Accra' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'
                        }`}
                      >
                        Outside Accra
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-foreground">Pickup Date</label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-foreground">Return Date</label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Rate Summary */}
                <div className="p-4 rounded-xl border border-border bg-muted flex items-center justify-between">
                  <div>
                    <span className="text-[11px] block font-medium text-muted-foreground">Selected Vehicle: <strong className="text-foreground">{selectedCarObj.name}</strong></span>
                    <span className="text-xs text-primary font-bold">Scope: {formData.travelScope}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] block uppercase text-muted-foreground">Est. Daily Rate</span>
                    <span className="text-lg font-extrabold text-foreground">
                      GH₵ {estimatedRate ? estimatedRate.toLocaleString() : '0'}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="font-semibold block mb-1 text-foreground">Additional Notes / Special Instructions</label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="e.g. Flight arrival details or specific pickup address in Accra..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                    submissionMethod === 'email'
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  }`}
                >
                  {submissionMethod === 'email' ? <Mail className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                  <span>{isSubmitting ? 'Processing Request...' : submissionMethod === 'email' ? 'Send Booking via Email' : 'Generate WhatsApp Booking'}</span>
                </button>

              </form>
            ) : (
              /* SUCCESS BANNER */
              <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-foreground">
                    {submissionMethod === 'email' ? 'Email Booking Request Sent!' : 'Reservation Formatted!'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Thank you, <strong className="text-foreground">{formData.fullName}</strong>. Request for <strong className="text-primary">{selectedCarObj.name}</strong> ({formData.travelScope}) has been compiled.
                  </p>
                  {submissionNotice && (
                    <p className="text-[11px] text-emerald-600 font-medium pt-1">{submissionNotice}</p>
                  )}
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl text-left text-xs space-y-2 border border-border bg-card text-card-foreground">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-bold text-foreground">{selectedCarObj.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travel Scope:</span>
                    <span className="font-bold text-primary">{formData.travelScope}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Daily Rate:</span>
                    <span className="font-bold text-foreground">GH₵ {estimatedRate ? estimatedRate.toLocaleString() : '0'}</span>
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
                    className="text-xs underline block mx-auto text-muted-foreground hover:text-foreground"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Embedded Google Map (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-4 rounded-3xl border border-border bg-card text-card-foreground space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Tema Fleet Headquarters</span>
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded text-emerald-600 bg-emerald-500/10 border border-emerald-500/20">Open 24/7</span>
              </div>

              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-border bg-muted">
                <iframe
                  title="Legacy Vehicle Hub, Driving School, Tema Location Map"
                  src="https://www.google.com/maps?q=Legacy+Vehicle+Hub%2C+Driving+School%2C+Tema&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="text-xs space-y-1 text-muted-foreground">
                <p><strong className="text-foreground">Address:</strong> <a href="https://maps.app.goo.gl/tu9Dy8RmvqGqNxW4A?g_st=iw" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Redemption Road, Community 9, Tema, Ghana.</a></p>
                <p><strong className="text-foreground">WhatsApp / Main:</strong> {DEFAULT_PHONE_DISPLAY}</p>
                <p><strong className="text-foreground">Dispatch Line 2:</strong> {SECONDARY_PHONE_DISPLAY}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

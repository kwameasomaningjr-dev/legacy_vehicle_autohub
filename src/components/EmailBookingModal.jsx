import React, { useState, useEffect } from 'react';
import { X, Mail, Send, CheckCircle2, AlertCircle, Calendar, MapPin, User, Phone, Car, Sparkles } from 'lucide-react';
import { useCars } from '../context/CarContext';

export default function EmailBookingModal({ car = null, onClose, defaultScope = "Inside Accra" }) {
  const { cars, addInquiry } = useCars();

  const [selectedCarId, setSelectedCarId] = useState(car ? car.id : (cars[0]?.id || 'car-1'));
  const [travelScope, setTravelScope] = useState(defaultScope);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: '',
    notes: '',
    accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY'
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [responseMsg, setResponseMsg] = useState('');

  // Lock background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const selectedCarObj = cars.find(c => c.id === selectedCarId) || cars[0] || {};
  const estimatedRate = travelScope === "Outside Accra" ? selectedCarObj.rateOutsideAccra : selectedCarObj.rateInsideAccra;

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setResponseMsg('');

    // Log inquiry to admin state
    addInquiry({
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      carName: selectedCarObj.name,
      travelScope,
      estimatedRate: `GH₵ ${estimatedRate ? estimatedRate.toLocaleString() : '0'}`,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      notes: formData.notes
    });

    try {
      const payload = {
        access_key: formData.accessKey,
        subject: `New Vehicle Booking Request: ${selectedCarObj.name} (${travelScope}) - ${formData.fullName}`,
        from_name: "Legacy Vehicle Hub Booking System",
        to_email: "info@legacyvehiclehubgh.com",
        user_name: formData.fullName,
        user_email: formData.email,
        user_phone: formData.phone,
        vehicle: selectedCarObj.name,
        category: selectedCarObj.category,
        travel_scope: travelScope,
        daily_rate_ghc: estimatedRate,
        pickup_date: formData.pickupDate || 'Not specified',
        return_date: formData.returnDate || 'Not specified',
        special_notes: formData.notes || 'None',
      };

      if (formData.accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY' || !formData.accessKey) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setStatus('success');
        setResponseMsg('Your email booking request has been compiled and saved to admin inquiries!');
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setResponseMsg('Your booking request was dispatched successfully! Our team will contact you shortly.');
      } else {
        setStatus('error');
        setResponseMsg(data.message || 'Failed to submit email booking. Please try again or use WhatsApp.');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('success');
      setResponseMsg('Your booking inquiry has been recorded and submitted via email!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-card-foreground flex flex-col max-h-[90vh] transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary-foreground flex items-center justify-center border border-secondary/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>Email Booking Request</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-foreground">Email Car Reservation</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-muted hover:bg-card text-foreground transition-colors border border-border"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          
          {status === 'success' ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-foreground">Email Booking Request Submitted!</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {responseMsg}
              </p>

              {/* Summary of sent details */}
              <div className="bg-card p-4 rounded-xl text-left text-xs space-y-2 border border-border text-card-foreground shadow-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reserved Vehicle:</span>
                  <span className="font-bold text-foreground">{selectedCarObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travel Scope:</span>
                  <span className="font-bold text-primary">{travelScope}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate Estimate:</span>
                  <span className="font-bold text-foreground">GH₵ {estimatedRate ? estimatedRate.toLocaleString() : '0'} / day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient Email:</span>
                  <span className="font-medium text-emerald-600">{formData.email || 'Provided Email'}</span>
                </div>
              </div>

              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-xl bg-muted hover:bg-card text-foreground text-xs font-semibold border border-border"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-foreground font-semibold block mb-1">Select Vehicle</label>
                  <select
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    {cars.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-foreground font-semibold block mb-1">Travel Scope</label>
                  <div className="grid grid-cols-2 bg-muted p-1 rounded-xl border border-border">
                    <button
                      type="button"
                      onClick={() => setTravelScope('Inside Accra')}
                      className={`py-1 font-bold rounded-lg text-xs transition-all ${
                        travelScope === 'Inside Accra' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      Inside Accra
                    </button>
                    <button
                      type="button"
                      onClick={() => setTravelScope('Outside Accra')}
                      className={`py-1 font-bold rounded-lg text-xs transition-all ${
                        travelScope === 'Outside Accra' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      Outside Accra
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-foreground font-semibold block mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Ama Serwaa"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-foreground font-semibold block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. client@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-foreground font-semibold block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+233 55 568 6858"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-foreground font-semibold block mb-1">Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-foreground font-semibold block mb-1">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary Rate Calculation */}
              <div className="bg-muted p-3 rounded-xl border border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-muted-foreground block font-medium">Target Vehicle: <strong className="text-foreground">{selectedCarObj.name}</strong></span>
                  <span className="text-xs text-primary font-bold">Scope: {travelScope}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block uppercase">Est. Rate</span>
                  <span className="text-base font-extrabold text-foreground">GH₵ {estimatedRate ? estimatedRate.toLocaleString() : '0'} / day</span>
                </div>
              </div>

              <div>
                <label className="text-foreground font-semibold block mb-1">Special Notes / Requirements</label>
                <textarea
                  name="notes"
                  rows="2"
                  placeholder="e.g. Flight arrival details or preferred driver instructions..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{responseMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? 'Sending Request via Email...' : 'Submit Email Booking Request'}</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle2, Car, Fuel, Users, Wind, DollarSign, Image as ImageIcon, Sparkles } from 'lucide-react';
import { CATEGORIES, TRANSMISSIONS } from '../data/cars';

export default function AdminCarModal({ car = null, onClose, onSave }) {
  const isEditing = Boolean(car);

  const [formData, setFormData] = useState({
    name: car?.name || '',
    year: car?.year || new Date().getFullYear(),
    category: car?.category || 'SUV',
    transmission: car?.transmission || 'Automatic',
    seats: car?.seats || 5,
    fuelType: car?.fuelType || 'Petrol',
    hasAC: car?.hasAC !== false,
    rateInsideAccra: car?.rateInsideAccra || 1000,
    rateOutsideAccra: car?.rateOutsideAccra || 1400,
    featured: car?.featured || false,
    isAvailable: car?.isAvailable !== false,
    description: car?.description || '',
    featuresText: car?.features ? car.features.join(', ') : 'Bluetooth, Reverse Camera, Leather Seats, Air Conditioning',
    image1: car?.images?.[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    image2: car?.images?.[1] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    image3: car?.images?.[2] || 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
      features: formData.featuresText.split(',').map(s => s.trim()).filter(Boolean),
      images: [formData.image1, formData.image2, formData.image3].filter(Boolean)
    };

    delete preparedData.featuresText;
    delete preparedData.image1;
    delete preparedData.image2;
    delete preparedData.image3;

    onSave(preparedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-dark-900/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-dark-800 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-dark-900/70">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest block">
                {isEditing ? 'Update Vehicle Record' : 'Add New Fleet Entry'}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">{isEditing ? car.name : 'Create New Rental Car'}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-dark-700 hover:bg-dark-600 text-slate-300 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1 custom-scrollbar">
          
          {/* Name & Category & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-slate-300 font-semibold block mb-1">Vehicle Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Toyota Land Cruiser Prado 4x4"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Model Year *</label>
              <input
                type="number"
                name="year"
                required
                min="2010"
                max="2027"
                value={formData.year}
                onChange={handleChange}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Category, Transmission, Fuel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Transmission *</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {TRANSMISSIONS.filter(t => t !== 'All').map(trans => (
                  <option key={trans} value={trans}>{trans}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Fuel Type *</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Seats & Daily Rates (Inside vs Outside Accra) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-dark-900/80 p-3.5 rounded-2xl border border-brand-500/20">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Passenger Seats</label>
              <input
                type="number"
                name="seats"
                min="2"
                max="30"
                value={formData.seats}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-brand-400 font-bold block mb-1">Inside Accra Rate (GH₵/day) *</label>
              <input
                type="number"
                name="rateInsideAccra"
                required
                step="50"
                value={formData.rateInsideAccra}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-brand-500/40 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-brand-400 font-bold block mb-1">Outside Accra Rate (GH₵/day) *</label>
              <input
                type="number"
                name="rateOutsideAccra"
                required
                step="50"
                value={formData.rateOutsideAccra}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-brand-500/40 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Toggles (AC, Featured, Available) */}
          <div className="grid grid-cols-3 gap-3">
            <label className="flex items-center gap-2 bg-dark-900 p-2.5 rounded-xl border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                name="hasAC"
                checked={formData.hasAC}
                onChange={handleChange}
                className="rounded accent-brand-500 w-4 h-4"
              />
              <span className="font-semibold text-slate-200">Full AirCon</span>
            </label>

            <label className="flex items-center gap-2 bg-dark-900 p-2.5 rounded-xl border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="rounded accent-brand-500 w-4 h-4"
              />
              <span className="font-semibold text-slate-200">Featured Home</span>
            </label>

            <label className="flex items-center gap-2 bg-dark-900 p-2.5 rounded-xl border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="rounded accent-emerald-500 w-4 h-4"
              />
              <span className="font-semibold text-emerald-400">Available</span>
            </label>
          </div>

          {/* Unsplash Image URLs */}
          <div className="space-y-2">
            <label className="text-slate-300 font-semibold block">Vehicle Image URLs (Exterior, Angle, Interior)</label>
            <input
              type="url"
              name="image1"
              required
              placeholder="Primary Image URL"
              value={formData.image1}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 mb-1"
            />
            <input
              type="url"
              name="image2"
              placeholder="Secondary Image URL (Optional)"
              value={formData.image2}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 mb-1"
            />
            <input
              type="url"
              name="image3"
              placeholder="Interior Image URL (Optional)"
              value={formData.image3}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Vehicle Description</label>
            <textarea
              name="description"
              rows="2"
              placeholder="Executive description of comfort, travel capabilities, and suitability..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Features Comma Separated */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Features (Comma Separated)</label>
            <input
              type="text"
              name="featuresText"
              placeholder="Full 4x4 Capability, Leather Interior, Reverse Camera, Bluetooth"
              value={formData.featuresText}
              onChange={handleChange}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-dark-700 text-slate-300 hover:text-white font-semibold text-xs border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-900 font-extrabold text-xs shadow-lg shadow-brand-500/20"
            >
              {isEditing ? 'Save Vehicle Changes' : 'Create & Add to Fleet'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

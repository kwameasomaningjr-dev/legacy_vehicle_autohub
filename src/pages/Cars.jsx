import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, Car, AlertTriangle, Layers, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, TRANSMISSIONS } from '../data/cars';
import { useCars } from '../context/CarContext';
import CarCard from '../components/CarCard';
import CarDetailModal from '../components/CarDetailModal';

export default function Cars() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cars } = useCars();

  // Filters state initialized from query params if available
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [selectedTransmission, setSelectedTransmission] = useState(searchParams.get("transmission") || "All");
  const [scope, setScope] = useState(searchParams.get("scope") || "Inside Accra");

  // Selected vehicle for modal
  const [selectedCar, setSelectedCar] = useState(null);

  // Sync state with URL params
  useEffect(() => {
    const catParam = searchParams.get("category");
    const transParam = searchParams.get("transmission");
    const scopeParam = searchParams.get("scope");

    if (catParam) setSelectedCategory(catParam);
    if (transParam) setSelectedTransmission(transParam);
    if (scopeParam) setScope(scopeParam);
  }, [searchParams]);

  // Filter cars logic
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Search text filter
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            car.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            car.fuelType.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;

      // Transmission filter
      const matchesTransmission = selectedTransmission === "All" || car.transmission === selectedTransmission;

      return matchesSearch && matchesCategory && matchesTransmission;
    });
  }, [cars, searchQuery, selectedCategory, selectedTransmission]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTransmission("All");
    setScope("Inside Accra");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-24 pb-16 space-y-8 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="bg-slate-200/70 dark:bg-gradient-to-b dark:from-dark-800 dark:to-dark-900 border-b border-slate-300 dark:border-white/5 py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5" />
            <span>Complete Ghana Rental Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">Our Fleet Collection</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Browse our pristine, fully insured lineup of SUVs, Luxury Sedans, and Passenger Vans. Toggle travel scope to see accurate daily rates inside or outside Greater Accra.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* FILTER TOOLBAR PANEL */}
        <div className="glass-card p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search Input (5 cols) */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by vehicle model, brand, or feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Transmission Selector (3 cols) */}
            <div className="lg:col-span-3 flex items-center gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium shrink-0">Transmission:</span>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              >
                {TRANSMISSIONS.map(trans => (
                  <option key={trans} value={trans}>{trans === "All" ? "All Transmissions" : trans}</option>
                ))}
              </select>
            </div>

            {/* Location Scope Toggle (4 cols) */}
            <div className="lg:col-span-4 flex items-center justify-between sm:justify-end gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium shrink-0">Rates For:</span>
              <div className="bg-slate-100 dark:bg-dark-900 p-1 rounded-xl border border-slate-300 dark:border-white/10 flex items-center gap-1 shadow-sm">
                <button
                  onClick={() => setScope("Inside Accra")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scope === "Inside Accra" ? 'bg-brand-500 text-slate-950 shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Inside Accra
                </button>
                <button
                  onClick={() => setScope("Outside Accra")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scope === "Outside Accra" ? 'bg-brand-500 text-slate-950 shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Outside Accra
                </button>
              </div>
            </div>

          </div>

          {/* Category Chips & Summary Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-white/5">
            
            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold shrink-0 mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>Categories:</span>
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-brand-500 text-slate-950 shadow-md'
                      : 'bg-slate-200/80 dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-dark-700 border border-slate-300 dark:border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results count & Reset button */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs shrink-0">
              <span className="text-slate-600 dark:text-slate-400">
                Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredCars.length}</strong> of {cars.length} cars
              </span>

              {(selectedCategory !== "All" || selectedTransmission !== "All" || searchQuery !== "") && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* VEHICLES LISTING GRID / EMPTY STATE */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                scope={scope}
                onSelect={(c) => setSelectedCar(c)}
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="glass-card p-12 rounded-3xl border border-slate-200 dark:border-white/10 text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto border border-brand-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Matching Vehicles Found</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We couldn't find any car matching your active filters ({selectedCategory} category, {selectedTransmission} transmission, "{searchQuery}").
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-lg shadow-brand-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Selected Vehicle Drawer Modal */}
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

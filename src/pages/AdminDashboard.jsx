import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, LogOut, Plus, Edit3, Trash2, CheckCircle2, XCircle, Car, DollarSign, Users, Layers, MessageSquare, Copy, RotateCcw, ExternalLink, Sparkles, Filter, Sun, Moon, Download, FileSpreadsheet } from 'lucide-react';
import { useCars } from '../context/CarContext';
import { useTheme } from '../context/ThemeContext';
import AdminCarModal from '../components/AdminCarModal';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    cars,
    inquiries,
    isAdminAuthenticated,
    logoutAdmin,
    addCar,
    updateCar,
    deleteCar,
    deleteInquiry,
    resetCatalogToDefault
  } = useCars();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState('fleet'); // 'fleet' | 'rates' | 'inquiries' | 'settings'
  const [editingCar, setEditingCar] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Protected route check
  React.useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) return null;

  // KPI Statistics
  const totalFleet = cars.length;
  const availableFleet = cars.filter(c => c.isAvailable !== false).length;
  const featuredCount = cars.filter(c => c.featured).length;
  const avgInsideAccra = Math.round(cars.reduce((acc, c) => acc + (c.rateInsideAccra || 0), 0) / (totalFleet || 1));
  const avgOutsideAccra = Math.round(cars.reduce((acc, c) => acc + (c.rateOutsideAccra || 0), 0) / (totalFleet || 1));

  // CSV Export for Inquiries (Excel Compatible)
  const exportInquiriesCSV = () => {
    if (!inquiries || inquiries.length === 0) {
      alert("No inquiry logs available to export.");
      return;
    }

    const headers = ["ID", "Date", "Customer Name", "Email", "Phone", "Requested Vehicle", "Travel Scope", "Estimated Rate", "Pickup Date", "Return Date", "Special Notes"];
    
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const inq of inquiries) {
      const row = [
        `"${inq.id || ''}"`,
        `"${inq.date || ''}"`,
        `"${(inq.customerName || '').replace(/"/g, '""')}"`,
        `"${(inq.email || '').replace(/"/g, '""')}"`,
        `"${(inq.phone || '').replace(/"/g, '""')}"`,
        `"${(inq.carName || '').replace(/"/g, '""')}"`,
        `"${(inq.travelScope || '').replace(/"/g, '""')}"`,
        `"${(inq.estimatedRate || '').replace(/"/g, '""')}"`,
        `"${(inq.pickupDate || '').replace(/"/g, '""')}"`,
        `"${(inq.returnDate || '').replace(/"/g, '""')}"`,
        `"${(inq.notes || '').replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `legacy_vehicle_hub_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Export for Fleet Catalog (Excel Compatible)
  const exportFleetCSV = () => {
    if (!cars || cars.length === 0) {
      alert("No vehicles available to export.");
      return;
    }

    const headers = ["ID", "Vehicle Name", "Year", "Category", "Transmission", "Seats", "Fuel Type", "AirCon", "Inside Accra Rate (GHC)", "Outside Accra Rate (GHC)", "Available", "Featured", "Description"];
    
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const car of cars) {
      const row = [
        `"${car.id || ''}"`,
        `"${(car.name || '').replace(/"/g, '""')}"`,
        `"${car.year || ''}"`,
        `"${car.category || ''}"`,
        `"${car.transmission || ''}"`,
        `"${car.seats || ''}"`,
        `"${car.fuelType || ''}"`,
        `"${car.hasAC ? 'Yes' : 'No'}"`,
        `"${car.rateInsideAccra || ''}"`,
        `"${car.rateOutsideAccra || ''}"`,
        `"${car.isAvailable !== false ? 'Yes' : 'No'}"`,
        `"${car.featured ? 'Yes' : 'No'}"`,
        `"${(car.description || '').replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `legacy_vehicle_hub_fleet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(cars, null, 2));
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 space-y-8 transition-colors duration-300">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-200/80 dark:bg-gradient-to-b dark:from-dark-800 dark:to-dark-900 border-b border-slate-300 dark:border-white/5 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white p-1 shadow-lg shadow-brand-500/20 border border-brand-500/30 shrink-0">
              <img src="/logo-gold-navy.jpg" alt="Legacy Vehicle Hub Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Admin Console</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Legacy Vehicle Hub Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-white dark:bg-dark-800 hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 dark:border-white/10 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Live Website View</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-1.5 border border-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* KPI Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          
          <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800/80 space-y-1 shadow-md">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Total Fleet Vehicles</span>
              <Car className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white block">{totalFleet}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Active catalog items</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800/80 space-y-1 shadow-md">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Available Vehicles</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block">{availableFleet}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Ready for instant dispatch</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800/80 space-y-1 shadow-md">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Average Daily Rates</span>
              <DollarSign className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-slate-900 dark:text-white">GH₵ {avgInsideAccra.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Accra</span>
            </div>
            <span className="text-[10px] text-brand-600 dark:text-brand-400 block font-medium">Outside: GH₵ {avgOutsideAccra.toLocaleString()}</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800/80 space-y-1 shadow-md">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Booking Inquiries</span>
              <MessageSquare className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white block">{inquiries.length}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Logged client requests</span>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'fleet' ? 'bg-brand-500 text-slate-950 shadow-md' : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/5'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Fleet Catalog ({cars.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rates')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'rates' ? 'bg-brand-500 text-slate-950 shadow-md' : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/5'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Quick Rate Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'inquiries' ? 'bg-brand-500 text-slate-950 shadow-md' : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiry Logs ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'settings' ? 'bg-brand-500 text-slate-950 shadow-md' : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/5'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export & CSV Reports</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-brand-500/20 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Car</span>
          </button>
        </div>

        {/* TAB 1: FLEET CATALOG TABLE */}
        {activeTab === 'fleet' && (
          <div className="glass-card rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800/90 overflow-hidden shadow-2xl transition-colors duration-300">
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Fleet Vehicle Directory</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={exportFleetCSV}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-dark-700 dark:hover:bg-dark-600 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 text-xs font-bold flex items-center gap-1.5"
                  title="Download Fleet Catalog as CSV"
                >
                  <Download className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  <span>Export Fleet CSV</span>
                </button>
                <span className="text-xs text-slate-500 dark:text-slate-400">Total: {cars.length} Vehicles</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-dark-900/90 text-slate-700 dark:text-slate-400 font-semibold border-b border-slate-300 dark:border-white/10 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Vehicle</th>
                    <th className="p-3.5">Specs</th>
                    <th className="p-3.5">Rate Inside Accra</th>
                    <th className="p-3.5">Rate Outside Accra</th>
                    <th className="p-3.5">Availability</th>
                    <th className="p-3.5">Featured</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.images[0]}
                            alt={car.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-300 dark:border-white/10 shrink-0 bg-slate-200 dark:bg-dark-900"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block text-sm">{car.name}</span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">{car.year} Model • {car.category}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="block font-semibold text-slate-800 dark:text-slate-200">{car.transmission}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{car.seats} Seats • {car.fuelType}</span>
                      </td>

                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                        GH₵ {car.rateInsideAccra?.toLocaleString() || '-'} / day
                      </td>

                      <td className="p-3.5 font-bold text-brand-600 dark:text-brand-400">
                        GH₵ {car.rateOutsideAccra?.toLocaleString() || '-'} / day
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => updateCar(car.id, { isAvailable: !car.isAvailable })}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            car.isAvailable !== false
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                              : 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30'
                          }`}
                        >
                          {car.isAvailable !== false ? 'Available' : 'Booked Out'}
                        </button>
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => updateCar(car.id, { featured: !car.featured })}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            car.featured
                              ? 'bg-brand-500/20 text-brand-700 dark:text-brand-400 border-brand-500/30'
                              : 'bg-slate-100 dark:bg-dark-900 text-slate-500 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {car.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>

                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => setEditingCar(car)}
                          className="p-2 rounded-lg bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 dark:hover:bg-dark-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/10"
                          title="Edit Specs & Rates"
                        >
                          <Edit3 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${car.name} from the fleet?`)) {
                              deleteCar(car.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: QUICK RATE EDITOR */}
        {activeTab === 'rates' && (
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800/90 space-y-6 shadow-2xl transition-colors duration-300">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">Quick Rates Management Matrix</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Adjust daily prices inside and outside Greater Accra directly in real time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cars.map((car) => (
                <div key={car.id} className="bg-slate-50 dark:bg-dark-900 p-4 rounded-2xl border border-slate-200 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={car.images[0]} alt={car.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/10" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{car.name}</h4>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{car.category} • {car.transmission}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-white/5 text-xs">
                    <div>
                      <label className="text-slate-600 dark:text-slate-400 block text-[10px] font-semibold uppercase mb-1">Rate Inside Accra (GH₵)</label>
                      <input
                        type="number"
                        step="50"
                        value={car.rateInsideAccra}
                        onChange={(e) => updateCar(car.id, { rateInsideAccra: e.target.value })}
                        className="w-full bg-white dark:bg-dark-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="text-brand-600 dark:text-brand-400 block text-[10px] font-semibold uppercase mb-1">Rate Outside Accra (GH₵)</label>
                      <input
                        type="number"
                        step="50"
                        value={car.rateOutsideAccra}
                        onChange={(e) => updateCar(car.id, { rateOutsideAccra: e.target.value })}
                        className="w-full bg-white dark:bg-dark-800 border border-brand-500/40 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRY LOGS */}
        {activeTab === 'inquiries' && (
          <div className="glass-card rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800/90 overflow-hidden shadow-2xl transition-colors duration-300">
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Customer Booking Inquiry History</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Total Logged: {inquiries.length} inquiries</p>
              </div>

              <button
                onClick={exportInquiriesCSV}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Inquiries to CSV / Excel</span>
              </button>
            </div>

            {inquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-100 dark:bg-dark-900/90 text-slate-700 dark:text-slate-400 font-semibold border-b border-slate-300 dark:border-white/10 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Requested Vehicle</th>
                      <th className="p-3.5">Travel Scope</th>
                      <th className="p-3.5">Pickup / Return</th>
                      <th className="p-3.5">Est. Rate</th>
                      <th className="p-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors">
                        <td className="p-3.5 text-slate-500 dark:text-slate-400">{inq.date}</td>
                        <td className="p-3.5">
                          <strong className="text-slate-900 dark:text-white block">{inq.customerName}</strong>
                          <a href={`tel:${inq.phone}`} className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline">{inq.phone}</a>
                          {inq.email && <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{inq.email}</span>}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{inq.carName}</td>
                        <td className="p-3.5 font-semibold text-brand-600 dark:text-brand-400">{inq.travelScope}</td>
                        <td className="p-3.5 text-[11px] text-slate-500 dark:text-slate-400">
                          {inq.pickupDate || 'Flexible'} to {inq.returnDate || 'Flexible'}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{inq.estimatedRate || '-'}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20"
                            title="Remove log"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs">No inquiries logged yet.</div>
            )}
          </div>
        )}

        {/* TAB 4: EXPORT & REPORTS */}
        {activeTab === 'settings' && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800/90 space-y-6 shadow-2xl max-w-2xl mx-auto transition-colors duration-300">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">Export Data & Reports</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Download CSV reports formatted for Excel/Google Sheets or export JSON developer backups.</p>
            </div>

            <div className="space-y-4">
              {/* CSV Export Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={exportInquiriesCSV}
                  className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export Inquiries (CSV / Excel)</span>
                </button>

                <button
                  onClick={exportFleetCSV}
                  className="py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Fleet Catalog (CSV)</span>
                </button>
              </div>

              {/* Developer JSON Copy */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Developer Catalog Backup (JSON)</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Copy raw JSON code to update static defaults in <code className="text-brand-600 dark:text-brand-400 bg-slate-100 dark:bg-dark-900 px-1 py-0.5 rounded">src/data/cars.js</code>.</p>
                <button
                  onClick={handleCopyJSON}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-700 dark:hover:bg-dark-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 dark:border-white/10"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Catalog JSON Code</span>
                </button>
                {copiedToast && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center animate-in fade-in">✓ JSON copied to clipboard!</p>
                )}
              </div>

              {/* Reset Catalog */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Reset Catalog to Fixtures</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Restores catalog to the original static 8 vehicles fixture.</p>
                <button
                  onClick={() => {
                    if (window.confirm('Reset catalog back to initial 8 vehicles?')) {
                      resetCatalogToDefault();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Catalog</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Car Modal */}
      {isAddModalOpen && (
        <AdminCarModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={(newCar) => addCar(newCar)}
        />
      )}

      {/* Edit Car Modal */}
      {editingCar && (
        <AdminCarModal
          car={editingCar}
          onClose={() => setEditingCar(null)}
          onSave={(updated) => updateCar(editingCar.id, updated)}
        />
      )}

    </div>
  );
}

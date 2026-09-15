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
      <div className="bg-card border-b border-border py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-card p-1 shadow-lg border border-primary/30 shrink-0">
              <img src="/logo-gold-navy.jpg" alt="Legacy Vehicle Hub Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Admin Console</span>
              </div>
              <h1 className="text-2xl font-black text-foreground">Legacy Vehicle Hub Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1.5 border border-border shadow-sm transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span>Live Website View</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-bold flex items-center gap-1.5 border border-destructive/20 transition-colors"
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
          
          <div className="glass-card p-4 rounded-2xl border border-border bg-card text-card-foreground space-y-1 shadow-md">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Total Fleet Vehicles</span>
              <Car className="w-4 h-4 text-primary" />
            </div>
            <span className="text-2xl font-black text-foreground block">{totalFleet}</span>
            <span className="text-[10px] text-muted-foreground">Active catalog items</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-border bg-card text-card-foreground space-y-1 shadow-md">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Available Vehicles</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-2xl font-black text-emerald-500 block">{availableFleet}</span>
            <span className="text-[10px] text-muted-foreground">Ready for instant dispatch</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-border bg-card text-card-foreground space-y-1 shadow-md">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Average Daily Rates</span>
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-foreground">GH₵ {avgInsideAccra.toLocaleString()}</span>
              <span className="text-[10px] text-muted-foreground">Accra</span>
            </div>
            <span className="text-[10px] text-primary block font-medium">Outside: GH₵ {avgOutsideAccra.toLocaleString()}</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-border bg-card text-card-foreground space-y-1 shadow-md">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Booking Inquiries</span>
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <span className="text-2xl font-black text-foreground block">{inquiries.length}</span>
            <span className="text-[10px] text-muted-foreground">Logged client requests</span>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'fleet' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Fleet Catalog ({cars.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rates')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'rates' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Quick Rate Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'inquiries' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiry Logs ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'settings' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export & CSV Reports</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-black text-xs flex items-center gap-1.5 shadow-lg shrink-0 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Car</span>
          </button>
        </div>

        {/* TAB 1: FLEET CATALOG TABLE */}
        {activeTab === 'fleet' && (
          <div className="glass-card rounded-3xl border border-border bg-card text-card-foreground overflow-hidden shadow-2xl transition-colors duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Fleet Vehicle Directory</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={exportFleetCSV}
                  className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title="Download Fleet Catalog as CSV"
                >
                  <Download className="w-3.5 h-3.5 text-primary" />
                  <span>Export Fleet CSV</span>
                </button>
                <span className="text-xs text-muted-foreground">Total: {cars.length} Vehicles</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-muted-foreground">
                <thead className="bg-muted text-foreground font-semibold border-b border-border uppercase tracking-wider text-[10px]">
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
                <tbody className="divide-y divide-border">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.images[0]}
                            alt={car.name}
                            className="w-12 h-12 rounded-xl object-cover border border-border shrink-0 bg-muted"
                          />
                          <div>
                            <span className="font-bold text-foreground block text-sm">{car.name}</span>
                            <span className="text-[11px] text-muted-foreground">{car.year} Model • {car.category}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="block font-semibold text-foreground">{car.transmission}</span>
                        <span className="text-[11px] text-muted-foreground">{car.seats} Seats • {car.fuelType}</span>
                      </td>

                      <td className="p-3.5 font-bold text-foreground">
                        GH₵ {car.rateInsideAccra?.toLocaleString() || '-'} / day
                      </td>

                      <td className="p-3.5 font-bold text-primary">
                        GH₵ {car.rateOutsideAccra?.toLocaleString() || '-'} / day
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => updateCar(car.id, { isAvailable: !car.isAvailable })}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            car.isAvailable !== false
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                              : 'bg-destructive/10 text-destructive border-destructive/30'
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
                              ? 'bg-secondary text-secondary-foreground border-secondary'
                              : 'bg-muted text-muted-foreground border-border'
                          }`}
                        >
                          {car.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>

                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => setEditingCar(car)}
                          className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors"
                          title="Edit Specs & Rates"
                        >
                          <Edit3 className="w-4 h-4 text-primary" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${car.name} from the fleet?`)) {
                              deleteCar(car.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 transition-colors"
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
          <div className="glass-card p-6 rounded-3xl border border-border bg-card text-card-foreground space-y-6 shadow-2xl transition-colors duration-300">
            <div>
              <h2 className="text-base font-bold text-foreground uppercase tracking-wider">Quick Rates Management Matrix</h2>
              <p className="text-xs text-muted-foreground mt-1">Adjust daily prices inside and outside Greater Accra directly in real time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cars.map((car) => (
                <div key={car.id} className="bg-muted p-4 rounded-2xl border border-border space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={car.images[0]} alt={car.name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{car.name}</h4>
                      <span className="text-[10px] text-muted-foreground">{car.category} • {car.transmission}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border text-xs">
                    <div>
                      <label className="text-muted-foreground block text-[10px] font-semibold uppercase mb-1">Rate Inside Accra (GH₵)</label>
                      <input
                        type="number"
                        step="50"
                        value={car.rateInsideAccra}
                        onChange={(e) => updateCar(car.id, { rateInsideAccra: e.target.value })}
                        className="w-full bg-background border border-input rounded-xl px-3 py-1.5 text-xs text-foreground font-bold focus:outline-none focus:border-ring"
                      />
                    </div>

                    <div>
                      <label className="text-primary block text-[10px] font-semibold uppercase mb-1">Rate Outside Accra (GH₵)</label>
                      <input
                        type="number"
                        step="50"
                        value={car.rateOutsideAccra}
                        onChange={(e) => updateCar(car.id, { rateOutsideAccra: e.target.value })}
                        className="w-full bg-background border border-primary/40 rounded-xl px-3 py-1.5 text-xs text-foreground font-bold focus:outline-none focus:border-ring"
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
          <div className="glass-card rounded-3xl border border-border bg-card text-card-foreground overflow-hidden shadow-2xl transition-colors duration-300">
            <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Customer Booking Inquiry History</h2>
                <p className="text-[11px] text-muted-foreground">Total Logged: {inquiries.length} inquiries</p>
              </div>

              <button
                onClick={exportInquiriesCSV}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all self-start sm:self-auto"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Inquiries to CSV / Excel</span>
              </button>
            </div>

            {inquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-muted-foreground">
                  <thead className="bg-muted text-foreground font-semibold border-b border-border uppercase tracking-wider text-[10px]">
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
                  <tbody className="divide-y divide-border">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-muted/50 transition-colors">
                        <td className="p-3.5 text-muted-foreground">{inq.date}</td>
                        <td className="p-3.5">
                          <strong className="text-foreground block">{inq.customerName}</strong>
                          <a href={`tel:${inq.phone}`} className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline">{inq.phone}</a>
                          {inq.email && <span className="text-[10px] text-muted-foreground block">{inq.email}</span>}
                        </td>
                        <td className="p-3.5 font-bold text-foreground">{inq.carName}</td>
                        <td className="p-3.5 font-semibold text-primary">{inq.travelScope}</td>
                        <td className="p-3.5 text-[11px] text-muted-foreground">
                          {inq.pickupDate || 'Flexible'} to {inq.returnDate || 'Flexible'}
                        </td>
                        <td className="p-3.5 font-bold text-foreground">{inq.estimatedRate || '-'}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
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
              <div className="p-8 text-center text-muted-foreground text-xs">No inquiries logged yet.</div>
            )}
          </div>
        )}

        {/* TAB 4: EXPORT & REPORTS */}
        {activeTab === 'settings' && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border bg-card text-card-foreground space-y-6 shadow-2xl max-w-2xl mx-auto transition-colors duration-300">
            <div>
              <h2 className="text-base font-bold text-foreground uppercase tracking-wider">Export Data & Reports</h2>
              <p className="text-xs text-muted-foreground mt-1">Download CSV reports formatted for Excel/Google Sheets or export JSON developer backups.</p>
            </div>

            <div className="space-y-4">
              {/* CSV Export Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={exportInquiriesCSV}
                  className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export Inquiries (CSV / Excel)</span>
                </button>

                <button
                  onClick={exportFleetCSV}
                  className="py-3.5 px-4 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Fleet Catalog (CSV)</span>
                </button>
              </div>

              {/* Developer JSON Copy */}
              <div className="pt-4 border-t border-border space-y-2">
                <h4 className="text-xs font-bold text-foreground">Developer Catalog Backup (JSON)</h4>
                <p className="text-[11px] text-muted-foreground">Copy raw JSON code to update static defaults in <code className="text-primary bg-muted px-1 py-0.5 rounded">src/data/cars.js</code>.</p>
                <button
                  onClick={handleCopyJSON}
                  className="w-full py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold text-xs flex items-center justify-center gap-2 border border-border transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Catalog JSON Code</span>
                </button>
                {copiedToast && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center animate-in fade-in">✓ JSON copied to clipboard!</p>
                )}
              </div>

              {/* Reset Catalog */}
              <div className="pt-4 border-t border-border space-y-2">
                <h4 className="text-xs font-bold text-foreground">Reset Catalog to Fixtures</h4>
                <p className="text-[11px] text-muted-foreground">Restores catalog to the original static 8 vehicles fixture.</p>
                <button
                  onClick={() => {
                    if (window.confirm('Reset catalog back to initial 8 vehicles?')) {
                      resetCatalogToDefault();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 text-xs font-semibold flex items-center gap-2 transition-colors"
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

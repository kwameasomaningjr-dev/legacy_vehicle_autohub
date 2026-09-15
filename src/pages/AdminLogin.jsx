import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, Key, ArrowLeft, Sparkles, AlertCircle, LogIn, Sun, Moon } from 'lucide-react';
import { useCars } from '../context/CarContext';
import { useTheme } from '../context/ThemeContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin, isAdminAuthenticated } = useCars();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginAdmin(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4 sm:px-6 transition-colors duration-300">
      
      <div className="w-full max-w-md space-y-6">
        
        {/* Top bar: Back Link */}
        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Website</span>
          </Link>
        </div>

        {/* Card Shell */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border bg-card text-card-foreground shadow-2xl space-y-6 transition-colors duration-300">
          
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-card p-1 shadow-lg mx-auto border border-primary/30">
              <img src="/logo-gold-navy.jpg" alt="Legacy Vehicle Hub Logo" className="w-full h-full object-contain" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" />
                <span>Restricted Access</span>
              </div>
              <h1 className="text-2xl font-black text-foreground mt-1">Admin Portal Login</h1>
              <p className="text-xs text-muted-foreground">Manage fleet catalog, update rates, & view booking inquiries.</p>
            </div>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="bg-muted p-3.5 rounded-2xl border border-primary/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-primary font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Admin Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground font-extrabold text-[10px] hover:opacity-90 transition-colors shadow"
              >
                Auto-Fill Demo
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1 border-t border-border">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-sans">Username</span>
                <span className="text-foreground font-bold">admin</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-sans">Password</span>
                <span className="text-foreground font-bold">password123</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-foreground font-semibold block mb-1">Admin Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-ring"
                />
              </div>
            </div>

            <div>
              <label className="text-foreground font-semibold block mb-1">Admin Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-ring"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <LogIn className="w-4 h-4 stroke-[2.5]" />
              <span>Login to Dashboard</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}

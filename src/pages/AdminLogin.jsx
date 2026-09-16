import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowLeft, AlertCircle, LogIn, Fingerprint, ScanFace, CheckCircle2, Loader2, Info } from 'lucide-react';
import { useCars } from '../context/CarContext';
import { useTheme } from '../context/ThemeContext';
import { isWebAuthnSupported, hasRegisteredBiometric, getRegisteredBiometricInfo } from '../utils/webauthn';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin, loginWithBiometrics, isAdminAuthenticated } = useCars();
  const { theme } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // WebAuthn state
  const [isBioSupported, setIsBioSupported] = useState(true);
  const [hasBioCred, setHasBioCred] = useState(false);
  const [bioInfo, setBioInfo] = useState(null);
  const [bioStatus, setBioStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [bioError, setBioError] = useState('');

  // Check WebAuthn support and registered credentials on mount
  useEffect(() => {
    async function checkSupport() {
      const supported = await isWebAuthnSupported();
      setIsBioSupported(supported);
      if (supported) {
        const hasCred = hasRegisteredBiometric();
        setHasBioCred(hasCred);
        if (hasCred) {
          setBioInfo(getRegisteredBiometricInfo());
        }
      }
    }
    checkSupport();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleStandardLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginAdmin(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleBiometricLogin = async () => {
    setBioError('');
    setBioStatus('loading');

    if (!hasBioCred) {
      setBioStatus('error');
      setBioError('No biometric passkey registered on this device yet. Please log in using your admin username & password, then enroll your device in Settings.');
      return;
    }

    try {
      const res = await loginWithBiometrics();
      if (res.success) {
        setBioStatus('success');
        setTimeout(() => {
          navigate('/admin');
        }, 600);
      } else {
        setBioStatus('error');
        setBioError(res.message || 'Biometric authentication failed.');
      }
    } catch (err) {
      setBioStatus('error');
      setBioError(err.message || 'Biometric authentication failed.');
    }
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center px-4 sm:px-6 transition-colors duration-300">
      
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

          {/* WebAuthn Native Biometric Login Section */}
          <div className="space-y-3 pt-2">
            {!isBioSupported ? (
              /* Unsupported Browser / Device Warning */
              <div className="p-3.5 rounded-2xl bg-muted/60 border border-border text-muted-foreground text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <Info className="w-4 h-4 text-primary shrink-0" />
                  <span>Biometric Login Unavailable</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  WebAuthn biometrics (Windows Hello / Touch ID / Face ID) is not supported or enabled on this browser or device. Please continue using your admin username and password below.
                </p>
              </div>
            ) : (
              /* Biometric Authentication Button & Container */
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleBiometricLogin}
                  disabled={bioStatus === 'loading' || bioStatus === 'success'}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary via-primary to-primary/90 hover:opacity-95 text-white border border-secondary/60 hover:border-secondary shadow-lg hover:shadow-secondary/20 font-extrabold text-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-75 group"
                >
                  {bioStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 text-secondary animate-spin" />
                      <span>Authenticating with Biometrics...</span>
                    </>
                  ) : bioStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Verification Successful! Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                      <ScanFace className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                      <span>Sign in with Windows Hello / Touch ID / Face ID</span>
                    </>
                  )}
                </button>

                {bioInfo && bioStatus === 'idle' && (
                  <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Enrolled Device: <strong>{bioInfo.deviceName || 'Platform Passkey'}</strong></span>
                  </p>
                )}

                {/* Biometric Status Messages */}
                {bioStatus === 'error' && bioError && (
                  <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="leading-tight">{bioError}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-border w-full"></div>
            <span className="bg-card px-3 text-[10px] uppercase font-bold text-muted-foreground tracking-wider absolute">
              or continue with password
            </span>
          </div>

          {/* Username / Password Form */}
          <form onSubmit={handleStandardLogin} className="space-y-4 text-xs">
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

import React, { useState } from 'react';
import { 
  Server, 
  Wrench, 
  RefreshCw, 
  LogIn, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Mail,
  Eye,
  EyeOff,
  X,
  Loader2,
  Store,
  Leaf
} from 'lucide-react';
import { fetchUsersOnce } from '../src/services/firebaseService';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Maintenance({ usersList = [], onLoginAdmin }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Form login admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Mohon masukkan alamat email dan kata sandi.');
      return;
    }

    setIsLoggingIn(true);

    try {
      const normEmail = email.trim().toLowerCase();

      // Ambil data user terbaru dari Firebase
      let allUsers = [...(usersList || [])];
      try {
        const freshUsers = await fetchUsersOnce();
        if (freshUsers && freshUsers.length > 0) {
          allUsers = freshUsers;
        }
      } catch (err) {
        console.warn('Gagal fetch user Firebase:', err);
      }

      const foundUser = allUsers.find(
        (u) => u.email && u.email.trim().toLowerCase() === normEmail
      );

      // Cek apakah akun adalah administrator
      const roleStr = String(foundUser?.role || '').toLowerCase();
      const isAdmin = 
        roleStr === 'admin' || 
        roleStr === 'administrator' || 
        normEmail === 'arnof@gmail.com';

      if (!isAdmin) {
        setErrorMsg('Akses ditolak. Selama masa pemeliharaan, seluruh portal pengguna dinonaktifkan. Hanya Administrator yang dapat masuk.');
        setIsLoggingIn(false);
        return;
      }

      // Validasi kata sandi jika ada
      if (foundUser && foundUser.password && foundUser.password !== password) {
        setErrorMsg('Kata sandi salah. Silakan periksa kembali.');
        setIsLoggingIn(false);
        return;
      }

      const adminUser = {
        id: foundUser?.id || Date.now(),
        name: foundUser?.name || 'Administrator',
        email: normEmail,
        role: 'admin'
      };

      if (onLoginAdmin) {
        onLoginAdmin(adminUser);
      }
      setLoginModalOpen(false);

    } catch (err) {
      setErrorMsg('Terjadi kesalahan saat masuk. Silakan coba lagi.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden font-sans">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* TOP HEADER */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 select-none">
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xs">
                <Store className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="absolute -bottom-1 -left-1 bg-slate-900 rounded-full p-0.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 transform -rotate-12" />
              </div>
            </div>
            <div>
              <div className="text-xl font-black tracking-tight leading-none">
                <span className="text-blue-400">Info</span>
                <span className="text-white">UMKM</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                Sistem Pemeliharaan
              </p>
            </div>
          </div>

          {/* Tombol Login Admin */}
          <button
            onClick={() => setLoginModalOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Login Admin</span>
          </button>

        </div>
      </header>

      {/* MAIN MAINTENANCE SECTION */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-7 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>Semua Akses Dinonaktifkan Sementara</span>
          </div>

          {/* Visual Illustration */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-20 blur-xl"></div>
            <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center relative">
              <Server className="w-10 h-10 text-blue-400" />
              <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg animate-bounce">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Headline & Notice */}
          <div className="space-y-3 max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Maaf, Server Sedang Dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300">Maintenance</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Seluruh layanan website dan direktori InfoUMKM saat ini <strong>tidak dapat diakses sementara</strong> karena server sedang dalam pemeliharaan menyeluruh dan optimalisasi basis data.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm">
              Mohon maaf yang sebesar-besarnya atas ketidaknyamanan Anda. Kami akan segera kembali beroperasi secepatnya.
            </p>
          </div>

          {/* Status Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left text-xs max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Status Server</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Pemeliharaan Menyeluruh (Offline)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Keamanan Data</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Basis Data & Akun Terlindungi Penuh
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-blue-400 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Estimasi</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Segera Selesai & Beroperasi
              </p>
            </div>
          </div>

          {/* Refresh Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Memeriksa Server...' : 'Cek Status & Muat Ulang'}</span>
            </button>
          </div>

          {/* Emergency Contacts & Social Media */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a
              href="https://wa.me/6285896611944"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +62 858-9661-1944</span>
            </a>

            <a
              href="https://www.instagram.com/aditamadevelopment?fqnt=MThtY2dveWZsM2NneA=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram: @aditamadevelopment</span>
            </a>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-slate-800/80 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500">
        <p>Kantor Sekretariat: Bandar Lampung, Indonesia • © 2026 InfoUMKM. Seluruh hak cipta dilindungi.</p>
      </footer>

      {/* MODAL LOGIN KHUSUS ADMINISTRATOR */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Akses Khusus Administrator</h3>
                  <p className="text-[11px] text-slate-400">Masuk untuk mengelola sistem selama maintenance</p>
                </div>
              </div>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Email Administrator
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi admin"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setLoginModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Memeriksa...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Masuk Admin</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

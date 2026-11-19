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
  ArrowRight
} from 'lucide-react';

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

export default function Maintenance({ setActiveTab }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Animated Maintenance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span>Sistem Sedang Dalam Pemeliharaan</span>
        </div>

        {/* Big Maintenance Visual Illustration */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-20 blur-xl"></div>
          <div className="w-24 h-24 rounded-3xl bg-slate-800/90 border border-slate-700/80 shadow-2xl flex items-center justify-center relative">
            <Server className="w-10 h-10 text-blue-400" />
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg animate-bounce">
              <Wrench className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Main Headline & Description */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Maaf, Server Sedang Dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300">Maintenance</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Platform InfoUMKM sedang dalam proses pemeliharaan dan optimalisasi sistem secara berkala untuk meningkatkan kecepatan serta kestabilan layanan.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm">
            Mohon maaf atas ketidaknyamanannya. Kami akan segera kembali beroperasi normal secepatnya.
          </p>
        </div>

        {/* Live Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left text-xs max-w-lg mx-auto">
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Status Server</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Sedang Pemeliharaan
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Keamanan Data</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Basis Data Terlindungi Aman
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="text-blue-400 font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Estimasi</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Segera Selesai
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Memuat Ulang...' : 'Cek Status & Muat Ulang'}</span>
          </button>

          {setActiveTab && (
            <button
              onClick={() => setActiveTab('Masuk')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <LogIn className="w-4 h-4 text-blue-400" />
              <span>Masuk Administrator</span>
            </button>
          )}
        </div>

        {/* Emergency Contacts & Social */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <a
            href="https://wa.me/6285896611944"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>WA: +62 858-9661-1944</span>
          </a>

          <a
            href="https://www.instagram.com/aditamadevelopment?fqnt=MThtY2dveWZsM2NneA=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>@aditamadevelopment</span>
          </a>
        </div>

      </div>
    </div>
  );
}

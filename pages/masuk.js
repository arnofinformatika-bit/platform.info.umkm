import React, { useState } from 'react';
import { 
  LogIn, 
  Lock, 
  Mail, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Masuk({ onLoginSuccess, setActiveTab }) {
  const [role, setRole] = useState('admin'); // 'admin' atau 'pelaku'
  const [email, setEmail] = useState('admin@infoumkm.id');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setMsg('Login berhasil! Mengalihkan ke direktori...');
      setTimeout(() => {
        onLoginSuccess({
          role: role,
          name: role === 'admin' ? 'Administrator InfoUMKM' : 'Pelaku UMKM Mitra',
          email: email
        });
        setActiveTab('UMKM');
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Card Container */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <LogIn className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Masuk ke InfoUMKM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Kelola profil usaha, perbarui katalog produk, atau kelola sistem admin direktori.
            </p>
          </div>

          {/* Role selector tab */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setEmail('admin@infoumkm.id');
                setPassword('admin123');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                role === 'admin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Administrator
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('pelaku');
                setEmail('mitra@infoumkm.id');
                setPassword('mitra123');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                role === 'pelaku'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pelaku Usaha
            </button>
          </div>

          {msg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium text-center">
              {msg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alamat Email / ID Pengguna
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Sebagai {role === 'admin' ? 'Admin' : 'Pelaku Usaha'}</span>
            </button>
          </form>

          {/* Bottom Switch */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('Daftar')}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Daftar Akun Baru Sekarang
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

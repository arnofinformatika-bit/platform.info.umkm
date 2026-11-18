import React, { useState } from 'react';
import { 
  LogIn, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { fetchUsersOnce } from '../src/services/firebaseService';

export default function Masuk({ onLoginSuccess, usersList = [], setActiveTab }) {
  // Input form dibuat kosong, tidak ada auto-fill
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Mohon masukkan alamat email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);

    try {
      const normEmail = email.trim().toLowerCase();

      // Ambil data pengguna terbaru dari Firebase Realtime Database
      let allUsers = [...(usersList || [])];
      try {
        const freshUsers = await fetchUsersOnce();
        if (freshUsers && freshUsers.length > 0) {
          allUsers = freshUsers;
        }
      } catch (err) {
        console.warn('Gagal memuat pengguna dari Firebase:', err);
      }

      // Cari pengguna berdasarkan email
      const foundUser = allUsers.find(
        (u) => u.email && u.email.trim().toLowerCase() === normEmail
      );

      let targetRole = 'user';
      let loggedInUser = null;

      if (foundUser) {
        // Validasi kata sandi jika akun memiliki password tersimpan
        if (foundUser.password && foundUser.password !== password) {
          setErrorMsg('Kata sandi yang Anda masukkan salah. Silakan periksa kembali.');
          setIsLoading(false);
          return;
        }

        // Cek role yang ditentukan dari database Firebase
        const roleStr = String(foundUser.role || '').toLowerCase();
        const isUserAdmin = 
          roleStr === 'admin' || 
          roleStr === 'administrator' || 
          normEmail === 'arnof@gmail.com';

        targetRole = isUserAdmin ? 'admin' : (foundUser.role || 'user');

        loggedInUser = {
          ...foundUser,
          role: targetRole,
          name: foundUser.name || (isUserAdmin ? 'Administrator' : 'Pengguna')
        };
      } else if (normEmail === 'arnof@gmail.com') {
        // Akun admin pemilik langsung diakui
        targetRole = 'admin';
        loggedInUser = {
          id: Date.now(),
          name: 'Arnof',
          email: normEmail,
          role: 'admin'
        };
      } else {
        // Akun tidak ada di database Firebase
        setErrorMsg('Akun dengan email ini belum terdaftar. Silakan lakukan pendaftaran terlebih dahulu.');
        setIsLoading(false);
        return;
      }

      // Berhasil masuk
      setSuccessMsg(
        targetRole === 'admin'
          ? 'Login berhasil sebagai Administrator! Mengalihkan ke Admin Panel...'
          : 'Login berhasil! Mengalihkan ke User Portal...'
      );

      setTimeout(() => {
        setIsLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess(loggedInUser);
        }
        if (setActiveTab) {
          setActiveTab('UMKM');
        }
      }, 700);

    } catch (err) {
      setErrorMsg('Terjadi kesalahan saat masuk. Silakan coba beberapa saat lagi.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Card Container */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <LogIn className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Masuk ke InfoUMKM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Silakan masukkan alamat email dan kata sandi akun Anda untuk melanjutkan.
            </p>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Login Tanpa Pilihan Administrator */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
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
                  placeholder="Masukkan kata sandi akun"
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
              disabled={isLoading}
              className={`w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 ${
                isLoading ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memeriksa Akun...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Akun</span>
                </>
              )}
            </button>

          </form>

          {/* Bottom Switch to Register */}
          <div className="text-center pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Belum memiliki akun?{' '}
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

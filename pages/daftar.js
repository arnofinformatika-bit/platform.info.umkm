import React, { useState } from 'react';
import { 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Store, 
  MapPin, 
  Tag, 
  CheckCircle, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShoppingBag,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Daftar({ onAddUMKM, onRegisterUser, onDirectLogin, setActiveTab }) {
  // Role akun: 'user' (Pembeli / Konsumen) atau 'pelaku' (Pelaku UMKM)
  const [accountType, setAccountType] = useState('user');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Tambahan khusus Pelaku Usaha
    namaUsaha: '',
    kategori: 'Makanan & Minuman',
    lokasi: '',
    deskripsiUsaha: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  const categories = [
    'Makanan & Minuman',
    'Fashion & Aksesoris',
    'Minuman',
    'Kerajinan Tangan',
    'Kosmetik & Perawatan',
    'Agrobisnis & Tanaman',
    'Elektronik & Aksesoris'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Mohon masukkan nama lengkap Anda.');
      return;
    }

    if (!formData.email.trim()) {
      setErrorMsg('Mohon masukkan alamat email aktif.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (accountType === 'pelaku' && (!formData.namaUsaha.trim() || !formData.lokasi.trim())) {
      setErrorMsg('Untuk akun Pelaku Usaha, mohon lengkapi Nama Usaha dan Lokasi Kota.');
      return;
    }

    // Buat objek akun baru
    const newUser = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim() || '-',
      role: accountType === 'pelaku' ? 'Pelaku UMKM' : 'Konsumen / Pembeli',
      accountType: accountType,
      usaha: accountType === 'pelaku' ? formData.namaUsaha.trim() : '-',
      status: 'Aktif',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    if (onRegisterUser) {
      onRegisterUser(newUser);
    }

    setCreatedUser(newUser);
    setIsSuccess(true);
  };

  if (isSuccess && createdUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl max-w-lg w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-150">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Selamat datang di InfoUMKM, <strong>{createdUser.name}</strong>! Akun Anda telah aktif dan tersimpan di database.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Nama Pengguna:</span>
              <span className="font-bold text-slate-800">{createdUser.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-semibold text-slate-800">{createdUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Jenis Akun:</span>
              <span className="font-bold text-blue-600">{createdUser.role}</span>
            </div>
            {createdUser.usaha !== '-' && (
              <div className="flex justify-between">
                <span className="text-slate-500">Usaha Terdaftar:</span>
                <span className="font-bold text-emerald-600">{createdUser.usaha}</span>
              </div>
            )}
            <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-100 text-blue-700 text-[11px] mt-2">
              💡 <strong>Katalog Anda saat ini masih kosong.</strong> Anda dapat mulai menambahkan produk atau katalog usaha Anda di halaman User Portal.
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            {onDirectLogin && (
              <button
                onClick={() => onDirectLogin(createdUser)}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Buka Katalog Anda & Tambah Produk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setActiveTab('Masuk')}
              className="w-full py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Masuk ke Halaman Login
            </button>

            <button
              onClick={() => setActiveTab('UMKM')}
              className="w-full py-2.5 text-slate-500 hover:text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Jelajahi Direktori UMKM
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        
        {/* Card Utama */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
              <UserPlus className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Daftar Akun Baru
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Daftarkan diri Anda untuk mengakses ribuan produk lokal dan mendukung kemajuan UMKM Indonesia.
            </p>
          </div>

          {/* PILIHAN TIPE AKUN: PENGGUNA ATAU PELAKU UMKM */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Pilih Jenis Akun Anda:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option 1: Konsumen / Pengguna Biasa */}
              <button
                type="button"
                onClick={() => setAccountType('user')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  accountType === 'user'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-xl mt-0.5 ${accountType === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pengguna / Pembeli</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Jelajahi produk lokal, temukan toko terdekat, & beri ulasan.
                  </p>
                </div>
              </button>

              {/* Option 2: Pelaku Usaha UMKM */}
              <button
                type="button"
                onClick={() => setAccountType('pelaku')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  accountType === 'pelaku'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-xl mt-0.5 ${accountType === 'pelaku' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pelaku UMKM</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Daftarkan toko/usaha, promosi produk, & jangkau pasar luas.
                  </p>
                </div>
              </button>

            </div>
          </div>

          {/* Alert Error */}
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nama Lengkap */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Email & Nomor Telepon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Alamat Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nomor WhatsApp / HP
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812-3456-7890"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Kata Sandi & Konfirmasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Kata Sandi <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Ulangi Kata Sandi <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Konfirmasi sandi"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* FORM KHUSUS JIKA MEMILIH PELAKU UMKM */}
            {accountType === 'pelaku' && (
              <div className="pt-3 border-t border-slate-200/90 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <Store className="w-4 h-4" />
                  <span>Informasi Usaha UMKM Anda</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nama Usaha / Toko <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="namaUsaha"
                      value={formData.namaUsaha}
                      onChange={handleChange}
                      placeholder="Contoh: Dapur Sari Rasa"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Kategori Usaha
                    </label>
                    <select
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Lokasi Kota / Kabupaten <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        name="lokasi"
                        value={formData.lokasi}
                        onChange={handleChange}
                        placeholder="Contoh: Yogyakarta, Solo, Surabaya"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Deskripsi Produk Singkat
                    </label>
                    <input
                      type="text"
                      name="deskripsiUsaha"
                      value={formData.deskripsiUsaha}
                      onChange={handleChange}
                      placeholder="Contoh: Aneka kue tradisional lezat"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tombol Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Akun Sekarang</span>
              </button>
            </div>

          </form>

          {/* Footer Tautan Masuk */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Sudah memiliki akun InfoUMKM?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('Masuk')}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Masuk Sekarang
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

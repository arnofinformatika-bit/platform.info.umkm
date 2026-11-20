import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Tag, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  Store, 
  Sparkles,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  Users,
  Award
} from 'lucide-react';

export default function Beranda({ umkmList, setActiveTab, setSelectedCategory, onOpenAdminModal, onSelectUMKM, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery.trim());
    } else if (searchQuery.trim()) {
      setActiveTab('UMKM');
    }
  };

  // 5 UMKM teratas untuk ditampilkan di Beranda persis seperti di gambar
  const displayedUMKM = (umkmList || []).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-100/70 via-blue-50/40 to-slate-50 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Soft Background Wave / Shape Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 -ml-24 w-80 h-80 rounded-full bg-indigo-200/20 blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Portal Resmi & Direktori Terpadu UMKM Indonesia</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                Temukan & Dukung <br />
                <span className="text-blue-600 relative">
                  UMKM Lokal
                </span> di Sekitarmu!
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Platform informasi UMKM yang menyediakan data lengkap, mudah diakses, dan mendukung pertumbuhan UMKM Indonesia.
              </p>

              {/* Search Box */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl">
                <div className="relative flex items-center bg-white rounded-full shadow-lg shadow-blue-500/10 border border-blue-100 p-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <div className="pl-4 text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama UMKM, produk, atau kategori..."
                    className="w-full px-3 py-2 text-sm sm:text-base text-slate-700 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-600/30 active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Cari
                  </button>
                </div>
              </form>

              {/* 3 Keunggulan (Informasi Lengkap, Terpercaya, Dukung UMKM Lokal) */}
              <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-slate-200/60 text-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    <Store className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Informasi Lengkap</span>
                </div>

                <div className="h-6 w-px bg-slate-300 hidden sm:block"></div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Terpercaya</span>
                </div>

                <div className="h-6 w-px bg-slate-300 hidden sm:block"></div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Dukung UMKM Lokal</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image & Badges (Matching Screenshot) */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Outer Blue Organic Backdrop */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square">
                {/* Background soft blue splash shape */}
                <div className="absolute inset-4 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-3xl transform rotate-3 opacity-90 shadow-2xl"></div>
                
                {/* Collage Container */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden bg-white/40 backdrop-blur-sm p-3 border border-white/60 shadow-xl flex flex-col justify-between">
                  
                  {/* Top floating badge */}
                  <div className="self-end bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-blue-100 flex items-center gap-2 text-slate-800 z-20 animate-pulse">
                    <span className="text-xl">✨</span>
                    <div>
                      <p className="text-xs font-bold text-blue-800">UMKM Maju,</p>
                      <p className="text-xs font-semibold text-slate-600">Ekonomi Bangkit!</p>
                    </div>
                  </div>

                  {/* Collage Grid */}
                  <div className="grid grid-cols-2 gap-2 my-auto">
                    <div className="rounded-xl overflow-hidden shadow-md h-36 bg-slate-200">
                      <img 
                        src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=400&q=80" 
                        alt="Anyaman Lokal" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md h-36 bg-slate-200">
                      <img 
                        src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80" 
                        alt="Keripik Makmur" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md h-36 bg-slate-200 col-span-2">
                      <img 
                        src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" 
                        alt="Produk UMKM Unggulan" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Bottom Counter bar */}
                  <div className="bg-slate-900/85 text-white backdrop-blur-md rounded-xl p-3 flex justify-around text-center">
                    <div>
                      <div className="text-base font-bold text-blue-400">{(umkmList || []).length}</div>
                      <div className="text-[11px] text-slate-300">UMKM Aktif</div>
                    </div>
                    <div className="w-px bg-slate-700"></div>
                    <div>
                      <div className="text-base font-bold text-emerald-400">100%</div>
                      <div className="text-[11px] text-slate-300">Produk Lokal</div>
                    </div>
                    <div className="w-px bg-slate-700"></div>
                    <div>
                      <div className="text-base font-bold text-amber-400">4.8★</div>
                      <div className="text-[11px] text-slate-300">Kepuasan</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: UMKM TERDAFTAR (Sesuai Persis di Gambar Desain) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                UMKM Terdaftar
              </h2>
            </div>
            <p className="mt-1 text-sm sm:text-base text-slate-500">
              Jelajahi berbagai UMKM unggulan dari berbagai kategori di seluruh Indonesia.
            </p>
          </div>

          <div>
            <button
              onClick={() => setActiveTab('UMKM')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 text-xs sm:text-sm font-semibold transition-all bg-white cursor-pointer group"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Grid 5 Kolom atau Empty State jika Belum Ada Data */}
        {displayedUMKM.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
            <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">Belum Ada Data UMKM</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
              Saat ini belum ada data UMKM yang terdaftar. Data yang ditambahkan oleh pengguna akan otomatis tampil di sini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {displayedUMKM.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectUMKM(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Gambar & Badge Status */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  {/* Badge Aktif Hijau di Pojok Kanan Atas */}
                  <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {item.status || "Aktif"}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.nama}
                    </h3>

                    {/* Kategori */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.kategori}</span>
                    </div>

                    {/* Lokasi */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.lokasi}</span>
                    </div>
                  </div>

                  {/* Rating & Action Arrow */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-800">{item.rating}</span>
                      <span className="text-slate-400">({item.ulasan} ulasan)</span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* QUICK CATEGORY HIGHLIGHT */}
      <section className="py-10 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Kategori Populer</h2>
            <p className="text-sm text-slate-500 mt-1">Telusuri UMKM berdasarkan kelompok produk favorit pilihan masyarakat</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { label: 'Makanan & Minuman', icon: '🍲', color: 'from-orange-50 to-amber-50 text-amber-700' },
              { label: 'Fashion & Aksesoris', icon: '👗', color: 'from-pink-50 to-rose-50 text-rose-700' },
              { label: 'Kerajinan Tangan', icon: '🎨', color: 'from-purple-50 to-indigo-50 text-indigo-700' },
              { label: 'Kosmetik & Perawatan', icon: '💄', color: 'from-teal-50 to-cyan-50 text-teal-700' },
              { label: 'Minuman Segar', icon: '🧃', color: 'from-blue-50 to-sky-50 text-blue-700' },
            ].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat.label);
                  setActiveTab('Kategori');
                }}
                className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} border border-slate-200/60 hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer group`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs sm:text-sm font-semibold">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION UNTUK PELAKU USAHA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 pointer-events-none">
            <Store className="w-96 h-96" />
          </div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-xs font-semibold text-blue-200">
              Gratis & Terverifikasi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Punya Usaha UMKM? Daftarkan Sekarang!
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Jangkau ribuan pelanggan baru di seluruh Indonesia. Dapatkan akses ke program pelatihan, fasilitas legalitas usaha, dan direktori digital InfoUMKM tanpa dipungut biaya.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('Daftar')}
                className="px-6 py-3 rounded-full bg-white text-blue-800 hover:bg-blue-50 font-bold text-sm shadow-lg transition-all cursor-pointer"
              >
                Daftarkan Usaha Saya
              </button>
              <button
                onClick={() => setActiveTab('Tentang Kami')}
                className="px-6 py-3 rounded-full bg-blue-600/40 hover:bg-blue-600/60 text-white font-semibold text-sm border border-blue-400/30 transition-all cursor-pointer"
              >
                Pelajari Manfaatnya
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

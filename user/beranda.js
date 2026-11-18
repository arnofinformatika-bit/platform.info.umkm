import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  ArrowRight, 
  Utensils, 
  Shirt, 
  Gift, 
  Home, 
  Sparkles, 
  Cpu, 
  MoreHorizontal, 
  Star, 
  MapPin, 
  Bookmark, 
  Calendar, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Heart,
  Plus,
  Store
} from 'lucide-react';

export default function UserBeranda({ 
  umkmList = [], 
  userAuth = null,
  setActiveUserTab, 
  onSelectUMKM, 
  searchQuery, 
  setSearchQuery,
  onSwitchToAdmin 
}) {
  const categories = [
    { id: 'kuliner', name: 'Makanan & Minuman', icon: <Utensils className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-50 text-amber-700 hover:border-amber-300' },
    { id: 'fashion', name: 'Fashion & Aksesoris', icon: <Shirt className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50 text-emerald-700 hover:border-emerald-300' },
    { id: 'kerajinan', name: 'Kerajinan & Handicraft', icon: <Gift className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50 text-amber-700 hover:border-amber-300' },
    { id: 'dekorasi', name: 'Peralatan Rumah & Dekorasi', icon: <Home className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50 text-blue-700 hover:border-blue-300' },
    { id: 'kecantikan', name: 'Kecantikan & Perawatan Diri', icon: <Sparkles className="w-5 h-5 text-pink-600" />, bg: 'bg-pink-50 text-pink-700 hover:border-pink-300' },
    { id: 'elektronik', name: 'Elektronik & Aksesoris', icon: <Cpu className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-50 text-indigo-700 hover:border-indigo-300' },
    { id: 'lainnya', name: 'Lainnya', icon: <MoreHorizontal className="w-5 h-5 text-slate-500" />, bg: 'bg-slate-50 text-slate-700 hover:border-slate-300' },
  ];

  // Hanya ambil data UMKM milik pengguna sendiri (bukan dummy publik)
  const currentUserId = userAuth?.id;
  const currentUserEmail = userAuth?.email?.toLowerCase();
  const currentUserName = userAuth?.name?.toLowerCase();

  const myUMKM = (umkmList || []).filter((item) => {
    if (item.userId && currentUserId && String(item.userId) === String(currentUserId)) return true;
    if (item.userEmail && currentUserEmail && item.userEmail.toLowerCase() === currentUserEmail) return true;
    if (item.pemilik && currentUserName && item.pemilik.toLowerCase() === currentUserName) return true;
    if (item.isUserAdded && !currentUserId && !currentUserEmail) return true;
    return false;
  });

  const articles = [
    {
      id: 1,
      title: "Pameran UMKM Nasional 2025 Resmi Dibuka!",
      date: "12 Juni 2025",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "Tips Mengembangkan UMKM di Era Digital",
      date: "10 Juni 2025",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      title: "Strategi Pemasaran Online untuk UMKM",
      date: "5 Juni 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
    }
  ];

  return (
    <div className="space-y-7 pb-10">
      
      {/* HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-100/90 via-blue-50/70 to-sky-100/80 border border-blue-100 shadow-sm p-6 sm:p-9">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-no-repeat bg-right bg-contain" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')` }}></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.2]">
              Temukan & Dukung <br />
              <span className="text-blue-600">Seluruh UMKM Indonesia</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
              Kelola usaha lokal Anda dan jangkau lebih banyak pelanggan di seluruh penjuru negeri.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setActiveUserTab('katalog')}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Kelola Data UMKM Anda</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Collage & Female Entrepreneur Picture */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative flex items-center justify-center">
              <div className="hidden sm:block absolute -left-12 top-4 w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white transform -rotate-6 z-10">
                <img src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=300&q=80" alt="Handicraft" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block absolute -left-16 bottom-2 w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-white transform rotate-3 z-10">
                <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80" alt="Batik" className="w-full h-full object-cover" />
              </div>

              <div className="w-56 sm:w-64 h-64 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-blue-200">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                  alt="Pelaku UMKM Ramah" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -right-4 bottom-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-100 z-20">
                <div className="text-xs font-black text-blue-900 italic">UMKM Maju,</div>
                <div className="text-xs font-extrabold text-blue-600 italic">Indonesia Maju!</div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-end gap-1.5 mt-4 pt-2">
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span className="w-5 h-2 rounded-full bg-blue-600"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
        </div>
      </div>

      {/* SECTION: Kategori UMKM */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Kategori UMKM</h2>
          </div>
          <button 
            onClick={() => setActiveUserTab('katalog')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Katalog Anda</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Horizontal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveUserTab('katalog')}
              className={`p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer group hover:-translate-y-0.5 ${cat.bg}`}
            >
              <div className="w-11 h-11 rounded-2xl bg-white shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="text-xs font-bold leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: DATA UMKM ANDA (Hanya Milik Pengguna, Kosong jika belum ditambahkan) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Data UMKM Anda</h2>
          </div>
          {myUMKM.length > 0 && (
            <button 
              onClick={() => setActiveUserTab('katalog')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Kelola Semua ({myUMKM.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {myUMKM.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-blue-200 p-8 sm:p-10 text-center space-y-4 shadow-2xs">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <Store className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Data UMKM Anda Belum Ditambahkan
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Halo <strong>{userAuth?.name || 'Pelaku Usaha'}</strong>, Anda belum memiliki data UMKM yang terdaftar. Tambahkan data UMKM Anda sendiri agar otomatis masuk ke sistem Admin InfoUMKM.
              </p>
            </div>

            <div>
              <button
                onClick={() => setActiveUserTab('katalog')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>+ Tambah Data UMKM Anda</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {myUMKM.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectUMKM && onSelectUMKM(item)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-1"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={item.gambar} 
                    alt={item.nama} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    UMKM Anda
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.nama}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-700 mt-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold">{item.rating || 5.0}</span>
                      <span className="text-slate-400 text-[11px]">({item.ulasan || 1} ulasan)</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.lokasi}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                    <span>Kelola di Katalog</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION: Informasi Terbaru */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Informasi Terbaru</h2>
          </div>
          <button 
            onClick={() => setActiveUserTab('informasi')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((art) => (
            <div 
              key={art.id}
              onClick={() => setActiveUserTab('informasi')}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="h-44 w-full overflow-hidden bg-slate-100">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{art.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors leading-snug">
                    {art.title}
                  </h3>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

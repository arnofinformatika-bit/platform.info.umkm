import React from 'react';
import { 
  Utensils, 
  Shirt, 
  Sparkles, 
  Heart, 
  Coffee, 
  Tractor, 
  Cpu, 
  FolderCheck,
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function Kategori({ umkmList, onSelectCategory, setActiveTab }) {
  const categoryDefinitions = [
    {
      id: "kuliner",
      name: "Makanan & Minuman",
      desc: "Produk pangan kemasan, camilan tradisional, bumbu khas nusantara, dan olahan siap saji berkualitas.",
      icon: <Utensils className="w-8 h-8 text-amber-600" />,
      bg: "bg-amber-50 border-amber-200",
      accent: "text-amber-700 bg-amber-100",
      badge: "Kategori Terfavorit",
      contoh: ["Keripik Makmur", "Sambal Roa", "Kue Kering"]
    },
    {
      id: "fashion",
      name: "Fashion & Aksesoris",
      desc: "Kain batik asli, tenun tradisional, busana muslim, alas kaki kulit, dan aksesoris kerajinan tangan.",
      icon: <Shirt className="w-8 h-8 text-rose-600" />,
      bg: "bg-rose-50 border-rose-200",
      accent: "text-rose-700 bg-rose-100",
      badge: "Kekayaan Budaya",
      contoh: ["Batik Tulis", "Tenun Ikat", "Sepatu Kulit"]
    },
    {
      id: "minuman",
      name: "Minuman",
      desc: "Sari buah alami, jamu herbal tradisional, kopi spesialti pegunungan nusantara, dan sirup lokal.",
      icon: <Coffee className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-50 border-blue-200",
      accent: "text-blue-700 bg-blue-100",
      badge: "Segar & Alami",
      contoh: ["Es Segar Jaya", "Kopi Merapi", "Wedang Uwuh"]
    },
    {
      id: "kerajinan",
      name: "Kerajinan Tangan",
      desc: "Anyaman bambu dan rotan, keramik tanah liat kasongan, ukiran kayu jati, dan dekorasi estetik rumah.",
      icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
      bg: "bg-indigo-50 border-indigo-200",
      accent: "text-indigo-700 bg-indigo-100",
      badge: "Kreatif & Ramah Lingkungan",
      contoh: ["Anyaman Kita", "Gerabah Kasongan", "Wayang Kulit"]
    },
    {
      id: "kosmetik",
      name: "Kosmetik & Perawatan",
      desc: "Produk kecantikan organik, lulur rempah tradisional, sabun alami handmade, dan minyak atsiri murni.",
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-200",
      accent: "text-emerald-700 bg-emerald-100",
      badge: "BPOM & Halal",
      contoh: ["Glow Beauty", "Lulur Bali", "Minyak Kelapa Murni"]
    },
    {
      id: "agrobisnis",
      name: "Agrobisnis & Tanaman",
      desc: "Bibit tanaman unggul, pupuk organik hayati, madu murni hutan nusantara, dan hasil tani organik.",
      icon: <Tractor className="w-8 h-8 text-teal-600" />,
      bg: "bg-teal-50 border-teal-200",
      accent: "text-teal-700 bg-teal-100",
      badge: "Hasil Alam",
      contoh: ["Madu Hutan", "Beras Organik", "Tanaman Hias"]
    }
  ];

  const getCountByCategory = (catName) => {
    return (umkmList || []).filter(item => item.kategori.toLowerCase().includes(catName.toLowerCase()) || catName.toLowerCase().includes(item.kategori.toLowerCase())).length;
  };

  const handleCardClick = (catName) => {
    onSelectCategory(catName);
    setActiveTab('UMKM');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            <Layers className="w-4 h-4" />
            <span>Katalog Sektor Bisnis UMKM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Jelajahi Berdasarkan Kategori
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Temukan produk dan layanan UMKM terbaik yang terbagi ke dalam berbagai sektor usaha unggulan Indonesia.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {categoryDefinitions.map((cat) => {
            const count = getCountByCategory(cat.name);
            return (
              <div
                key={cat.id}
                onClick={() => handleCardClick(cat.name)}
                className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 ${cat.bg}`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${cat.accent}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cat.desc}
                  </p>

                  {/* Contoh produk */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Populer:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.contoh.map((c, i) => (
                        <span key={i} className="text-[11px] bg-white/90 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">
                    {count} Pelaku Usaha
                  </span>

                  <div className="flex items-center gap-1 text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Lihat Produk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div>
            <h4 className="font-bold text-slate-800 text-base">Kategori usaha Anda belum terdaftar di sini?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Admin dan pelaku usaha dapat menambahkan kategori baru saat mendaftarkan profil usaha.</p>
          </div>
          <button
            onClick={() => setActiveTab('Daftar')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors shadow-sm"
          >
            Daftar Sebagai Pelaku Usaha
          </button>
        </div>

      </div>
    </div>
  );
}

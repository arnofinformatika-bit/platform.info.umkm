import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Tag, 
  Star, 
  Bookmark, 
  Filter, 
  ArrowRight,
  Phone,
  Sparkles
} from 'lucide-react';

export default function UserKatalog({ umkmList = [], onSelectUMKM }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('Semua');
  const [savedItems, setSavedItems] = useState([]);

  const categories = [
    'Semua',
    'Makanan & Minuman',
    'Fashion & Aksesoris',
    'Kerajinan Tangan',
    'Peralatan Rumah & Dekorasi',
    'Kecantikan & Perawatan Diri',
    'Elektronik & Aksesoris'
  ];

  const toggleSave = (id, e) => {
    e.stopPropagation();
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(x => x !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  const filtered = (umkmList || []).filter((item) => {
    const matchCat = selectedCat === 'Semua' || 
      item.kategori.toLowerCase().includes(selectedCat.toLowerCase()) || 
      selectedCat.toLowerCase().includes(item.kategori.toLowerCase());
    const matchSearch = 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Katalog Produk UMKM</h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Jelajahi dan temukan berbagai macam produk karya pelaku UMKM dari seluruh nusantara.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan nama toko, jenis produk, atau lokasi kota..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="font-semibold text-slate-400 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Menemukan <strong>{filtered.length}</strong> UMKM unggulan</span>
        {selectedCat !== 'Semua' && (
          <button onClick={() => setSelectedCat('Semua')} className="text-blue-600 hover:underline">
            Reset filter kategori
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="text-3xl mb-2">🔍</div>
          <p className="font-bold text-slate-700">Tidak ada produk atau UMKM yang cocok</p>
          <p className="text-xs text-slate-400 mt-1">Gunakan kata kunci lain atau pilih Semua Kategori.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item) => {
            const isSaved = savedItems.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectUMKM(item)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-1"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => toggleSave(item.id, e)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-xl flex items-center justify-center shadow-xs transition-colors backdrop-blur-xs cursor-pointer ${
                      isSaved ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-600 hover:text-rose-500'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <div className="absolute top-2.5 left-2.5 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    {item.status || "Aktif"}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.nama}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.kategori}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.lokasi}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-800">{item.rating}</span>
                      <span className="text-slate-400 text-[11px]">({item.ulasan})</span>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Detail <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

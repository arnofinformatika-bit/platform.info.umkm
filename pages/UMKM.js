import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Tag, 
  Star, 
  ArrowRight, 
  Filter, 
  Plus, 
  Phone, 
  RotateCcw, 
  Edit3, 
  Trash2, 
  ExternalLink,
  CheckCircle,
  Building2
} from 'lucide-react';

export default function UMKM({ 
  umkmList, 
  onOpenAdminModal, 
  onEditUMKM, 
  onDeleteUMKM, 
  onResetData, 
  onSelectUMKM,
  initialCategoryFilter = 'Semua' 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryFilter);
  const [sortBy, setSortBy] = useState('default');

  const categories = [
    'Semua',
    'Fashion & Aksesoris',
    'Makanan & Minuman',
    'Minuman',
    'Kerajinan Tangan',
    'Kosmetik & Perawatan'
  ];

  // Filtering
  const filteredList = (umkmList || []).filter((item) => {
    const matchCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchSearch = 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.deskripsi && item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Sorting
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    if (sortBy === 'reviews-desc') return b.ulasan - a.ulasan;
    if (sortBy === 'name-asc') return a.nama.localeCompare(b.nama);
    return 0; // default
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h1 className="text-3xl font-extrabold text-slate-900">Direktori UMKM Terdaftar</h1>
            </div>
            <p className="mt-1 text-slate-500 text-sm">
              Temukan profil lengkap, katalog produk, dan kontak langsung pelaku usaha lokal se-Indonesia.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onResetData}
              title="Kembalikan data ke kondisi awal"
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset UMKM</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari berdasarkan nama UMKM, produk, atau kota..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-56">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 cursor-pointer"
              >
                <option value="default">Urutan Standar</option>
                <option value="rating-desc">Rating Tertinggi (★)</option>
                <option value="reviews-desc">Ulasan Terbanyak</option>
                <option value="name-asc">Nama (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Menampilkan <strong className="text-slate-800">{sortedList.length}</strong> usaha UMKM</span>
          {selectedCategory !== 'Semua' && (
            <button 
              onClick={() => setSelectedCategory('Semua')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Hapus filter kategori
            </button>
          )}
        </div>

        {/* Cards Grid */}
        {sortedList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-700">Tidak ada UMKM ditemukan</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
              Coba gunakan kata kunci pencarian lain atau klik tombol "Tambah UMKM" untuk menambahkan data baru.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedList.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div 
                  className="relative h-48 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => onSelectUMKM(item)}
                >
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {item.status || "Aktif"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div 
                      onClick={() => onSelectUMKM(item)}
                      className="cursor-pointer"
                    >
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.nama}
                      </h3>
                      
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {item.deskripsi || "Pelaku UMKM terdaftar di platform InfoUMKM Indonesia."}
                      </p>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700">{item.kategori}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.lokasi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating, Admin Actions, and Contact Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-slate-800">{item.rating}</span>
                        <span className="text-slate-400">({item.ulasan} ulasan)</span>
                      </div>

                      {/* Admin Quick Action Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onEditUMKM(item)}
                          title="Edit UMKM (Admin)"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteUMKM(item.id)}
                          title="Hapus UMKM (Admin)"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectUMKM(item)}
                      className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Lihat Detail Usaha</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Star, 
  MapPin, 
  Tag, 
  ExternalLink,
  Store,
  Filter
} from 'lucide-react';

export default function KelolaUMKM({ 
  umkmList = [], 
  onOpenAddUMKM, 
  onEditUMKM, 
  onDeleteUMKM, 
  onResetData 
}) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');

  const filtered = (umkmList || []).filter(item => {
    const matchCat = filterCategory === 'Semua' || item.kategori === filterCategory;
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || item.lokasi.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Data UMKM</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Tambah, perbarui profil, atau kelola seluruh pelaku UMKM yang terdaftar di platform InfoUMKM.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onResetData}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset UMKM</span>
          </button>

          <button
            onClick={onOpenAddUMKM}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah UMKM</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama usaha atau kota..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="w-full sm:w-56">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Makanan & Minuman">Makanan & Minuman</option>
            <option value="Fashion & Aksesoris">Fashion & Aksesoris</option>
            <option value="Kerajinan Tangan">Kerajinan Tangan</option>
            <option value="Minuman">Minuman</option>
            <option value="Kosmetik & Perawatan">Kosmetik & Perawatan</option>
          </select>
        </div>
      </div>

      {/* UMKM Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-4">UMKM</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Lokasi</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Kontak</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img 
                      src={item.gambar} 
                      alt={item.nama} 
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-100" 
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.nama}</div>
                      <div className="text-[11px] text-slate-400">ID: #{item.id}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{item.kategori}</td>
                  <td className="py-3.5 px-4 text-slate-600">{item.lokasi}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-slate-400 font-normal">({item.ulasan})</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{item.kontak || "-"}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {item.status || "Aktif"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onEditUMKM(item)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit UMKM"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteUMKM(item.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus UMKM"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            Tidak ada data UMKM yang sesuai dengan filter pencarian.
          </div>
        )}
      </div>
    </div>
  );
}

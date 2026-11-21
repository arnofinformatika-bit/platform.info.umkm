import React, { useState } from 'react';
import { Layers, Plus, Edit3, Trash2, Tag, CheckCircle2 } from 'lucide-react';

export default function KelolaKategori({ umkmList = [] }) {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Makanan & Minuman', icon: '🍲', count: 34, description: 'Olahan makanan, jajanan, keripik, kue basah, dan katering' },
    { id: 2, name: 'Fashion & Aksesoris', icon: '👗', count: 28, description: 'Batik tulis, tenun ikat nusantara, busana muslim, dan sepatu kulit' },
    { id: 3, name: 'Kerajinan & Handicraft', icon: '🎨', count: 18, description: 'Anyaman bambu rotan, keramik tanah liat, dekorasi rumah' },
    { id: 4, name: 'Peralatan Rumah & Dekorasi', icon: '🏠', count: 12, description: 'Mebel kayu jati, lampu hias, peralatan makan kayu' },
    { id: 5, name: 'Kecantikan & Perawatan Diri', icon: '💄', count: 8, description: 'Skincare organik, sabun herbal alami, minyak atsiri' },
    { id: 6, name: 'Elektronik & Aksesoris', icon: '💡', count: 6, description: 'Perangkat penunjang, lampu hemat energi, perakitan lokal' },
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📦');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: newCatName,
        icon: newCatIcon || '📦',
        count: 0,
        description: newCatDesc || 'Kategori produk UMKM binaan baru'
      }
    ]);
    setNewCatName('');
    setNewCatDesc('');
    setShowModal(false);
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      setCategories(categories.filter(c => c.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Kategori UMKM</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Atur sektor usaha, klasifikasi produk, dan struktur navigasi kategori bagi pembeli.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Kategori</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                  {cat.count}% Proporsi
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-3">{cat.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Aktif di sistem</span>
              <button
                onClick={() => handleDelete(cat.id)}
                className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                title="Hapus Kategori"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Category */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Tambah Kategori Baru</h3>
            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Kategori *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Contoh: Agrobisnis Organik"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Emoji / Icon Simbol</label>
                <input
                  type="text"
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  placeholder="Contoh: 🌾"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Penjelasan jenis produk dalam kategori ini..."
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* DIALOG KONFIRMASI HAPUS IN-APP */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <Trash2 className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-base">Hapus Kategori?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Apakah Anda yakin ingin menghapus kelompok kategori UMKM ini?
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

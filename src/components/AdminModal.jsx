import React, { useState, useEffect } from 'react';
import { X, Building2, Tag, MapPin, Star, Phone, Image, FileText, CheckCircle2 } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onSave, editingItem }) {
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Makanan & Minuman',
    lokasi: '',
    rating: 4.8,
    ulasan: 50,
    status: 'Aktif',
    deskripsi: '',
    kontak: '',
    gambar: ''
  });

  const categories = [
    'Makanan & Minuman',
    'Fashion & Aksesoris',
    'Minuman',
    'Kerajinan Tangan',
    'Kosmetik & Perawatan',
    'Agrobisnis & Tanaman'
  ];

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        nama: '',
        kategori: 'Makanan & Minuman',
        lokasi: '',
        rating: 4.8,
        ulasan: 50,
        status: 'Aktif',
        deskripsi: '',
        kontak: '+62 812-0000-0000',
        gambar: ''
      });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.lokasi) {
      alert('Nama UMKM dan Lokasi wajib diisi.');
      return;
    }

    const payload = {
      ...formData,
      id: editingItem ? editingItem.id : Date.now(),
      rating: parseFloat(formData.rating) || 4.8,
      ulasan: parseInt(formData.ulasan, 10) || 1,
      gambar: formData.gambar.trim() || 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80'
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {editingItem ? 'Edit Data UMKM (Admin)' : 'Tambah Data UMKM Baru (Admin)'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Data ini akan disimpan dan langsung muncul di katalog InfoUMKM.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Nama UMKM *
            </label>
            <input
              type="text"
              required
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              placeholder="Contoh: Batik Jayakarta"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Kategori *
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Lokasi Kota / Kab *
              </label>
              <input
                type="text"
                required
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                placeholder="Contoh: Yogyakarta / Semarang"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Rating (1 - 5)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Jumlah Ulasan
              </label>
              <input
                type="number"
                min="0"
                value={formData.ulasan}
                onChange={(e) => setFormData({ ...formData, ulasan: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Aktif">Aktif</option>
                <option value="Non-aktif">Non-aktif</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Nomor WhatsApp / Kontak
            </label>
            <input
              type="text"
              value={formData.kontak}
              onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
              placeholder="+62 812-xxxx-xxxx"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              URL Foto Produk
            </label>
            <input
              type="url"
              value={formData.gambar}
              onChange={(e) => setFormData({ ...formData, gambar: e.target.value })}
              placeholder="https://images.unsplash.com/... (opsional)"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Deskripsi Usaha
            </label>
            <textarea
              rows={3}
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              placeholder="Penjelasan produk atau keunggulan UMKM ini..."
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            ></textarea>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
            >
              {editingItem ? 'Simpan Perubahan' : 'Tambah UMKM'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

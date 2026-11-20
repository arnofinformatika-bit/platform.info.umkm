import React, { useState, useEffect, useRef } from 'react';
import { X, Building2, Tag, MapPin, Star, Phone, Image, FileText, CheckCircle2, UploadCloud, Trash2, CheckCircle, Link2 } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onSave, editingItem }) {
  const fileInputRef = useRef(null);
  const [imageFileName, setImageFileName] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Makanan & Minuman',
    lokasi: '',
    rating: 5.0,
    ulasan: 1,
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
      setImageFileName(editingItem.gambar ? 'Foto UMKM Terpasang' : '');
    } else {
      setFormData({
        nama: '',
        kategori: 'Makanan & Minuman',
        lokasi: '',
        rating: 5.0,
        ulasan: 1,
        status: 'Aktif',
        deskripsi: '',
        kontak: '',
        gambar: ''
      });
      setImageFileName('');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [editingItem, isOpen]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid (JPG, PNG, JPEG, WEBP).');
      return;
    }

    setImageFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 900;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setFormData((prev) => ({ ...prev, gambar: compressedDataUrl }));
      };
      img.onerror = () => {
        setFormData((prev) => ({ ...prev, gambar: event.target.result }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

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
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2.5 sm:p-4 overflow-y-auto bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl border border-slate-100 my-2.5 sm:my-8">
        
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
                placeholder="Contoh: Bandar Lampung / Jakarta"
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
              placeholder="Contoh: 0812-3456-7890"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          {/* Upload Foto Produk */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Foto Produk / Usaha
            </label>
            
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!formData.gambar ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50/80 rounded-2xl p-4 text-center cursor-pointer transition-all"
              >
                <UploadCloud className="w-6 h-6 text-blue-600 mx-auto" />
                <p className="mt-1.5 text-xs font-bold text-slate-800">
                  Klik untuk Upload Foto dari Komputer
                </p>
                <p className="text-[11px] text-slate-500">
                  Mendukung JPG, PNG, WEBP
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                  <img src={formData.gambar} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Foto Siap Dipakai</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{imageFileName || 'Foto terpilih'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Ganti
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, gambar: '' });
                        setImageFileName('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3 h-3" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <Link2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="url"
                value={formData.gambar}
                onChange={(e) => {
                  setFormData({ ...formData, gambar: e.target.value });
                  setImageFileName('URL Eksternal');
                }}
                placeholder="Atau tempel link URL foto https://..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
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

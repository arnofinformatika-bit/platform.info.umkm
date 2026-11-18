import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Tag, 
  MapPin, 
  Phone, 
  Star, 
  ArrowRight, 
  Edit3, 
  Trash2, 
  Store, 
  Sparkles, 
  CheckCircle, 
  X, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export default function UserKatalog({ 
  umkmList = [], 
  userAuth = null,
  onSaveUMKM, 
  onDeleteUMKM, 
  onSelectUMKM 
}) {
  // Search untuk data UMKM milik user
  const [searchTerm, setSearchTerm] = useState('');

  // State Modal Tambah / Edit Data UMKM
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Makanan & Minuman',
    harga: 'Rp 25.000',
    lokasi: '',
    kontak: '',
    deskripsi: '',
    gambar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
  });

  const categories = [
    'Makanan & Minuman',
    'Fashion & Aksesoris',
    'Kerajinan Tangan',
    'Peralatan Rumah & Dekorasi',
    'Kecantikan & Perawatan Diri',
    'Elektronik & Aksesoris'
  ];

  const presetImages = [
    { label: 'Kuliner', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80' },
    { label: 'Camilan', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80' },
    { label: 'Minuman/Kopi', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
    { label: 'Batik/Fashion', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80' },
    { label: 'Kerajinan', url: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80' },
    { label: 'Skincare', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80' }
  ];

  // Hanya ambil data UMKM yang ditambahkan oleh user saat ini
  const currentUserId = userAuth?.id;
  const currentUserEmail = userAuth?.email?.toLowerCase();
  const currentUserName = userAuth?.name?.toLowerCase();

  const myCatalog = (umkmList || []).filter((item) => {
    // 1. Cocok dengan ID akun user
    if (item.userId && currentUserId && String(item.userId) === String(currentUserId)) return true;
    // 2. Cocok dengan email user
    if (item.userEmail && currentUserEmail && item.userEmail.toLowerCase() === currentUserEmail) return true;
    // 3. Cocok dengan nama pemilik dan ditandai buatan user
    if (item.pemilik && currentUserName && item.pemilik.toLowerCase() === currentUserName) return true;
    // 4. Jika dibuat oleh user lokal
    if (item.isUserAdded && !currentUserId && !currentUserEmail) return true;
    return false;
  });

  // Filter pencarian data UMKM milik user
  const filteredMyCatalog = myCatalog.filter((item) => {
    return (
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Buka Modal Tambah
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      nama: userAuth?.usaha && userAuth.usaha !== '-' ? userAuth.usaha : '',
      kategori: 'Makanan & Minuman',
      harga: 'Rp 25.000',
      lokasi: 'Yogyakarta',
      kontak: userAuth?.phone && userAuth.phone !== '-' ? userAuth.phone : '+62 812-3456-7890',
      deskripsi: '',
      gambar: presetImages[0].url
    });
    setIsModalOpen(true);
  };

  // Buka Modal Edit
  const handleOpenEdit = (item, e) => {
    if (e) e.stopPropagation();
    setEditingItem(item);
    setFormData({
      nama: item.nama || '',
      kategori: item.kategori || 'Makanan & Minuman',
      harga: item.harga || 'Rp 25.000',
      lokasi: item.lokasi || '',
      kontak: item.kontak || '',
      deskripsi: item.deskripsi || '',
      gambar: item.gambar || presetImages[0].url
    });
    setIsModalOpen(true);
  };

  // Hapus Data UMKM Sendiri
  const handleDeleteMyItem = (item, e) => {
    if (e) e.stopPropagation();
    if (window.confirm(`Hapus data UMKM "${item.nama}" dari akun Anda? Data juga akan terhapus dari sistem Admin.`)) {
      if (onDeleteUMKM) {
        onDeleteUMKM(item.id);
      }
    }
  };

  // Simpan Data UMKM (Otomatis masuk ke Admin & Direktori Utama)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      alert('Mohon isi nama produk atau usaha UMKM Anda.');
      return;
    }

    const itemToSave = {
      id: editingItem ? editingItem.id : Date.now(),
      nama: formData.nama.trim(),
      pemilik: userAuth?.name || 'Pelaku UMKM Mitra',
      userId: userAuth?.id || 'user-' + Date.now(),
      userEmail: userAuth?.email || '',
      kategori: formData.kategori,
      harga: formData.harga.trim() || 'Hubungi Penjual',
      lokasi: formData.lokasi.trim() || 'Indonesia',
      kontak: formData.kontak.trim() || '+62 812-3456-7890',
      deskripsi: formData.deskripsi.trim() || `Produk berkualitas dari ${formData.nama.trim()}.`,
      gambar: formData.gambar || presetImages[0].url,
      rating: editingItem ? (editingItem.rating || 5.0) : 5.0,
      ulasan: editingItem ? (editingItem.ulasan || 1) : 1,
      status: 'Aktif',
      isUserAdded: true,
      updatedAt: new Date().toISOString()
    };

    if (onSaveUMKM) {
      onSaveUMKM(itemToSave);
    }

    setIsModalOpen(false);
    alert(
      editingItem 
        ? `Data UMKM "${itemToSave.nama}" berhasil diperbarui!` 
        : `Berhasil menambahkan data UMKM "${itemToSave.nama}"! Data otomatis masuk ke sistem Admin dan direktori utama.`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Data UMKM Anda
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
              {myCatalog.length} UMKM Terdaftar
            </span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Kelola profil usaha dan katalog produk Anda. Data yang Anda tambahkan otomatis masuk ke sistem Admin InfoUMKM.
          </p>
        </div>

        {/* Tombol Tambah Data */}
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Tambah Data UMKM Anda</span>
        </button>
      </div>

      {/* Baris Pencarian (Hanya jika user sudah punya data UMKM) */}
      {myCatalog.length > 0 && (
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari data UMKM Anda..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
          <div className="text-xs text-slate-500">
            Menampilkan <strong>{filteredMyCatalog.length}</strong> dari {myCatalog.length} usaha Anda
          </div>
        </div>
      )}

      {/* KONDISI 1: DATA UMKM KOSONG (Belum Ditambahkan oleh User) */}
      {myCatalog.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-blue-200 p-8 sm:p-14 text-center space-y-6 shadow-2xs">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner border border-blue-200">
            <Store className="w-10 h-10 stroke-[1.8]" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Data UMKM Anda Belum Ditambahkan
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Halo <strong>{userAuth?.name || 'Pelaku UMKM'}</strong>, saat ini Anda belum menambahkan profil atau data produk UMKM Anda. Silakan klik tombol di bawah untuk menambahkan data UMKM Anda sendiri.
            </p>
          </div>

          <div>
            <button
              onClick={handleOpenAdd}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 mx-auto cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>+ Tambah Data UMKM Anda Sekarang</span>
            </button>
          </div>

          {/* 3 Kotak Penjelasan Fitur Otomatis */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-2xl mx-auto text-left text-xs">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Otomatis Masuk Admin</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Data yang Anda tambahkan langsung masuk ke sistem kelola data Admin InfoUMKM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Tampil di Halaman Publik</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Usaha Anda akan muncul di Direktori UMKM Utama agar dapat dijangkau seluruh pembeli.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Kontak WhatsApp Aktif</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Calon pembeli dapat menghubungi nomor WhatsApp usaha Anda secara langsung.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* KONDISI 2: DATA UMKM SUDAH DITAMBAHKAN USER */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredMyCatalog.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectUMKM && onSelectUMKM(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-1"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  UMKM Anda
                </div>

                {/* Tombol Edit & Hapus */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleOpenEdit(item, e)}
                    title="Edit Data UMKM"
                    className="w-8 h-8 rounded-xl bg-white/95 hover:bg-blue-600 text-slate-700 hover:text-white flex items-center justify-center shadow-xs transition-colors backdrop-blur-xs cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteMyItem(item, e)}
                    title="Hapus Data UMKM"
                    className="w-8 h-8 rounded-xl bg-white/95 hover:bg-rose-600 text-slate-700 hover:text-white flex items-center justify-center shadow-xs transition-colors backdrop-blur-xs cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-blue-600 mb-1">
                    <span className="truncate">{item.kategori}</span>
                    {item.harga && (
                      <span className="text-slate-800 font-extrabold">{item.harga}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.nama}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.lokasi}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-medium truncate max-w-[120px]">{item.kontak}</span>
                  </div>
                  <button 
                    onClick={(e) => handleOpenEdit(item, e)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Edit <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM: TAMBAH / EDIT DATA UMKM ANDA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">
                    {editingItem ? 'Edit Data UMKM Anda' : 'Tambah Data UMKM Anda'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Data otomatis masuk ke sistem Admin dan direktori utama InfoUMKM.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Usaha / Produk UMKM *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Keripik Pisang Cokelat Lumer"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kategori *
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Harga / Kisaran
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rp 25.000"
                    value={formData.harga}
                    onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kota / Lokasi Usaha *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Yogyakarta / Bandung"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nomor WhatsApp / Kontak *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: +62 812-3456-7890"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Foto Produk */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700 uppercase tracking-wider">
                  Foto Usaha / Produk (Pilih Preset atau URL)
                </label>
                
                <div className="flex flex-wrap gap-1.5">
                  {presetImages.map((p) => (
                    <button
                      type="button"
                      key={p.label}
                      onClick={() => setFormData({ ...formData, gambar: p.url })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                        formData.gambar === p.url
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                    <img src={formData.gambar} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="url"
                    value={formData.gambar}
                    onChange={(e) => setFormData({ ...formData, gambar: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Deskripsi Usaha & Produk
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan keistimewaan dan informasi pemesanan produk Anda..."
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Simpan ke UMKM Anda & Admin</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

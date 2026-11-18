import React, { useState } from 'react';
import { FileText, Plus, Edit3, Trash2, Calendar, Eye } from 'lucide-react';

export default function KelolaInformasi() {
  const [articles, setArticles] = useState([
    { id: 1, title: "Pameran UMKM Nasional 2025 Resmi Dibuka!", category: "Event", date: "12 Juni 2025", author: "Admin Pusat", status: "Published", views: 1420 },
    { id: 2, title: "Tips Mengembangkan UMKM di Era Digital", category: "Panduan", date: "10 Juni 2025", author: "Admin Konten", status: "Published", views: 2890 },
    { id: 3, title: "Strategi Pemasaran Online untuk UMKM", category: "Bisnis", date: "5 Juni 2025", author: "Pakar UMKM", status: "Published", views: 980 },
    { id: 4, title: "Panduan Sertifikasi Halal Gratis (SEHATI) 2026", category: "Legalitas", date: "1 Juni 2025", author: "Admin Regulasi", status: "Draft", views: 150 },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Panduan');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    setArticles([
      {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        date: "Hari ini",
        author: "Admin Utama",
        status: "Published",
        views: 1
      },
      ...articles
    ]);
    setNewTitle('');
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus artikel ini?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Informasi & Berita</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Publikasikan artikel edukasi, berita kebijakan, dan panduan praktis untuk pelaku UMKM.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
            <tr>
              <th className="py-3 px-4">Judul Artikel</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Penulis</th>
              <th className="py-3 px-4">Pembaca</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((art) => (
              <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">{art.title}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[11px]">
                    {art.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">{art.date}</td>
                <td className="py-3.5 px-4 text-slate-600">{art.author}</td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{art.views.toLocaleString()} kali</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    art.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {art.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => handleDelete(art.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Buat Artikel Baru</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Cara Membuat Sertifikat Halal 2026"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kategori Artikel</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Panduan">Panduan & Tips</option>
                  <option value="Event">Event & Pameran</option>
                  <option value="Bisnis">Strategi Bisnis</option>
                  <option value="Legalitas">Legalitas & Modal</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Calendar, 
  Tag, 
  ArrowRight, 
  Share2, 
  BookOpen, 
  Award, 
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { beritaEventData } from '../src/data/initialData';

export default function UserInformasi() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articleGuides = [
    {
      id: 101,
      title: "Pameran UMKM Nasional 2025 Resmi Dibuka!",
      category: "Event",
      date: "12 Juni 2025",
      author: "Humas InfoUMKM",
      readTime: "3 menit baca",
      summary: "Pameran produk unggulan se-Indonesia dihadiri lebih dari 500 pelaku UMKM dan investor luar negeri.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
      content: `Pameran UMKM Nasional 2025 resmi dibuka hari ini di Gedung Jogja Expo Center (JEC). 
      Acara ini menghadirkan perwakilan pelaku usaha dari 38 provinsi di Indonesia dengan fokus utama pada produk pangan lokal, kerajinan ramah lingkungan, dan busana wastra nusantara.

      Tujuan pameran ini adalah membuka peluang ekspor langsung serta mempertemukan pelaku usaha rintisan dengan pembeli grosir dan perbankan penyedia KUR bersubsidi.`
    },
    {
      id: 102,
      title: "Tips Mengembangkan UMKM di Era Digital",
      category: "Panduan",
      date: "10 Juni 2025",
      author: "Tim Riset Ekonomi Digital",
      readTime: "5 menit baca",
      summary: "Langkah-langkah strategis bagi pelaku usaha mikro untuk memanfaatkan kecerdasan buatan dan marketplace.",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80",
      content: `Transformasi digital bukan lagi sekadar pilihan melainkan keharusan bagi UMKM yang ingin bertahan dan bertumbuh pesat di era sekarang.

      Berikut adalah 4 pilar penting yang perlu diterapkan:
      1. Foto Produk Berkualitas: Gunakan pencahayaan alami dan sudut pandang jelas yang menampilkan detail produk.
      2. Pemanfaatan Media Sosial: Buat konten video pendek yang menunjukkan cerita di balik proses produksi.
      3. Layanan Responsif: Manfaatkan auto-reply WhatsApp Business untuk menjawab pertanyaan calon pembeli.
      4. Pembayaran Digital: Sediakan QRIS agar transaksi pelanggan menjadi praktis dan tercatat otomatis.`
    },
    {
      id: 103,
      title: "Strategi Pemasaran Online untuk UMKM",
      category: "Bisnis",
      date: "5 Juni 2025",
      author: "Pakar Branding UMKM",
      readTime: "4 menit baca",
      summary: "Cara jitu menjangkau target pasar yang tepat dengan anggaran promosi yang hemat dan efektif.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
      content: `Membangun reputasi toko online memerlukan konsistensi nilai produk serta interaksi tulus dengan komunitas pembeli. 

      Fokuslah pada testimoni pelanggan awal dan berikan bonus sampel produk untuk menciptakan efek promosi dari mulut ke mulut secara organik.`
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Pusat Informasi & Berita UMKM</h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Dapatkan wawasan bisnis terkini, tips pemasaran digital, serta agenda penting dunia UMKM.
        </p>
      </div>

      {/* Featured Big Article */}
      <div 
        onClick={() => setSelectedArticle(articleGuides[0])}
        className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-md cursor-pointer group"
      >
        <div className="absolute inset-0 opacity-35 group-hover:scale-105 transition-transform duration-500">
          <img src={articleGuides[0].image} alt="Featured" className="w-full h-full object-cover" />
        </div>
        <div className="relative p-6 sm:p-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider inline-block">
            {articleGuides[0].category}
          </span>
          <h2 className="text-xl sm:text-3xl font-black group-hover:text-blue-300 transition-colors">
            {articleGuides[0].title}
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {articleGuides[0].summary}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {articleGuides[0].date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-400" /> {articleGuides[0].readTime}</span>
          </div>
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articleGuides.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedArticle(item)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                  <Calendar className="w-3 h-3 text-blue-500" />
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Baca Lengkap</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start gap-3">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedArticle.category}</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{selectedArticle.title}</h2>
                <div className="text-xs text-slate-400 mt-1">Dipublikasikan pada {selectedArticle.date} • Oleh {selectedArticle.author}</div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-60 w-full">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed pt-2">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

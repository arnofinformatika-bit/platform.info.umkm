import React from 'react';
import { X, MapPin, Tag, Star, Phone, CheckCircle, ExternalLink, Share2 } from 'lucide-react';

export default function DetailModal({ item, onClose }) {
  if (!item) return null;

  const handleWhatsApp = () => {
    const phone = (item.kontak || '6281234567890').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Halo ${item.nama}, saya melihat profil usaha Anda di InfoUMKM dan tertarik dengan produk Anda.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Modal Banner Image */}
        <div className="relative h-64 w-full bg-slate-100 shrink-0">
          <img
            src={item.gambar}
            alt={item.nama}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {item.status || "Aktif"}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {item.nama}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1 font-semibold text-blue-600">
                  <Tag className="w-3.5 h-3.5" /> {item.kategori}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.lokasi}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 self-start sm:self-auto">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <div className="text-left">
                <div className="text-sm font-bold text-slate-800 leading-none">{item.rating} / 5.0</div>
                <div className="text-[10px] text-slate-400">{item.ulasan} ulasan pelanggan</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tentang UMKM & Produk</h4>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {item.deskripsi || "Pelaku UMKM binaan dan mitra resmi InfoUMKM. Menyediakan produk lokal berkualitas tinggi yang diproduksi dengan standar higienis dan bahan pilihan terbaik."}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Kontak Resmi Pelaku Usaha:</div>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{item.kontak || "+62 812-3456-7890"}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi via WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">ID Terdaftar: #UMKM-{item.id}</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

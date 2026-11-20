import React from 'react';
import { Store, Leaf, Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Store className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-1 -left-1 bg-white rounded-full p-0.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white">Info<span className="text-blue-400">UMKM</span></span>
                <p className="text-[10px] text-slate-400 font-medium">Bersama Majukan UMKM Indonesia</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Platform direktori nasional yang memfasilitasi publikasi, promosi, dan pendampingan UMKM di seluruh nusantara secara transparan dan terpercaya.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-1">
              <p>© 2026 InfoUMKM Indonesia. Seluruh hak cipta dilindungi undang-undang.</p>
              <p className="text-slate-300 font-medium">
                Pengembang Sistem: <span className="text-white font-semibold">ARNOF DWI FERDIZA</span>
              </p>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('Beranda')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('UMKM')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Direktori UMKM
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Kategori')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Kategori Usaha
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Berita & Event')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Berita & Event
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Tentang Kami')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Tentang Kami
                </button>
              </li>
            </ul>
          </div>

          {/* Kategori Populer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kategori Pilihan</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('UMKM')} className="hover:text-blue-400 cursor-pointer">Makanan & Minuman</button></li>
              <li><button onClick={() => setActiveTab('UMKM')} className="hover:text-blue-400 cursor-pointer">Fashion & Aksesoris</button></li>
              <li><button onClick={() => setActiveTab('UMKM')} className="hover:text-blue-400 cursor-pointer">Kerajinan Tangan</button></li>
              <li><button onClick={() => setActiveTab('UMKM')} className="hover:text-blue-400 cursor-pointer">Kosmetik & Perawatan</button></li>
              <li><button onClick={() => setActiveTab('UMKM')} className="hover:text-blue-400 cursor-pointer">Agrobisnis Lokal</button></li>
            </ul>
          </div>

          {/* Kontak & Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hubungi Kami</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>+62 858-9661-1944</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>halo@infoumkm.id</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Bandar Lampung, Indonesia</span>
              </div>
              <div className="pt-1">
                <a
                  href="https://www.instagram.com/aditamadevelopment?fqnt=MThtY2dveWZsM2NneA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-pink-400 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>@aditamadevelopment</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Users, 
  HeartHandshake, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  CheckCircle2, 
  TrendingUp,
  Store
} from 'lucide-react';

const InstagramIcon = ({ className = "w-5 h-5" }) => (
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

export default function TentangKami({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            <Store className="w-4 h-4" />
            <span>Mengenal Portal InfoUMKM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Bersama Majukan UMKM Indonesia
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            InfoUMKM adalah platform digital terpadu yang didedikasikan untuk menghubungkan jutaan pelaku usaha mikro, kecil, dan menengah dengan pasar yang lebih luas di era ekonomi digital.
          </p>
        </div>

        {/* Story / About Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
              Latar Belakang
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Menjembatani Potensi Lokal Menuju Pasar Nasional
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              UMKM merupakan tulang punggung perekonomian bangsa dengan kontribusi lebih dari 60% terhadap PDB nasional. Namun, tantangan visibilitas online dan akses permodalan seringkali menghambat laju mereka.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              InfoUMKM hadir menghadirkan direktori terverifikasi, ruang pamer produk digital, pelatihan terpadu, dan kolaborasi strategis antara pelaku usaha, konsumen, perbankan, dan pemerintah.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <div className="text-2xl font-black text-blue-600">64 Juta+</div>
                <div className="text-xs text-slate-600 mt-0.5">Potensi UMKM Nasional</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="text-2xl font-black text-emerald-600">38</div>
                <div className="text-xs text-slate-600 mt-0.5">Provinsi Terjangkau</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80" 
              alt="Pelaku Usaha UMKM" 
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/50 flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-200" />
            </div>
            <h3 className="text-2xl font-bold">Visi Kami</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              "Menjadi pusat ekosistem direktori dan akselerasi UMKM nomor satu di Indonesia yang inklusif, terpercaya, dan berdaya saing global pada tahun 2030."
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 space-y-4 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Misi Utama</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Menyediakan basis data UMKM terverifikasi dan mudah diakses masyarakat luas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Mendorong adopsi digital marketing dan kecerdasan buatan bagi usaha mikro.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Menghubungkan pelaku UMKM dengan rantai pasok industri dan perbankan.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Kontak & Bantuan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="max-w-2xl mb-6">
            <h3 className="text-xl font-bold text-slate-900">Hubungi Tim Layanan InfoUMKM</h3>
            <p className="text-xs text-slate-500 mt-1">
              Butuh panduan verifikasi usaha, kerjasama kemitraan, atau peliputan media? Tim kami siap melayani Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="https://wa.me/6285896611944?text=Halo%20Tim%20InfoUMKM,%20saya%20ingin%20berkonsultasi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer group"
              title="Hubungi via WhatsApp"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Call Center / WA</div>
                <div className="text-sm font-bold text-slate-800">+62 858-9661-1944</div>
              </div>
            </a>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Email Resmi</div>
                <div className="text-sm font-bold text-slate-800">halo@infoumkm.id</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Alamat Pengembang</div>
                <div className="text-sm font-bold text-slate-800">Bandar Lampung, Indonesia</div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/aditamadevelopment?fqnt=MThtY2dveWZsM2NneA=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 hover:bg-pink-50/50 hover:border-pink-200 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Instagram Resmi</div>
                <div className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">@aditamadevelopment</div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

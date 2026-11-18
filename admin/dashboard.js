import React from 'react';
import { 
  Store, 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  MoreHorizontal, 
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Layers,
  Laptop
} from 'lucide-react';

export default function AdminDashboard({ umkmList = [], setActiveAdminTab, onOpenAddUMKM }) {
  // Stat cards matching Image 2
  const stats = [
    {
      title: "Total UMKM",
      count: "1.248",
      trend: "↑ 12%",
      color: "text-blue-600 bg-blue-100",
      trendColor: "text-blue-600 bg-blue-50",
      icon: <Store className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Total Pengguna",
      count: "24.580",
      trend: "↑ 8%",
      color: "text-emerald-600 bg-emerald-100",
      trendColor: "text-emerald-600 bg-emerald-50",
      icon: <Users className="w-6 h-6 text-emerald-600" />
    },
    {
      title: "Artikel Informasi",
      count: "185",
      trend: "↑ 5%",
      color: "text-amber-600 bg-amber-100",
      trendColor: "text-amber-600 bg-amber-50",
      icon: <FileText className="w-6 h-6 text-amber-600" />
    },
    {
      title: "Event & Kegiatan",
      count: "42",
      trend: "↑ 10%",
      color: "text-purple-600 bg-purple-100",
      trendColor: "text-purple-600 bg-purple-50",
      icon: <Calendar className="w-6 h-6 text-purple-600" />
    }
  ];

  // UMKM Terbaru matching screenshot table
  const recentUMKM = [
    { id: 1, nama: "Dapur Sari Rasa", kategori: "Makanan & Minuman", lokasi: "Surabaya", status: "Aktif", gambar: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=120&q=80" },
    { id: 2, nama: "Crafty Handmade", kategori: "Kerajinan & Handicraft", lokasi: "Bandung", status: "Aktif", gambar: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=120&q=80" },
    { id: 3, nama: "Fashion Kita", kategori: "Fashion & Aksesoris", lokasi: "Yogyakarta", status: "Aktif", gambar: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=120&q=80" },
    { id: 4, nama: "Glow Beauty", kategori: "Kecantikan & Perawatan", lokasi: "Malang", status: "Aktif", gambar: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=120&q=80" },
  ];

  const recentActivities = [
    { id: 1, text: 'UMKM baru "Roti Lestari" telah didaftarkan', time: '2 jam yang lalu' },
    { id: 2, text: 'Artikel baru "Tips Mengembangkan UMKM" telah dipublikasikan', time: '4 jam yang lalu' },
    { id: 3, text: 'Event "Bazar UMKM 2025" telah ditambahkan', time: '1 hari yang lalu' },
    { id: 4, text: 'Pengguna baru mendaftar sebagai pelaku UMKM', time: '1 hari yang lalu' },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* WELCOME BANNER - Sesuai Persis Tangkapan Layar Admin */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-100/90 via-sky-50 to-blue-100/80 border border-blue-100 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Selamat Datang, Admin!
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Kelola dan pantau seluruh aktivitas platform InfoUMKM dengan mudah.
          </p>
        </div>

        {/* Right illustration / laptop graphic */}
        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <div className="w-48 h-32 rounded-2xl bg-white/70 backdrop-blur-xs border border-white p-3 shadow-md flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
              <Laptop className="w-4 h-4" />
              <span>Monitoring Real-time</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>
              </div>
              <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] pt-1 text-slate-500">
              <span>Firebase DB:</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Tersinkron
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between group hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                {s.icon}
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{s.count}</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">{s.title}</div>
              </div>
            </div>

            {/* Sparkline curve & trend badge */}
            <div className="text-right flex flex-col items-end">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.trendColor}`}>
                {s.trend}
              </span>
              <div className="w-12 h-5 mt-2 opacity-60">
                {/* Micro sparkline SVG */}
                <svg viewBox="0 0 50 20" className="w-full h-full stroke-blue-500 fill-none stroke-2">
                  <path d="M 0 15 Q 15 5, 25 10 T 50 2" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW (Grafik Pertumbuhan & Donut Kategori) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Grafik Pertumbuhan UMKM */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Grafik Pertumbuhan UMKM</h3>
            </div>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 focus:outline-none">
              <option>6 Bulan Terakhir</option>
              <option>Tahun Ini (2026)</option>
              <option>Sepanjang Waktu</option>
            </select>
          </div>

          {/* Interactive Line Chart SVG */}
          <div className="relative h-60 w-full pt-4">
            <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="5" y="24" className="text-[10px] fill-slate-400">1.500</text>
              <text x="5" y="64" className="text-[10px] fill-slate-400">1.000</text>
              <text x="15" y="104" className="text-[10px] fill-slate-400">500</text>
              <text x="25" y="144" className="text-[10px] fill-slate-400">0</text>

              {/* Gradient Area under line */}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon points="50,130 130,100 210,90 290,75 370,60 450,30 450,140 50,140" fill="url(#areaGradient)" />

              {/* Main Line */}
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                points="50,130 130,100 210,90 290,75 370,60 450,30"
              />

              {/* Points on Line */}
              {[[50, 130], [130, 100], [210, 90], [290, 75], [370, 60], [450, 30]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              ))}

              {/* X Axis Labels */}
              <text x="45" y="165" className="text-[11px] fill-slate-500 font-semibold">Jan</text>
              <text x="125" y="165" className="text-[11px] fill-slate-500 font-semibold">Feb</text>
              <text x="205" y="165" className="text-[11px] fill-slate-500 font-semibold">Mar</text>
              <text x="285" y="165" className="text-[11px] fill-slate-500 font-semibold">Apr</text>
              <text x="365" y="165" className="text-[11px] fill-slate-500 font-semibold">Mei</text>
              <text x="445" y="165" className="text-[11px] fill-slate-500 font-semibold">Jun</text>
            </svg>
          </div>
        </div>

        {/* Right: Kategori UMKM Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Kategori UMKM</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
            {/* Donut Chart Visual SVG */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Background base circle */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#f1f5f9" strokeWidth="15" />
                {/* Slice 1: Makanan & Minuman 34% (stroke-dasharray = 34 * 2.2 = 74.8, perimeter ~220) */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="15" strokeDasharray="74.8 220" strokeDashoffset="0" />
                {/* Slice 2: Fashion 28% (61.6) */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="15" strokeDasharray="61.6 220" strokeDashoffset="-74.8" />
                {/* Slice 3: Kerajinan 18% (39.6) */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="15" strokeDasharray="39.6 220" strokeDashoffset="-136.4" />
                {/* Slice 4: Peralatan 12% (26.4) */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#a855f7" strokeWidth="15" strokeDasharray="26.4 220" strokeDashoffset="-176" />
                {/* Slice 5: Lainnya 8% (17.6) */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#94a3b8" strokeWidth="15" strokeDasharray="17.6 220" strokeDashoffset="-202.4" />
              </svg>

              {/* Center Counter */}
              <div className="absolute text-center">
                <div className="text-base font-black text-slate-900 leading-none">1.248</div>
                <div className="text-[10px] font-semibold text-slate-400 mt-0.5">UMKM</div>
              </div>
            </div>

            {/* Legend Sesuai Screenshot */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Makanan & Minuman</span>
                <span className="font-bold text-slate-700">34%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Fashion & Aksesoris</span>
                <span className="font-bold text-slate-700">28%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Kerajinan & Handicraft</span>
                <span className="font-bold text-slate-700">18%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Peralatan Rumah</span>
                <span className="font-bold text-slate-700">12%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Lainnya</span>
                <span className="font-bold text-slate-700">8%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW (UMKM Terbaru Table & Aktivitas Terbaru) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Table: UMKM Terbaru */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">UMKM Terbaru</h3>
            </div>
            <button 
              onClick={() => setActiveAdminTab('kelola umkm')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 pb-2">
                  <th className="pb-2 font-bold">Nama UMKM</th>
                  <th className="pb-2 font-bold">Kategori</th>
                  <th className="pb-2 font-bold">Lokasi</th>
                  <th className="pb-2 font-bold">Status</th>
                  <th className="pb-2 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentUMKM.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 flex items-center gap-2.5">
                      <img src={row.gambar} alt={row.nama} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-bold text-slate-900">{row.nama}</span>
                    </td>
                    <td className="py-3 text-slate-600">{row.kategori}</td>
                    <td className="py-3 text-slate-500">{row.lokasi}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <button 
                        onClick={() => setActiveAdminTab('kelola umkm')}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                      >
                        <MoreHorizontal className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Timeline: Aktivitas Terbaru */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">🔔</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Aktivitas Terbaru</h3>
            </div>
            <button 
              onClick={() => setActiveAdminTab('laporan')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4 pt-1">
            {recentActivities.map((act, i) => (
              <div key={act.id} className="flex items-start gap-3 relative">
                {/* Dot & line */}
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1 shrink-0 ring-4 ring-blue-100"></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-800 leading-snug">{act.text}</p>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

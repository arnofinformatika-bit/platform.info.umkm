import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  Bell, 
  Share2, 
  CheckCircle2 
} from 'lucide-react';
import { beritaEventData } from '../src/data/initialData';

export default function BeritaEvent() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const filters = ['Semua', 'Event', 'Berita'];

  const filteredItems = beritaEventData.filter((item) => {
    if (activeFilter === 'Semua') return true;
    return item.tipe === activeFilter;
  });

  const handleRegisterEvent = (id, judul) => {
    if (registeredEvents.includes(id)) {
      alert(`Anda sudah terdaftar di kegiatan: ${judul}`);
      return;
    }
    setRegisteredEvents([...registeredEvents, id]);
    alert(`Selamat! Anda berhasil mendaftar untuk mengikuti "${judul}". Konfirmasi tiket/link akan dikirimkan.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">
              <Bell className="w-3.5 h-3.5" />
              <span>Info Terkini & Peluang Usaha</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">Berita & Agenda Event UMKM</h1>
            <p className="mt-1 text-slate-500 text-sm">
              Ikuti jadwal bazar, pameran produk nasional, workshop keterampilan bisnis, dan kabar kebijakan ekonomi lokal.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-xl">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === f
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-xl">
          <div className="absolute inset-0 opacity-25 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" 
              alt="Bazar UMKM" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-6 sm:p-10 max-w-2xl space-y-3">
            <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              🔥 Event Utama Bulan Ini
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Festival Bazar UMKM Nasional 2026: Kolaborasi Lintas Daerah
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Temu bisnis akbar mempertemukan ribuan pembeli, investor, dan diaspora dengan produk unggulan dari 38 provinsi di Indonesia.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-blue-200">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 25 - 28 November 2026</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Jogja Expo Center (JEC)</span>
            </div>
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isRegistered = registeredEvents.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      {item.tipe}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        {item.tanggal}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.judul}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.deskripsi}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.lokasi}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleRegisterEvent(item.id, item.judul)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isRegistered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Sudah Mendaftar</span>
                      </>
                    ) : (
                      <>
                        <span>{item.tipe === 'Event' ? 'Daftar Ikuti Event' : 'Baca Selengkapnya'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

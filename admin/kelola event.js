import React, { useState } from 'react';
import { Calendar, Plus, MapPin, Users, Trash2, Clock, CheckCircle } from 'lucide-react';

export default function KelolaEvent() {
  const [events, setEvents] = useState([
    { id: 1, name: "Festival Bazar UMKM Nasional 2026", date: "25 - 28 Nov 2026", location: "JEC, Yogyakarta", participants: 412, status: "Akan Datang" },
    { id: 2, name: "Workshop Digital Marketing & AI untuk UMKM", date: "18 Nov 2026", location: "Online Zoom", participants: 850, status: "Berlangsung" },
    { id: 3, name: "Akses Permodalan KUR Bersubsidi", date: "5 Des 2026", location: "Gedung Pusat UMKM Surabaya", participants: 195, status: "Akan Datang" },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !date) return;
    setEvents([
      ...events,
      { id: Date.now(), name, date, location: location || 'Online', participants: 0, status: 'Akan Datang' }
    ]);
    setName('');
    setDate('');
    setLocation('');
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus event ini?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Event & Bazar</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Jadwalkan agenda temu bisnis, pameran produk, dan webinar pelatihan untuk mitra UMKM.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Jadwalkan Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  ev.status === 'Berlangsung' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {ev.status}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {ev.participants} Terdaftar
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base leading-snug">{ev.name}</h3>
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>{ev.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ev.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-600">Terbuka untuk Umum</span>
              <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Buat Event Baru</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Event *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Temu Kemitraan UMKM 2026"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tanggal Kegiatan *</label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Contoh: 15 Januari 2026"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Lokasi Kegiatan</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Jakarta Convention Center / Zoom"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  Simpan Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

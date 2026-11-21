import React, { useState, useEffect } from 'react';
import { BarChart3, Download, TrendingUp, MapPin, Store, CheckCircle, Info, X } from 'lucide-react';

export default function LaporanAdmin({ umkmList = [] }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const kotaRanking = [
    { kota: "Yogyakarta", jumlah: 342, persentase: "27%" },
    { kota: "Surabaya", jumlah: 285, persentase: "23%" },
    { kota: "Bandung", jumlah: 240, persentase: "19%" },
    { kota: "Solo", jumlah: 198, persentase: "16%" },
    { kota: "Malang", jumlah: 183, persentase: "15%" },
  ];

  const handleDownload = () => {
    showToast("Laporan platform InfoUMKM (Format PDF/Excel) berhasil digenerate dan siap diunduh.", "success");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Laporan & Analitik Platform</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Ringkasan data sebaran geografis, performa ulasan, dan metrik pertumbuhan UMKM.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Laporan (Excel/PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="text-xs text-slate-400 font-semibold">Tingkat Retensi Pengunjung</div>
          <div className="text-3xl font-black text-slate-900">84.2%</div>
          <div className="text-xs text-emerald-600 font-bold">↑ 4.1% dari bulan sebelumnya</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="text-xs text-slate-400 font-semibold">Total Hubungi Pelaku (WhatsApp)</div>
          <div className="text-3xl font-black text-slate-900">18.490</div>
          <div className="text-xs text-blue-600 font-bold">Interaksi transaksi langsung</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="text-xs text-slate-400 font-semibold">Rata-rata Rating Kepuasan</div>
          <div className="text-3xl font-black text-slate-900">4.82 ★</div>
          <div className="text-xs text-amber-500 font-bold">Dari total 24.100+ ulasan</div>
        </div>
      </div>

      {/* Sebaran Kota Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Top 5 Kota dengan Konsentrasi UMKM Terbanyak</h3>
        </div>

        <div className="space-y-3 pt-2">
          {kotaRanking.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">{idx + 1}. {item.kota}</span>
                <span className="text-slate-500">{item.jumlah} UMKM ({item.persentase})</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: item.persentase }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOAST IN-APP (Tanpa alert browser) */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] max-w-md w-[92%] sm:w-auto animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md bg-emerald-900/95 text-white border-emerald-700/50 shadow-emerald-950/30">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-emerald-500 text-white">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white shrink-0">
                Info
              </span>
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

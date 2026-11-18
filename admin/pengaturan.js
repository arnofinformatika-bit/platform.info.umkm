import React, { useState } from 'react';
import { Settings, Save, Shield, Database, Bell, Check } from 'lucide-react';

export default function PengaturanAdmin({ onResetData, onSyncFirebase, isFirebaseSyncing, firebaseStatus }) {
  const [siteName, setSiteName] = useState('InfoUMKM');
  const [slogan, setSlogan] = useState('Bersama Majukan UMKM Indonesia');
  const [emailContact, setEmailContact] = useState('halo@infoumkm.id');
  const [phoneContact, setPhoneContact] = useState('+62 858-9661-1944');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Pengaturan Platform</h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Konfigurasi identitas situs, informasi kontak, dan manajemen basis data.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan platform berhasil disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
        <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Identitas Platform</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nama Platform</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Kontak Resmi</label>
            <input
              type="email"
              value={emailContact}
              onChange={(e) => setEmailContact(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Slogan / Tagline</label>
          <input
            type="text"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Nomor Call Center WhatsApp</label>
          <input
            type="text"
            value={phoneContact}
            onChange={(e) => setPhoneContact(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </form>

      {/* Firebase Database Status & Management */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Integrasi Firebase Database</h3>
              <p className="text-xs text-slate-500">Basis data awan untuk lingkup User dan Admin</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${
            firebaseStatus?.connected 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${firebaseStatus?.connected ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`}></span>
            <span>{firebaseStatus?.connected ? 'Terhubung (Online)' : 'Siap Sinkron'}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <span className="text-slate-400 block font-medium">Project ID:</span>
            <span className="font-mono font-bold text-slate-800">info-umkm</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Auth Domain:</span>
            <span className="font-mono text-slate-800">info-umkm.firebaseapp.com</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-400 block font-medium">Database URL:</span>
            <span className="font-mono text-[11px] text-blue-700 break-all">
              https://info-umkm-default-rtdb.asia-southeast1.firebasedatabase.app
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onSyncFirebase}
            disabled={isFirebaseSyncing}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            <span>{isFirebaseSyncing ? 'Sedang Menyinkronkan...' : 'Unggah / Sinkronkan Data ke Firebase'}</span>
          </button>
          
          <p className="text-[11px] text-slate-400">
            * Data tersinkronisasi otomatis setiap ada penambahan, pengeditan, atau penghapusan UMKM.
          </p>
        </div>
      </div>

      {/* Database Reset Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-rose-900 text-base">Zona Data & Pemulihan</h3>
        <p className="text-xs text-slate-500">
          Jika data pengujian perlu dikembalikan ke kondisi awal bawaan gambar dummy.
        </p>

        <button
          onClick={onResetData}
          className="px-4 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
        >
          Reset Seluruh Database ke Dummy Awal
        </button>
      </div>
    </div>
  );
}

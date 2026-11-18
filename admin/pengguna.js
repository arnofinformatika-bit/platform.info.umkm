import React, { useState } from 'react';
import { Users, Search, ShieldCheck, Mail, Phone, MoreHorizontal, UserCheck } from 'lucide-react';

export default function PenggunaAdmin({ usersList: propUsers }) {
  const defaultUsers = [
    { id: 1, name: "Budi Santoso", email: "budi@nusantarabatik.id", role: "Pelaku UMKM", usaha: "Batik Nusantara", status: "Terverifikasi", date: "10 Jan 2026" },
    { id: 2, name: "Siti Rahmawati", email: "siti@keripikmakmur.com", role: "Pelaku UMKM", usaha: "Keripik Makmur", status: "Terverifikasi", date: "14 Jan 2026" },
    { id: 3, name: "Ahmad Fauzi", email: "fauzi@gmail.com", role: "Konsumen / Pembeli", usaha: "-", status: "Aktif", date: "22 Jan 2026" },
    { id: 4, name: "Admin Utama", email: "admin@infoumkm.id", role: "Administrator", usaha: "InfoUMKM HQ", status: "Superadmin", date: "1 Jan 2026" },
    { id: 5, name: "Dewi Lestari", email: "dewi@glowbeauty.id", role: "Pelaku UMKM", usaha: "Glow Beauty", status: "Terverifikasi", date: "2 Feb 2026" },
  ];

  const users = propUsers && propUsers.length > 0 ? propUsers : defaultUsers;
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Manajemen Pengguna</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Daftar seluruh akun terdaftar: pelaku usaha UMKM, pembeli, dan tim administrator.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
            Total {users.length} Akun Terdaftar
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama, email, atau peran pengguna..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
            <tr>
              <th className="py-3 px-4">Nama Pengguna</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Peran (Role)</th>
              <th className="py-3 px-4">Unit Usaha</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Bergabung</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <span>{u.name}</span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">{u.email}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    u.role === 'Administrator' ? 'bg-purple-100 text-purple-700' :
                    u.role === 'Pelaku UMKM' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-medium">{u.usaha}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400">{u.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

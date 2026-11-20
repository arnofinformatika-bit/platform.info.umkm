import React, { useState } from 'react';
import { 
  Store, 
  Leaf, 
  Search, 
  LogIn, 
  UserPlus, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  LogOut,
  Plus
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  user, 
  onLogout, 
  onOpenAdminModal,
  setSelectedCategory,
  onOpenAdminPanel,
  onOpenUserPortal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [kategoriDropdownOpen, setKategoriDropdownOpen] = useState(false);

  const navItems = [
    { id: 'Beranda', label: 'Beranda' },
    { id: 'UMKM', label: 'UMKM' },
    { id: 'Kategori', label: 'Kategori', hasDropdown: true },
    { id: 'Berita & Event', label: 'Berita & Event' },
    { id: 'Tentang Kami', label: 'Tentang Kami' },
  ];

  const quickCategories = [
    'Makanan & Minuman',
    'Fashion & Aksesoris',
    'Minuman',
    'Kerajinan Tangan',
    'Kosmetik & Perawatan'
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO & BRAND (Persis seperti di desain gambar) */}
          <div 
            onClick={() => setActiveTab('Beranda')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Logo Icon: Warung/Toko dengan daun hijau */}
            <div className="relative flex items-center justify-center">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs group-hover:scale-105 transition-transform">
                <Store className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="absolute -bottom-1 -left-1 bg-white rounded-full p-0.5 shadow-xs">
                <Leaf className="w-4 h-4 text-emerald-500 fill-emerald-500 transform -rotate-12" />
              </div>
            </div>

            {/* Logo Text */}
            <div>
              <div className="flex items-baseline text-2xl font-black tracking-tight leading-none">
                <span className="text-blue-600">Info</span>
                <span className="text-slate-900">UMKM</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 tracking-wide mt-0.5">
                Bersama Majukan UMKM
              </p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION MENU */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.id} 
                    className="relative"
                    onMouseEnter={() => setKategoriDropdownOpen(true)}
                    onMouseLeave={() => setKategoriDropdownOpen(false)}
                  >
                    <button
                      onClick={() => {
                        setActiveTab('Kategori');
                        setKategoriDropdownOpen(false);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                        isActive
                          ? 'text-blue-600 bg-blue-50/80 font-bold'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {kategoriDropdownOpen && (
                      <div className="absolute top-full left-0 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {quickCategories.map((cat, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setActiveTab('UMKM');
                              setKategoriDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {cat}
                          </button>
                        ))}
                        <div className="border-t border-slate-100 my-1"></div>
                        <button
                          onClick={() => {
                            setActiveTab('Kategori');
                            setKategoriDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 cursor-pointer"
                        >
                          Lihat Semua Kategori →
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS: Search, Masuk, Daftar (Persis seperti gambar) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Icon Shortcut */}
            <button
              onClick={() => setActiveTab('UMKM')}
              title="Cari UMKM"
              className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Separator Pipe */}
            <div className="h-5 w-px bg-slate-300"></div>

            {/* Admin Quick Indicator if logged in */}
            {user?.role === 'admin' && (
              <button
                onClick={onOpenAdminModal}
                className="px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Data</span>
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'admin' ? (
                  <button
                    onClick={onOpenAdminPanel}
                    className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenUserPortal}
                    className="px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>{user.name || 'Portal User'}</span>
                  </button>
                )}
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">{user.name}</div>
                  <div className="text-[10px] text-blue-600 uppercase font-bold tracking-wider">{user.role}</div>
                </div>
                <button
                  onClick={onLogout}
                  title="Keluar"
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Button Masuk */}
                <button
                  onClick={() => setActiveTab('Masuk')}
                  className="px-4 py-2 rounded-full border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer bg-white"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </button>

                {/* Button Daftar */}
                <button
                  onClick={() => setActiveTab('Daftar')}
                  className="px-5 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar</span>
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('UMKM')}
              className="p-2 text-slate-600"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-slate-800">{user.name}</div>
                  <div className="text-[10px] text-blue-600 font-bold">{user.role}</div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setActiveTab('Masuk');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-xl border border-slate-300 text-slate-700 text-center font-semibold text-xs"
                >
                  Masuk
                </button>
                <button
                  onClick={() => {
                    setActiveTab('Daftar');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-xl bg-blue-600 text-white text-center font-bold text-xs"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

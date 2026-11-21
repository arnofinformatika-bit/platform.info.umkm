import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Leaf, 
  Home, 
  Grid, 
  Info, 
  Search, 
  Bell, 
  User, 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  FileText, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Heart,
  X,
  ExternalLink,
  Plus,
  TrendingUp,
  ArrowLeft,
  LayoutDashboard,
  Tag,
  MoreHorizontal,
  Sparkles,
  Database,
  Cloud,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Trash2
} from 'lucide-react';

// Modals
import AdminModal from './components/AdminModal';
import DetailModal from './components/DetailModal';

// Firebase Services
import { 
  subscribeUMKM, 
  saveUMKMToFirebase, 
  deleteUMKMFromFirebase, 
  seedInitialUMKMToFirebase, 
  subscribeFirebaseStatus,
  saveUserToFirebase,
  subscribeUsers,
  fetchUMKMOnce
} from './services/firebaseService';

// TAMPILAN PERTAMA (Landing Page Utama dari folder pages/)
import NavbarLanding from './components/Navbar';
import FooterLanding from './components/Footer';
import BerandaLanding from '../pages/Beranda.js';
import UMKMLanding from '../pages/UMKM.js';
import KategoriLanding from '../pages/Kategori.js';
import BeritaEventLanding from '../pages/Berita & Event.js';
import TentangKamiLanding from '../pages/tentang kami.js';
import DaftarLanding from '../pages/daftar.js';
import MasukLanding from '../pages/masuk.js';

// TAMPILAN USER (dari folder user/)
import UserBeranda from '../user/beranda.js';
import UserKatalog from '../user/katalog.js';
import UserInformasi from '../user/informasi.js';

// TAMPILAN ADMIN (dari folder admin/)
import AdminDashboard from '../admin/dashboard.js';
import KelolaUMKM from '../admin/kelola umkm.js';
import KelolaKategori from '../admin/kelola kategori.js';
import KelolaInformasi from '../admin/kelola informasi.js';
import KelolaEvent from '../admin/kelola event.js';
import PenggunaAdmin from '../admin/pengguna.js';
import LaporanAdmin from '../admin/laporan.js';
import PengaturanAdmin from '../admin/pengaturan.js';

import { initialUMKMData, getStoredUMKM, saveStoredUMKM } from './data/initialData';

// Helper pembaca localStorage yang aman
const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? item : fallback;
  } catch (e) {
    return fallback;
  }
};

const getStorageJSON = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

export default function App() {
  // Auth Pengguna (disimpan ke localStorage agar login tetap terjaga saat refresh)
  const [userAuth, setUserAuth] = useState(() => getStorageJSON('infoumkm_user_auth', null));

  // Mode tampilan: 'landing' (Bawaan Utama), 'user' (User Portal), 'admin' (Admin Panel)
  // Disimpan ke localStorage agar saat refresh halaman TIDAK reset ke awal lagi
  const [currentMode, setCurrentMode] = useState(() => {
    const saved = getStorageItem('infoumkm_current_mode', 'landing');
    const savedAuth = getStorageJSON('infoumkm_user_auth', null);
    // Jika tersimpan mode user/admin tapi belum login, kembalikan ke landing
    if ((saved === 'user' || saved === 'admin') && !savedAuth) {
      return 'landing';
    }
    return saved;
  });

  // Tab di Landing Page Utama (disimpan ke localStorage agar tetap di tab yang sama saat refresh)
  const [landingTab, setLandingTab] = useState(() => getStorageItem('infoumkm_landing_tab', 'Beranda'));
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Tab di User Portal (disimpan ke localStorage agar tab yang dibuka tetap aktif saat refresh)
  const [activeUserTab, setActiveUserTab] = useState(() => getStorageItem('infoumkm_active_user_tab', 'beranda'));

  // Tab di Admin Panel (disimpan ke localStorage agar tab yang dibuka tetap aktif saat refresh)
  const [activeAdminTab, setActiveAdminTab] = useState(() => getStorageItem('infoumkm_active_admin_tab', 'dashboard'));

  // State untuk Bottom Sheet "Menu Lainnya" di mobile (menggantikan sidebar & garis tiga)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const [umkmList, setUmkmList] = useState(() => getStoredUMKM());
  const [selectedUMKM, setSelectedUMKM] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [landingSearchTerm, setLandingSearchTerm] = useState('');

  // Toast Notification In-App Elegan (Menggantikan popup bawaan browser)
  const [toast, setToast] = useState(null);

  const showNotification = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Firebase Realtime State & Status
  const [firebaseStatus, setFirebaseStatus] = useState({ connected: false, error: null });
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState(false);

  // Simpan auth dan posisi navigasi ke localStorage secara otomatis
  useEffect(() => {
    try {
      if (userAuth) {
        localStorage.setItem('infoumkm_user_auth', JSON.stringify(userAuth));
      } else {
        localStorage.removeItem('infoumkm_user_auth');
      }
    } catch (e) {
      console.warn('Gagal menyimpan userAuth ke localStorage:', e);
    }
  }, [userAuth]);

  useEffect(() => {
    try {
      localStorage.setItem('infoumkm_current_mode', currentMode);
    } catch (e) {
      console.warn('Gagal menyimpan currentMode ke localStorage:', e);
    }
  }, [currentMode]);

  useEffect(() => {
    try {
      localStorage.setItem('infoumkm_active_user_tab', activeUserTab);
    } catch (e) {
      console.warn('Gagal menyimpan activeUserTab ke localStorage:', e);
    }
  }, [activeUserTab]);

  useEffect(() => {
    try {
      localStorage.setItem('infoumkm_active_admin_tab', activeAdminTab);
    } catch (e) {
      console.warn('Gagal menyimpan activeAdminTab ke localStorage:', e);
    }
  }, [activeAdminTab]);

  useEffect(() => {
    try {
      localStorage.setItem('infoumkm_landing_tab', landingTab);
    } catch (e) {
      console.warn('Gagal menyimpan landingTab ke localStorage:', e);
    }
  }, [landingTab]);

  // Fungsi Keluar / Logout Bersih
  const handleLogout = () => {
    setUserAuth(null);
    setCurrentMode('landing');
    setLandingTab('Beranda');
    setActiveUserTab('beranda');
    setActiveAdminTab('dashboard');
    try {
      localStorage.removeItem('infoumkm_user_auth');
      localStorage.setItem('infoumkm_current_mode', 'landing');
      localStorage.setItem('infoumkm_landing_tab', 'Beranda');
      localStorage.setItem('infoumkm_active_user_tab', 'beranda');
      localStorage.setItem('infoumkm_active_admin_tab', 'dashboard');
    } catch (e) {
      console.warn('Gagal membersihkan localStorage saat logout:', e);
    }
  };

  // Data Pengguna Terdaftar (disinkronkan dengan Firebase)
  const [usersList, setUsersList] = useState([
    { id: 1, name: "Budi Santoso", email: "budi@nusantarabatik.id", role: "Pelaku UMKM", usaha: "Batik Nusantara", status: "Terverifikasi", date: "10 Jan 2026" },
    { id: 2, name: "Siti Rahmawati", email: "siti@keripikmakmur.com", role: "Pelaku UMKM", usaha: "Keripik Makmur", status: "Terverifikasi", date: "14 Jan 2026" },
    { id: 3, name: "Ahmad Fauzi", email: "fauzi@gmail.com", role: "Konsumen / Pembeli", usaha: "-", status: "Aktif", date: "22 Jan 2026" },
    { id: 4, name: "Admin Utama", email: "admin@infoumkm.id", role: "Administrator", usaha: "InfoUMKM HQ", status: "Superadmin", date: "1 Jan 2026" },
    { id: 5, name: "Dewi Lestari", email: "dewi@glowbeauty.id", role: "Pelaku UMKM", usaha: "Glow Beauty", status: "Terverifikasi", date: "2 Feb 2026" },
  ]);

  // Berlangganan data Firebase secara Realtime
  useEffect(() => {
    // 1. Monitor status koneksi Firebase
    const unsubStatus = subscribeFirebaseStatus((status) => {
      setFirebaseStatus(status);
    });

    // 2. Berlangganan data UMKM dari Firebase
    const unsubUMKM = subscribeUMKM(
      (firebaseItems) => {
        if (Array.isArray(firebaseItems)) {
          setUmkmList(firebaseItems);
          saveStoredUMKM(firebaseItems);
        }
      },
      (err) => {
        console.warn('Firebase realtime warning:', err);
      }
    );

    // 3. Berlangganan data Pengguna dari Firebase
    const unsubUsers = subscribeUsers((firebaseUsers) => {
      if (firebaseUsers && firebaseUsers.length > 0) {
        setUsersList(firebaseUsers);
      }
    });

    return () => {
      if (unsubStatus) unsubStatus();
      if (unsubUMKM) unsubUMKM();
      if (unsubUsers) unsubUsers();
    };
  }, []);

  // Pendaftaran Akun Pengguna / User Baru (Tersimpan ke state & Firebase)
  const handleRegisterUser = async (newUser) => {
    setUsersList((prev) => [newUser, ...prev]);
    try {
      await saveUserToFirebase(newUser);
    } catch (e) {
      console.warn('Gagal menyimpan user ke Firebase:', e);
    }
  };

  // Simpan UMKM (Menyimpan lokal + otomatis ke Firebase Database)
  const handleSaveUMKM = async (item) => {
    let updated;
    const existingIndex = umkmList.findIndex((x) => x.id === item.id);
    if (existingIndex >= 0) {
      updated = [...umkmList];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...umkmList];
    }
    setUmkmList(updated);
    saveStoredUMKM(updated);

    try {
      await saveUMKMToFirebase(item);
    } catch (e) {
      console.warn('Gagal sinkronisasi data UMKM ke Firebase:', e);
    }
  };

  // State konfirmasi hapus UMKM admin (tanpa dialog browser)
  const [deleteConfirmUMKMId, setDeleteConfirmUMKMId] = useState(null);

  // Memicu modal konfirmasi hapus UMKM di admin
  const handleDeleteUMKM = (id) => {
    setDeleteConfirmUMKMId(id);
  };

  const confirmDeleteUMKM = async () => {
    if (!deleteConfirmUMKMId) return;
    const id = deleteConfirmUMKMId;
    const itemToDelete = umkmList.find((item) => item.id === id);
    const updated = umkmList.filter((item) => item.id !== id);
    setUmkmList(updated);
    saveStoredUMKM(updated);

    try {
      await deleteUMKMFromFirebase(id);
    } catch (e) {
      console.warn('Gagal menghapus data dari Firebase:', e);
    }

    showNotification(`Data UMKM ${itemToDelete ? `"${itemToDelete.nama}" ` : ''}berhasil dihapus.`, 'info');
    setDeleteConfirmUMKMId(null);
  };

  // Refresh Data UMKM (Memuat ulang data terbaru dari database & lokal, TIDAK mengosongkan data)
  const handleResetData = async () => {
    setIsFirebaseSyncing(true);
    try {
      const latestItems = await fetchUMKMOnce();
      if (Array.isArray(latestItems)) {
        setUmkmList(latestItems);
        saveStoredUMKM(latestItems);
      }
      showNotification('Data UMKM berhasil di-refresh!', 'info');
    } catch (e) {
      const stored = getStoredUMKM();
      if (Array.isArray(stored)) {
        setUmkmList(stored);
      }
      showNotification('Data UMKM berhasil di-refresh!', 'info');
    } finally {
      setIsFirebaseSyncing(false);
    }
  };

  // Sinkronisasi Manual seluruh data UMKM ke Firebase Database
  const handleManualFirebaseSync = async () => {
    setIsFirebaseSyncing(true);
    try {
      for (const item of umkmList) {
        await saveUMKMToFirebase(item);
      }
      showNotification(`Berhasil menyinkronkan seluruh data UMKM (${umkmList.length} usaha) ke Firebase Database!`, 'success');
    } catch (e) {
      showNotification('Gagal menyinkronkan ke Firebase: ' + e.message, 'error');
    } finally {
      setIsFirebaseSyncing(false);
    }
  };

  // Navigasi User Desktop Sidebar
  const userMenuItems = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'katalog', label: 'Data UMKM Anda', icon: <Store className="w-5 h-5" /> },
    { id: 'informasi', label: 'Informasi', icon: <Info className="w-5 h-5" /> },
  ];

  // Navigasi Admin Desktop Sidebar
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'kelola umkm', label: 'Kelola UMKM', icon: <Store className="w-4 h-4" />, hasSub: true },
    { id: 'kelola kategori', label: 'Kelola Kategori', icon: <Layers className="w-4 h-4" /> },
    { id: 'kelola informasi', label: 'Kelola Informasi', icon: <FileText className="w-4 h-4" />, hasSub: true },
    { id: 'kelola event', label: 'Kelola Event', icon: <Calendar className="w-4 h-4" /> },
    { id: 'pengguna', label: 'Pengguna', icon: <Users className="w-4 h-4" /> },
    { id: 'laporan', label: 'Laporan', icon: <BarChart3 className="w-4 h-4" />, hasSub: true },
    { id: 'pengaturan', label: 'Pengaturan', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">

      {/* ============================================================== */}
      {/* 1. TAMPILAN PERTAMA (LANDING PAGE UTAMA - PERSIS FOTO AWAL)     */}
      {/* ============================================================== */}
      {currentMode === 'landing' && (
        <div className="flex flex-col min-h-screen pb-16 md:pb-0">
          <NavbarLanding
            activeTab={landingTab}
            setActiveTab={setLandingTab}
            user={userAuth}
            onLogout={handleLogout}
            onOpenAdminModal={() => {
              setEditingItem(null);
              setAdminModalOpen(true);
            }}
            setSelectedCategory={(cat) => {
              setSelectedCategory(cat);
              setLandingTab('UMKM');
            }}
            onOpenAdminPanel={() => setCurrentMode('admin')}
            onOpenUserPortal={() => setCurrentMode('user')}
          />

          <main className="flex-1">
            {landingTab === 'Beranda' && (
              <BerandaLanding
                umkmList={umkmList}
                setActiveTab={setLandingTab}
                setSelectedCategory={(cat) => {
                  setSelectedCategory(cat);
                  setLandingSearchTerm('');
                  setLandingTab('UMKM');
                }}
                onSearch={(term) => {
                  setLandingSearchTerm(term);
                  setSelectedCategory('Semua');
                  setLandingTab('UMKM');
                }}
                onOpenAdminModal={() => {
                  setEditingItem(null);
                  setAdminModalOpen(true);
                }}
                onSelectUMKM={(item) => setSelectedUMKM(item)}
              />
            )}

            {landingTab === 'UMKM' && (
              <UMKMLanding
                umkmList={umkmList}
                initialCategoryFilter={selectedCategory}
                initialSearchTerm={landingSearchTerm}
                onOpenAdminModal={() => {
                  setEditingItem(null);
                  setAdminModalOpen(true);
                }}
                onEditUMKM={(item) => {
                  setEditingItem(item);
                  setAdminModalOpen(true);
                }}
                onDeleteUMKM={handleDeleteUMKM}
                onResetData={handleResetData}
                onSelectUMKM={(item) => setSelectedUMKM(item)}
                showToast={showNotification}
              />
            )}

            {landingTab === 'Kategori' && (
              <KategoriLanding
                umkmList={umkmList}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setLandingTab('UMKM');
                }}
                setActiveTab={setLandingTab}
              />
            )}

            {landingTab === 'Berita & Event' && (
              <BeritaEventLanding />
            )}

            {landingTab === 'Tentang Kami' && (
              <TentangKamiLanding setActiveTab={setLandingTab} />
            )}

            {landingTab === 'Daftar' && (
              <DaftarLanding
                onRegisterUser={handleRegisterUser}
                onDirectLogin={(user) => {
                  setUserAuth(user);
                  setCurrentMode('user');
                  setActiveUserTab('katalog');
                }}
                onAddUMKM={(newItem) => {
                  handleSaveUMKM(newItem);
                }}
                setActiveTab={setLandingTab}
              />
            )}

            {landingTab === 'Masuk' && (
              <MasukLanding
                usersList={usersList}
                onLoginSuccess={(user) => {
                  setUserAuth(user);
                  const normalizedRole = (user.role || '').toLowerCase();
                  const normalizedEmail = (user.email || '').toLowerCase();
                  if (normalizedRole === 'admin' || normalizedRole === 'administrator' || normalizedEmail === 'arnof@gmail.com') {
                    setCurrentMode('admin');
                  } else {
                    setCurrentMode('user');
                  }
                }}
                setActiveTab={setLandingTab}
              />
            )}
          </main>

          <FooterLanding setActiveTab={setLandingTab} />

          {/* MOBILE BOTTOM TAB BAR UNTUK LANDING PAGE */}
          <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 flex justify-around items-center md:hidden shadow-lg">
            <button
              onClick={() => setLandingTab('Beranda')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                landingTab === 'Beranda' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => setLandingTab('UMKM')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                landingTab === 'UMKM' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Store className="w-5 h-5 mb-0.5" />
              <span>UMKM</span>
            </button>

            <button
              onClick={() => setLandingTab('Kategori')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                landingTab === 'Kategori' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Tag className="w-5 h-5 mb-0.5" />
              <span>Kategori</span>
            </button>

            <button
              onClick={() => setLandingTab('Berita & Event')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                landingTab === 'Berita & Event' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Calendar className="w-5 h-5 mb-0.5" />
              <span>Event</span>
            </button>

            <button
              onClick={() => setLandingTab('Masuk')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                landingTab === 'Masuk' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span>Masuk</span>
            </button>
          </nav>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TAMPILAN USER (PORTAL DENGAN DESKTOP SIDEBAR + MOBILE TABS) */}
      {/* ============================================================== */}
      {currentMode === 'user' && (
        <div className="flex min-h-screen relative pb-16 md:pb-0">
          
          {/* User Sidebar: HANYA TAMPIL DI DESKTOP (md:flex), TIDAK MENUMPUK DI MOBILE */}
          <aside className="hidden md:flex md:w-64 bg-white border-r border-slate-200/90 shrink-0 p-5 flex-col justify-between">
            <div className="space-y-6">
              
              <div 
                onClick={() => setCurrentMode('landing')}
                className="flex items-center gap-3 select-none cursor-pointer group"
                title="Kembali ke Beranda Utama"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs group-hover:scale-105 transition-transform">
                    <Store className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 bg-white rounded-full p-0.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 transform -rotate-12" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline text-xl font-black tracking-tight leading-none">
                    <span className="text-blue-600">Info</span>
                    <span className="text-slate-900">UMKM</span>
                  </div>
                  <p className="text-[11px] font-bold text-blue-600 mt-1 truncate max-w-[140px]" title={userAuth?.name || 'User Portal'}>
                    {userAuth?.name || 'User Portal'}
                  </p>
                </div>
              </div>

              <nav className="space-y-1">
                {userMenuItems.map((item) => {
                  const isActive = activeUserTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveUserTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-100/70 text-blue-700 shadow-2xs'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

            </div>

            <div className="pt-6 space-y-3">
              <div className="rounded-2xl p-4 bg-gradient-to-b from-blue-50 via-sky-50 to-indigo-50 border border-blue-100 text-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-slate-900 leading-tight">Dukung UMKM<br />Indonesia</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Belanja Lokal, Bangkitkan Ekonomi Negeri
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>#BanggaBuatanID</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentMode('landing')}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ke Beranda Utama</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun</span>
              </button>
            </div>
          </aside>

          {/* User Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header: Bersih tanpa garis tiga di mobile */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari UMKM, produk..."
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    title="Hapus pencarian"
                    className="absolute right-2.5 top-2.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button className="relative p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {userAuth?.name ? userAuth.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 hidden sm:block">
                    {userAuth?.name || 'Pengguna'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Keluar / Logout"
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ml-1"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            </header>

            <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
              {activeUserTab === 'beranda' && (
                <UserBeranda
                  umkmList={umkmList}
                  userAuth={userAuth}
                  setActiveUserTab={setActiveUserTab}
                  onSelectUMKM={(item) => setSelectedUMKM(item)}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSwitchToAdmin={() => setCurrentMode('admin')}
                />
              )}

              {activeUserTab === 'katalog' && (
                <UserKatalog
                  umkmList={umkmList}
                  userAuth={userAuth}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSaveUMKM={handleSaveUMKM}
                  onDeleteUMKM={handleDeleteUMKM}
                  onSelectUMKM={(item) => setSelectedUMKM(item)}
                  showToast={showNotification}
                />
              )}

              {activeUserTab === 'informasi' && (
                <UserInformasi searchQuery={searchQuery} />
              )}
            </div>
          </div>

          {/* MOBILE BOTTOM TAB BAR UNTUK USER PORTAL (DENGAN TOMBOL LAINNYA) */}
          <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 flex justify-around items-center md:hidden shadow-lg">
            <button
              onClick={() => setActiveUserTab('beranda')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                activeUserTab === 'beranda' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => setActiveUserTab('katalog')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                activeUserTab === 'katalog' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Store className="w-5 h-5 mb-0.5" />
              <span>Data UMKM Anda</span>
            </button>

            <button
              onClick={() => setActiveUserTab('informasi')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                activeUserTab === 'informasi' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Info className="w-5 h-5 mb-0.5" />
              <span>Informasi</span>
            </button>

            {/* Menu Lainnya */}
            <button
              onClick={() => setMoreMenuOpen(true)}
              className="flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer text-slate-500 hover:text-blue-600"
            >
              <MoreHorizontal className="w-5 h-5 mb-0.5" />
              <span>Lainnya</span>
            </button>
          </nav>

        </div>
      )}

      {/* ============================================================== */}
      {/* 3. TAMPILAN ADMIN (PANEL DENGAN DESKTOP SIDEBAR + MOBILE TABS) */}
      {/* ============================================================== */}
      {currentMode === 'admin' && (
        <div className="flex min-h-screen relative pb-16 md:pb-0">
          
          {/* Admin Sidebar: HANYA TAMPIL DI DESKTOP (md:flex), TIDAK MENUMPUK DI MOBILE */}
          <aside className="hidden md:flex md:w-64 bg-[#0f172a] text-slate-300 border-r border-slate-800 shrink-0 p-5 flex-col justify-between">
            <div className="space-y-6">
              
              <div 
                onClick={() => setCurrentMode('landing')}
                className="flex items-center gap-3 select-none cursor-pointer group"
                title="Kembali ke Beranda Utama"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Store className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 bg-[#0f172a] rounded-full p-0.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 transform -rotate-12" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline text-xl font-black tracking-tight leading-none text-white">
                    <span>Info</span><span className="text-blue-400">UMKM</span>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                    Admin Panel
                  </p>
                </div>
              </div>

              <nav className="space-y-1 text-xs font-semibold">
                {adminMenuItems.map((item) => {
                  const isActive = activeAdminTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveAdminTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.hasSub && (
                        <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      )}
                    </button>
                  );
                })}
              </nav>

            </div>

            <div className="pt-6 border-t border-slate-800 space-y-2">
              <button
                onClick={() => setCurrentMode('landing')}
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-blue-400" />
                  <span>Ke Beranda Utama</span>
                </div>
                <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">Home</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 px-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Admin</span>
              </button>
            </div>
          </aside>

          {/* Admin Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header: Bersih tanpa garis tiga di mobile */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari UMKM, kategori, atau informasi..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <button className="relative p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <span className="text-xs font-bold text-slate-800 hidden sm:block">Admin</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Keluar / Logout"
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ml-1"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            </header>

            <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
              {activeAdminTab === 'dashboard' && (
                <AdminDashboard
                  umkmList={umkmList}
                  setActiveAdminTab={setActiveAdminTab}
                  onOpenAddUMKM={() => {
                    setEditingItem(null);
                    setAdminModalOpen(true);
                  }}
                />
              )}

              {activeAdminTab === 'kelola umkm' && (
                <KelolaUMKM
                  umkmList={umkmList}
                  onOpenAddUMKM={() => {
                    setEditingItem(null);
                    setAdminModalOpen(true);
                  }}
                  onEditUMKM={(item) => {
                    setEditingItem(item);
                    setAdminModalOpen(true);
                  }}
                  onDeleteUMKM={handleDeleteUMKM}
                  onResetData={handleResetData}
                />
              )}

              {activeAdminTab === 'kelola kategori' && (
                <KelolaKategori umkmList={umkmList} />
              )}

              {activeAdminTab === 'kelola informasi' && (
                <KelolaInformasi />
              )}

              {activeAdminTab === 'kelola event' && (
                <KelolaEvent />
              )}

              {activeAdminTab === 'pengguna' && (
                <PenggunaAdmin usersList={usersList} />
              )}

              {activeAdminTab === 'laporan' && (
                <LaporanAdmin umkmList={umkmList} />
              )}

              {activeAdminTab === 'pengaturan' && (
                <PengaturanAdmin 
                  onResetData={handleResetData}
                  onSyncFirebase={handleManualFirebaseSync}
                  isFirebaseSyncing={isFirebaseSyncing}
                  firebaseStatus={firebaseStatus}
                />
              )}
            </div>
          </div>

          {/* MOBILE BOTTOM TAB BAR UNTUK ADMIN PANEL (DENGAN TOMBOL MENU LAINNYA) */}
          <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-1.5 px-3 flex justify-around items-center md:hidden shadow-2xl text-slate-400">
            <button
              onClick={() => setActiveAdminTab('dashboard')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                activeAdminTab === 'dashboard' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('kelola umkm')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                activeAdminTab === 'kelola umkm' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Store className="w-5 h-5 mb-0.5" />
              <span>UMKM</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('kelola kategori')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                activeAdminTab === 'kelola kategori' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-5 h-5 mb-0.5" />
              <span>Kategori</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('kelola event')}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer transition-colors ${
                activeAdminTab === 'kelola event' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-5 h-5 mb-0.5" />
              <span>Event</span>
            </button>

            {/* Menu Lainnya */}
            <button
              onClick={() => setMoreMenuOpen(true)}
              className="flex flex-col items-center py-1 px-2 text-[10px] font-bold cursor-pointer text-slate-400 hover:text-blue-400"
            >
              <MoreHorizontal className="w-5 h-5 mb-0.5" />
              <span>Lainnya</span>
            </button>
          </nav>

        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM SHEET: MENU LAINNYA DI MOBILE (BERISI SEMUA MENU SIDEBAR)*/}
      {/* ============================================================== */}
      {moreMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setMoreMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Bottom Sheet Box */}
          <div className="relative z-50 bg-white rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            
            {/* Grab Bar & Header */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mb-3"></div>
              <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {currentMode === 'user' ? (userAuth?.name || 'Menu Pengguna') : 'Menu Admin'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {currentMode === 'user' ? (userAuth?.email || 'Akun Pengguna Terdaftar') : 'Akses cepat seluruh fitur dari sidebar'}
                  </p>
                </div>
                <button
                  onClick={() => setMoreMenuOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grid Menu untuk ADMIN */}
            {currentMode === 'admin' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2.5">
                  {adminMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveAdminTab(item.id);
                        setMoreMenuOpen(false);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        activeAdminTab === item.id
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                          : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100 font-semibold'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${activeAdminTab === item.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 shadow-2xs'}`}>
                        {item.icon}
                      </div>
                      <span className="text-xs leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setCurrentMode('landing');
                      setMoreMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Beranda Utama</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMoreMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar dari Admin</span>
                  </button>
                </div>
              </div>
            )}

            {/* Grid Menu untuk USER */}
            {currentMode === 'user' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2.5">
                  {userMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveUserTab(item.id);
                        setMoreMenuOpen(false);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        activeUserTab === item.id
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                          : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100 font-semibold'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${activeUserTab === item.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 shadow-2xs'}`}>
                        {item.icon}
                      </div>
                      <span className="text-xs leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setCurrentMode('landing');
                      setMoreMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Beranda Utama</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMoreMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODALS */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveUMKM}
        editingItem={editingItem}
      />

      <DetailModal
        item={selectedUMKM}
        onClose={() => setSelectedUMKM(null)}
      />

      {/* DIALOG KONFIRMASI HAPUS DATA UMKM ADMIN (Tanpa popup window.confirm) */}
      {deleteConfirmUMKMId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <Trash2 className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-base">Hapus Data UMKM?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Apakah Anda yakin ingin menghapus data usaha ini? Tindakan ini akan menghapus data dari sistem dan direktori InfoUMKM.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmUMKMId(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDeleteUMKM}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL TOAST NOTIFICATION ELEGAN (Menggantikan popup browser alert) */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] max-w-md w-[92%] sm:w-auto animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md ${
            toast.type === 'error'
              ? 'bg-rose-900/95 text-white border-rose-700/50 shadow-rose-950/30'
              : toast.type === 'info'
              ? 'bg-slate-900/95 text-white border-slate-700/50 shadow-slate-950/30'
              : 'bg-emerald-900/95 text-white border-emerald-700/50 shadow-emerald-950/30'
          }`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              toast.type === 'error'
                ? 'bg-rose-500 text-white'
                : toast.type === 'info'
                ? 'bg-blue-500 text-white'
                : 'bg-emerald-500 text-white'
            }`}>
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white shrink-0">
                {toast.type === 'error' ? 'Peringatan' : toast.type === 'info' ? 'Info' : 'Sukses'}
              </span>
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              title="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

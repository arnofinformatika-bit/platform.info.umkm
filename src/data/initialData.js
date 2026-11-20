// Data awal UMKM InfoUMKM (Kosong default, hanya data riil yang diinput pengguna)
export const initialUMKMData = [];

export const kategoriList = [
  { id: "all", nama: "Semua Kategori", count: 8, icon: "Store" },
  { id: "fashion", nama: "Fashion & Aksesoris", count: 2, icon: "Shirt" },
  { id: "kuliner", nama: "Makanan & Minuman", count: 2, icon: "Utensils" },
  { id: "minuman", nama: "Minuman", count: 1, icon: "Coffee" },
  { id: "kerajinan", nama: "Kerajinan Tangan", count: 2, icon: "Sparkles" },
  { id: "kosmetik", nama: "Kosmetik & Perawatan", count: 1, icon: "Heart" },
];

export const beritaEventData = [
  {
    id: 1,
    tipe: "Event",
    judul: "Festival Bazar UMKM Nasional 2026",
    tanggal: "25 - 28 November 2026",
    lokasi: "JEC (Jogja Expo Center), Yogyakarta",
    deskripsi: "Pameran produk UMKM terbesar dengan lebih dari 500 pelaku usaha lokal dari seluruh nusantara.",
    gambar: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    tipe: "Berita",
    judul: "Pelatihan Digital Marketing & AI untuk Pelaku Usaha Mikro",
    tanggal: "18 November 2026",
    lokasi: "Online via Zoom",
    deskripsi: "Program bimbingan praktis cara meningkatkan penjualan online hingga 300% melalui media sosial dan marketplace.",
    gambar: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    tipe: "Event",
    judul: "Workshop Akses Permodalan KUR & Bantuan Usaha",
    tanggal: "5 Desember 2026",
    lokasi: "Gedung Pusat UMKM Surabaya",
    deskripsi: "Sosialisasi langsung dari perbankan dan kementerian tentang pengajuan modal kerja tanpa agunan yang mudah.",
    gambar: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
  }
];

// Helper functions untuk LocalStorage UMKM Data (Admin CRUD)
export const getStoredUMKM = () => {
  try {
    const data = localStorage.getItem('infoumkm_items');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        const dummyNames = [
          "Batik Nusantara", "Keripik Makmur", "Es Segar Jaya", "Anyaman Kita",
          "Glow Beauty", "Kopi Senja Merapi", "Gerabah Kasongan Artistik", "Tenun Ikat Sumba Indah"
        ];
        const filtered = parsed.filter(item => {
          const numId = Number(item.id);
          const isDummyId = !isNaN(numId) && numId >= 1 && numId <= 8;
          if (isDummyId && dummyNames.includes(item?.nama) && !item?.isUserAdded) {
            return false;
          }
          return true;
        });

        if (filtered.length !== parsed.length) {
          localStorage.setItem('infoumkm_items', JSON.stringify(filtered));
        }
        return filtered;
      }
    }
  } catch (e) {
    console.error("Gagal membaca localStorage:", e);
  }
  return [];
};

export const saveStoredUMKM = (items) => {
  try {
    localStorage.setItem('infoumkm_items', JSON.stringify(items));
  } catch (e) {
    console.error("Gagal menyimpan ke localStorage:", e);
  }
};

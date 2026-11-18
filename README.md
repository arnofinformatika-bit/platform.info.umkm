# InfoUMKM - Bersama Majukan UMKM

Website platform direktori dan informasi UMKM Indonesia modern, responsif, dan interaktif yang dibangun menggunakan React, Vite, dan Tailwind CSS sesuai dengan kedua desain antarmuka (**User Portal** & **Admin Panel**).

---

## 📁 Struktur Folder & File Baru

### 1. Folder `user/` (Tampilan Pengguna / Konsumen)
Sesuai tangkapan layar **User Portal** (Sidebar putih, Banner "Temukan & Dukung Seluruh UMKM Indonesia", Kategori ikonik, UMKM Terpopuler, dan Informasi Terbaru):
- `user/beranda.js` 👉 Halaman utama user (Hero Banner, 7 Kategori, 5 UMKM Terpopuler, Artikel)
- `user/katalog.js` 👉 Katalog lengkap UMKM dengan filter, pencarian, dan bookmark
- `user/informasi.js` 👉 Pusat berita, artikel panduan, dan tips digital marketing UMKM

### 2. Folder `admin/` (Tampilan Admin Panel)
Sesuai tangkapan layar **Admin Panel** (Sidebar biru gelap, Banner "Selamat Datang, Admin!", 4 Statistik, Grafik Pertumbuhan Line Chart, Donut Chart Kategori, Tabel UMKM Terbaru, dan Aktivitas Terbaru):
- `admin/dashboard.js` 👉 Dashboard analitik, metrik real-time, line chart, dan donut chart
- `admin/kelola umkm.js` 👉 Manajemen data UMKM (Tambah, Edit, Hapus, Filter, Reset)
- `admin/kelola kategori.js` 👉 Manajemen kategori sektor usaha UMKM
- `admin/kelola informasi.js` 👉 Manajemen artikel berita dan edukasi
- `admin/kelola event.js` 👉 Manajemen jadwal bazar dan webinar pelatihan
- `admin/pengguna.js` 👉 Manajemen akun terdaftar (Pelaku usaha, pembeli, admin)
- `admin/laporan.js` 👉 Laporan analitik, sebaran kota, dan ekspor data
- `admin/pengaturan.js` 👉 Konfigurasi identitas platform, kontak, dan backup data

---

## 🚀 Cara Menjalankan Website

Buka terminal di folder project (`D:\Pelatihan`) dan jalankan:

```bash
npm run dev
```

Buka di browser pada alamat:
👉 **[http://localhost:3000](http://localhost:3000)**

### 🔄 Cara Beralih Antara Mode User & Admin:
1. **Di Header Atas**: Terdapat tombol pill **[Tampilan User]** dan **[Admin Panel]** untuk berpindah mode secara instan kapan saja.
2. **Di Sidebar User**: Terdapat tombol **"Buka Admin Panel →"** di bagian bawah.
3. **Di Sidebar Admin**: Terdapat tombol **"Kembali ke User Portal"** di bagian bawah.

# Digital Invitation by Abi Bhaskara 📩 🎉

Halo! Ayo Berkreasi!

Template ini dirancang agar beginer friendly lengkap dengan dokumentasi dan video tutorial yang bisa diakses melalui akun instagram [**@abibhaskara_**](https://instagram.com/abibhaskara_). Template ini menggunakan **React & Vite** untuk *rendering* super cepat, arsitektur modular yang rapi (Standar *Senior Engineer*), animasi interaktif **Framer Motion**, serta backend *GRATIS* **Cloudflare Workers & D1 Database** untuk menyimpan ucapan doa tamu secara instan (*real-time*). **Proyek ini 100% GRATIS.**

---

## 📋 1. Persiapan Sebelum Memulai

Sebelum menjalankan program di laptop/komputer Kamu, pastikan telah memasang/mendaftar layanan berikut:

1. **Node.js** (Mesin untuk menjalankan program JavaScript)
   * 📥 Download di: [nodejs.org](https://nodejs.org/) (Pilih versi **LTS**)
2. **Visual Studio Code (VS Code)** (Aplikasi untuk mengedit kode)
   * 📥 Download di: [code.visualstudio.com](https://code.visualstudio.com/)
3. **Akun Cloudflare** (Untuk database & hosting gratis selamanya)
   * 🌐 Daftar gratis di: [cloudflare.com](https://cloudflare.com/)
4. **Akun Cloudinary** (Untuk menyimpan foto/video undangan Kamu)
   * 🌐 Daftar gratis di: [cloudinary.com](https://cloudinary.com/) (Penting agar web memuat gambar secara cepat dan terkompresi. Kode kita sudah disetting secara *pintar* menggunakan `f_auto` agar video berjalan mulus di semua perangkat, termasuk iPhone/Safari!)

---

## 🚀 2. Cara Menjalankan Website di Komputer

### Langkah 1: Buka Folder Proyek di VS Code
1. Buka aplikasi **VS Code**
2. Klik menu **File** → **Open Folder** (Windows) atau **Open...** (Mac)
3. Pilih folder proyek ini

### Langkah 2: Buka Terminal di VS Code
Di VS Code, klik menu **Terminal** → **New Terminal**

### Langkah 3: Instal Dependencies
```bash
npm install
```

### Langkah 4: Login ke Cloudflare (Hanya Sekali)
```bash
npx wrangler login
```
Browser akan terbuka — klik **Allow** untuk mengizinkan akses komputer Kamu ke akun Cloudflare.

### Langkah 5: Jalankan Website Lokal
```bash
npm run dev
```
Website (frontend) dan database D1 (backend) akan menyala bersamaan. Buka browser di `http://localhost:5173`.

---

## 🗄️ 3. Setup Database D1 (Wajib Sebelum Deploy)

Sebelum Kamu bisa mendistribusikan website ke internet (Deploy), Kamu **wajib** membuat database buku tamu (wishes).

### Langkah 1: Buat Database Baru di Terminal
```bash
npx wrangler d1 create DB
```

### Langkah 2: Jawab Konfirmasi Otomatis di Terminal
Wrangler versi terbaru akan secara otomatis menawarkan untuk memasukkan konfigurasi database ke dalam file `wrangler.json`. Silakan jawab pertanyaan yang muncul di terminal seperti berikut:

? Would you like Wrangler to add it on your behalf? › (Y/n) **`y`**

? What binding name would you like to use? › **`DB`**

? For local dev, do you want to connect to the remote resource instead of a local resource? › (y/N) **`y`**

> **💡 Info Sinkronisasi:** Karena pada Langkah 1 Kamu menamai database dengan `DB`, Wrangler secara otomatis akan menyarankan `DB` sebagai *binding name*. Kamu cukup menekan **Enter** untuk menyetujuinya.
> 
> Selama Kamu menggunakan nama *binding* `DB` ini, Kamu **tidak perlu mengubah kode apapun** di dalam `worker.js` karena sudah diatur secara bawaan (*default*). File `wrangler.json` Kamu juga akan langsung terisi secara otomatis. (Kecuali Kamu sengaja mengganti nama *binding* ini menjadi yang lain, barulah Kamu wajib menyesuaikan nama variabel `env.DB` di file `worker.js`).
> **💡 Catatan:** Tabel `wishes` (buku tamu) di database akan terbuat secara otomatis saat website Kamu mendeteksi ucapan pertama. Tidak ada perintah SQL manual yang perlu dijalankan.

---

## ✍️ 4. Cara Mengubah Data Konten & Foto

Kamu hanya perlu mengedit di satu file utama, dan web Kamu (serta preview WhatsApp/SEO) akan otomatis menyesuaikan!

### 1. Sumber Utama: `src/meta.js` (Ubah Data Di Sini)
Buka file `src/meta.js`. Edit informasi berikut dengan data acara Kamu:
* `name`: Nama yang mengdakan acara.
* `eventType`: Jenis acara (Misal: "Sweet Seventeen", "House Party", dll).
* `date`: Tanggal teks panjang (Misal: "Saturday, 30 Juni 2026").
* `shortDate`: Tanggal angka untuk tampilan layar (Misal: "30 . 06 . 2026").
* `venue`: Nama lokasi.
* `dressCode`: Tema pakaian.
* `heroImage`: Link URL gambar utama Kamu dari Cloudinary (Penting agar saat disebar ke WA, foto Kamu yang muncul).
* `siteUrl`: Kosongkan dulu, atau isi jika Kamu sudah mendeploy webnya.

### 2. Tampilan Tambahan: `src/config.jsx`
File ini mengambil datanya dari `meta.js`. Tapi, Kamu masih bisa membuka `config.jsx` untuk mengubah hal-hal visual mendetail seperti:
* `dateTimeIso`: Waktu acara spesifik untuk sinkronisasi tombol kalender (Format `YYYYMMDDTHHMMSS`).
* Link Google Maps (`mapUrl`).
* Quotes.
* Ganti URL Video di bagian `heroImage` pada objek `home`.
* Menambah galeri foto di objek `gallery.images`.

### 3. Kustomisasi Nama Tamu (Auto-Generate)
Kamu bisa membagikan link kepada tamu spesifik dengan menambahkan `?to=` di akhir tautan. Web akan otomatis menyapa mereka!

> **💡 Catatan Spasi:** Karena URL/link tidak boleh mengandung spasi kosong, Kamu harus menggunakan tanda tambah (`+`) atau kode `%20` sebagai pengganti spasi pemisah antar kata.
* Contoh menggunakan `+`: `https://digital-invitation.workers.dev/?to=Keluarga+Budi`
* Contoh menggunakan `%20`: `https://digital-invitation.workers.dev/?to=Keluarga%20Budi`

---

## 📦 5. Cara Deploy (Publikasi ke Internet)

Setelah foto dan data siap, sebarkan website Kamu ke penjuru dunia dengan satu langkah mudah:

```bash
npm run deploy
```
Tunggu hingga selesai. Link website akan muncul di terminal, contoh: `https://digital-invitation.username-kamu.workers.dev`.

> **💡 Catatan Update:** Jika nantinya Kamu melakukan perubahan data/foto, jangan lupa simpan file-nya (Save), lalu ketik ulang perintah `npm run deploy` di terminal dan tunggu prosesnya selesai agar perubahan baru tersebut muncul di internet.

---

## 📁 Struktur File Penting

```text
├── src/
│   ├── components/      # Komponen Modular untuk tampilan yang sangat rapi
│   │   ├── layout/      # Struktur global (contoh: Footer)
│   │   ├── sections/    # Bagian utama layar (Home, Event, Dresscode, Gallery, Wishes)
│   │   └── ui/          # Komponen satuan yang dipakai berulang (Navbar, EventCard, Lightbox)
│   ├── utils/           # Fungsi utilitas (Animasi Framer, dan sinkronisasi Video Cloudinary f_auto lintas-browser)
│   ├── meta.js          # MASTER DATA (Edit Nama, Tanggal, Tempat, SEO di sini)
│   ├── config.jsx       # Konfigurasi visual UI, Galeri Foto, Maps, Quotes
│   └── App.jsx          # Konduktor tata letak utama aplikasi (Sangat bersih & ringan)
├── worker.js            # Sistem Backend Cloudflare untuk fitur "Wishes" (Buku Tamu)
├── wrangler.json        # Pengaturan server & Database Cloudflare
└── vite.config.js       # Pengaturan kompilasi otomatis
```

Selamat berkarya! ✨
# iyd-kisara

# FindMATA

Website statis, tanpa build. Buka `index.html` di browser, atau upload folder ini ke hosting.

## Peta file: mau ubah apa → buka file mana

| Mau mengubah...                                              | Buka file        |
| ------------------------------------------------------------ | ---------------- |
| Email, WhatsApp, Instagram, lokasi, tagline                  | `config.js` (bagian 1) |
| Teks About, Collaborate, teks di Home, template pesan order  | `config.js` (bagian 2) |
| Menambah / mengganti foto                                    | `config.js` (bagian 3) + folder `assets/` |
| Produk: nama, harga, spesifikasi, opsi warna                 | `config.js` (bagian 4) |
| Material (Materials)                                         | `config.js` (bagian 5) |
| Angka ukuran di gambar dimensi, sketsa                       | `diagrams.js`    |
| Warna, font, jarak, jumlah kolom, ukuran                     | `style.css` (bagian 1 paling atas) |
| Nama menu atas                                               | `index.html`     |
| Cara kerja keranjang / halaman                               | `app.js`         |

Semua file sudah diberi komentar petunjuk. Di `config.js`, baca blok komentar
di atas tiap bagian untuk arti setiap field.

## Resep cepat

**Mengisi nomor WhatsApp** — di `config.js`:
```js
whatsapp: '6281234567890',   // angka saja, kode negara tanpa +
```

**Menampilkan harga produk** — tambahkan di blok produk (angka rupiah):
```js
price: 1500000,
```

**Menambah foto produk**
1. Taruh file di `assets/`, mis. `assets/chair-2.jpg`
2. Daftarkan di `IMG`:  `'chair-2': 'assets/chair-2.jpg',`
3. Masukkan ke produk:  `ph: ['chair-1', 'chair-2'],`

**Menambah produk baru** — salin satu blok `{ ... }` di `PRODUCTS`, tempel
di bawahnya, ubah `id` (harus unik) dan isinya. Untuk produk tanpa diagram,
lihat petunjuk "PRODUK SEDERHANA" di `config.js`.

**Mengganti warna website** — ubah `--bg`, `--fg`, `--mut`, `--line` di
bagian 1 `style.css` (dan versi mode gelapnya di bagian 2).

## Aturan emas saat mengedit
- Jangan hapus tanda kutip `'...'` atau koma `,` di akhir baris.
- Apostrof di dalam teks ditulis `\'`, contoh: `'It\'s ready'`.
- Setelah menyimpan, refresh browser dengan Ctrl+F5 (Cmd+Shift+R di Mac).
- Kalau halaman kosong setelah edit, hampir pasti ada kutip atau koma yang
  hilang. Tekan F12 → tab Console untuk melihat baris yang salah.

## Publish di GitHub Pages
1. Buat repo, upload semua isi folder ini ke branch `main`.
2. Settings > Pages > Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Website live di `https://<username>.github.io/<repo>/`.

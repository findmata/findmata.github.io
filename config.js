/* =====================================================================
   config.js  —  SEMUA ISI WEBSITE YANG SERING DIEDIT ADA DI FILE INI
   =====================================================================
   Cukup edit file ini untuk: kontak, teks halaman, produk, harga,
   foto, dan material. Tidak perlu menyentuh app.js.

   ATURAN PENTING SAAT MENGEDIT:
   - Teks ditulis di dalam tanda kutip '...'  (jangan hapus kutipnya).
   - Kalau teks mengandung tanda kutip satu, tulis seperti ini: \'
     Contoh:  'It\'s ready'
   - Setiap baris data diakhiri koma (,) — jangan lupa komanya.
   - Teks boleh berisi HTML sederhana, misalnya &amp; untuk tanda &.
   - Setelah mengedit, simpan lalu refresh browser (Ctrl+F5 / Cmd+Shift+R).
   ===================================================================== */


/* ---------------------------------------------------------------------
   1) INFO UMUM & KONTAK
   --------------------------------------------------------------------- */
const SITE = {
  brand: 'FindMATA',                                   // nama brand (judul tab, logo, tulisan besar di home)
  tagline: 'Finding, making &amp; arranging things.',  // teks kecil di bawah tulisan besar

  email: 'studio.findmata@gmail.com',                  // email kontak (dipakai di footer & halaman Collaborate)

  // Nomor WhatsApp: ANGKA SAJA, awali kode negara tanpa tanda +, tanpa spasi.
  // Contoh: '6281234567890'  (untuk 0812-3456-7890).
  // Kalau dikosongkan (''), tombol "Order by WhatsApp" menampilkan pesan "coming soon".
  whatsapp: '',

  instagramUrl: 'https://instagram.com/findmata',      // link profil Instagram (footer)
  instagramHandle: '@findmata',                        // tulisan yang tampil di footer
  instagramDm: 'https://ig.me/m/findmata',             // link untuk tombol "Order by Instagram DM"

  location: 'Bandung, Indonesia',                      // tulisan lokasi di footer
};


/* ---------------------------------------------------------------------
   2) TEKS HALAMAN
   --------------------------------------------------------------------- */

/* Teks kecil di halaman depan (Home) */
const HOME_TEXT = {
  materialsTitle: 'Materials',            // judul bagian material
  materialsLink: 'View',                  // tulisan link ke halaman materials
  collabTitle: 'Open to collaboration',   // judul bagian kolaborasi
  collabLink: 'Write to us',              // tulisan link (membuka email)
};

/* Halaman "About". Tiap teks dalam daftar `paragraphs` = satu paragraf.
   Tambah paragraf baru dengan menambah satu baris teks lagi. */
const ABOUT_PAGE = {
  title: 'About',
  paragraphs: [
    'FindMATA is an independent object design project based in Bandung, Indonesia. We make lighting and furniture from accessible materials and work out how to build them.',
    // 'Tambahkan paragraf lain di sini.',
  ],
};

/* Halaman "Collaborate". Alamat email otomatis ditampilkan di bawah paragraf. */
const COLLAB_PAGE = {
  title: 'Collaborate',
  paragraphs: [
    'Open to makers, metal fabricators, 3D-printing studios and designers. Write to us.',
  ],
};

/* Template pesan pesanan (dikirim lewat WhatsApp / disalin untuk Instagram).
   Daftar barang & total dibuat otomatis di antara `intro` dan `outro`.
   "\n" = baris baru. */
const ORDER_MESSAGE = {
  intro: 'Hi FindMATA! I’d like to place an order from your website.',
  outro: 'Name:\nPhone / WhatsApp:\nShipping address:\nNotes:\n\nCould you confirm availability, price and shipping? Thank you!',
};


/* ---------------------------------------------------------------------
   3) FOTO
   ---------------------------------------------------------------------
   Cara menambah foto:
   1. Taruh file foto di folder  assets/
   2. Daftarkan di bawah:  namaKunci: 'assets/nama-file.jpg',
   3. Pakai namaKunci itu di produk (field `card` atau `ph`).

   Tips: ukuran foto sebaiknya < 300 KB supaya website cepat.
   --------------------------------------------------------------------- */
const IMG = {
  'floor-lamp-cover': 'assets/floor-lamp-cover.jpg',
  'floor-lamp-1':     'assets/floor-lamp-1.jpg',
  'pendant-cover':    'assets/pendant-cover.jpg',
  'pendant-1':        'assets/pendant-1.jpg',
  'chair-1':          'assets/chair-1.jpg',
  // 'nama-baru': 'assets/nama-baru.jpg',
};


/* ---------------------------------------------------------------------
   4) PRODUK (OBJECTS)
   ---------------------------------------------------------------------
   Setiap produk = satu blok { ... }. Untuk menambah produk baru:
   salin satu blok utuh, tempel di bawah blok terakhir, lalu ubah isinya.

   Arti tiap field:
     id    : kode unik untuk link (huruf kecil, pakai tanda -, tanpa spasi)
     n     : nama produk
     cat   : kategori (tampil kalau `sub` kosong)
     s     : status (mis. 'In development', 'Exploring', 'Available')
     price : HARGA DALAM RUPIAH, ANGKA SAJA (mis. 1500000).
             Hapus baris price / jangan isi = tampil "Price to be confirmed".
             CATATAN: total keranjang baru tampil kalau SEMUA barang di
             keranjang punya harga.
     card  : kunci foto untuk kartu di home & keranjang (dari IMG di atas)
     ph    : daftar foto di halaman detail, mis. ['floor-lamp-1', 'floor-lamp-2'].
     viewer: true → tambah slide "3D" (model bisa diputar) di galeri foto; saat ini hanya ada untuk Arc Floor Lamp.
             Kalau foto kurang dari 3, sisanya jadi slot "Photo coming soon".
     sub   : kalimat di bawah judul halaman detail
     dim   : kunci gambar dimensi (lihat diagrams.js: 'floor', 'pend', 'chair')
     sp    : tabel spesifikasi → [['Label', 'Isi'], ...]
     sk    : judul panel sketsa (gambar tahapan, dari diagrams.js)
     ot    : judul panel opsi material/warna
     op    : daftar opsi → [['Nama', '#kodewarna'], ...]
             Kalau opsi > 1, muncul dropdown pilihan di tombol beli.
     on    : catatan di bawah opsi
     ft    : 4 poin keunggulan → [['Judul', 'Penjelasan'], ...]

   PRODUK SEDERHANA (tanpa diagram): hapus field dim/sp/sk/ot/op/on/ft,
   lalu isi field berikut sebagai gantinya:
     desc      : deskripsi singkat
     materials : daftar material (teks)
     size      : ukuran (teks)
   --------------------------------------------------------------------- */
const PRODUCTS = [

  /* ----- PRODUK 1: Arc Floor Lamp ----- */
  {
    id: 'floor-lamp',
    n: 'Arc Floor Lamp',
    cat: 'Lighting',
    s: 'In development',
    // price: 0,                       // ← aktifkan & isi angka rupiah untuk menampilkan harga
    card: 'floor-lamp-cover',
    ph: ['floor-lamp-1'],
    viewer: true,   // slide "3D" di galeri foto (lihat viewer3d.js). Hapus baris ini untuk menyembunyikannya.
    sub: 'Slim S-curve stainless stem · conical linen shade · all dimensions approximate',
    dim: 'floor',
    sp: [
      ['Stem',   'Stainless steel tube Ø 16 × 1 mm, one piece, smooth bend, no joints'],
      ['Finish', 'Brushed / satin nickel'],
      ['Base',   'Round disc, brushed steel, weighted; hidden cable exit'],
      ['Arm',    'Overhead arc with short drop rod holding the shade'],
      ['Shade',  'Conical, woven linen / canvas, off-white inner lining'],
      ['Light',  'E27 warm-white LED, 2700 K, diffused downward'],
      ['Cable',  'Black cord with inline switch'],
    ],
    sk: 'Bending sketch',
    ot: 'Shade options (custom)',
    op: [
      ['Linen',          '#efebe4'],
      ['Natural canvas', '#cdb08a'],
      ['Olive fabric',   '#6f7c5a'],
      ['Recycled paper', '#e8e2d6'],
    ],
    on: 'Shade colour, size and shape can be customised; shade and bulb are replaceable.',
    ft: [
      ['Minimal design',     'Clean single-curve form, functional.'],
      ['Durable materials',  'Stainless steel stem and base.'],
      ['Replaceable parts',  'Shade, bulb and cord can be swapped.'],
      ['Made locally',       'Produced in Bandung.'],
    ],
  },

  /* ----- PRODUK 2: Jute Pendant Lamp ----- */
  {
    id: 'pendant-lamp',
    n: 'Jute Pendant Lamp',
    cat: 'Lighting',
    s: 'In development',
    // price: 0,
    card: 'pendant-cover',
    ph: ['pendant-1'],
    sub: 'Jute fabric shade on a 3D-printed inner frame · all dimensions approximate',
    dim: 'pend',
    sp: [
      ['Shade',       'Open-weave natural jute fabric, stretched over the frame'],
      ['Inner frame', '3D-printed (PETG / PLA): 12 vertical ribs + top and bottom rings'],
      ['Form',        'Oblate sphere; seams run along each rib'],
      ['Assembly',    'Ribs printed separately, joined by hand; jute fitted over the frame'],
      ['Light',       'E27 warm-white LED, 2700 K, diffused through the weave'],
      ['Cord',        'Fabric-covered cord with ceiling canopy'],
      ['Finish',      'Natural jute colour, frame hidden behind fabric'],
    ],
    sk: 'Frame construction',
    ot: 'Material',
    op: [
      ['Natural jute', '#d2a96a'],      // hanya 1 opsi → dropdown tidak muncul
    ],
    on: 'One fixed natural jute colour. Fabric and bulb are replaceable.',
    ft: [
      ['Natural material',   'Open-weave jute glows warmly.'],
      ['3D-printed frame',   'Light, precise, repeatable.'],
      ['Replaceable parts',  'Fabric, bulb and cord can be swapped.'],
      ['Custom size',        'Diameter and cord length on request.'],
    ],
  },

  /* ----- PRODUK 3: Tubular Sling Chair ----- */
  {
    id: 'chair',
    n: 'Tubular Sling Chair',
    cat: 'Furniture',
    s: 'Exploring',
    // price: 0,
    card: 'chair-1',
    ph: ['chair-1'],
    sub: 'Brushed stainless tube frame with sling seat and back · all dimensions approximate',
    dim: 'chair',
    sp: [
      ['Frame',     'Stainless steel tube Ø 22 × 1.5 mm, smooth bends'],
      ['Finish',    'Brushed / satin stainless'],
      ['Structure', 'Four legs; rear legs continue into the back frame, cross bar under the seat'],
      ['Seat',      'Sling panel wrapped around the seat rails, stitched edges'],
      ['Backrest',  'Panel hung from the top rail by two straps, side sleeves'],
      ['Panels',    'Leather, fabric or cushioned panel (custom)'],
      ['Feet',      'Floor-protecting caps on all four legs'],
    ],
    sk: 'Build-up',
    ot: 'Seat and back material (custom)',
    op: [
      ['Leather',          '#a86a44'],
      ['Dark leather',     '#5a3d2b'],
      ['Canvas / fabric',  '#cdb594'],
      ['Recycled cushion', '#8b8f84'],
    ],
    on: 'Seat and back panels can be leather, fabric or a cushioned panel. Colour and thickness can be customised; panels are replaceable.',
    ft: [
      ['Minimal tubular form', 'Slim bent tube, light look.'],
      ['Custom panels',        'Leather, fabric or cushion.'],
      ['Durable frame',        'Stainless steel, easy to clean.'],
      ['Replaceable parts',    'Panels can be swapped.'],
    ],
  },

  /* ----- Mau tambah produk? Salin satu blok di atas, tempel di sini. ----- */
];


/* ---------------------------------------------------------------------
   5) MATERIAL (halaman Materials & bagian di Home)
   ---------------------------------------------------------------------
   Tiap material menghasilkan kotak tekstur otomatis (tanpa foto).
     name    : nama yang tampil
     color   : warna dasar (kode hex)
     noise   : kehalusan serat/bintik. Angka kecil = halus memanjang,
               angka besar = kasar. Coba ubah sedikit-sedikit & lihat hasilnya.
     texture : pola tambahan. Pilihan: 'weave' (anyaman), 'layers' (garis
               cetakan 3D), 'rods' (batang), atau null (tanpa pola).
   --------------------------------------------------------------------- */
const MATERIALS = [
  { name: 'Stainless steel',  color: '#b9bcbd', noise: '.002 .7', texture: null    },
  { name: 'Burlap',           color: '#b79a68', noise: '.5',      texture: 'weave' },
  { name: '3D print',         color: '#d9d7d1', noise: '.8',      texture: 'layers'},
  { name: 'Fiberglass rods',  color: '#e5e2d9', noise: '.01 .4',  texture: 'rods'  },
  { name: 'Leather / reused', color: '#7a4b2c', noise: '.04',     texture: null    },
];

/* =====================================================================
   diagrams.js  —  GAMBAR DIMENSI & SKETSA TAHAPAN (SVG)
   =====================================================================
   File ini berisi gambar garis (SVG) yang muncul di halaman detail produk.
   Kamu TIDAK perlu mengedit file ini kalau cuma ingin mengganti teks produk.

   YANG PALING SERING DIEDIT:
   - Angka ukuran → cari tulisan seperti  "131 cm"  lalu ganti isinya.
     Contoh:  <text ...>131 cm</text>  →  <text ...>140 cm</text>

   KUNCI GAMBAR (dipakai di field `dim` pada config.js):
     'floor'  → Arc Floor Lamp
     'pend'   → Jute Pendant Lamp
     'chair'  → Tubular Sling Chair

   MENAMBAH PRODUK BARU DENGAN DIAGRAM SENDIRI:
   1. Tambah satu entri baru di DIM (gambar dimensi) dan di SKT (sketsa).
   2. Isi `dim: 'kunci-baru'` pada produk di config.js.
   (Kalau tidak mau repot, pakai produk sederhana tanpa diagram — lihat
   petunjuk "PRODUK SEDERHANA" di config.js.)

   TIPS SVG:
   - <line class="d" ...>  = garis putus-putus penunjuk ukuran
   - <text ...>            = tulisan (x, y = posisi)
   - Warna garis & tulisan diatur otomatis oleh style.css (ikut mode gelap).
   ===================================================================== */


/* ---------------------------------------------------------------------
   Pembantu: membuat deretan kotak sketsa berurutan.
   Tiap langkah = [ 'isi gambar SVG', 'judul langkah' ]
   (Biasanya tidak perlu diubah.)
   --------------------------------------------------------------------- */
const sketchRow = steps => `
<svg class="dg" viewBox="0 0 ${steps.length * 100} 100">
  ${steps.map((step, i) => `
    <g transform="translate(${i * 100} 0)">
      ${step[0]}
      <text x="50" y="97" text-anchor="middle">${step[1]}</text>
    </g>`).join('')}
</svg>`;


/* ---------------------------------------------------------------------
   DIM — GAMBAR DIMENSI (tampak samping dengan angka ukuran)
   --------------------------------------------------------------------- */
const DIM = {

  /* Arc Floor Lamp */
  floor: `
<svg class="dg" viewBox="0 0 300 340">
  <path d="M170 310C170 230 95 210 95 140Q95 55 165 48"/>
  <ellipse cx="170" cy="312" rx="40" ry="6"/>
  <polygon points="130,50 210,50 226,92 114,92"/>
  <line class="d" x1="35"  y1="48" x2="35"  y2="312"/>
  <line class="d" x1="262" y1="92" x2="262" y2="312"/>
  <!-- ↓ ANGKA UKURAN: ganti tulisan di antara > dan < -->
  <text x="28"  y="180" transform="rotate(-90 28 180)"  text-anchor="middle">131 cm</text>
  <text x="256" y="200" transform="rotate(-90 256 200)" text-anchor="middle">shade bottom ≈ 117 cm</text>
  <text x="170" y="22"  text-anchor="middle">Ø 14–16 cm top · 20 cm high</text>
  <text x="170" y="106" text-anchor="middle">Ø 38–40 cm</text>
  <text x="170" y="334" text-anchor="middle">Ø 26–28 cm</text>
</svg>`,

  /* Jute Pendant Lamp */
  pend: `
<svg class="dg" viewBox="0 0 300 260">
  <line x1="150" y1="6" x2="150" y2="70"/>
  <polygon points="142,70 158,70 162,84 138,84"/>
  <ellipse cx="150" cy="150" rx="105" ry="62"/>
  <ellipse cx="150" cy="150" rx="68"  ry="62"/>
  <ellipse cx="150" cy="150" rx="34"  ry="62"/>
  <line x1="150" y1="88" x2="150" y2="212"/>
  <line class="d" x1="24" y1="88" x2="24" y2="212"/>
  <line class="d" x1="45" y1="232" x2="255" y2="232"/>
  <!-- ↓ ANGKA UKURAN -->
  <text x="18"  y="150" transform="rotate(-90 18 150)" text-anchor="middle">H 32–35 cm</text>
  <text x="150" y="250" text-anchor="middle">Ø 50–55 cm</text>
  <text x="166" y="42">Cord ±150 cm, adjustable</text>
</svg>`,

  /* Tubular Sling Chair */
  chair: `
<svg class="dg" viewBox="0 0 300 310">
  <path d="M114 40L108 118" style="stroke-width:4"/>
  <path d="M106 128L92 270M104 138Q150 152 202 138L202 270M104 128L204 128"/>
  <line class="d" x1="50"  y1="40"  x2="50"  y2="270"/>
  <line class="d" x1="245" y1="138" x2="245" y2="270"/>
  <line class="d" x1="92"  y1="290" x2="202" y2="290"/>
  <!-- ↓ ANGKA UKURAN -->
  <text x="150" y="16"  text-anchor="middle">Side view · tube Ø 22 mm · W ±45 cm</text>
  <text x="44"  y="160" transform="rotate(-90 44 160)"  text-anchor="middle">H ±80 cm</text>
  <text x="239" y="210" transform="rotate(-90 239 210)" text-anchor="middle">Seat ±45 cm</text>
  <text x="147" y="304" text-anchor="middle">D ±47 cm</text>
</svg>`,
};


/* ---------------------------------------------------------------------
   SKT — SKETSA TAHAPAN PEMBUATAN (deretan kotak kecil bernomor)
   Format tiap langkah:  [ '<gambar svg>', 'Judul langkah' ]
   Tambah / hapus langkah dengan menambah / menghapus satu baris.
   --------------------------------------------------------------------- */
const SKT = {

  /* Arc Floor Lamp */
  floor: sketchRow([
    ['<path d="M60 80C60 55 35 50 35 30Q35 8 55 6"/>', '1 Photo reference'],
    ['<path d="M55 80C55 55 30 50 30 30Q30 8 60 6"/>', '2 Smooth bend'],
    ['<path d="M45 80C45 55 20 50 20 30Q20 8 55 6"/><circle cx="78" cy="25" r="9"/>', '3 Side view'],
  ]),

  /* Jute Pendant Lamp */
  pend: sketchRow([
    ['<path d="M30 10Q15 40 30 75M45 10Q38 40 45 75M60 10Q60 40 60 75"/>', '1 Printed ribs'],
    ['<ellipse cx="50" cy="25" rx="22" ry="6"/><ellipse cx="50" cy="60" rx="22" ry="6"/>', '2 Rings'],
    ['<ellipse cx="50" cy="42" rx="40" ry="28"/><ellipse cx="50" cy="42" rx="20" ry="28"/><line x1="50" y1="14" x2="50" y2="70"/>', '3 Assembled'],
    ['<ellipse cx="50" cy="42" rx="40" ry="28" style="fill:#d2a96a;fill-opacity:.5"/><line x1="50" y1="14" x2="50" y2="70"/>', '4 Jute skin'],
  ]),

  /* Tubular Sling Chair */
  chair: sketchRow([
    ['<path d="M30 8L24 78M24 45L70 45L70 78"/>', '1 Tube frame'],
    ['<path d="M20 50Q50 70 80 50" style="stroke-width:3"/>', '2 Seat panel'],
    ['<path d="M30 15h40v45H30z"/>', '3 Back panel'],
    ['<path d="M30 8L24 78M24 48Q50 62 70 48L70 78"/>', '4 Assembled'],
  ]),
};

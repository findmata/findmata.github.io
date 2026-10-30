/* =====================================================================
   app.js  —  MESIN WEBSITE (menampilkan halaman, keranjang, dll.)
   =====================================================================
   ⚠️ Untuk mengganti teks, harga, foto, produk, kontak → edit config.js.
      File ini cukup disentuh kalau kamu ingin mengubah CARA kerja/tampilan
      struktur halaman. Setiap bagian diberi judul & penjelasan.

   URUTAN FILE (lihat index.html):  config.js → diagrams.js → app.js

   DAFTAR ISI:
     1. Pembantu kecil (helper)
     2. Pembuat tekstur material
     3. Halaman: Home, Materials, About, Collaborate
     4. Halaman detail produk
     5. Keranjang (cart) & pemesanan
     6. Router (pindah halaman lewat #hash) & animasi
   ===================================================================== */


/* =====================================================================
   1. PEMBANTU KECIL
   ===================================================================== */

// Tempat semua halaman ditampilkan (elemen <main id="app"> di index.html)
const app = document.getElementById('app');

// Link mailto, dibuat dari email di config.js
const mailLink = `mailto:${SITE.email}`;

// Membuat tag <img> dari kunci foto di IMG (config.js). alt = teks alternatif.
const img = (key, alt = '') =>
  `<img src="${IMG[key]}" alt="${alt}" loading="lazy" decoding="async">`;

// Format angka jadi Rupiah, contoh: 1500000 → "Rp 1.500.000"
// Ganti 'Rp ' jika ingin mata uang lain.
const money = n => 'Rp ' + n.toLocaleString('id-ID');

// Membuka link di tab baru
const openLink = url => {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// Notifikasi kecil di bawah layar (hilang sendiri setelah 3,5 detik).
// Ubah 3500 untuk mengatur lamanya (dalam milidetik).
const toast = text => {
  const d = document.createElement('div');
  d.className = 'toast';
  d.textContent = text;
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 3500);
};

// Judul tab & teks logo mengikuti SITE.brand di config.js
document.title = SITE.brand;
document.getElementById('logo').textContent = SITE.brand;

// Footer dibuat dari config.js (email, Instagram, lokasi)
document.getElementById('footer').innerHTML = `
  <a href="${mailLink}">${SITE.email}</a>
  <a href="${SITE.instagramUrl}" target="_blank" rel="noopener">${SITE.instagramHandle}</a>
  <span>${SITE.location}</span>`;


/* =====================================================================
   2. PEMBUAT TEKSTUR MATERIAL
   =====================================================================
   Membuat kotak tekstur dengan SVG berdasarkan MATERIALS di config.js.
   Pola tambahan ('texture') didefinisikan di sini. Ingin pola baru?
   Tambah satu entri di TEXTURES, lalu pakai namanya di config.js.
   ===================================================================== */
const TEXTURES = {
  // anyaman (garis silang)
  weave: id => `<pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3H6M3 0V6" stroke="#5e4824" stroke-opacity=".5" stroke-width="1.3"/></pattern>`,
  // garis horizontal halus (seperti lapisan cetak 3D)
  layers: id => `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 2H4" stroke="#000" stroke-opacity=".18"/></pattern>`,
  // batang vertikal gelap
  rods: id => `<pattern id="${id}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M8 0V16" stroke="#2c2c2a" stroke-width="4"/></pattern>`,
};

// uid = nomor unik supaya id SVG tidak bentrok saat banyak kotak di satu halaman
function swatch(material, uid) {
  const pattern = material.texture ? TEXTURES[material.texture](`p${uid}`) : '';
  return `
  <svg class="sw" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
    <defs>
      ${pattern}
      <filter id="t${uid}">
        <feTurbulence type="fractalNoise" baseFrequency="${material.noise}" numOctaves="3" seed="${uid + 3}"/>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .5 0"/>
      </filter>
    </defs>
    <rect width="200" height="250" fill="${material.color}"/>
    ${pattern ? `<rect width="200" height="250" fill="url(#p${uid})"/>` : ''}
    <rect width="200" height="250" filter="url(#t${uid})" opacity=".45"/>
  </svg>`;
}


/* =====================================================================
   3. HALAMAN: HOME, MATERIALS, ABOUT, COLLABORATE
   ===================================================================== */

/* ---- HOME ---- */
const homePage = () => `
  <!-- Tulisan besar: tiap huruf muncul bergantian. Jeda antar huruf: 50 ms (ubah angka 50) -->
  <section class="hero">
    <h1 class="big" aria-label="${SITE.brand}">
      ${[...SITE.brand].map((c, i) =>
        `<span class="ch" style="animation-delay:${i * 50}ms" aria-hidden="true">${c}</span>`).join('')}
    </h1>
    <p class="sub">${SITE.tagline}</p>
  </section>

  <!-- Kartu produk (diambil dari PRODUCTS di config.js) -->
  <div class="grid">
    ${PRODUCTS.map(p => `
      <a class="card rv" href="#object-${p.id}">
        <div class="im">${img(p.card, p.n)}</div>
        <span>${p.n}</span>
      </a>`).join('')}
  </div>

  <!-- Bagian material (diambil dari MATERIALS) -->
  <div class="sec rv"><span>${HOME_TEXT.materialsTitle}</span><a href="#materials">${HOME_TEXT.materialsLink}</a></div>
  <div class="mats">
    ${MATERIALS.map((m, i) => `<div class="rv">${swatch(m, i + 20)}<span>${m.name}</span></div>`).join('')}
  </div>

  <!-- Ajakan kolaborasi -->
  <div class="sec rv"><span>${HOME_TEXT.collabTitle}</span><a href="${mailLink}">${HOME_TEXT.collabLink}</a></div>`;

/* ---- MATERIALS ---- */
const materialsPage = () => `
  <div class="mgrid">
    ${MATERIALS.map((m, i) => `<div class="rv">${swatch(m, i)}<span>${m.name}</span></div>`).join('')}
  </div>`;

/* ---- ABOUT (isi dari ABOUT_PAGE di config.js) ---- */
const aboutPage = () => `
  <div class="page">
    <h1>${ABOUT_PAGE.title}</h1>
    ${ABOUT_PAGE.paragraphs.map(t => `<p>${t}</p>`).join('')}
  </div>`;

/* ---- COLLABORATE (isi dari COLLAB_PAGE di config.js) ---- */
const collabPage = () => `
  <div class="page">
    <h1>${COLLAB_PAGE.title}</h1>
    ${COLLAB_PAGE.paragraphs.map(t => `<p>${t}</p>`).join('')}
    <p><a class="link" href="${mailLink}">${SITE.email}</a></p>
  </div>`;


/* =====================================================================
   4. HALAMAN DETAIL PRODUK
   ===================================================================== */
function detailPage(id) {
  const idx = PRODUCTS.findIndex(x => x.id == id);
  const p = PRODUCTS[idx];
  if (!p) return homePage();   // id tidak ketemu → kembali ke Home

  // Produk sebelumnya & berikutnya (untuk link ← →, berputar)
  const next = PRODUCTS[(idx + 1) % PRODUCTS.length];
  const prev = PRODUCTS[(idx + PRODUCTS.length - 1) % PRODUCTS.length];

  /* ---- Kotak beli: dropdown opsi (jika opsi > 1) + harga + tombol ---- */
  const hasChoice = p.op && p.op.length > 1;
  const buyBox = `
    <div class="buy">
      ${hasChoice ? `
        <label>${p.ot.replace(' (custom)', '')}
          <select id="bo">${p.op.map(o => `<option>${o[0]}</option>`).join('')}</select>
        </label>` : ''}
      <div class="pr">${p.price == null ? 'Price to be confirmed' : money(p.price)}</div>
      <button class="btn" id="add">Add to cart</button>
    </div>`;

  /* ---- Galeri foto: foto produk + 2 slot kosong "coming soon" ----
     Ingin jumlah slot kosong berbeda? Ubah  [null, null]  (tiap null = 1 slot). */
  const slides = [...p.ph, null, null];
  const gallery = `
    <div class="ph">
      <div class="sl" id="sl">
        ${slides.map(k => k
          ? `<div class="sd">${img(k, p.n)}</div>`
          : `<div class="sd soon"><span>Photo coming soon</span></div>`).join('')}
      </div>
      <div class="thumbs">
        ${slides.map((k, j) => `
          <button data-i="${j}" class="${j ? '' : 'on'}" aria-label="Photo ${j + 1}">
            ${k ? img(k) : '<span>Soon</span>'}
          </button>`).join('')}
      </div>
      ${buyBox}
    </div>`;

  /* ---- Isi detail ----
     Produk LENGKAP (punya `sp`)   → panel dimensi, spesifikasi, sketsa, opsi, fitur.
     Produk SEDERHANA (tanpa `sp`) → deskripsi + tabel status/material/ukuran. */
  const body = p.sp ? `
    <div class="pn">
      <div class="rv panel"><h3>Dimensions (approx.)</h3>${DIM[p.dim]}</div>
      <div class="rv panel"><h3>Specifications</h3>
        <div class="sp">${p.sp.map(r => `<div><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}</div>
      </div>
      <div class="rv panel"><h3>${p.sk}</h3>${SKT[p.dim]}</div>
      <div class="rv panel"><h3>${p.ot}</h3>
        <div class="opt">${p.op.map(o => `<div><i style="background:${o[1]}"></i>${o[0]}</div>`).join('')}</div>
        <p class="note">${p.on}</p>
      </div>
      <div class="rv panel wide">
        <div class="feat">${p.ft.map(f => `<div><b>${f[0]}</b><span>${f[1]}</span></div>`).join('')}</div>
      </div>
    </div>`
  : `
    <div class="info">
      <p>${p.desc}</p>
      <div class="rv panel sp">
        <div><span>Status</span><span>${p.s}</span></div>
        <div><span>Materials</span><span>${p.materials}</span></div>
        <div><span>Size</span><span>${p.size}</span></div>
      </div>
      <p style="margin-top:20px"><span class="cap">More details to come</span></p>
    </div>`;

  return `
    <div class="dh">
      <h1>${p.n}</h1>
      <p>${p.sub || p.cat + ' · ' + p.s}</p>
    </div>
    <div class="dw">${gallery}${body}</div>
    <div class="nxt">
      <a href="#object-${prev.id}">← ${prev.n}</a>
      <a href="#object-${next.id}">${next.n} →</a>
    </div>`;
}


/* =====================================================================
   5. KERANJANG & PEMESANAN
   =====================================================================
   Keranjang disimpan di browser pengunjung (localStorage, kunci 'fm-cart').
   Tidak ada pembayaran online: pesanan dikirim lewat WhatsApp / Instagram DM.
   ===================================================================== */
const CART_KEY = 'fm-cart';   // ganti kalau ingin "mereset" keranjang semua pengunjung
let cart = [];
try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch (e) {}
const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} };

// Isi keranjang + data produknya (barang yang produknya sudah dihapus diabaikan)
const cartLines = () =>
  cart.map(c => ({ ...c, p: PRODUCTS.find(x => x.id == c.id) })).filter(c => c.p);

// Total harga. Mengembalikan null kalau ada barang tanpa harga.
const cartTotal = () => {
  const lines = cartLines();
  return lines.some(c => c.p.price == null)
    ? null
    : lines.reduce((sum, c) => sum + c.p.price * c.qty, 0);
};

// Teks pesanan otomatis (kata pembuka/penutup dari ORDER_MESSAGE di config.js)
const orderText = () => {
  const lines = cartLines(), total = cartTotal();
  const items = lines.map(c =>
    `- ${c.p.n}${c.opt ? ' (' + c.opt + ')' : ''} x ${c.qty}` +
    (c.p.price != null ? ` = ${money(c.p.price * c.qty)}` : '')).join('\n');
  return `${ORDER_MESSAGE.intro}\n\nOrder:\n${items}\n\nTotal: ${total != null ? money(total) : 'to be confirmed'}\n\n${ORDER_MESSAGE.outro}`;
};

// Elemen laci keranjang
const drawer = document.getElementById('dr');
const overlay = document.getElementById('ov');
const pill = document.getElementById('pill');      // tombol "Cart (n)" melayang

// Buka / tutup laci keranjang
const openCart = show => {
  drawer.classList.toggle('on', show);
  overlay.classList.toggle('on', show);
};

// Menggambar ulang isi keranjang (dipanggil tiap ada perubahan)
function renderCart() {
  const lines = cartLines();
  const count = lines.reduce((s, c) => s + c.qty, 0);
  const total = cartTotal();

  // Tombol melayang: tersembunyi kalau keranjang kosong
  pill.textContent = `Cart (${count})`;
  pill.style.display = count ? 'block' : 'none';

  drawer.innerHTML = `
    <div class="dt"><b>Cart</b><button id="cx">Close</button></div>
    <div class="di">
      ${lines.length ? lines.map((c, i) => `
        <div class="ci">
          <div class="th">${img(c.p.card)}</div>
          <div>
            <b>${c.p.n}</b><br><small>${c.opt || ''}</small>
            <div class="q">
              <button data-q="${i}" data-d="-1" aria-label="Less">−</button>${c.qty}
              <button data-q="${i}" data-d="1" aria-label="More">+</button>
              <button class="rm" data-r="${i}">Remove</button>
            </div>
          </div>
          <span>${c.p.price == null ? 'TBC' : money(c.p.price * c.qty)}</span>
        </div>`).join('')
      : '<p class="mut">Your cart is empty.</p>'}
    </div>
    ${lines.length ? `
      <div class="df">
        <div class="tt"><span>Total</span><span>${total == null ? 'To be confirmed' : money(total)}</span></div>
        <button class="btn" id="ow">Order by WhatsApp</button>
        <button class="btn" id="oi">Order by Instagram DM</button>
        <p class="note">No online payment yet. We confirm price, shipping and payment with you directly.</p>
      </div>` : ''}`;

  const el = id => document.getElementById(id);

  el('cx').onclick = () => openCart(false);

  // Tombol − dan +
  drawer.querySelectorAll('[data-q]').forEach(b => b.onclick = () => {
    const item = cart[+b.dataset.q];
    item.qty = Math.max(1, item.qty + +b.dataset.d);   // jumlah minimal 1
    saveCart(); renderCart();
  });

  // Tombol Remove
  drawer.querySelectorAll('[data-r]').forEach(b => b.onclick = () => {
    cart.splice(+b.dataset.r, 1);
    saveCart(); renderCart();
  });

  // Pesan lewat WhatsApp (nomor dari SITE.whatsapp)
  if (el('ow')) el('ow').onclick = () => {
    if (!SITE.whatsapp) { toast('WhatsApp number coming soon. Use Instagram DM for now.'); return; }
    openLink(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(orderText())}`);
  };

  // Pesan lewat Instagram DM: Instagram tidak bisa mengisi pesan otomatis,
  // jadi teks pesanan disalin ke clipboard lalu DM dibuka.
  if (el('oi')) el('oi').onclick = () => {
    try { navigator.clipboard.writeText(orderText()); } catch (e) {}
    toast('Order message copied. Paste it in the chat and send.');
    openLink(SITE.instagramDm);
  };
}

// Klik area gelap / tombol Esc menutup keranjang; klik tombol melayang membukanya
overlay.onclick = () => openCart(false);
pill.onclick = () => openCart(true);
addEventListener('keydown', e => { if (e.key == 'Escape') openCart(false); });


/* =====================================================================
   6. ROUTER & ANIMASI
   =====================================================================
   Halaman ditentukan oleh bagian setelah tanda # di URL:
     #home  #materials  #about  #collaboration  #object-<id produk>
   Ingin menambah halaman baru? (1) buat fungsi halaman seperti aboutPage,
   (2) tambah satu kondisi di bawah, (3) tambah link di <nav> index.html.
   ===================================================================== */
function route() {
  const hash = (location.hash || '#home').slice(1);

  // Pilih halaman
  app.innerHTML =
    hash.startsWith('object-') ? detailPage(hash.slice(7)) :
    hash == 'materials'        ? materialsPage() :
    hash == 'about'            ? aboutPage() :
    hash == 'collaboration'    ? collabPage() :
                                 homePage();
  scrollTo(0, 0);

  // Tandai menu yang aktif di navigasi atas
  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on',
    hash.startsWith(a.dataset.n) ||
    (hash == 'collaboration' && a.dataset.n == 'collab') ||
    (a.dataset.n == 'home' && (hash == 'home' || hash.startsWith('object-')))));

  /* ---- Khusus halaman detail: slider foto + tombol Add to cart ---- */
  const slider = document.getElementById('sl');
  if (slider) {
    const thumbs = app.querySelectorAll('.thumbs button');
    const current = () => Math.round(slider.scrollLeft / slider.clientWidth);

    // Klik thumbnail → geser ke foto itu
    thumbs.forEach(b => b.onclick = () =>
      slider.scrollTo({ left: +b.dataset.i * slider.clientWidth, behavior: 'smooth' }));

    // Geser foto → sorot thumbnail yang sesuai
    slider.onscroll = () => {
      const a = current();
      thumbs.forEach((t, j) => t.classList.toggle('on', j == a));
    };

    // Tombol "Add to cart"
    const product = PRODUCTS.find(x => 'object-' + x.id == hash);
    document.getElementById('add').onclick = () => {
      const select = document.getElementById('bo');
      const opt = select ? select.value : (product.op ? product.op[0][0] : '');
      const found = cart.find(c => c.id == product.id && c.opt == opt);
      found ? found.qty++ : cart.push({ id: product.id, opt, qty: 1 });
      saveCart(); renderCart(); openCart(true);
    };
  }

  /* ---- Animasi muncul saat di-scroll (elemen ber-class "rv") ----
     threshold .08 = animasi mulai saat 8% elemen terlihat.
     Jeda antar elemen: (i % 4) * 70 ms — ubah 70 untuk mengatur kecepatan. */
  const observer = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
  }), { threshold: .08 });

  app.querySelectorAll('.rv').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    observer.observe(el);
  });
}

// Jalankan saat URL (#hash) berubah dan saat pertama kali dibuka
addEventListener('hashchange', route);
renderCart();
route();

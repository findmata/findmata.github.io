/* =====================================================================
   viewer3d.js  —  MODEL 3D ARC FLOOR LAMP (slide "3D" di galeri produk)
   =====================================================================
   Dipakai oleh app.js hanya untuk produk yang punya  viewer: true  di config.js.
   Foto asli tidak diganti: 3D hanya menjadi satu slide tambahan.
   - Model dibangun dari ukuran lampu (cm), bukan dari file .stl.
   - three.js dimuat dari CDN hanya saat slide 3D terlihat.
   - Mau ubah teks keterangan? Edit  VIEWS  di bawah (t = judul, d = teks).
   ===================================================================== */
(function () {
  const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  let loading = null;
  const loadThree = () => loading || (loading = new Promise((ok, no) => {
    if (window.THREE) return ok();
    const s = document.createElement('script');
    s.src = THREE_URL; s.onload = ok;
    s.onerror = () => { loading = null; no(); };
    document.head.appendChild(s);
  }));

  const XS = 12 / 16.5;   // posisi shade (cm) terhadap tengah base
  // 4 sudut kamera. g = titik yang dilihat, az/el = sudut, H/W = ukuran area (cm)
  const VIEWS = [
    { t: 'Full lamp',      d: '131 cm tall, stainless stem, linen shade.',   g: [-3, 66, 0],  az: 28, el: 8,  H: 150, W: 75 },
    { t: 'Shade and bulb', d: 'Conical linen shade with an E27 bulb inside.', g: [XS, 113, 0], az: 22, el: 6,  H: 52,  W: 48 },
    { t: 'S-curve',        d: 'One smooth stainless pipe, no joints.',        g: [-12, 76, 0], az: 0,  el: 0,  H: 140, W: 50 },
    { t: 'Base and cable', d: 'Round steel base with an inline switch.',      g: [0, 0, 38],   az: 0,  el: 60, H: 105, W: 34 },
  ];

  window.initLamp3D = function (host) {
    host.innerHTML = '<div class="v3cv"></div><div class="v3c"><b></b><span></span></div>' +
      '<div class="v3n"><div></div><em>Drag to rotate</em></div>';
    loadThree().then(() => build(host)).catch(() => fail(host));
  };

  function fail(host) {
    const b = host.querySelector('.v3c b'), s = host.querySelector('.v3c span');
    if (b) b.textContent = '3D view unavailable';
    if (s) s.textContent = 'Please check your connection or browser.';
  }

  function build(host) {
    const wrap = host.querySelector('.v3cv');
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return fail(host); }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const cv = renderer.domElement; wrap.appendChild(cv);
    const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, 1, 2000);

    // pantulan untuk logam
    { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d');
      const gr = g.createLinearGradient(0, 0, 0, 128);
      [[0, '#fff'], [.5, '#cfc8c0'], [.55, '#8d857d'], [1, '#4a4541']].forEach(s => gr.addColorStop(s[0], s[1]));
      g.fillStyle = gr; g.fillRect(0, 0, 256, 128); g.fillStyle = '#fff'; g.fillRect(40, 18, 50, 30); g.fillRect(170, 26, 30, 20);
      const t = new THREE.CanvasTexture(c); t.mapping = THREE.EquirectangularReflectionMapping; t.encoding = THREE.sRGBEncoding;
      scene.environment = new THREE.PMREMGenerator(renderer).fromEquirectangular(t).texture; }
    const sun = new THREE.DirectionalLight(0xffffff, .8); sun.position.set(60, 150, 90);
    const glow = new THREE.PointLight(0xffc98a, 1.3, 90, 2);
    scene.add(sun, new THREE.HemisphereLight(0xffffff, 0x8a8078, .35), glow);

    const M = o => new THREE.MeshStandardMaterial(Object.assign({ side: THREE.DoubleSide }, o));
    const steel = M({ color: 0xc4c7cb, metalness: .85, roughness: .38 }), dark = M({ color: 0x2a2a2c, roughness: .6 }),
      brass = M({ color: 0xb08d57, metalness: .8, roughness: .4 }),
      bulbM = M({ color: 0xfff1d6, emissive: 0xffd9a0, emissiveIntensity: 1.4, roughness: .2 });
    const add = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); scene.add(o); return o; };
    const lathe = (p, m, x = 0) => add(new THREE.LatheGeometry(p.map(a => new THREE.Vector2(a[0], a[1])), 96), m, x);

    // tekstur anyaman linen
    const wc = document.createElement('canvas'); wc.width = wc.height = 32;
    { const g = wc.getContext('2d'); g.fillStyle = '#d6b98a'; g.fillRect(0, 0, 32, 32);
      for (let i = 0; i < 32; i += 4) { g.fillStyle = 'rgba(90,60,25,.2)'; g.fillRect(0, i, 32, 1.5); g.fillStyle = 'rgba(255,240,210,.22)'; g.fillRect(i, 0, 1.5, 32); } }
    const weave = new THREE.CanvasTexture(wc); weave.wrapS = weave.wrapT = THREE.RepeatWrapping; weave.repeat.set(60, 16); weave.encoding = THREE.sRGBEncoding;

    // batang pipa (Ø12,7 mm)
    const px = [[541,2335],[540,2200],[530,2000],[505,1800],[470,1600],[420,1400],[360,1200],[300,1000],[245,800],[210,650],[215,500],[250,380],[330,270],[440,225],[580,213],[680,220],[765,229]];
    const pts = px.map(a => V3((a[0] - 664) / 16.5, (2373 - a[1]) / 16.5, 0)); pts.unshift(V3(pts[0].x, 1.5, 0));
    let cur = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const dy = 131 - .635 - Math.max(...cur.getPoints(600).map(p => p.y)); pts.forEach((p, k) => { if (k) p.y += dy; });
    cur = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    add(new THREE.TubeGeometry(cur, 500, .635, 20), steel);
    const tip = cur.getPoint(1); add(new THREE.SphereGeometry(.635, 20, 12), steel, tip.x, tip.y, 0);

    // base + kerah + bayangan
    lathe([[0,0],[12.4,0],[12.4,.5],[12.25,.5],[12.25,.7],[12.5,.7],[12.5,2.25],[12.4,2.4],[12.25,2.5],[0,2.5]], steel);
    add(new THREE.CylinderGeometry(1.1, 1.1, 1.2, 32), steel, pts[1].x, 3.1, 0);
    const sc = document.createElement('canvas'); sc.width = sc.height = 64;
    { const g = sc.getContext('2d'), r = g.createRadialGradient(32, 32, 2, 32, 32, 32); r.addColorStop(0, 'rgba(0,0,0,.45)'); r.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = r; g.fillRect(0, 0, 64, 64); }
    const blob = add(new THREE.CircleGeometry(45, 48), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }), -2, .02, 0);
    blob.rotation.x = -Math.PI / 2;

    // shade, rod, fitting, bohlam
    const P = cur.getPoints(800).filter(p => p.y > 120), armY = P.reduce((a, b) => Math.abs(b.x - XS) < Math.abs(a.x - XS) ? b : a).y;
    lathe([[19.5,103.4],[7.5,123.4]], M({ map: weave, color: 0xffffff, emissive: 0xffb870, emissiveIntensity: .22, roughness: .9 }), XS);
    lathe([[19.3,103.4],[7.3,123.4]], M({ color: 0xf3e8d6, emissive: 0xffc97f, emissiveIntensity: .55, roughness: .9 }), XS);
    const rim = M({ color: 0xa98c63, roughness: .7 });
    [[19.45, 103.4], [7.45, 123.4]].forEach(a => { const o = add(new THREE.TorusGeometry(a[0], .25, 8, 120), rim, XS, a[1], 0); o.rotation.x = Math.PI / 2; });
    const cap = add(new THREE.CircleGeometry(7.5, 64), M({ color: 0xe9dcc5 }), XS, 123.4, 0); cap.rotation.x = -Math.PI / 2;
    add(new THREE.CylinderGeometry(1.6, 1.6, .6, 40), steel, XS, 123.7, 0);
    add(new THREE.CylinderGeometry(.4, .4, armY - 123.4, 24), steel, XS, (armY + 123.4) / 2, 0);
    add(new THREE.CylinderGeometry(.85, .85, 1.2, 32), steel, XS, armY - 1.1, 0);
    lathe([[0,107.8],[1,107.9],[2,108.4],[2.7,109.3],[3,110.6],[2.8,112],[2.2,113.1],[1.6,113.9],[1.35,114.6]], bulbM, XS);
    { const s = [[1.35, 114.6]]; for (let k = 0; k < 5; k++) { const z = 114.6 + k * .4; s.push([1.35, z + .2], [1.2, z + .28], [1.2, z + .34], [1.35, z + .4]); }
      s.push([1.35,116.6],[1.9,116.6],[1.9,118.6],[2,118.6],[2,122.6],[2.3,122.6],[2.3,123.5],[0,123.5]); lathe(s, brass, XS); }
    glow.position.set(XS, 110, 0);

    // kabel, saklar, colokan
    const cp = [[0,-110,10],[0,-130,10],[0,-150,8],[0,-175,4],[5,-210,1.75],[30,-290,1.75],[15,-380,1.75],[-10,-460,1.75],[-20,-520,1.75],[-20,-600,1.75],[-20,-640,1.75],[-20,-700,1.75],[-20,-760,1.75],[-20,-865,1.75]].map(a => V3(a[0] / 10, a[2] / 10, -a[1] / 10));
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cp), 260, .175, 12), dark);
    add(new THREE.BoxGeometry(1.6, 1.1, 6), dark, -2, .55, 67); add(new THREE.BoxGeometry(.7, .2, 1.6), M({ color: 0x8a8a8c }), -2, 1.2, 67);
    add(new THREE.BoxGeometry(3.6, 2.6, 3.2), dark, -2, 1.3, 87.4);
    [-.95, .95].forEach(o => { const p = add(new THREE.CylinderGeometry(.2, .2, 2, 12), steel, -2 + o, 1.3, 90); p.rotation.x = Math.PI / 2; });

    // kamera: 4 sudut, geser untuk memutar, scroll / cubit untuk zoom
    const tn = Math.tan(17.5 * Math.PI / 180), calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let asp = .5, i = 0, zoom = 1, tw = null, vis = true, cam = { az: VIEWS[0].az, el: VIEWS[0].el, d: 240, g: VIEWS[0].g.slice() };
    const dist = s => Math.max(s.H / (2 * tn), s.W / (2 * tn * Math.min(asp, 1.6))) * 1.05;
    const capB = host.querySelector('.v3c b'), capS = host.querySelector('.v3c span'), dots = host.querySelector('.v3n div');

    function go(k, instant) {
      i = (k + VIEWS.length) % VIEWS.length; const s = VIEWS[i];
      capB.textContent = s.t; capS.textContent = s.d;
      [...dots.children].forEach((b, j) => b.setAttribute('aria-current', j === i));
      zoom = 1; const da = ((s.az - cam.az + 540) % 360) - 180;
      tw = { t0: performance.now(), f: { az: cam.az, el: cam.el, d: cam.d, g: cam.g.slice() }, to: { az: cam.az + da, el: s.el, d: dist(s), g: s.g }, dur: (calm || instant) ? 0 : 1100 };
    }
    VIEWS.forEach((s, k) => { const b = document.createElement('button'); b.setAttribute('aria-label', s.t); b.onclick = () => go(k); dots.appendChild(b); });

    const fit = () => {
      const w = wrap.clientWidth, h = wrap.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); asp = w / h;
      if (!tw) cam.d = dist(VIEWS[i]) * zoom;
    };
    new ResizeObserver(fit).observe(wrap); fit(); go(0, true);
    new IntersectionObserver(es => { vis = es[0].isIntersecting; }).observe(host);

    const ptr = new Map(); let pd = 0;
    const stop = () => { tw = null; const h = host.querySelector('.v3n em'); if (h) h.style.display = 'none'; };
    cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); ptr.set(e.pointerId, [e.clientX, e.clientY]); stop();
      if (ptr.size === 2) { const [a, b] = [...ptr.values()]; pd = Math.hypot(a[0] - b[0], a[1] - b[1]); } });
    cv.addEventListener('pointermove', e => { const o = ptr.get(e.pointerId); if (!o) return;
      if (ptr.size === 1) { cam.az -= (e.clientX - o[0]) * .4; cam.el = Math.max(-5, Math.min(80, cam.el + (e.clientY - o[1]) * .3)); }
      ptr.set(e.pointerId, [e.clientX, e.clientY]);
      if (ptr.size === 2) { const [a, b] = [...ptr.values()], n = Math.hypot(a[0] - b[0], a[1] - b[1]); cam.d = Math.max(25, Math.min(600, cam.d * pd / n)); pd = n; } });
    ['pointerup', 'pointercancel'].forEach(n => cv.addEventListener(n, e => ptr.delete(e.pointerId)));
    cv.addEventListener('wheel', e => { e.preventDefault(); stop(); cam.d = Math.max(25, Math.min(600, cam.d * (1 + e.deltaY * .001))); }, { passive: false });

    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    (function loop(now) {
      if (!host.isConnected) { renderer.dispose(); return; }   // halaman sudah berpindah
      if (vis) {
        if (tw) {
          const k = tw.dur ? Math.min(1, (now - tw.t0) / tw.dur) : 1, e = ease(k), f = tw.f, o = tw.to;
          cam.az = f.az + (o.az - f.az) * e; cam.el = f.el + (o.el - f.el) * e; cam.d = f.d + (o.d - f.d) * e;
          cam.g = f.g.map((v, j) => v + (o.g[j] - v) * e); if (k >= 1) tw = null;
        }
        const a = cam.az * Math.PI / 180, el = cam.el * Math.PI / 180, g = cam.g;
        camera.position.set(g[0] + cam.d * Math.sin(a) * Math.cos(el), g[1] + cam.d * Math.sin(el), g[2] + cam.d * Math.cos(a) * Math.cos(el));
        camera.lookAt(g[0], g[1], g[2]); renderer.render(scene, camera);
      }
      requestAnimationFrame(loop);
    })(performance.now());
  }
})();

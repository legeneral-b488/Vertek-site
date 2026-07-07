/* hero.jsx — Nav · Hero · Drone Scanner */

const { useState, useEffect, useRef } = React;

/* ── ICONS ── */
const Arr = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Chk = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MenuIco = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const CloseIco = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const MailIco = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const PhoneIco = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 2h4l2 5-2.5 1.5a11 11 0 005 5L14 11l5 2v4a2 2 0 01-2 2C7.2 19 1 12.8 1 5a2 2 0 012-2h1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PinIco = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

/* ── LOGO ── */
function LogoImg({ invert }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span style={{
        fontFamily: 'var(--font-epic)', fontSize: '22px', letterSpacing: '.14em',
        color: invert ? '#fff' : 'var(--text)', textTransform: 'uppercase',
      }}>VERTEK</span>
    );
  }
  return (
    <img
      src="assets/Logo.png"
      alt="Vertek"
      style={{
        height: '52px', maxWidth: '200px', objectFit: 'contain',
        filter: invert ? 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,.4))' : 'drop-shadow(0 1px 4px rgba(0,0,0,.12))',
        transition: 'filter .35s', display: 'block',
      }}
      onError={() => setFailed(true)}
    />
  );
}

/* ── DRONE SVG ── */
function DroneSVG() {
  return (
    <svg width="52" height="36" viewBox="0 0 52 36" fill="none">
      <ellipse className="prop" cx="10" cy="8"  rx="8" ry="2.5" fill="rgba(255,208,128,.75)"/>
      <ellipse className="prop" cx="42" cy="8"  rx="8" ry="2.5" fill="rgba(255,208,128,.75)" style={{animationDelay:'-0.06s'}}/>
      <ellipse className="prop" cx="10" cy="28" rx="8" ry="2.5" fill="rgba(255,208,128,.75)" style={{animationDelay:'-0.03s'}}/>
      <ellipse className="prop" cx="42" cy="28" rx="8" ry="2.5" fill="rgba(255,208,128,.75)" style={{animationDelay:'-0.09s'}}/>
      <line x1="10" y1="8"  x2="26" y2="18" stroke="rgba(255,255,255,.55)" strokeWidth="1.5"/>
      <line x1="42" y1="8"  x2="26" y2="18" stroke="rgba(255,255,255,.55)" strokeWidth="1.5"/>
      <line x1="10" y1="28" x2="26" y2="18" stroke="rgba(255,255,255,.55)" strokeWidth="1.5"/>
      <line x1="42" y1="28" x2="26" y2="18" stroke="rgba(255,255,255,.55)" strokeWidth="1.5"/>
      <rect x="20" y="13" width="12" height="10" rx="3" fill="rgba(255,255,255,.88)"/>
      <circle cx="26" cy="22" r="2.5" fill="#222" opacity="0.8"/>
      <circle cx="10" cy="8"  r="2" fill="white" opacity="0.9"/>
      <circle cx="42" cy="8"  r="2" fill="white" opacity="0.9"/>
      <circle cx="10" cy="28" r="2" fill="white" opacity="0.9"/>
      <circle cx="42" cy="28" r="2" fill="white" opacity="0.9"/>
    </svg>
  );
}

/* ── DRONE SCANNER ── */
function DroneScanner({ active }) {
  const unitRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!active) return;
    const unit = unitRef.current;
    if (!unit) return;

    // Centre de l'orbite = position du titre VERTEK (centré, ~42% vertical)
    const CX = 50, CY = 42, RX = 36, RY = 22;

    let angle = -Math.PI / 2; // départ en haut
    let orbitPaused = false;
    let lastTs = null;
    let rafId;
    let timer;

    const schedulePause = () => {
      timer = setTimeout(() => {
        orbitPaused = true;
        setScanning(true);
        timer = setTimeout(() => {
          orbitPaused = false;
          setScanning(false);
          schedulePause();
        }, 1400 + Math.random() * 1600); // pause 1.4–3 s
      }, 3000 + Math.random() * 4000);   // intervalle 3–7 s
    };

    schedulePause();

    const tick = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      if (!orbitPaused) {
        // Vitesse légèrement variable pour un vol organique
        angle += (0.28 + 0.06 * Math.sin(angle * 3)) * dt;
      }

      const x = CX + RX * Math.cos(angle);
      const y = CY + RY * Math.sin(angle);
      unit.style.left = `${x}%`;
      unit.style.top  = `${y}%`;

      // Oriente le cône vers le titre VERTEK
      const hero = document.getElementById('hero');
      if (hero) {
        const W = hero.offsetWidth, H = hero.offsetHeight;
        const dX = (CX - x) / 100 * W;
        const dY = (CY - y) / 100 * H;
        const rot = Math.atan2(dY, dX) * 180 / Math.PI;
        const cone = unit.querySelector('.scan-cone');
        if (cone) {
          cone.style.transformOrigin = '0px 55px';
          cone.style.transform = `rotate(${rot}deg)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); clearTimeout(timer); };
  }, [active]);

  if (!active) return null;

  return (
    <div className="drone-scanner">
      <div ref={unitRef} className={`drone-unit${scanning ? ' scanning' : ''}`} style={{ transition: 'none' }}>
        <div className="drone-svg-wrap"><DroneSVG /></div>
        <svg className="scan-cone" width="180" height="110" viewBox="0 0 180 110">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffd080" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="#ffd080" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <g className="sweep">
            <polygon points="0,55 180,0 180,110" fill="url(#cg)"/>
          </g>
        </svg>
        <div className="scan-lbl">ANALYSE...</div>
      </div>
    </div>
  );
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [onHero,  setOnHero]  = useState(true);
  const [open,    setOpen]    = useState(false);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 40);
      const hero = document.getElementById('hero');
      if (hero) setOnHero(window.scrollY < hero.offsetHeight - 80);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    ['#services', 'Services'],
    ['#about',    'Qui sommes-nous'],
    ['#portfolio','Réalisations'],
    ['#contact',  'Contact'],
  ];

  const logoInvert = onHero && !scrolled;

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}${onHero ? ' on-hero' : ''}`}>
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <LogoImg invert={logoInvert} />
        </a>
        <ul className="nav-links">
          {links.map(([h, l]) => (
            <li key={h}><a href={h} className="nav-link">{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta-btn">Demander un devis</a>
        <button className="nav-mob-btn" onClick={() => setOpen(true)}><MenuIco /></button>
      </nav>

      <div className={`mob-menu${open ? ' open' : ''}`}>
        <button className="mob-close" onClick={() => setOpen(false)}><CloseIco /></button>
        {links.map(([h, l]) => (
          <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>
        ))}
        <a href="#contact" className="btn btn-gold" onClick={() => setOpen(false)}>
          Demander un devis <Arr />
        </a>
      </div>
    </>
  );
}

/* ── HERO ── */
function Hero({ scannerActive }) {
  const vidRef = useRef(null);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const srcs = [
      'https://videos.pexels.com/video-files/5031099/5031099-hd_1920_1080_30fps.mp4',
      'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_25fps.mp4',
      'https://videos.pexels.com/video-files/1851190/1851190-hd_1280_720_25fps.mp4',
    ];
    let idx = 0;
    const tryNext = () => {
      if (idx < srcs.length) { v.src = srcs[idx++]; v.load(); }
    };
    v.addEventListener('error', tryNext);
    tryNext();
    return () => v.removeEventListener('error', tryNext);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-vid-wrap">
        <video ref={vidRef} autoPlay muted loop playsInline preload="auto" />
      </div>
      <div className="hero-overlay" />
      <DroneScanner active={scannerActive} />

      <div className="hero-content">
        <div className="hero-kicker">Drone — Photo &amp; Vidéo Aérienne</div>
        <div className="hero-vertek">VERTEK</div>
        <div className="hero-badge">
          <span className="hero-dot" />
          Certifié A1 · Opérateur UAS DGAC · Disponible maintenant
        </div>
        <p className="hero-sub">
          Prises de vue aériennes professionnelles pour <b>l'immobilier</b>
          et l'<b>inspection &amp; diagnostique</b>.
        </p>
        <div className="hero-btns">
          <a href="#services" className="btn btn-paper">Nos prestations <Arr /></a>
          <a href="#contact"  className="btn btn-w">Demander un devis</a>
        </div>
      </div>
    </section>
  );
}

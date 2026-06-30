/* sections.jsx — About · Why · Portfolio · Contact · Footer */

/* ── QUI SOMMES-NOUS ── */
function MedalSVG({ color, glyph, size = 80 }) {
  const r = size / 2;
  const teeth = 16;
  const outerR = r - 2;
  const innerR = r - 10;
  let path = '';
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i / (teeth * 2)) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 === 0 ? outerR : innerR;
    const x = r + radius * Math.cos(angle);
    const y = r + radius * Math.sin(angle);
    path += (i === 0 ? 'M' : 'L') + `${x.toFixed(2)},${y.toFixed(2)}`;
  }
  path += 'Z';

  return (
    <svg width={size} height={size + 28} viewBox={`0 0 ${size} ${size + 28}`} fill="none">
      {/* Rubans */}
      <rect x={r - 12} y={size - 4} width="8"  height="28" rx="2" fill={color} opacity="0.7" transform={`rotate(-8,${r - 8},${size})`}/>
      <rect x={r + 4}  y={size - 4} width="8"  height="28" rx="2" fill={color} opacity="0.7" transform={`rotate(8,${r + 8},${size})`}/>
      {/* Couronne dentelée */}
      <path d={path} fill={color} opacity="0.22"/>
      {/* Disque dégradé */}
      <defs>
        <radialGradient id={`mg${color.replace('#','')}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <circle cx={r} cy={r} r={r - 12} fill={`url(#mg${color.replace('#','')})`}/>
      <circle cx={r} cy={r} r={r - 12} stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Glyphe */}
      <text x={r} y={r + 6} textAnchor="middle" fontSize="22" fill="#fff" fontFamily="var(--font-display)" fontWeight="700">{glyph}</text>
    </svg>
  );
}

function About() {
  const medals = [
    { color: '#4a7a96', glyph: '★', label: 'A1 / A3 DGAC',   sub: 'Règlement UE 2019/947' },
    { color: '#e8e0d0', glyph: '✓', label: 'Opérateur UAS',   sub: 'Enregistré DGAC' },
    { color: '#c0392b', glyph: '⚙', label: 'SECUFER',          sub: 'Milieux ferroviaires' },
  ];

  return (
    <section className="sec" id="about" style={{ background: 'var(--bg2)' }}>
      <div className="who-wrap">
        <div>
          <div className="sec-lbl">Qui sommes-nous</div>
          <h2 className="sec-title">Télépilote<br />de drone</h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.75', maxWidth: '460px', marginBottom: '20px', fontWeight: 300 }}>
            Spécialisé en diagnostic aérien et inspection technique, Vertek intervient pour
            l'immobilier, les ouvrages d'art, les sites industriels et l'expertise sinistre.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.75', maxWidth: '460px', fontWeight: 300 }}>
            Certifié télépilote <strong style={{ color: 'var(--text)' }}>A1 / A3 DGAC</strong> et habilité
            <strong style={{ color: 'var(--text)' }}> SECUFER</strong> pour les interventions en milieux ferroviaires
            et zones industrielles à risques.
          </p>
          <div style={{
            marginTop: '24px', padding: '18px 22px', background: 'var(--bg3)',
            border: '1px solid var(--border)', fontSize: '13px', color: 'var(--muted)',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--green)', display: 'block', marginBottom: '8px' }}>Zone d'intervention</span>
            Isère (38) et départements limitrophes · Déplacements plus larges sur devis
          </div>

          <div style={{
            marginTop: '12px', padding: '18px 22px', background: 'var(--bg3)',
            border: '1px solid var(--border)', fontSize: '13px', color: 'var(--muted)',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--steel)', display: 'block', marginBottom: '8px' }}>Structure sœur</span>
            <a href="https://bevert.fr" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--steel)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '.06em', fontSize: '14px' }}>
              BEVERT
            </a>
            {' '}— Bureau d'études environnementales · diagnostics écologiques, études d'impact.
          </div>
        </div>

        <div>
          <div className="who-medals">
            {medals.map((m, i) => (
              <div key={i} className="medal-item">
                <MedalSVG color={m.color} glyph={m.glyph} size={82} />
                <div className="medal-lbl">{m.label}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center' }}>{m.sub}</div>
                <div className="medal-valid">Valide jusqu'en 2034</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── POURQUOI VERTEK ── */
function Why() {
  const items = [
    {
      icon: (
        <svg className="why-ico" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L6 14v10c0 10.5 7.7 20.3 18 22.7C34.3 44.3 42 34.5 42 24V14L24 4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M17 24l5 5 9-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Flexibilité réglementaire',
      body: 'Notre DJI Mini 4 Pro (<250g) peut voler dans des zones restreintes aux drones lourds et opérer près des personnes sous certification A1, sans démarches complexes supplémentaires.',
      badge: 'Certification A1 · <250g',
    },
    {
      icon: (
        <svg className="why-ico" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M24 14v10l6 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Rapport qualité-prix',
      body: 'Qualité cinématographique proche du standard professionnel. Pas d\'opérateur lourd ni de surcoût logistique — vous bénéficiez de l\'essentiel à prix juste, avec des tarifs clairs et transparents.',
      badge: 'Tarifs clairs · Sans surprise',
    },
    {
      icon: (
        <svg className="why-ico" viewBox="0 0 48 48" fill="none">
          <path d="M24 6L10 13v10c0 8.5 5.9 16.4 14 18.6C32.1 39.4 38 31.5 38 23V13L24 6z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
          <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Sécurité avant tout',
      body: 'Formé pour intervenir dans des environnements à risques : milieux ferroviaires (habilitation SECUFER) et zones industrielles contraintes. Protocoles de sécurité stricts à chaque mission.',
      badge: 'SECUFER · Milieux industriels',
    },
  ];

  return (
    <section className="sec" id="why" style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <div className="sec-lbl">Nos atouts</div>
        <h2 className="sec-title">Pourquoi Vertek ?</h2>
        <p className="sec-sub">Trois raisons concrètes de nous choisir plutôt qu'un opérateur classique.</p>
      </div>
      <div className="why-grid">
        {items.map((it, i) => (
          <div key={i} className="why-card">
            {it.icon}
            <div className="why-title">{it.title}</div>
            <p className="why-body">{it.body}</p>
            <span className="why-badge">{it.badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── PORTFOLIO / BIBLIOTHÈQUE ── */
const TAG_ALL = 'Tout';

function Portfolio() {
  const raw = (window.GALLERY && window.GALLERY.length > 0)
    ? window.GALLERY
    : [{ file: "Inspection ouvrage d'art.jpg", type: 'photo', tag: 'Inspection' }];

  const [cells] = React.useState(() =>
    raw.map(item => ({
      lbl: item.file.replace(/\.[^.]+$/, ''),
      tag: item.tag,
      mediaType: item.type,
      src: item.type === 'video'
        ? (item.src || `uploads/${encodeURIComponent(item.file)}`)
        : (item.src || `uploads/${encodeURIComponent(item.file)}`),
    }))
  );

  const tags = [TAG_ALL, ...Array.from(new Set(cells.map(c => c.tag)))];
  const [activeTag, setActiveTag] = React.useState(TAG_ALL);
  const [visible, setVisible] = React.useState(() => new Set(cells.map((_, i) => i)));
  const [lightbox, setLightbox] = React.useState(null);

  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const filtered = cells.filter((c, i) =>
    visible.has(i) && (activeTag === TAG_ALL || c.tag === activeTag)
  );

  const hideIdx = i => setVisible(prev => { const s = new Set(prev); s.delete(i); return s; });

  return (
    <section className="sec" id="portfolio" style={{ background: 'var(--bg2)' }}>
      <div className="lib-wrap">
        <div className="sec-lbl">Portfolio</div>
        <h2 className="sec-title">Nos réalisations</h2>
        <p className="sec-sub">Cliquez sur une image pour l'agrandir.</p>

        <div className="lib-chips">
          {tags.map(t => (
            <button key={t} className={`lib-chip${activeTag === t ? ' active' : ''}`} onClick={() => setActiveTag(t)}>
              {t}
            </button>
          ))}
        </div>

        <div className="lib-grid">
          {filtered.map((c, i) => {
            const origIdx = cells.indexOf(c);
            return (
              <div key={origIdx} className="lib-cell" onClick={() => setLightbox(c)}>
                {c.mediaType === 'video' ? (
                  <video autoPlay muted loop playsInline src={c.src}
                    onError={() => hideIdx(origIdx)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <img src={c.src} alt={c.lbl}
                    onError={() => hideIdx(origIdx)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
                {c.mediaType === 'video' && (
                  <div className="lib-play">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5 3l9 5-9 5V3z"/>
                    </svg>
                  </div>
                )}
                <div className="lib-cat">{c.tag}</div>
                <div className="lib-lbl">{c.lbl}</div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '.1em', textTransform: 'uppercase', fontSize: '13px' }}>
            Aucune réalisation dans cette catégorie
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <a href="#contact" className="btn btn-g">Discuter de votre projet <Arr /></a>
        </div>
      </div>

      {lightbox && (
        <div className="lb-overlay" onClick={() => setLightbox(null)}>
          <div className="lb-box" onClick={e => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
            {lightbox.mediaType === 'video' ? (
              <video controls autoPlay src={lightbox.src}
                style={{ maxWidth: '90vw', maxHeight: '80vh', display: 'block' }}
              />
            ) : (
              <img src={lightbox.src} alt={lightbox.lbl}
                style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
              />
            )}
            <div className="lb-caption">{lightbox.lbl} · {lightbox.tag}</div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText('vertek.contact@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section className="sec" id="contact" style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <div className="sec-lbl">Contact</div>
        <h2 className="sec-title">Parlons de votre projet</h2>
        <p className="sec-sub">Réponse garantie sous 24h — devis gratuit et sans engagement.</p>
      </div>

      <div className="contact-wrap">
        {/* Coordonnées */}
        <div>
          <div className="cinfo-item">
            <span className="cinfo-ico"><MailIco /></span>
            <div>
              <div className="cinfo-lbl">Email</div>
              <a href="mailto:vertek.contact@gmail.com" className="cinfo-val" style={{ color: 'var(--text)', textDecoration: 'none' }}>
                vertek.contact@gmail.com
              </a>
            </div>
          </div>

          <div className="cinfo-item">
            <span className="cinfo-ico"><PhoneIco /></span>
            <div>
              <div className="cinfo-lbl">Téléphone · 7j/7</div>
              <a href="tel:+33695742516" className="cinfo-val" style={{ color: 'var(--text)', textDecoration: 'none' }}>
                06 95 74 25 16
              </a>
            </div>
          </div>

          <div className="cinfo-item">
            <span className="cinfo-ico"><PinIco /></span>
            <div>
              <div className="cinfo-lbl">Zone d'intervention</div>
              <div className="cinfo-val">Isère (38) &amp; départements limitrophes</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                Ain · Savoie · Drôme · Ardèche · Loire · Rhône
              </div>
            </div>
          </div>

          {/* Carte SVG Isère */}
          <ZoneMap />

          <div style={{ marginTop: '20px', padding: '18px 20px', background: 'var(--bg3)', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '10px' }}>Garanties</div>
            {[
              'Réponse sous 24h',
              'Devis gratuit sans engagement',
              'Certifié A1/A3 DGAC',
              'Habilité SECUFER',
              'RC Pro souscrite',
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>
                <span style={{ color: 'var(--green)' }}><Chk /></span>{g}
              </div>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <a href="mailto:vertek.contact@gmail.com"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '28px 24px 20px', background: 'var(--green)', color: '#fff', textDecoration: 'none', gap: '6px',
              }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '.22em', textTransform: 'uppercase', opacity: .8 }}>
                Email — cliquez pour écrire
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(13px,2vw,18px)', fontWeight: 800, letterSpacing: '.02em', wordBreak: 'break-all' }}>
                vertek.contact@gmail.com
              </span>
            </a>
            <button onClick={copy}
              style={{
                background: copied ? '#3d7a5a' : '#2e5c44', color: '#fff', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase',
                padding: '10px', transition: 'background .2s',
              }}>
              {copied ? '✓ Adresse copiée !' : "Copier l'adresse email"}
            </button>
          </div>

          <a href="tel:+33695742516"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '32px 24px', background: 'var(--bg3)', color: 'var(--text)', textDecoration: 'none',
              border: '2px solid var(--green)', gap: '6px',
            }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Téléphone · Disponible 7j/7
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,38px)', fontWeight: 800, letterSpacing: '.08em', color: 'var(--green)' }}>
              06 95 74 25 16
            </span>
          </a>

          <div style={{ padding: '20px 24px', background: 'var(--bg2)', border: '1px dashed rgba(0,0,0,.15)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase' }}>Avant de contacter</strong>
            Précisez le type de prestation souhaité, le lieu et si possible la date envisagée.
            Cela nous permet de vous répondre avec une proposition adaptée dès le premier échange.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CARTE SVG ZONE (Isère + limitrophes) ── */
function ZoneMap() {
  const depts = [
    { id: '01', nom: 'Ain',         path: 'M 62 8 L 90 12 L 96 38 L 80 44 L 68 36 L 60 22 Z',    fill: '#b8ddc8', label: { x: 75, y: 26 } },
    { id: '69', nom: 'Rhône',       path: 'M 30 36 L 62 8 L 68 36 L 60 56 L 40 52 Z',            fill: '#c8d8c0', label: { x: 48, y: 40 } },
    { id: '42', nom: 'Loire',       path: 'M 6 40 L 30 36 L 40 52 L 34 72 L 12 68 Z',            fill: '#c8d8c0', label: { x: 22, y: 54 } },
    { id: '07', nom: 'Ardèche',     path: 'M 12 68 L 34 72 L 36 94 L 14 96 L 6 80 Z',            fill: '#b8ddc8', label: { x: 22, y: 82 } },
    { id: '26', nom: 'Drôme',       path: 'M 34 72 L 60 56 L 76 68 L 78 96 L 36 94 Z',           fill: '#c8d8c0', label: { x: 56, y: 82 } },
    { id: '05', nom: 'Hautes-Alpes',path: 'M 76 68 L 104 60 L 114 88 L 96 96 L 78 96 Z',         fill: '#b8ddc8', label: { x: 94, y: 80 } },
    { id: '73', nom: 'Savoie',      path: 'M 80 44 L 104 38 L 114 56 L 104 60 L 76 68 L 60 56 L 68 36 Z', fill: '#c8d8c0', label: { x: 90, y: 52 } },
    { id: '38', nom: 'Isère',       path: 'M 40 52 L 60 56 L 76 68 L 60 56 L 40 52 M 40 52 L 68 36 L 80 44 L 76 68 L 60 56 L 40 52 Z', fill: '#5a9e78', label: { x: 62, y: 57 } },
  ];

  return (
    <div style={{ marginTop: '18px' }}>
      <svg viewBox="0 0 120 106" width="100%" style={{ maxWidth: '260px', display: 'block' }}>
        {depts.map(d => (
          <g key={d.id}>
            <path d={d.path} fill={d.fill} stroke="#fff" strokeWidth="1.2"/>
            <text x={d.label.x} y={d.label.y} textAnchor="middle"
              fontSize={d.id === '38' ? '6' : '4.5'}
              fill={d.id === '38' ? '#fff' : 'var(--text)'}
              fontFamily="var(--font-display)" fontWeight={d.id === '38' ? '700' : '400'}>
              {d.id === '38' ? 'Isère' : d.nom}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── FOOTER ── */
function Footer() {
  const [logoFailed, setLogoFailed] = React.useState(false);

  return (
    <footer>
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        {logoFailed ? (
          <span className="footer-wm">VERTEK</span>
        ) : (
          <img
            src="assets/Logo.png"
            alt="Vertek"
            style={{ height: '40px', objectFit: 'contain', filter: 'brightness(0) invert(.75)' }}
            onError={() => setLogoFailed(true)}
          />
        )}
      </a>

      <span className="ftxt">© 2026 Vertek · VERILHAC Jules EI</span>

      <div className="flinks">
        <a href="#services">Services</a>
        <a href="#portfolio">Réalisations</a>
        <a href="#contact">Contact</a>
        <a href="mentions-legales.html">Mentions légales</a>
        <a href="https://bevert.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--steel)' }}>BEVERT — Études environnementales</a>
      </div>

      <div className="footer-legal">
        VERILHAC Jules EI &nbsp;·&nbsp; SIRET 104 416 284 000 16 &nbsp;·&nbsp;
        TVA non applicable, art. 293 B du CGI &nbsp;·&nbsp;
        32 allée Paul-Émile Victor, 38090 Villefontaine &nbsp;·&nbsp;
        <a href="mentions-legales.html">Mentions légales</a>
      </div>
    </footer>
  );
}

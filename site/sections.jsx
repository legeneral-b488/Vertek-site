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

/* ── CARTE SVG ZONE (Isère + limitrophes, contours géographiques réels) ── */
function ZoneMap() {
  const depts = [
    { id: '01', nom: 'Ain',            path: 'M95.9,46.2 L109.2,6.0 L118.7,10.2 L130.7,7.3 L131.8,12.0 L140.0,14.7 L138.7,18.5 L145.2,22.1 L147.4,30.5 L148.9,26.1 L150.1,29.9 L152.5,29.0 L153.1,35.9 L162.9,32.4 L167.0,26.5 L172.9,30.7 L173.8,36.3 L185.7,35.8 L201.4,18.0 L210.5,23.9 L204.9,33.5 L206.0,38.2 L194.4,41.7 L196.0,45.4 L193.6,50.9 L187.7,52.9 L187.2,56.8 L181.6,54.8 L180.4,65.2 L182.8,72.6 L178.6,96.8 L176.2,101.2 L171.8,100.9 L170.7,108.7 L165.8,112.5 L159.6,105.3 L159.0,102.3 L161.3,102.7 L143.2,80.6 L132.5,94.0 L124.4,89.0 L107.3,89.5 L106.5,81.6 L103.5,78.2 L98.0,79.0 L98.3,76.2 L91.7,73.4 L93.8,70.1 L93.2,56.6 L97.8,49.1 L95.9,46.2 Z', fill: '#b8ddc8', label: { x: 143, y: 55.3 } },
    { id: '69', nom: 'Rhône',          path: 'M63.6,41.1 L66.8,31.4 L73.2,35.6 L77.8,32.3 L82.6,35.9 L84.1,31.7 L88.8,31.6 L90.0,35.3 L87.6,36.4 L92.3,39.4 L91.6,45.9 L97.8,48.7 L93.2,56.6 L93.8,70.1 L91.7,73.4 L98.3,76.2 L98.0,79.0 L103.5,78.2 L107.8,89.9 L122.4,88.8 L119.5,94.0 L126.7,102.1 L122.7,102.0 L117.1,112.2 L95.7,115.2 L103.6,121.8 L95.6,130.8 L91.1,126.1 L85.6,127.1 L87.7,117.5 L84.8,120.7 L82.3,116.6 L70.3,115.5 L61.8,105.4 L64.9,96.9 L60.3,93.9 L62.9,92.2 L64.3,83.3 L59.8,81.3 L58.3,78.1 L60.2,75.1 L51.8,67.4 L57.4,66.2 L52.3,61.0 L56.4,59.2 L58.3,51.6 L67.4,48.2 L63.6,41.1 Z', fill: '#c8d8c0', label: { x: 84.4, y: 82 } },
    { id: '42', nom: 'Loire',          path: 'M23.4,34.6 L22.6,41.8 L29.4,43.1 L30.8,47.1 L48.8,44.1 L54.8,48.6 L62.2,45.3 L63.6,41.1 L66.4,42.4 L64.2,44.4 L67.8,47.2 L66.0,51.0 L58.5,51.3 L56.4,59.2 L52.3,61.0 L56.9,64.4 L56.4,68.2 L51.8,67.4 L60.2,75.1 L58.3,78.1 L59.8,81.3 L64.3,83.3 L62.9,92.2 L60.3,93.9 L64.9,96.9 L61.8,105.4 L70.3,115.5 L82.3,116.6 L84.8,120.7 L88.0,117.8 L85.3,126.4 L92.6,127.0 L93.9,141.2 L82.4,147.5 L81.2,154.6 L73.5,157.0 L67.2,151.7 L61.7,153.3 L62.2,148.8 L59.0,146.7 L61.3,143.0 L50.8,138.5 L43.7,139.0 L44.3,141.3 L37.5,144.7 L33.4,143.0 L33.3,145.7 L27.4,139.9 L23.8,144.9 L22.5,137.8 L28.6,133.1 L30.4,126.0 L26.3,116.3 L17.1,110.0 L13.6,99.2 L6.0,91.4 L9.3,86.6 L8.3,82.0 L11.4,80.2 L6.4,75.0 L7.1,70.4 L17.6,67.0 L14.6,53.7 L15.9,47.6 L12.6,38.9 L23.4,34.6 Z', fill: '#c8d8c0', label: { x: 45.2, y: 98.8 } },
    { id: '07', nom: 'Ardèche',        path: 'M71.5,156.4 L79.8,155.5 L84.6,145.5 L95.3,142.5 L100.0,165.7 L97.8,169.4 L102.6,177.6 L100.5,183.1 L104.7,191.5 L99.4,205.5 L94.3,210.8 L95.8,224.5 L88.7,235.8 L89.4,247.3 L85.1,257.6 L85.1,269.5 L73.2,260.9 L69.1,261.4 L67.9,268.0 L64.2,267.1 L63.9,260.6 L58.5,261.6 L52.9,270.2 L42.1,261.7 L35.5,263.8 L35.0,255.4 L37.3,253.8 L30.6,245.8 L27.7,234.4 L23.8,231.8 L20.3,214.1 L25.5,211.0 L27.1,204.6 L33.8,203.8 L34.5,199.1 L44.6,198.9 L50.4,188.1 L57.5,187.2 L56.5,181.0 L63.1,179.2 L60.2,176.0 L64.6,171.8 L62.5,167.2 L69.3,170.1 L71.5,156.4 Z', fill: '#b8ddc8', label: { x: 66.7, y: 213.1 } },
    { id: '26', nom: 'Drôme',          path: 'M97.6,149.1 L113.6,143.7 L120.3,151.0 L125.3,149.1 L124.0,155.0 L127.1,154.1 L130.7,158.6 L127.8,159.4 L129.5,169.9 L125.2,175.4 L131.2,174.2 L145.8,180.0 L145.6,177.5 L153.8,174.2 L152.3,204.4 L154.0,204.8 L152.1,208.1 L159.7,211.3 L159.3,208.1 L167.8,216.6 L182.2,219.2 L179.2,224.7 L166.9,224.9 L167.4,229.6 L163.2,237.6 L168.8,242.4 L163.8,246.7 L151.8,242.7 L154.7,251.0 L148.5,251.5 L149.6,257.8 L154.5,261.6 L166.0,262.2 L164.1,265.3 L170.6,269.9 L170.6,278.4 L167.0,281.2 L169.9,284.1 L166.0,283.6 L163.6,278.8 L158.6,285.7 L151.5,287.3 L149.9,283.4 L145.6,283.0 L145.7,277.7 L143.3,276.1 L126.8,274.2 L127.9,264.3 L122.9,268.7 L119.0,265.1 L99.8,274.5 L95.9,263.8 L85.3,262.6 L86.6,250.8 L89.4,247.3 L88.7,235.8 L95.8,224.5 L94.3,210.8 L99.4,205.5 L104.7,191.5 L100.5,183.1 L102.6,177.6 L97.8,169.4 L100.0,165.7 L97.6,149.1 Z', fill: '#c8d8c0', label: { x: 127.5, y: 221.7 } },
    { id: '05', nom: 'Hautes-Alpes',   path: 'M217.9,169.2 L224.0,169.7 L226.5,175.8 L233.7,178.0 L236.6,177.4 L236.0,173.0 L238.5,171.3 L247.1,169.8 L252.0,181.8 L257.8,182.4 L258.3,195.1 L267.6,201.6 L273.2,200.0 L280.8,204.8 L278.8,208.7 L285.2,221.4 L277.8,220.4 L259.8,232.3 L252.5,237.8 L248.5,248.9 L235.0,248.3 L225.9,240.0 L223.4,246.9 L215.6,247.0 L218.1,252.9 L215.2,256.5 L209.3,247.1 L203.1,245.4 L202.7,249.9 L192.9,254.7 L188.5,261.7 L190.0,272.1 L185.4,266.6 L181.9,268.5 L189.0,278.9 L179.6,276.2 L169.9,278.9 L170.6,269.9 L164.1,265.3 L166.0,262.2 L154.5,261.6 L149.6,257.8 L148.5,251.5 L155.1,250.0 L152.3,248.7 L151.8,242.7 L163.8,246.7 L168.8,242.4 L163.2,237.6 L167.4,229.6 L166.9,224.9 L179.2,224.7 L182.5,220.3 L180.1,218.2 L182.2,212.2 L192.4,212.2 L194.8,209.7 L193.2,206.1 L198.9,203.0 L201.1,205.6 L207.4,199.9 L225.6,201.2 L226.0,190.9 L223.0,189.6 L223.1,184.2 L213.2,182.6 L216.6,175.7 L215.3,171.4 L217.9,169.2 Z', fill: '#b8ddc8', label: { x: 217.9, y: 223.5 } },
    { id: '73', nom: 'Savoie',         path: 'M262.5,92.9 L266.2,103.2 L278.9,109.1 L277.0,115.3 L278.8,125.0 L294.0,136.3 L288.0,145.7 L290.2,154.1 L284.7,159.5 L276.0,159.7 L274.5,164.0 L269.9,164.5 L269.9,168.0 L259.7,165.3 L248.3,171.2 L238.5,171.3 L236.0,173.0 L236.5,177.5 L226.5,175.8 L226.3,171.7 L220.0,171.1 L217.0,166.4 L208.3,165.9 L209.8,162.0 L207.2,150.7 L212.5,142.8 L207.0,132.9 L200.5,132.7 L193.6,126.4 L189.5,128.2 L189.0,138.3 L175.0,132.9 L165.4,113.3 L170.7,108.7 L171.8,100.9 L178.0,98.9 L182.5,74.1 L185.1,74.8 L186.0,86.3 L193.4,88.8 L195.9,96.4 L204.7,98.3 L205.0,94.8 L210.1,95.5 L215.2,104.2 L223.5,102.9 L226.3,94.0 L238.5,77.5 L243.6,81.2 L240.5,83.1 L242.5,88.0 L253.3,93.7 L253.2,98.8 L262.5,92.9 Z', fill: '#c8d8c0', label: { x: 232.7, y: 128 } },
    { id: '38', nom: 'Isère',          path: 'M165.4,112.2 L175.0,132.9 L189.0,138.3 L189.5,128.2 L194.4,126.4 L211.1,138.0 L211.8,146.6 L207.2,150.7 L209.8,162.0 L208.3,165.9 L218.3,167.7 L213.2,182.6 L223.1,184.2 L223.0,189.6 L226.0,190.9 L225.7,201.1 L207.4,199.9 L201.1,205.6 L198.9,203.0 L193.2,206.1 L194.8,209.7 L192.4,212.2 L182.2,212.2 L178.6,219.2 L167.4,216.4 L159.3,208.1 L159.7,211.3 L151.8,207.5 L154.0,204.8 L152.3,204.4 L153.8,174.2 L145.6,177.5 L145.8,180.0 L131.2,174.2 L127.0,176.3 L125.2,174.7 L129.8,167.7 L127.8,159.4 L130.7,158.6 L127.1,154.1 L124.0,155.0 L125.3,149.1 L120.3,151.0 L113.6,143.7 L104.1,149.3 L94.3,145.7 L93.9,130.9 L103.6,121.8 L95.7,115.2 L117.1,112.2 L119.1,106.0 L127.2,101.1 L119.5,94.0 L122.4,88.8 L132.7,93.9 L143.2,80.6 L161.3,102.7 L159.0,102.3 L159.6,105.3 L165.4,112.2 Z', fill: '#5a9e78', label: { x: 161.4, y: 153.2 } },
  ];

  return (
    <div style={{ marginTop: '18px' }}>
      <svg viewBox="0 0 300 293.3" width="100%" style={{ maxWidth: '260px', display: 'block' }}>
        {depts.map(d => (
          <g key={d.id}>
            <path d={d.path} fill={d.fill} stroke="#fff" strokeWidth="1.4"/>
            <text x={d.label.x} y={d.label.y} textAnchor="middle"
              fontSize={d.id === '38' ? '15' : '11'}
              fill={d.id === '38' ? '#fff' : 'var(--text)'}
              fontFamily="var(--font-display)" fontWeight={d.id === '38' ? '700' : '400'}>
              {d.nom}
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

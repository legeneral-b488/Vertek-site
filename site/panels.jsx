/* panels.jsx — Onglets services : Immobilier · Inspection & Diagnostic */

const TVA = 'HT — TVA non applicable, art. 293 B du CGI';

/* ── IMMOBILIER (LUXE) ── */
function PanelImmo() {
  const packs = [
    {
      name: 'Essentiel',
      price: '50 €',
      items: ['5 photos aériennes retouchées', 'Livraison sous 48h', 'Fichiers haute résolution'],
    },
    {
      name: 'Type',
      price: '80 €',
      feat: true,
      tag: 'Le plus demandé',
      items: ['10 photos aériennes retouchées (à peu près)', '1 vidéo aérienne montée (~60 s)', 'Livraison sous 48h'],
    },
    {
      name: 'Signature',
      price: '150 €',
      items: ['15 photos aériennes retouchées (à peu près)', 'Plusieurs vidéos montées', 'Visite guidée aérienne', 'Livraison express 24h'],
    },
  ];

  return (
    <div className="lux svc-panel" id="panel-immo">
      <div style={{ padding: '72px 5vw 0', maxWidth: '1160px', margin: '0 auto' }}>
        <div className="lux-lbl">Immobilier · Luxe</div>
        <h2 className="lux-title">Valorisez<br />votre bien</h2>
        <div className="lux-rule" />
        <p className="lux-sub">
          Des prises de vue qui transforment une annonce en expérience visuelle.
          Photos retouchées et vidéos cinématographiques pour vendre plus vite et plus cher.
        </p>
      </div>

      <div className="lux-grid" style={{ padding: '0 5vw' }}>
        {packs.map((p, i) => (
          <div key={i} className={`lux-card${p.feat ? ' feat' : ''}`}>
            {p.feat && <div className="lux-tag">{p.tag}</div>}
            <div className="lux-name">{p.name}</div>
            <div className="lux-price">{p.price}</div>
            <div className="lux-tva">{TVA}</div>
            <div className="lux-inc">
              {p.items.map((x, j) => (
                <span key={j}>
                  <span className="ck"><Chk /></span>{x}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '28px' }}>
              <a href="#contact" className="btn btn-gold" style={{ fontSize: '12px', padding: '11px 22px', width: '100%', justifyContent: 'center' }}>
                Demander un devis <Arr />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="lux-remise" style={{ padding: '0 5vw 72px' }}>
        <div className="lux-remise-title">Remise Volume</div>
        <p className="lux-remise-sub">Pour les agences et promoteurs avec un flux régulier de biens.</p>
        <div className="lux-remise-grid">
          <div style={{ textAlign: 'center' }}>
            <div className="lux-pct">−15%</div>
            <div className="lux-pct-lbl">5 à 9 biens / mois</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="lux-pct">−25%</div>
            <div className="lux-pct-lbl">10 biens / mois et plus</div>
          </div>
        </div>
        <div className="lux-footer-tva">Vous travaillez en volume ? <a href="#contact" style={{ color: 'var(--gold)' }}>Contactez-nous</a> pour un contrat-cadre mensuel.</div>
      </div>
    </div>
  );
}

/* ── INSPECTION & DIAGNOSTIQUE ── */
function PanelInsp() {
  const RATE_SURFACE = 0.15;

  const [forfaitIdx,    setForfaitIdx]    = React.useState(0);
  const [videoSelected, setVideoSelected] = React.useState(false);
  const [metric,        setMetric]        = React.useState('surface'); // 'surface' | 'ouvrages'
  const [surface,       setSurface]       = React.useState('');
  const [nbOuvrages,    setNbOuvrages]    = React.useState('');

  const forfaits = [
    { name: 'Repérage',          price: 120,  desc: 'Photos HD + rapport de reconnaissance, au choix en photos brutes ou en fichier standardisé simple.', hasVideo: true },
    { name: 'Diagnostic',        price: 290,  desc: 'Photos HD + vidéo incluse + rapport structuré annoté.', rec: true },
    { name: 'Suivi de chantier', price: null, desc: 'Accompagnement récurrent — prix défini au cas par cas.' },
  ];

  const f        = forfaits[forfaitIdx];
  const isDevis  = f.price === null;
  const surfaceVal  = parseFloat(surface) || 0;
  const ouvragesVal = parseInt(nbOuvrages) || 0;

  const videoPrice   = (f.hasVideo && !isDevis && videoSelected) ? 50 : 0;
  const surfacePrice = (!isDevis && metric === 'surface') ? Math.round(surfaceVal * RATE_SURFACE * 100) / 100 : 0;
  const ouvragesQuote = !isDevis && metric === 'ouvrages' && ouvragesVal > 0;
  const total        = !isDevis ? (f.price + videoPrice + surfacePrice) : 0;

  const fmt = n => Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');

  const lines = [];
  if (!isDevis) {
    lines.push({ lbl: f.name, val: `${f.price} €` });
    if (videoPrice > 0) lines.push({ lbl: 'Vidéo (option)', val: `+${videoPrice} €` });
    if (surfacePrice > 0) lines.push({ lbl: `Surface (${fmt(surfaceVal)} m²)`, val: `+${fmt(surfacePrice)} €` });
    if (ouvragesQuote) lines.push({ lbl: `Nombre d'ouvrages (${ouvragesVal})`, val: 'Sur devis' });
  }

  const mailBody = [
    `Prestation : ${f.name}${isDevis ? ' (sur devis)' : ` (${f.price} €)`}`,
    videoPrice > 0 ? 'Vidéo (option) : +50 €' : null,
    surfacePrice > 0 ? `Surface totale : ${fmt(surfaceVal)} m² (+${fmt(surfacePrice)} €)` : null,
    ouvragesQuote ? `Nombre d'ouvrages : ${ouvragesVal} (tarif sur devis)` : null,
    isDevis ? 'Estimation : sur devis' : `Estimation totale : ${fmt(total)} € HT${ouvragesQuote ? ' + tarif ouvrages sur devis' : ''}`,
  ].filter(Boolean).join('\n');

  const mailHref = `mailto:vertek.contact@gmail.com?subject=${encodeURIComponent('Demande de devis - Inspection & Diagnostic')}&body=${encodeURIComponent(mailBody)}`;

  const inputStyle = {
    flex: 1, background: 'var(--bg)', border: '1px solid var(--border)',
    padding: '9px 12px', fontSize: '15px', color: 'var(--text)',
    outline: 'none', fontFamily: 'inherit', minWidth: 0,
  };
  const blockStyle = {
    background: 'var(--bg3)', border: '1px solid var(--border)',
    padding: '14px 18px', marginBottom: '10px',
  };
  const subLblStyle = {
    fontFamily: 'var(--font-display)', letterSpacing: '.05em',
    textTransform: 'uppercase', fontSize: '11px',
    color: 'var(--muted)', marginBottom: '8px',
  };
  const metricBtnStyle = active => ({
    flex: 1, padding: '10px 12px', fontSize: '12px', fontFamily: 'var(--font-display)',
    letterSpacing: '.04em', textTransform: 'uppercase', cursor: 'pointer',
    background: active ? 'var(--steel)' : 'var(--bg)', color: active ? '#fff' : 'var(--muted)',
    border: `1px solid ${active ? 'var(--steel)' : 'var(--border)'}`, transition: 'all .15s',
  });

  return (
    <div className="insp svc-panel sec" id="panel-insp">
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <div className="sec-lbl">Inspection &amp; Diagnostique</div>
        <h2 className="sec-title">Expertise technique<br />par drone</h2>
        <div className="insp-disclaim">
          Les images et rapports fournis constituent un complément visuel à votre expertise —
          ils ne remplacent pas un rapport d'ingénierie ni une inspection structurelle certifiée.
        </div>
      </div>

      <div className="insp-grid">
        <div>
          <div className="insp-block-lbl">1 · Prestation de base</div>
          <div className="insp-forfaits">
            {forfaits.map((fi, i) => {
              const selected = forfaitIdx === i;
              return (
                <div key={i} className={`insp-f${selected ? ' sel' : ''}`}
                  onClick={() => { setForfaitIdx(i); if (!fi.hasVideo) setVideoSelected(false); }}>
                  {fi.rec && <div className="insp-reco">Recommandé</div>}
                  <div className="insp-dot"><i /></div>
                  <div style={{ flex: 1 }}>
                    <div className="insp-fhead">
                      <span className="insp-fname">{fi.name}</span>
                      <span className="insp-fprice">{fi.price !== null ? `${fi.price} €` : 'Sur devis'}</span>
                    </div>
                    <div className="insp-fdesc">{fi.desc}</div>
                    {fi.hasVideo && (
                      <span
                        onClick={selected ? (e) => { e.stopPropagation(); setVideoSelected(v => !v); } : undefined}
                        style={{
                          display: 'inline-block', marginTop: '9px', fontSize: '11.5px',
                          fontFamily: 'var(--font-display)', letterSpacing: '.03em',
                          color: selected ? (videoSelected ? '#fff' : 'var(--steel)') : 'var(--muted)',
                          background: selected && videoSelected ? 'var(--steel)' : 'transparent',
                          border: `1px solid ${selected ? 'rgba(74,122,150,.5)' : 'var(--border)'}`,
                          padding: '3px 9px', cursor: selected ? 'pointer' : 'default',
                          transition: 'all .15s',
                        }}>
                        {selected && videoSelected ? '✓ ' : ''}Option vidéo +50 €
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="insp-block-lbl" style={{ marginTop: '34px' }}>2 · Calcul du devis</div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <button type="button" onClick={() => setMetric('surface')} style={metricBtnStyle(metric === 'surface')}>Surface totale</button>
            <button type="button" onClick={() => setMetric('ouvrages')} style={metricBtnStyle(metric === 'ouvrages')}>Nombre d'ouvrages</button>
          </div>

          {metric === 'surface' ? (
            <div style={{ ...blockStyle }}>
              <div style={subLblStyle}>
                Surface totale <span style={{ color: 'rgba(74,122,150,.8)', fontWeight: 600 }}>+0,15 €/m²</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="number" min="0" placeholder="ex. 1600"
                  value={surface} onChange={e => setSurface(e.target.value)}
                  style={inputStyle} />
                <span style={{ color: 'var(--muted)', fontSize: '13px', whiteSpace: 'nowrap' }}>m²</span>
                {surfacePrice > 0 && <span className="o-price">+{fmt(surfacePrice)} €</span>}
              </div>
            </div>
          ) : (
            <div style={{ ...blockStyle }}>
              <div style={subLblStyle}>
                Nombre d'ouvrages <span style={{ color: 'rgba(74,122,150,.8)', fontWeight: 600 }}>Tarif sur devis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="number" min="0" placeholder="ex. 3"
                  value={nbOuvrages} onChange={e => setNbOuvrages(e.target.value)}
                  style={inputStyle} />
                <span style={{ color: 'var(--muted)', fontSize: '13px', whiteSpace: 'nowrap' }}>ouvrage(s)</span>
                {ouvragesQuote && <span className="o-price" style={{ color: 'var(--muted)' }}>Sur devis</span>}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="insp-sum">
            <div className="insp-sum-lbl">Estimation indicative</div>
            {isDevis
              ? <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#8ec3e0', lineHeight: 1, letterSpacing: '-.01em', paddingBottom: '6px' }}>Sur devis</div>
              : <div className="insp-total">{fmt(total)} <small>€ HT</small></div>
            }
            <div className="insp-sum-lines">
              {lines.map((l, i) => (
                <div key={i} className="insp-line">
                  <span>{l.lbl}</span>
                  <span>{l.val}</span>
                </div>
              ))}
            </div>
            <a href={mailHref} className="btn btn-steel" style={{ width: '100%', justifyContent: 'center', marginTop: '18px' }}>
              Demander ce devis <Arr />
            </a>
            <div className="insp-sum-note">
              À titre indicatif — un devis est nécessaire.<br />
              {TVA}
            </div>
          </div>
        </div>
      </div>

      <div className="insp-bas">
        <div className="insp-block-lbl">Bon à savoir</div>
        <div className="insp-bas-grid">
          <div className="insp-bas-card">
            <h5>Déplacement</h5>
            <p>Frais kilométriques de 0,15 €/km à prévoir au-delà de 20 km parcourus.</p>
          </div>
          <div className="insp-bas-card">
            <h5>Conditions météo</h5>
            <p>Vol annulé si vent &gt; 10 m/s, pluie ou visibilité insuffisante. Reprogrammation sans frais sous 48h.</p>
          </div>
          <div className="insp-bas-card">
            <h5>Droits d'usage</h5>
            <p>Cession complète des droits d'utilisation des images pour votre usage professionnel.</p>
          </div>
          <div className="insp-bas-card">
            <h5>Autorisation</h5>
            <p>Nous gérons les autorisations de vol nécessaires (DGAC, préfecture). Vous fournissez l'accès au site.</p>
          </div>
        </div>
        <div className="insp-tva">{TVA}</div>
      </div>
    </div>
  );
}

/* ── SERVICES (TABS) ── */
function Services() {
  const [active, setActive] = React.useState(0);

  const tabs = [
    { label: 'Immobilier',              hint: 'Photo · Vidéo · Luxe',      color: '#cfae6a', panel: <PanelImmo /> },
    { label: 'Inspection & Diagnostic', hint: 'Ouvrage · Façade · Toiture', color: '#4a7a96', panel: <PanelInsp /> },
  ];

  const scrollToPanel = () => {
    const el = document.getElementById('services-content');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="services">
      <div className="svc-tabs">
        {tabs.map((t, i) => (
          <button
            key={i}
            className={`svc-tab${active === i ? ' active' : ''}`}
            style={{ '--c': t.color }}
            onClick={() => { setActive(i); scrollToPanel(); }}
          >
            <span className="t-name">{t.label}</span>
            <span className="t-hint">{t.hint}</span>
          </button>
        ))}
      </div>
      <div id="services-content">
        {tabs[active].panel}
      </div>
    </section>
  );
}

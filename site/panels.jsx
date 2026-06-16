/* panels.jsx — Onglets services : Immobilier · Inspection · Sinistre */

const TVA = 'HT — TVA non applicable, art. 293 B du CGI';

/* ── IMMOBILIER (LUXE) ── */
function PanelImmo() {
  const packs = [
    {
      name: 'Essentiel',
      items: ['5 photos aériennes retouchées', 'Livraison sous 48h', 'Fichiers haute résolution'],
    },
    {
      name: 'Type',
      feat: true,
      tag: 'Le plus demandé',
      items: ['10 photos aériennes retouchées', '1 vidéo aérienne montée (~60 s)', 'Musique libre de droits', 'Livraison sous 48h'],
    },
    {
      name: 'Signature',
      items: ['15 photos aériennes retouchées', 'Plusieurs vidéos montées', 'Visite guidée aérienne', 'Livraison express 24h'],
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
  const [forfait, setForfait] = React.useState(1);
  const [opts, setOpts] = React.useState({ pano: false, visite: false, mesures: false, express: false });

  const forfaits = [
    { name: 'Repérage',          price: 150, desc: 'Survol complet, photos HD, rapport de reconnaissance.' },
    { name: 'Diagnostic',        price: 250, desc: 'Rapport structuré avec annotations, livrables haute résolution.', rec: true },
    { name: 'Suivi de Chantier', price: 450, desc: 'Visites récurrentes avec comparatifs visuels datés.' },
  ];

  const options = [
    { key: 'pano',    label: 'Panorama 360°',        price: 70  },
    { key: 'visite',  label: 'Visite virtuelle',      price: 120 },
    { key: 'mesures', label: 'Relevé de mesures',     price: 50  },
    { key: 'express', label: 'Intervention express',  price: 100 },
  ];

  const total = forfaits[forfait].price + options.filter(o => opts[o.key]).reduce((s, o) => s + o.price, 0);

  const toggle = k => setOpts(prev => ({ ...prev, [k]: !prev[k] }));

  const lines = [
    { lbl: forfaits[forfait].name, val: `${forfaits[forfait].price} €` },
    ...options.filter(o => opts[o.key]).map(o => ({ lbl: o.label, val: `+${o.price} €` })),
  ];

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
          <div className="insp-block-lbl">Choisissez votre forfait</div>
          <div className="insp-forfaits">
            {forfaits.map((f, i) => (
              <div key={i} className={`insp-f${forfait === i ? ' sel' : ''}`} onClick={() => setForfait(i)}>
                {f.rec && <div className="insp-reco">Recommandé</div>}
                <div className="insp-dot"><i /></div>
                <div style={{ flex: 1 }}>
                  <div className="insp-fhead">
                    <span className="insp-fname">{f.name}</span>
                    <span className="insp-fprice">{f.price} €</span>
                  </div>
                  <div className="insp-fdesc">{f.desc}</div>
                  <span className="insp-fkeep">Fichiers inclus</span>
                </div>
              </div>
            ))}
          </div>

          <div className="insp-block-lbl" style={{ marginTop: '34px' }}>Options à la carte</div>
          <div className="insp-opts">
            {options.map(o => (
              <label key={o.key} className="insp-opt" onClick={() => toggle(o.key)}>
                <input type="checkbox" readOnly checked={!!opts[o.key]} />
                {o.label}
                <span className="o-price">+{o.price} €</span>
              </label>
            ))}
            <div className="insp-opt devis" style={{ cursor: 'default' }}>
              Thermographie IR / LIDAR
              <span className="o-price">Sur devis</span>
            </div>
            <div className="insp-opt devis" style={{ cursor: 'default' }}>
              Cartographie orthophotographique
              <span className="o-price">Sur devis</span>
            </div>
          </div>
        </div>

        <div>
          <div className="insp-sum">
            <div className="insp-sum-lbl">Estimation</div>
            <div className="insp-total">{total} <small>€ HT</small></div>
            <div className="insp-sum-lines">
              {lines.map((l, i) => (
                <div key={i} className="insp-line">
                  <span>{l.lbl}</span>
                  <span>{l.val}</span>
                </div>
              ))}
            </div>
            <a href={`#contact`} className="btn btn-steel" style={{ width: '100%', justifyContent: 'center', marginTop: '18px' }}>
              Demander ce devis <Arr />
            </a>
            <div className="insp-sum-note">{TVA} · Déplacement inclus Isère &amp; limitrophes</div>
          </div>
        </div>
      </div>

      <div className="insp-bas">
        <div className="insp-block-lbl">Bon à savoir</div>
        <div className="insp-bas-grid">
          <div className="insp-bas-card">
            <h5>Déplacement</h5>
            <p>Inclus dans un rayon de 50 km autour de Villefontaine (38). Au-delà : forfait kilométrique sur devis.</p>
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

/* ── SINISTRE ── */
function PanelSin({ urgencePulse }) {
  const preEtat = [
    { taille: 'Bâtiment individuel (< 200 m²)', price: '120 €' },
    { taille: 'Bâtiment collectif / commercial',  price: '150 €' },
    { taille: 'Grande surface / site industriel', price: '180 €' },
  ];

  const expertises = [
    { label: 'Standard', delai: '72h',           price: '120 €' },
    { label: 'Urgent',   delai: '24h',           price: '250 €' },
    { label: 'Immédiat', delai: 'Même journée',  price: '350 €' },
  ];

  return (
    <div className="sin svc-panel sec" id="panel-sin">
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <div className="sec-lbl">Expertise Sinistre</div>
        <h2 className="sec-title">Intervention rapide<br />sur site</h2>
        <p className="sec-sub">
          Grêle, inondation, incendie, impact — nous documentons les dommages depuis les airs
          pour accélérer votre dossier d'assurance.
        </p>
      </div>

      <div className="sin-grid">
        {/* Pré-état des lieux */}
        <div className="sin-card">
          <div className="sin-num">01 · Audit préventif</div>
          <h3 className="sin-h">Pré-état des lieux &amp; Audit de risque</h3>
          <p className="sin-body">
            Bilan visuel aérien avant un sinistre ou en prévention. Idéal pour les assureurs, syndics
            et gestionnaires de patrimoine souhaitant documenter l'état initial d'un bâtiment.
          </p>
          <div className="sin-table">
            {preEtat.map((r, i) => (
              <div key={i} className="sin-row">
                <span>{r.taille}</span>
                <b>{r.price}</b>
              </div>
            ))}
          </div>
          <p className="sin-note">{TVA} · Rapport photos HD inclus</p>
          <div style={{ marginTop: '24px' }}>
            <a href="#contact" className="btn btn-steel">Demander un devis <Arr /></a>
          </div>
        </div>

        {/* Expertise urgente */}
        <div className={`sin-card sin-urgent`} style={{ animation: urgencePulse ? undefined : 'none' }}>
          <div className="sin-badge">
            <span className="dot" />
            Intervention urgente
          </div>
          <div className="sin-num" style={{ marginTop: '8px' }}>02 · Post-sinistre</div>
          <h3 className="sin-h">Expertise Sinistre</h3>
          <p className="sin-body">
            Documentation photographique et vidéo des dommages après sinistre.
            Rapport structuré transmissible directement à votre assurance.
          </p>
          <div className="sin-table">
            {expertises.map((e, i) => (
              <div key={i} className="sin-row">
                <span>{e.label} — {e.delai}</span>
                <b>{e.price}</b>
              </div>
            ))}
          </div>
          <p className="sin-note">{TVA} · Disponible 7j/7</p>
        </div>
      </div>

      {/* Appel direct */}
      <div className="sin-call">
        <div>
          <div className="sin-call-h">Urgence ? Appelez directement</div>
          <div className="sin-call-sub">Disponible 7j/7 — réponse immédiate pour les interventions post-sinistre.</div>
        </div>
        <a href="tel:+33695742516" className="sin-tel">
          <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
            <path d="M4 2h4l2 5-2.5 1.5a11 11 0 005 5L14 11l5 2v4a2 2 0 01-2 2C7.2 19 1 12.8 1 5a2 2 0 012-2h1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          06 95 74 25 16
        </a>
      </div>

      <div className="sin-tva">{TVA}</div>
    </div>
  );
}

/* ── SERVICES (TABS) ── */
function Services({ urgencePulse }) {
  const [active, setActive] = React.useState(0);

  const tabs = [
    { label: 'Immobilier',              hint: 'Photo · Vidéo · Luxe',      color: '#cfae6a', panel: <PanelImmo /> },
    { label: 'Inspection & Diagnostic', hint: 'Ouvrage · Façade · Toiture', color: '#4a7a96', panel: <PanelInsp /> },
    { label: 'Sinistre',                hint: 'Urgent · 7j/7',              color: '#c0392b', panel: <PanelSin urgencePulse={urgencePulse} /> },
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

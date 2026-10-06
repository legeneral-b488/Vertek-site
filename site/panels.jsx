/* panels.jsx — Services : Immobilier */

const TVA = 'HT — TVA non applicable, art. 293 B du CGI';

/* ── IMMOBILIER (LUXE) ── */
function PanelImmo() {
  const packs = [
    {
      name: 'Essentielle',
      price: '50 €',
      items: ['Une dizaine de photos aériennes'],
    },
    {
      name: 'Type',
      price: '70 €',
      feat: true,
      tag: 'Le plus demandé',
      items: ['Une dizaine de photos aériennes', '1 vidéo aérienne montée'],
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

/* ── SERVICES ── */
function Services() {
  return (
    <section id="services">
      <PanelImmo />
    </section>
  );
}

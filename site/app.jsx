/* app.jsx — Assemblage + Tweaks + Rendu */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scannerVisible": true
}/*EDITMODE-END*/;

/* ── TWEAKS PANEL ── */
function TweaksPanel({ tweaks, setTweaks, visible, onClose }) {
  if (!visible) return null;

  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
  };

  const Row = ({ label, k }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</span>
      <button
        onClick={() => set(k, !tweaks[k])}
        style={{
          fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase',
          padding: '5px 12px', background: tweaks[k] ? 'var(--green)' : 'transparent',
          color: tweaks[k] ? '#fff' : 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all .2s',
        }}>
        {tweaks[k] ? 'Actif' : 'Masqué'}
      </button>
    </div>
  );

  return (
    <div className="tweaks-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 17px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>Tweaks</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}>✕</button>
      </div>
      <div style={{ padding: '17px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Row label="Drone scanner" k="scannerVisible" />
      </div>
    </div>
  );
}

/* ── APP ── */
function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle('no-scan', !tweaks.scannerVisible);
  }, [tweaks]);

  React.useEffect(() => {
    const h = e => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', h);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', h);
  }, []);

  return (
    <>
      <Nav />
      <Hero scannerActive={tweaks.scannerVisible} />
      <Services />
      <About />
      <Why />
      <Portfolio />
      <Contact />
      <Footer />
      <TweaksPanel
        tweaks={tweaks}
        setTweaks={setTweaks}
        visible={tweaksVisible}
        onClose={() => {
          setTweaksVisible(false);
          window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
        }}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

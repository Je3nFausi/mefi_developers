/**
 * MEFI Sovereign Terminal — Behavioral Financial Identity Infrastructure
 * mefi.global · @mefiglobal
 * 
 * Brand: Substrate. Not app. Not fintech. Not credit bureau.
 */

import { useState, useEffect } from 'react';

const MEFISovereignTerminal = () => {
  const [telemetry, setTelemetry] = useState({
    ingressRate: 1204,
    profilesTotal: 2847391,
    apiQueriesSec: 1204,
    ci: 0.847,
    lsi: 0.923,
    tps: 0.761,
    eic: 0.889,
    ari: 0.834,
    eds: 0.712,
    ttg: 0.043
  });

  const [moatWidths, setMoatWidths] = useState({ mefi: 0, entrant3: 0, entrant5: 0, entrant7: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMoatWidths({ mefi: 100, entrant3: 62, entrant5: 48, entrant7: 34 });
    }, 200);

    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        ingressRate: prev.ingressRate + Math.floor(Math.random() * 30) - 10,
        profilesTotal: prev.profilesTotal + Math.floor(Math.random() * 500),
        ci: Math.min(0.95, +(prev.ci + (Math.random() - 0.5) * 0.003).toFixed(3))
      }));
    }, 4000);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const indices = [
    { code: 'CI', name: 'Consistency Index', val: telemetry.ci, ttg: '+0.018/mo', health: 'NOMINAL', accent: '#1a9e78' },
    { code: 'LSI', name: 'Liquidity Stability', val: telemetry.lsi, ttg: '+0.009/mo', health: 'NOMINAL', accent: '#1a9e78' },
    { code: 'TPS', name: 'Trust Propagation', val: telemetry.tps, ttg: '+0.031/mo', health: 'NOMINAL', accent: '#1a9e78' },
    { code: 'EIC', name: 'Economic Coherence', val: telemetry.eic, ttg: '+0.006/mo', health: 'NOMINAL', accent: '#1a9e78' },
    { code: 'ARI', name: 'Adaptive Resilience', val: telemetry.ari, ttg: '+0.043/mo', health: 'NOMINAL', accent: '#1a9e78' },
    { code: 'EDS', name: 'Ecosystem Depth', val: telemetry.eds, ttg: '+0.021/mo', health: 'ELEVATED', accent: '#c8a010' },
    { code: 'TTG', name: 'Temporal Gradient', val: Math.abs(telemetry.ttg), ttg: 'STRENGTHENING', health: 'NOMINAL', accent: '#1a9e78' }
  ];

  const architectureLayers = [
    { num: '01', title: 'SIGNAL INGESTION LAYER', desc: 'Schema-agnostic adapter network. Ingest from M-Pesa Daraja, Airtel Money, MTN MoMo, USSD flat-files, POS ISO 8583, utility CSV, supply chain APIs.', tag: 'ANY SOURCE', active: false },
    { num: '02', title: 'BEHAVIORAL INFERENCE ENGINE', desc: 'Proprietary ML stack: temporal models, causal inference, Behavioral Signal Graph. Computes all Seven Behavioral Indices in real time.', tag: 'CORE IP', active: true },
    { num: '03', title: 'MEFI IDENTITY LAYER', desc: 'Outputs the MEFI Profile: cryptographically signed (Ed25519), multi-dimensional, continuously updating. Not a score.', tag: 'THE PROFILE', active: false },
    { num: '04', title: 'TRUST API', desc: 'Context-specific behavioral signal interface. Returns a structured BehavioralSignal — not a number. Never a number.', tag: 'THE INTERFACE', active: false },
    { num: '05', title: 'ECOSYSTEM INTEGRATION LAYER', desc: 'White-label SDKs, enterprise licensing, developer portal. Banks build on MEFI\'s identity rails.', tag: 'THE NETWORK', active: false }
  ];

  return (
    <div className="mefi-terminal">
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --void: #050505; --substrate: #080c0a; --cell: #0c1009; --cell2: #111810;
          --teal: #1a9e78; --teal-dim: #0d5c46; --teal-ghost: #0a3329;
          --gold: #c8a010; --gold-dim: #7a6008;
          --text: #d8e0d0; --text-dim: #6a7868; --text-ghost: #2a3028;
          --border: rgba(255,255,255,0.06); --border-active: rgba(26,158,120,0.3);
          --mono: 'IBM Plex Mono', monospace; --sans: 'IBM Plex Sans', sans-serif;
        }
        body { background: var(--void); font-family: var(--mono); }
        .mefi-terminal { background: var(--void); min-height: 100vh; }
        
        /* Background effects */
        .ghost-layer { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.018; }
        .ghost-layer pre { position: absolute; font-family: var(--mono); font-size: 10px; color: #1a9e78; }
        .grid-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(rgba(26,158,120,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,158,120,.03) 1px, transparent 1px); background-size: 48px 48px; }
        @keyframes scan { 0% { top: -2px; } 100% { top: 100vh; } }
        .scanline { position: fixed; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(26,158,120,.07), transparent); animation: scan 9s linear infinite; pointer-events: none; z-index: 1; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        
        .terminal { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        
        /* Navigation */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; border-bottom: 1px solid var(--border); background: ${scrolled ? 'rgba(5,5,5,0.98)' : 'transparent'}; backdrop-filter: blur(20px); transition: background 0.3s; }
        .nav-inner { max-width: 1280px; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
        .nav-id { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .nav-logo { width: 28px; height: 28px; border: 1px solid var(--teal-dim); display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--teal); }
        .nav-title { font-size: 12px; letter-spacing: 3px; color: var(--text); }
        .nav-sub { font-size: 9px; letter-spacing: 2px; color: var(--text-dim); margin-top: 1px; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); animation: pulse 2.4s ease-in-out infinite; }
        .status-txt { font-size: 9px; letter-spacing: 2px; color: var(--teal-dim); }
        .nav-links { display: flex; gap: 24px; align-items: center; }
        .nav-link { font-size: 9px; letter-spacing: 2px; color: var(--text-dim); cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: var(--teal); }
        .nav-btn { font-size: 9px; letter-spacing: 2px; border: 1px solid var(--teal-dim); color: var(--teal); padding: 7px 16px; cursor: pointer; background: transparent; transition: all 0.2s; }
        .nav-btn:hover { background: var(--teal-ghost); border-color: var(--teal); }
        
        /* Ticker */
        .ticker { position: fixed; top: 53px; left: 0; right: 0; z-index: 99; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: rgba(8,12,9,0.95); backdrop-filter: blur(10px); padding: 8px 0; overflow: hidden; }
        .ticker-inner { display: flex; gap: 48px; width: max-content; animation: marquee 30s linear infinite; }
        .tick { font-size: 9px; letter-spacing: 1.5px; color: var(--text-dim); white-space: nowrap; }
        .tick span { color: var(--teal); }
        
        /* Hero */
        .hero { padding: 160px 0 80px; }
        .hero-ref { font-size: 9px; letter-spacing: 3px; color: var(--teal-dim); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .hero-ref-line { width: 24px; height: 1px; background: var(--teal-dim); }
        .hero-h1 { font-family: var(--sans); font-size: clamp(36px, 5.5vw, 72px); font-weight: 300; line-height: 1.0; letter-spacing: -1px; color: var(--text); margin-bottom: 8px; }
        .hero-h1 em { font-style: normal; color: var(--teal); }
        .hero-h2 { font-family: var(--sans); font-size: clamp(36px, 5.5vw, 72px); font-weight: 300; line-height: 1.0; letter-spacing: -1px; color: var(--text-dim); margin-bottom: 40px; }
        .hero-corpus { font-size: 12px; color: var(--text-dim); max-width: 480px; line-height: 1.8; margin-bottom: 12px; }
        .hero-mandate { font-size: 10px; letter-spacing: 1px; color: rgba(26,158,120,0.45); line-height: 1.9; max-width: 480px; margin-bottom: 48px; }
        .hero-ctas { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .btn-primary { font-size: 9px; letter-spacing: 2px; background: var(--teal); color: #050505; border: none; padding: 12px 28px; cursor: pointer; font-family: var(--mono); font-weight: 500; transition: all 0.2s; }
        .btn-primary:hover { background: var(--teal-dim); color: var(--text); }
        .btn-ghost { font-size: 9px; letter-spacing: 2px; background: transparent; color: var(--text-dim); border: 1px solid var(--border); padding: 12px 28px; cursor: pointer; font-family: var(--mono); transition: all 0.2s; }
        .btn-ghost:hover { border-color: var(--teal-dim); color: var(--text); }
        .hero-classify { font-size: 9px; letter-spacing: 2px; color: var(--text-ghost); }
        
        /* Stats */
        .stats-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 64px; }
        .stat-cell { border: 1px solid var(--border); padding: 20px; background: var(--cell); }
        .stat-val { font-family: var(--sans); font-size: 28px; font-weight: 300; color: var(--teal); margin-bottom: 6px; }
        .stat-lbl { font-size: 9px; letter-spacing: 1.5px; color: var(--text-dim); }
        
        /* Sections */
        .section { padding: 80px 0; }
        .section-hdr { margin-bottom: 40px; }
        .sec-label { font-size: 9px; letter-spacing: 3px; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 8px; }
        .section-line { height: 1px; background: var(--border); margin-bottom: 20px; }
        .data-cell { border: 1px solid var(--border); background: var(--cell); position: relative; }
        .data-cell::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--teal-dim), transparent); opacity: 0.4; }
        .cell-hdr { font-size: 9px; letter-spacing: 2px; color: var(--text-dim); padding: 10px 14px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .cell-hdr-tag { font-size: 8px; letter-spacing: 1.5px; padding: 2px 6px; border: 1px solid var(--border-active); color: var(--teal-dim); }
        
        /* System Grid */
        .sys-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 1px; }
        .sys-cell { border: 1px solid var(--border); padding: 16px; background: var(--cell2); }
        .sys-name { font-size: 9px; letter-spacing: 2px; color: var(--text-dim); margin-bottom: 12px; }
        .sys-val { font-family: var(--sans); font-size: 22px; font-weight: 300; color: var(--text); margin-bottom: 4px; }
        .sys-sub { font-size: 9px; color: var(--text-dim); letter-spacing: 1px; }
        .sys-indicator { display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; }
        .sys-dot-teal { width: 5px; height: 5px; border-radius: 50%; background: var(--teal); animation: pulse 2s ease-in-out infinite; }
        .sys-status-ok { font-size: 8px; letter-spacing: 2px; color: var(--teal); }
        .bar-track { height: 2px; background: rgba(255,255,255,0.05); margin-top: 8px; overflow: hidden; }
        .bar-fill { height: 100%; background: var(--teal); transition: width 2s cubic-bezier(0.16,1,0.3,1); width: 0%; }
        
        /* Indices Grid */
        .indices-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; margin-top: 1px; }
        @media (max-width: 900px) { .indices-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 600px) { .indices-grid { grid-template-columns: repeat(2, 1fr); } }
        .idx-cell { border: 1px solid var(--border); padding: 16px 12px; background: var(--cell); position: relative; transition: border-color 0.3s; }
        .idx-cell:hover { border-color: var(--border-active); }
        .idx-cell::before { content: ''; position: absolute; left: 0; top: 0; width: 2px; height: 100%; background: var(--accent, var(--teal)); opacity: 0.5; }
        .idx-code { font-size: 9px; letter-spacing: 2px; color: var(--accent, var(--teal)); margin-bottom: 10px; }
        .idx-val { font-family: var(--sans); font-size: 20px; font-weight: 300; color: var(--text); margin-bottom: 4px; }
        .idx-name { font-size: 8px; letter-spacing: 1px; color: var(--text-dim); margin-bottom: 10px; }
        .idx-bar { height: 1px; background: rgba(255,255,255,0.05); margin-bottom: 8px; }
        .idx-bar-fill { height: 100%; background: var(--accent, var(--teal)); transition: width 2.4s cubic-bezier(0.16,1,0.3,1); }
        .idx-ttg { font-size: 8px; letter-spacing: 1px; color: var(--accent, var(--teal)); }
        .health-tag { font-size: 7px; letter-spacing: 1.5px; padding: 2px 5px; border: 1px solid; margin-top: 8px; display: inline-block; }
        .health-nominal { color: var(--teal); border-color: var(--teal-dim); }
        .health-elevated { color: var(--gold); border-color: var(--gold-dim); }
        
        /* Architecture */
        .arch-stack { display: flex; flex-direction: column; gap: 2px; margin-top: 1px; }
        .arch-layer { border: 1px solid var(--border); padding: 16px 20px; background: var(--cell); display: grid; grid-template-columns: 48px 1fr auto; align-items: center; gap: 16px; transition: border-color 0.25s; }
        .arch-layer:hover { border-color: var(--border-active); }
        .arch-layer.active { border-color: rgba(26,158,120,0.4); background: rgba(26,158,120,0.03); }
        .arch-num { font-size: 10px; letter-spacing: 2px; color: var(--teal-dim); }
        .arch-title { font-size: 11px; letter-spacing: 1.5px; color: var(--text); }
        .arch-sub { font-size: 9px; color: var(--text-dim); margin-top: 3px; line-height: 1.5; }
        .arch-tag { font-size: 8px; letter-spacing: 2px; padding: 3px 8px; border: 1px solid var(--border-active); color: var(--teal-dim); }
        .arch-connector { width: 2px; height: 12px; background: var(--teal-ghost); margin: 2px auto; }
        
        /* Moat */
        .moat-row { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
        .moat-entity-label { font-size: 9px; letter-spacing: 1.5px; color: var(--text-dim); width: 124px; text-align: right; flex-shrink: 0; }
        .moat-bar-wrap { flex: 1; height: 8px; background: rgba(255,255,255,0.04); overflow: hidden; }
        .moat-bar-inner { height: 100%; transition: width 2.5s cubic-bezier(0.16,1,0.3,1); }
        .moat-bar-mefi { background: linear-gradient(90deg, var(--teal-dim), var(--teal)); }
        .moat-bar-late { background: linear-gradient(90deg, #2a2a2a, #3a3a3a); }
        .moat-years { display: flex; justify-content: space-between; padding-left: 140px; font-size: 8px; letter-spacing: 2px; color: var(--text-ghost); margin-top: 4px; }
        .moat-note { font-size: 9px; color: var(--text-ghost); letter-spacing: 1px; margin-top: 20px; }
        
        /* Partner Grid */
        .partner-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 1px; }
        .partner-cell { border: 1px solid var(--border); padding: 28px 24px; background: var(--cell); }
        .partner-cell.primary { border-color: rgba(200,160,16,0.25); background: rgba(200,160,16,0.02); }
        .partner-tier-label { font-size: 8px; letter-spacing: 2.5px; padding: 3px 8px; border: 1px solid; margin-bottom: 16px; display: inline-block; }
        .partner-tier-label.gold { color: var(--gold); border-color: var(--gold-dim); }
        .partner-tier-label.teal { color: var(--teal); border-color: var(--teal-dim); }
        .partner-name { font-size: 11px; letter-spacing: 2px; color: var(--text); margin-bottom: 8px; }
        .partner-who { font-size: 9px; color: var(--text-dim); line-height: 1.7; margin-bottom: 16px; }
        .partner-benefit { display: flex; gap: 8px; margin-bottom: 7px; }
        .partner-dot { font-size: 8px; color: var(--teal); flex-shrink: 0; margin-top: 2px; }
        .partner-benefit-txt { font-size: 9px; color: var(--text-dim); }
        
        /* Form */
        .form-wrap { border: 1px solid rgba(200,160,16,0.15); background: rgba(8,12,9,0.8); padding: 40px; max-width: 680px; margin: 0 auto; }
        .form-classify { font-size: 8px; letter-spacing: 3px; color: var(--gold-dim); margin-bottom: 8px; text-align: center; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
        .field-lbl { font-size: 8px; letter-spacing: 2px; color: var(--text-dim); margin-bottom: 5px; }
        .field-input, .field-select { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--border); color: var(--text); font-family: var(--mono); font-size: 11px; padding: 9px 12px; outline: none; }
        .field-input:focus, .field-select:focus { border-color: var(--teal-dim); }
        .field-select { background: rgba(5,5,5,0.9); }
        .btn-submit { width: 100%; font-family: var(--mono); font-size: 9px; letter-spacing: 3px; background: var(--teal); color: #050505; border: none; padding: 13px; cursor: pointer; font-weight: 500; margin-top: 14px; }
        .btn-submit:hover { background: var(--teal-dim); color: var(--text); }
        .form-note { font-size: 8px; letter-spacing: 1.5px; color: var(--text-ghost); text-align: center; margin-top: 12px; }
        
        /* Footer */
        .footer { border-top: 1px solid var(--border); padding: 32px 0; margin-top: 80px; }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1280px; margin: 0 auto; padding: 0 24px; flex-wrap: wrap; gap: 16px; }
        .footer-left { display: flex; align-items: center; gap: 16px; }
        .footer-id { font-size: 9px; letter-spacing: 2px; color: var(--text-dim); }
        .footer-links { display: flex; gap: 20px; }
        .footer-link { font-size: 8px; letter-spacing: 2px; color: var(--text-ghost); cursor: pointer; transition: color 0.2s; }
        .footer-link:hover { color: var(--teal-dim); }
        .footer-right { font-size: 8px; letter-spacing: 1.5px; color: var(--text-ghost); text-align: right; }
        
        .flex { display: flex; }
        .gap8 { gap: 8px; }
        .items-center { align-items: center; }
      `}</style>

      <div className="ghost-layer">
        <pre style={{ top: '8%', left: '2%' }}>{`@dataclass(frozen=True)
class SourceEvent:
  event_id:      str
  entity_id:     str
  source_type:   SourceType
  raw_amount:    Decimal
  currency:      str
  direction:     Direction
  counterparty:  Optional[str]
  timestamp_utc: datetime
  source_ref:    str
  metadata:      dict`}</pre>
        <pre style={{ top: '35%', right: '3%' }}>{`class BehavioralIndices:
  CI:  float  # [0,1]
  LSI: float  # [0,1]
  TPS: float  # [0,1]
  EIC: float  # [0,1]
  ARI: float  # [0,1]
  EDS: float  # [0,1]
  TTG: float  # [-1,1]`}</pre>
      </div>
      <div className="grid-overlay"></div>
      <div className="scanline"></div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-id" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="nav-logo">M</div>
            <div>
              <div className="nav-title">MEFI</div>
              <div className="nav-sub">BEHAVIORAL FINANCIAL IDENTITY INFRASTRUCTURE</div>
            </div>
          </div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}>Architecture</span>
            <span className="nav-link" onClick={() => document.getElementById('indices')?.scrollIntoView({ behavior: 'smooth' })}>Indices</span>
            <span className="nav-link" onClick={() => document.getElementById('moat')?.scrollIntoView({ behavior: 'smooth' })}>Substrate</span>
            <span className="nav-link" onClick={() => document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' })}>Access</span>
            <div className="flex gap8 items-center" style={{ marginLeft: '16px' }}>
              <div className="status-dot"></div>
              <span className="status-txt">SUBSTRATE ACTIVE</span>
            </div>
            <button className="nav-btn" onClick={() => document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' })}>Request Terminal Access</button>
          </div>
        </div>
      </nav>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-inner">
          <span className="tick"><span>■</span> CI: {telemetry.ci.toFixed(3)}</span>
          <span className="tick"><span>■</span> LSI: {telemetry.lsi.toFixed(3)}</span>
          <span className="tick"><span>■</span> TPS: {telemetry.tps.toFixed(3)}</span>
          <span className="tick"><span>■</span> EIC: {telemetry.eic.toFixed(3)}</span>
          <span className="tick"><span>■</span> ARI: {telemetry.ari.toFixed(3)}</span>
          <span className="tick"><span>■</span> EDS: {telemetry.eds.toFixed(3)}</span>
          <span className="tick"><span>■</span> TTG: {telemetry.ttg >= 0 ? '+' : ''}{telemetry.ttg.toFixed(3)}</span>
          <span className="tick"><span>■</span> PROFILES: {telemetry.profilesTotal.toLocaleString()}</span>
          <span className="tick"><span>■</span> API QUERIES/SEC: {telemetry.apiQueriesSec}</span>
          <span className="tick"><span>■</span> SUBSTRATE INGRESS: ACTIVE</span>
          <span className="tick"><span>■</span> MARKETS: KE · NG · GH · RW</span>
        </div>
      </div>

      <div className="terminal">
        {/* Hero */}
        <section className="hero">
          <div className="hero-ref">
            <div className="hero-ref-line"></div>
            <span>BEHAVIORAL FINANCIAL IDENTITY INFRASTRUCTURE · PHASE 1 ACTIVE · KE</span>
          </div>
          <h1 className="hero-h1">Converting Economic</h1>
          <h1 className="hero-h1">Existence into <em>Financial Identity.</em></h1>
          <h2 className="hero-h2">The substrate. Not the app.</h2>
          <p className="hero-corpus">Fix the identity infrastructure, and everything downstream works. MEFI does not issue scores. MEFI does not process payments. MEFI ingests raw behavioral signal from any source and normalizes it into a signed, portable, continuously-updating identity object that every institution in the ecosystem reads from.</p>
          <p className="hero-mandate">Ingest. Normalize. Sign. Propagate.<br />Every bank is a tenant. Every telco is a data source.<br />MEFI is the substrate they both depend on.</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' })}>Request Institutional Access</button>
            <button className="btn-ghost" onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}>View Architecture</button>
            <span className="hero-classify">— NDA REQUIRED · INSTITUTIONAL TIER ONLY</span>
          </div>
          <div className="stats-strip">
            <div className="stat-cell"><div className="stat-val">2.1B</div><div className="stat-lbl">Entities without formal identity</div></div>
            <div className="stat-cell"><div className="stat-val">$4T+</div><div className="stat-lbl">Infrastructure TAM by 2030</div></div>
            <div className="stat-cell"><div className="stat-val">82%+</div><div className="stat-lbl">Target gross margin at scale</div></div>
            <div className="stat-cell"><div className="stat-val">547</div><div className="stat-lbl">Days — current profile depth</div></div>
          </div>
        </section>

        {/* System Status */}
        <section className="section">
          <div className="section-hdr">
            <div className="sec-label">SYSTEM STATUS — SUBSTRATE HEARTBEAT</div>
            <div className="section-line"></div>
          </div>
          <div className="data-cell">
            <div className="cell-hdr">
              <span>SUBSTRATE INGRESS MONITOR</span>
              <div className="flex gap8 items-center">
                <div className="status-dot"></div>
                <span className="cell-hdr-tag">NOMINAL</span>
              </div>
            </div>
            <div className="sys-grid">
              <div className="sys-cell">
                <div className="sys-name">ACTIVE SUBSTRATE INGRESS</div>
                <div className="sys-val">{telemetry.ingressRate}</div>
                <div className="sys-sub">SourceEvents per second</div>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(100, telemetry.ingressRate / 20)}%` }}></div></div>
                <div className="sys-indicator"><div className="sys-dot-teal"></div><span className="sys-status-ok">INGESTION ACTIVE</span></div>
              </div>
              <div className="sys-cell">
                <div className="sys-name">PROFILE CONSENSUS</div>
                <div className="sys-val">98.7%</div>
                <div className="sys-sub">Signature validation rate</div>
                <div className="bar-track"><div className="bar-fill" style={{ width: '98.7%' }}></div></div>
                <div className="sys-indicator"><div className="sys-dot-teal"></div><span className="sys-status-ok">ALL SIGNATURES VALID</span></div>
              </div>
              <div className="sys-cell">
                <div className="sys-name">BEHAVIORAL INFERENCE LATENCY</div>
                <div className="sys-val">83<span style
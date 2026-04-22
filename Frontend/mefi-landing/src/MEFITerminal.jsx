/**
 * MEFI Sovereign Terminal — Behavioral Financial Identity Infrastructure
 * mefi.global · @mefiglobal
 */

import { useState, useEffect } from 'react';

const MEFITerminal = () => {
  // This state stores live telemetry data that updates automatically
  const [telemetry, setTelemetry] = useState({
    ingressRate: 1204,
    profilesTotal: 2847391,
    ci: 0.847,
    lsi: 0.923,
    tps: 0.761
  });

  // This makes the navigation bar change when you scroll
  const [scrolled, setScrolled] = useState(false);

  // This runs ONCE when the page loads
  useEffect(() => {
    // Update telemetry every 4 seconds (simulates live data)
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        ingressRate: prev.ingressRate + Math.floor(Math.random() * 30) - 10,
        profilesTotal: prev.profilesTotal + Math.floor(Math.random() * 500),
        ci: Math.min(0.95, +(prev.ci + (Math.random() - 0.5) * 0.003).toFixed(3))
      }));
    }, 4000);

    // Detect scroll to change navbar appearance
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup when component is destroyed
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // The 7 behavioral indices data
  const indices = [
    { code: 'CI', name: 'Consistency Index', value: telemetry.ci, color: '#1a9e78' },
    { code: 'LSI', name: 'Liquidity Stability', value: telemetry.lsi, color: '#1a9e78' },
    { code: 'TPS', name: 'Trust Propagation', value: telemetry.tps, color: '#1a9e78' },
    { code: 'EIC', name: 'Economic Coherence', value: 0.889, color: '#1a9e78' },
    { code: 'ARI', name: 'Adaptive Resilience', value: 0.834, color: '#1a9e78' },
    { code: 'EDS', name: 'Ecosystem Depth', value: 0.712, color: '#c8a010' },
    { code: 'TTG', name: 'Temporal Gradient', value: 0.043, color: '#1a9e78' }
  ];

  // Architecture layers
  const layers = [
    { num: '01', title: 'SIGNAL INGESTION', desc: 'Ingests data from M-Pesa, Airtel Money, bank APIs, and more. Normalizes everything into a standard format.', tag: 'ANY SOURCE' },
    { num: '02', title: 'INFERENCE ENGINE', desc: 'Machine learning that analyzes behavior patterns. This is MEFI\'s core intellectual property.', tag: 'CORE IP', active: true },
    { num: '03', title: 'IDENTITY LAYER', desc: 'Creates a cryptographically signed identity profile. Not a score — a living financial identity.', tag: 'THE PROFILE' },
    { num: '04', title: 'TRUST API', desc: 'Institutions ask questions, MEFI returns behavioral signals. Never returns a single number.', tag: 'THE INTERFACE' },
    { num: '05', title: 'ECOSYSTEM', desc: 'Banks, lenders, and insurers build products on top of MEFI\'s infrastructure.', tag: 'THE NETWORK' }
  ];

  // Function to scroll to sections when clicking nav links
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="terminal">
      {/* All the CSS styles for the page */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Brand colors */
        :root {
          --void: #050505;
          --teal: #1a9e78;
          --teal-dim: #0d5c46;
          --gold: #c8a010;
          --text: #d8e0d0;
          --text-dim: #6a7868;
          --border: rgba(255, 255, 255, 0.06);
          --mono: 'IBM Plex Mono', monospace;
          --sans: 'IBM Plex Sans', sans-serif;
        }

        body {
          background: var(--void);
          font-family: var(--mono);
        }

        .terminal {
          background: var(--void);
          min-height: 100vh;
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Navigation Bar */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border);
          background: ${scrolled ? 'rgba(5,5,5,0.98)' : 'transparent'};
          backdrop-filter: blur(20px);
          transition: background 0.3s;
        }
        
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        
        .logo-icon {
          width: 28px;
          height: 28px;
          border: 1px solid var(--teal-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: var(--teal);
        }
        
        .logo-text {
          font-size: 12px;
          letter-spacing: 3px;
          color: var(--text);
        }
        
        .logo-sub {
          font-size: 9px;
          letter-spacing: 2px;
          color: var(--text-dim);
          margin-top: 1px;
        }
        
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
          animation: pulse 2.4s ease-in-out infinite;
        }
        
        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        
        .nav-link {
          font-size: 9px;
          letter-spacing: 2px;
          color: var(--text-dim);
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .nav-link:hover {
          color: var(--teal);
        }
        
        .nav-btn {
          font-size: 9px;
          letter-spacing: 2px;
          border: 1px solid var(--teal-dim);
          color: var(--teal);
          padding: 7px 16px;
          cursor: pointer;
          background: transparent;
          transition: all 0.2s;
        }
        
        .nav-btn:hover {
          background: var(--teal-ghost, #0a3329);
          border-color: var(--teal);
        }

        /* Live Ticker */
        .ticker {
          position: fixed;
          top: 53px;
          left: 0;
          right: 0;
          z-index: 99;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: rgba(8, 12, 9, 0.95);
          backdrop-filter: blur(10px);
          padding: 8px 0;
          overflow: hidden;
        }
        
        .ticker-inner {
          display: flex;
          gap: 48px;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        
        .tick {
          font-size: 9px;
          letter-spacing: 1.5px;
          color: var(--text-dim);
          white-space: nowrap;
        }
        
        .tick span {
          color: var(--teal);
        }

        /* Main Content Container */
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero Section */
        .hero {
          padding: 160px 0 80px;
        }
        
        .hero-badge {
          font-size: 9px;
          letter-spacing: 3px;
          color: var(--teal-dim);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .hero-badge-line {
          width: 24px;
          height: 1px;
          background: var(--teal-dim);
        }
        
        .hero h1 {
          font-family: var(--sans);
          font-size: clamp(36px, 5.5vw, 72px);
          font-weight: 300;
          line-height: 1;
          letter-spacing: -1px;
          color: var(--text);
          margin-bottom: 8px;
        }
        
        .hero h1 em {
          font-style: normal;
          color: var(--teal);
        }
        
        .hero h2 {
          font-family: var(--sans);
          font-size: clamp(36px, 5.5vw, 72px);
          font-weight: 300;
          line-height: 1;
          letter-spacing: -1px;
          color: var(--text-dim);
          margin-bottom: 40px;
        }
        
        .hero-description {
          font-size: 12px;
          color: var(--text-dim);
          max-width: 480px;
          line-height: 1.8;
          margin-bottom: 12px;
        }
        
        .hero-mandate {
          font-size: 10px;
          letter-spacing: 1px;
          color: rgba(26, 158, 120, 0.45);
          line-height: 1.9;
          max-width: 480px;
          margin-bottom: 48px;
        }
        
        .hero-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          font-size: 9px;
          letter-spacing: 2px;
          background: var(--teal);
          color: #050505;
          border: none;
          padding: 12px 28px;
          cursor: pointer;
          font-family: var(--mono);
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .btn-primary:hover {
          background: var(--teal-dim);
          color: var(--text);
        }
        
        .btn-secondary {
          font-size: 9px;
          letter-spacing: 2px;
          background: transparent;
          color: var(--text-dim);
          border: 1px solid var(--border);
          padding: 12px 28px;
          cursor: pointer;
          font-family: var(--mono);
          transition: all 0.2s;
        }
        
        .btn-secondary:hover {
          border-color: var(--teal-dim);
          color: var(--text);
        }
        
        .hero-classification {
          font-size: 9px;
          letter-spacing: 2px;
          color: #2a3028;
        }

        /* Stats Strip */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          margin-top: 64px;
        }
        
        .stat-card {
          border: 1px solid var(--border);
          padding: 20px;
          background: #0c1009;
        }
        
        .stat-number {
          font-family: var(--sans);
          font-size: 28px;
          font-weight: 300;
          color: var(--teal);
          margin-bottom: 6px;
        }
        
        .stat-label {
          font-size: 9px;
          letter-spacing: 1.5px;
          color: var(--text-dim);
        }

        /* Section Styles */
        .section {
          padding: 80px 0;
        }
        
        .section-header {
          margin-bottom: 40px;
        }
        
        .section-label {
          font-size: 9px;
          letter-spacing: 3px;
          color: #7a6008;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        
        .section-line {
          height: 1px;
          background: var(--border);
          margin-bottom: 20px;
        }

        /* Indices Grid */
        .indices-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          margin-top: 1px;
        }
        
        @media (max-width: 900px) {
          .indices-grid { grid-template-columns: repeat(4, 1fr); }
        }
        
        @media (max-width: 600px) {
          .indices-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        .index-card {
          border: 1px solid var(--border);
          padding: 16px 12px;
          background: #0c1009;
          position: relative;
        }
        
        .index-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          background: var(--card-color, var(--teal));
          opacity: 0.5;
        }
        
        .index-code {
          font-size: 9px;
          letter-spacing: 2px;
          color: var(--card-color, var(--teal));
          margin-bottom: 10px;
        }
        
        .index-value {
          font-family: var(--sans);
          font-size: 20px;
          font-weight: 300;
          color: var(--text);
          margin-bottom: 4px;
        }
        
        .index-name {
          font-size: 8px;
          letter-spacing: 1px;
          color: var(--text-dim);
          margin-bottom: 10px;
        }
        
        .index-bar {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin-bottom: 8px;
        }
        
        .index-bar-fill {
          height: 100%;
          background: var(--card-color, var(--teal));
          transition: width 2.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Architecture Layers */
        .layers-stack {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .layer {
          border: 1px solid var(--border);
          padding: 16px 20px;
          background: #0c1009;
          display: grid;
          grid-template-columns: 48px 1fr auto;
          align-items: center;
          gap: 16px;
          transition: border-color 0.25s;
        }
        
        .layer:hover {
          border-color: rgba(26, 158, 120, 0.3);
        }
        
        .layer.active {
          border-color: rgba(26, 158, 120, 0.4);
          background: rgba(26, 158, 120, 0.03);
        }
        
        .layer-number {
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--teal-dim);
        }
        
        .layer-title {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: var(--text);
        }
        
        .layer-description {
          font-size: 9px;
          color: var(--text-dim);
          margin-top: 3px;
          line-height: 1.5;
        }
        
        .layer-tag {
          font-size: 8px;
          letter-spacing: 2px;
          padding: 3px 8px;
          border: 1px solid rgba(26, 158, 120, 0.3);
          color: var(--teal-dim);
        }
        
        .layer-connector {
          width: 2px;
          height: 12px;
          background: #0a3329;
          margin: 2px auto;
        }

        /* Partner Portal */
        .partner-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
        }
        
        .partner-card {
          border: 1px solid var(--border);
          padding: 28px 24px;
          background: #0c1009;
        }
        
        .partner-card.primary {
          border-color: rgba(200, 160, 16, 0.25);
          background: rgba(200, 160, 16, 0.02);
        }
        
        .partner-tier {
          font-size: 8px;
          letter-spacing: 2.5px;
          padding: 3px 8px;
          border: 1px solid;
          margin-bottom: 16px;
          display: inline-block;
        }
        
        .partner-tier.gold {
          color: var(--gold);
          border-color: #7a6008;
        }
        
        .partner-tier.teal {
          color: var(--teal);
          border-color: var(--teal-dim);
        }
        
        .partner-name {
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--text);
          margin-bottom: 8px;
        }
        
        .partner-audience {
          font-size: 9px;
          color: var(--text-dim);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        
        .partner-benefit {
          display: flex;
          gap: 8px;
          margin-bottom: 7px;
        }
        
        .partner-bullet {
          font-size: 8px;
          color: var(--teal);
        }
        
        .partner-benefit-text {
          font-size: 9px;
          color: var(--text-dim);
        }

        /* Access Form */
        .form-container {
          border: 1px solid rgba(200, 160, 16, 0.15);
          background: rgba(8, 12, 9, 0.8);
          padding: 40px;
          max-width: 680px;
          margin: 0 auto;
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 28px;
        }
        
        .form-classification {
          font-size: 8px;
          letter-spacing: 3px;
          color: #7a6008;
          margin-bottom: 8px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        
        .form-label {
          font-size: 8px;
          letter-spacing: 2px;
          color: var(--text-dim);
          margin-bottom: 5px;
        }
        
        .form-input, .form-select {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: var(--mono);
          font-size: 11px;
          padding: 9px 12px;
          outline: none;
        }
        
        .form-input:focus, .form-select:focus {
          border-color: var(--teal-dim);
        }
        
        .form-select {
          background: rgba(5, 5, 5, 0.9);
        }
        
        .submit-btn {
          width: 100%;
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 3px;
          background: var(--teal);
          color: #050505;
          border: none;
          padding: 13px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 14px;
        }
        
        .submit-btn:hover {
          background: var(--teal-dim);
          color: var(--text);
        }
        
        .form-note {
          font-size: 8px;
          letter-spacing: 1.5px;
          color: #2a3028;
          text-align: center;
          margin-top: 12px;
        }

        /* Footer */
        .footer {
          border-top: 1px solid var(--border);
          padding: 32px 0;
          margin-top: 80px;
        }
        
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .footer-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .footer-text {
          font-size: 9px;
          letter-spacing: 2px;
          color: var(--text-dim);
        }
        
        .footer-links {
          display: flex;
          gap: 20px;
        }
        
        .footer-link {
          font-size: 8px;
          letter-spacing: 2px;
          color: #2a3028;
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .footer-link:hover {
          color: var(--teal-dim);
        }
        
        .footer-right {
          font-size: 8px;
          letter-spacing: 1.5px;
          color: #2a3028;
          text-align: right;
        }

        /* Utilities */
        .flex { display: flex; }
        .gap8 { gap: 8px; }
        .items-center { align-items: center; }
      `}</style>

      {/* Navigation Bar */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-icon">M</div>
            <div>
              <div className="logo-text">MEFI</div>
              <div className="logo-sub">BEHAVIORAL FINANCIAL IDENTITY</div>
            </div>
          </div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => scrollTo('architecture')}>Architecture</span>
            <span className="nav-link" onClick={() => scrollTo('indices')}>Indices</span>
            <span className="nav-link" onClick={() => scrollTo('partners')}>Partners</span>
            <span className="nav-link" onClick={() => scrollTo('access')}>Access</span>
            <div className="flex gap8 items-center">
              <div className="status-dot"></div>
              <span className="status-txt" style={{ fontSize: '9px', letterSpacing: '2px', color: '#0d5c46' }}>ACTIVE</span>
            </div>
            <button className="nav-btn" onClick={() => scrollTo('access')}>Request Access</button>
          </div>
        </div>
      </nav>

      {/* Live Ticker */}
      <div className="ticker">
        <div className="ticker-inner">
          <span className="tick"><span>■</span> CI: {telemetry.ci.toFixed(3)}</span>
          <span className="tick"><span>■</span> LSI: {telemetry.lsi.toFixed(3)}</span>
          <span className="tick"><span>■</span> TPS: {telemetry.tps.toFixed(3)}</span>
          <span className="tick"><span>■</span> PROFILES: {telemetry.profilesTotal.toLocaleString()}</span>
          <span className="tick"><span>■</span> INGRESS: {telemetry.ingressRate}/sec</span>
          <span className="tick"><span>■</span> MARKETS: KE · NG · GH · RW</span>
          <span className="tick"><span>■</span> STATUS: SUBSTRATE ACTIVE</span>
          {/* Duplicate for seamless loop */}
          <span className="tick"><span>■</span> CI: {telemetry.ci.toFixed(3)}</span>
          <span className="tick"><span>■</span> LSI: {telemetry.lsi.toFixed(3)}</span>
          <span className="tick"><span>■</span> TPS: {telemetry.tps.toFixed(3)}</span>
          <span className="tick"><span>■</span> PROFILES: {telemetry.profilesTotal.toLocaleString()}</span>
          <span className="tick"><span>■</span> INGRESS: {telemetry.ingressRate}/sec</span>
          <span className="tick"><span>■</span> MARKETS: KE · NG · GH · RW</span>
          <span className="tick"><span>■</span> STATUS: SUBSTRATE ACTIVE</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">
            <div className="hero-badge-line"></div>
            <span>BEHAVIORAL FINANCIAL IDENTITY INFRASTRUCTURE · PHASE 1 ACTIVE</span>
          </div>
          <h1>Converting Economic</h1>
          <h1>Existence into <em>Financial Identity.</em></h1>
          <h2>The substrate. Not the app.</h2>
          <p className="hero-description">
            Fix the identity infrastructure, and everything downstream works. MEFI ingests raw behavioral signal from any source and normalizes it into a signed, portable, continuously-updating identity object.
          </p>
          <p className="hero-mandate">
            Ingest. Normalize. Sign. Propagate.<br />
            Every bank is a tenant. Every telco is a data source.<br />
            MEFI is the substrate they both depend on.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollTo('access')}>Request Institutional Access</button>
            <button className="btn-secondary" onClick={() => scrollTo('architecture')}>View Architecture</button>
            <span className="hero-classification">— NDA REQUIRED · INSTITUTIONAL TIER ONLY</span>
          </div>

          {/* Stats Strip */}
          <div className="stats-strip">
            <div className="stat-card">
              <div className="stat-number">2.1B</div>
              <div className="stat-label">Entities without formal identity</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$4T+</div>
              <div className="stat-label">Infrastructure TAM by 2030</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">82%+</div>
              <div className="stat-label">Target gross margin at scale</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">547</div>
              <div className="stat-label">Days — current profile depth</div>
            </div>
          </div>
        </section>

        {/* Indices Section */}
        <section id="indices" className="section">
          <div className="section-header">
            <div className="section-label">THE ENGINE — SEVEN BEHAVIORAL INDICES</div>
            <div className="section-line"></div>
            <p style={{ fontSize: '10px', color: '#6a7868', maxWidth: '560px', lineHeight: '1.8' }}>
              These are not scores. They are behavioral dimensions of a living identity object. 
              Each index captures a different axis of economic existence.
            </p>
          </div>
          <div className="indices-grid">
            {indices.map((index, i) => (
              <div key={i} className="index-card" style={{ '--card-color': index.color }}>
                <div className="index-code">{index.code}</div>
                <div className="index-value">{(index.value * 100).toFixed(0)}</div>
                <div className="index-name">{index.name}</div>
                <div className="index-bar">
                  <div className="index-bar-fill" style={{ width: `${index.value * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="section">
          <div className="section-header">
            <div className="section-label">ARCHITECTURE — FIVE-LAYER SUBSTRATE STACK</div>
            <div className="section-line"></div>
          </div>
          <div className="layers-stack">
            {layers.map((layer, i) => (
              <div key={i}>
                <div className={`layer ${layer.active ? 'active' : ''}`}>
                  <div className="layer-number">{layer.num}</div>
                  <div>
                    <div className="layer-title">{layer.title}</div>
                    <div className="layer-description">{layer.desc}</div>
                  </div>
                  <div className="layer-tag">{layer.tag}</div>
                </div>
                {i < layers.length - 1 && <div className="layer-connector"></div>}
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="section">
          <div className="section-header">
            <div className="section-label">INSTITUTIONAL ACCESS — PARTNERSHIP TIERS</div>
            <div className="section-line"></div>
          </div>
          <div className="partner-grid">
            <div className="partner-card primary">
              <div className="partner-tier gold">PRIMARY TIER</div>
              <div className="partner-name">STRATEGIC INFRASTRUCTURE PARTNER</div>
              <div className="partner-audience">Development Finance Institutions · Sovereign Wealth Funds</div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">Co-deployment capital + regulatory facilitation</div>
              </div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">Board observer seat + data access for policy use</div>
              </div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">First-mover market access in all MEFI territories</div>
              </div>
            </div>
            <div className="partner-card">
              <div className="partner-tier teal">INTEGRATION TIER</div>
              <div className="partner-name">INTEGRATION PARTNER</div>
              <div className="partner-audience">Tier-1 Banks · Mobile Money Operators · Insurance Carriers</div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">Trust API access + technical co-development</div>
              </div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">Reduced licensing on MEFI infrastructure</div>
              </div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">White-label SDK + regulatory sandbox co-navigation</div>
              </div>
            </div>
            <div className="partner-card">
              <div className="partner-tier teal">CAPITAL TIER</div>
              <div className="partner-name">IMPACT CAPITAL PARTNER</div>
              <div className="partner-audience">Patient Private Equity · 10-Year Horizon Mandates</div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">10-year infrastructure capital thesis alignment</div>
              </div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">Impact measurement co-design</div>
              </div>
              <div className="partner-benefit">
                <div className="partner-bullet">■</div>
                <div className="partner-benefit-text">Infrastructure-level return architecture access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Access Form Section */}
        <section id="access" className="section">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="section-label" style={{ textAlign: 'center' }}>SECURE INSTITUTIONAL ACCESS REQUEST</div>
            <div className="section-line" style={{ maxWidth: '400px', margin: '8px auto' }}></div>
            <p style={{ fontSize: '10px', color: '#6a7868', maxWidth: '400px', margin: '0 auto' }}>
              All access requests are manually reviewed. Full technical briefing available under NDA.
            </p>
          </div>
          <div className="form-container">
            <div className="form-header">
              <div className="form-classification">ACCESS RESTRICTED · NDA REQUIRED · INSTITUTIONAL TIER ONLY</div>
            </div>
            <div className="form-row">
              <div>
                <div className="form-label">INSTITUTION</div>
                <input className="form-input" placeholder="Central Bank of Kenya" />
              </div>
              <div>
                <div className="form-label">DESIGNATION</div>
                <input className="form-input" placeholder="Director, Digital Finance" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <div className="form-label">INSTITUTIONAL EMAIL</div>
                <input className="form-input" type="email" placeholder="name@institution.org" />
              </div>
              <div>
                <div className="form-label">PARTNERSHIP TIER</div>
                <select className="form-select">
                  <option>Select tier</option>
                  <option>Strategic Infrastructure Partner</option>
                  <option>Integration Partner</option>
                  <option>Impact Capital Partner</option>
                </select>
              </div>
            </div>
            <div>
              <div className="form-label">ENGAGEMENT CONTEXT</div>
              <textarea className="form-input" rows="2" placeholder="Describe your institution's interest in behavioral financial identity infrastructure"></textarea>
            </div>
            <button className="submit-btn">SUBMIT ACCESS REQUEST</button>
            <div className="form-note">MEFI HOLDINGS LTD · MEFI.GLOBAL · REVIEWED WITHIN 48H</div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="logo-icon" style={{ width: '24px', height: '24px', fontSize: '10px' }}>M</div>
            <div className="footer-text">MEFI HOLDINGS LTD · mefi.global · @mefiglobal</div>
          </div>
          <div className="footer-links">
            <span className="footer-link" onClick={() => scrollTo('architecture')}>Architecture</span>
            <span className="footer-link">NDA</span>
            <span className="footer-link">Data Protection</span>
            <span className="footer-link">IP Portfolio</span>
          </div>
          <div className="footer-right">
            NOT A FINTECH. NOT A CREDIT BUREAU.<br />
            THE SUBSTRATE. © 2025 MEFI HOLDINGS LTD
          </div>
        </div>
      </div>
    </div>
  );
};

export default MEFITerminal;
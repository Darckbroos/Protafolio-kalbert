import { useEffect, useRef, useState } from 'react'

/* ── 1. Analytics Dashboard ── */
function AnalyticsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stats, setStats] = useState([0, 0, 0])
  const TARGETS = [124500, 3428, 4.2]
  const LABELS  = ['Ventas totales', 'Usuarios activos', 'Conversión']
  const FORMAT  = [
    (v: number) => `$${(v / 1000).toFixed(1)}K`,
    (v: number) => v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    (v: number) => `${v.toFixed(1)}%`,
  ]
  const DELTAS  = ['+18%', '+7%', '+0.8pp']
  const COLORS  = ['#a78bfa', '#38bdf8', '#34d399']

  useEffect(() => {
    let f = 0
    const iv = setInterval(() => {
      f = Math.min(f + 1, 60)
      const t = f / 60
      setStats(TARGETS.map(tgt => tgt * t))
      if (f >= 60) clearInterval(iv)
    }, 16)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height
    const DATA   = [42, 68, 55, 91, 73, 88, 61, 95]
    const MONTHS = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO']
    let prog = 0, raf = 0

    const draw = (p: number) => {
      ctx.clearRect(0, 0, W, H)
      const pad = { l: 36, r: 14, t: 10, b: 32 }
      const cW = W - pad.l - pad.r
      const cH = H - pad.t - pad.b
      const bW = (cW / DATA.length) * 0.52
      const gap = cW / DATA.length

      // grid lines + y labels
      for (let i = 0; i <= 4; i++) {
        const y = pad.t + cH - (cH / 4) * i
        ctx.strokeStyle = 'rgba(255,255,255,.07)'
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke()
        ctx.fillStyle = 'rgba(255,255,255,.5)'
        ctx.font = '10px Poppins,sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(`${i * 25}`, pad.l - 5, y + 4)
      }
      ctx.textAlign = 'left'

      // bars
      DATA.forEach((v, i) => {
        const x = pad.l + gap * i + (gap - bW) / 2
        const bH = (v / 100) * cH * p
        const y = pad.t + cH - bH
        const grad = ctx.createLinearGradient(0, y, 0, pad.t + cH)
        grad.addColorStop(0, '#818cf8')
        grad.addColorStop(1, '#06b6d4')
        ctx.fillStyle = grad
        const r = 5
        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + bW - r, y)
        ctx.arcTo(x + bW, y, x + bW, y + r, r)
        ctx.lineTo(x + bW, pad.t + cH)
        ctx.lineTo(x, pad.t + cH)
        ctx.arcTo(x, y, x + r, y, r)
        ctx.closePath()
        ctx.fill()

        // x labels
        ctx.fillStyle = 'rgba(255,255,255,.55)'
        ctx.font = '9px Poppins,sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(MONTHS[i], x + bW / 2, H - 8)
      })

      // trend line
      ctx.beginPath()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 4])
      DATA.forEach((v, i) => {
        const x = pad.l + gap * i + gap / 2
        const y = pad.t + cH - (v / 100) * cH * p
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.setLineDash([])
      // trend dots
      DATA.forEach((v, i) => {
        const x = pad.l + gap * i + gap / 2
        const y = pad.t + cH - (v / 100) * cH * p
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#f59e0b'
        ctx.fill()
      })
    }

    const animate = () => {
      prog = Math.min(prog + 0.02, 1)
      draw(prog)
      if (prog < 1) raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="sc-panel">
      <div className="sc-head">
        <span className="sc-title"><i className="fa-solid fa-chart-bar" /> Dashboard Analítico</span>
        <span className="sc-badge sc-badge--green"><span className="sc-dot" />Live</span>
      </div>
      <div className="sc-stats">
        {LABELS.map((l, i) => (
          <div key={l} className="sc-stat" style={{ '--sc-color': COLORS[i] } as React.CSSProperties}>
            <div className="sc-stat-val">{FORMAT[i](stats[i])}</div>
            <div className="sc-stat-label">{l}</div>
            <div className="sc-stat-delta">↑ {DELTAS[i]}</div>
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} width={420} height={170} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  )
}

/* ── 2. UI Kit ── */
function UIDemo() {
  const [plan, setPlan]       = useState('pro')
  const [notif, setNotif]     = useState(true)
  const [dark, setDark]       = useState(false)
  const [progress]            = useState(72)
  const [toast, setToast]     = useState<string | null>(null)

  const fire = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const PLANS = [
    { id: 'basic', label: 'Básico', price: 'Gratis' },
    { id: 'pro',   label: 'Pro ★', price: '$49/mes' },
    { id: 'ent',   label: 'Enterprise', price: '$199/mes' },
  ]

  return (
    <div className="sc-panel">
      <div className="sc-head">
        <span className="sc-title"><i className="fa-solid fa-palette" /> UI Kit</span>
        <span className="sc-badge sc-badge--purple">Interactivo</span>
      </div>

      {/* Buttons */}
      <div className="sc-section-label">Botones</div>
      <div className="sc-row">
        <button className="sc-btn sc-btn-p" onClick={() => fire('¡Proyecto enviado! Te respondo en <24h 🚀')}>
          <i className="fa-solid fa-paper-plane" /> Contratar
        </button>
        <button className="sc-btn sc-btn-s" onClick={() => fire('Demo iniciando...')}>
          <i className="fa-regular fa-eye" /> Ver demo
        </button>
        <button className="sc-btn sc-btn-g" onClick={() => fire('Acción cancelada')}>
          Cancelar
        </button>
      </div>

      {/* Toast */}
      <div className={`sc-toast${toast ? ' sc-toast--show' : ''}`}>
        <i className="fa-solid fa-circle-check" /> {toast}
      </div>

      {/* Plan selector */}
      <div className="sc-section-label">Plan</div>
      <div className="sc-plans">
        {PLANS.map(p => (
          <button
            key={p.id}
            className={`sc-plan${plan === p.id ? ' sc-plan--active' : ''}`}
            onClick={() => { setPlan(p.id); fire(`Plan ${p.label} seleccionado — ${p.price}`) }}
          >
            <span className="sc-plan-name">{p.label}</span>
            <span className="sc-plan-price">{p.price}</span>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="sc-section-label">Progreso del proyecto</div>
      <div className="sc-progress-wrap">
        <div className="sc-progress-track">
          <div className="sc-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="sc-progress-pct">{progress}%</span>
      </div>

      {/* Toggles */}
      <div className="sc-section-label">Ajustes</div>
      <div className="sc-toggles">
        {[
          { label: 'Notificaciones', icon: 'fa-bell', val: notif, set: setNotif },
          { label: 'Modo oscuro',    icon: 'fa-moon',  val: dark,  set: setDark  },
        ].map(t => (
          <div key={t.label} className="sc-toggle-row">
            <i className={`fa-solid ${t.icon}`} style={{ color: 'var(--muted)', fontSize: '.8rem' }} />
            <span>{t.label}</span>
            <div className={`sc-toggle${t.val ? ' sc-toggle--on' : ''}`} onClick={() => { t.set((v: boolean) => !v); fire(`${t.label} ${!t.val ? 'activado' : 'desactivado'}`) }}>
              <div className="sc-toggle-knob" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 3. E-commerce ── */
function EcommerceDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cart, setCart]   = useState(0)
  const [added, setAdded] = useState<string | null>(null)

  const SEGS = [
    { label: 'Proteínas',   pct: 38, color: '#818cf8' },
    { label: 'Pre-workout', pct: 27, color: '#06b6d4' },
    { label: 'Vitaminas',   pct: 20, color: '#34d399' },
    { label: 'Otros',       pct: 15, color: '#f59e0b' },
  ]
  const PRODS = [
    { name: 'Whey Pro 1kg', price: '$24.990', color: '#818cf8', badge: 'Top venta' },
    { name: 'Pre-Workout X', price: '$18.500', color: '#06b6d4', badge: '-20%' },
    { name: 'Creatina 300g', price: '$12.990', color: '#34d399', badge: 'Nuevo' },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height
    const cx = W / 2, cy = H / 2
    const R = 58, r = 34
    let prog = 0, raf = 0

    const draw = (p: number) => {
      ctx.clearRect(0, 0, W, H)
      let start = -Math.PI / 2
      SEGS.forEach(s => {
        const sweep = (s.pct / 100) * Math.PI * 2 * p
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, R, start, start + sweep)
        ctx.closePath()
        ctx.fillStyle = s.color
        ctx.fill()
        start += sweep
      })
      // hole
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(13,13,36,1)'
      ctx.fill()
      // center text
      ctx.textAlign = 'center'
      ctx.fillStyle = '#e2e8f0'
      ctx.font = 'bold 12px Poppins,sans-serif'
      ctx.fillText('Ventas', cx, cy + 4)
    }

    const animate = () => {
      prog = Math.min(prog + 0.025, 1)
      draw(prog)
      if (prog < 1) raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  const addCart = (name: string) => {
    setCart(c => c + 1)
    setAdded(name)
    setTimeout(() => setAdded(null), 1800)
  }

  return (
    <div className="sc-panel">
      <div className="sc-head">
        <span className="sc-title"><i className="fa-solid fa-bag-shopping" /> E-commerce</span>
        <div className="sc-cart-wrap">
          <i className="fa-solid fa-cart-shopping" style={{ color: 'var(--muted)', fontSize: '.9rem' }} />
          {cart > 0 && <span className="sc-cart-count">{cart}</span>}
        </div>
      </div>

      <div className="sc-ecom-top">
        <canvas ref={canvasRef} width={140} height={140} style={{ flexShrink: 0 }} />
        <div className="sc-legend">
          {SEGS.map(s => (
            <div key={s.label} className="sc-leg-row">
              <span className="sc-leg-dot" style={{ background: s.color }} />
              <span className="sc-leg-label">{s.label}</span>
              <span className="sc-leg-pct" style={{ color: s.color }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {added && <div className="sc-added-toast"><i className="fa-solid fa-circle-check" /> {added} agregado al carrito</div>}

      <div className="sc-products">
        {PRODS.map(p => (
          <div key={p.name} className="sc-product">
            <div className="sc-prod-thumb" style={{ background: `${p.color}22`, border: `1px solid ${p.color}44` }}>
              <i className="fa-solid fa-box" style={{ color: p.color, fontSize: '.85rem' }} />
            </div>
            <div className="sc-prod-info">
              <div className="sc-prod-name">{p.name}</div>
              <div className="sc-prod-price">{p.price}</div>
            </div>
            <span className="sc-prod-badge" style={{ background: `${p.color}22`, color: p.color }}>{p.badge}</span>
            <button className="sc-prod-add" style={{ background: p.color }} onClick={() => addCart(p.name)}>
              <i className="fa-solid fa-plus" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DesignShowcase() {
  return (
    <section id="diseno">
      <div className="sec-header reveal">
        <div className="sec-tag">Capacidades visuales</div>
        <h2 className="sec-title">Gráficos & <span>diseño UI</span></h2>
        <p className="sec-desc">Demos interactivos de lo que construyo — dashboards, componentes y e-commerce con datos reales.</p>
      </div>
      <div className="sc-grid">
        <div className="reveal"><AnalyticsDemo /></div>
        <div className="reveal"><UIDemo /></div>
        <div className="reveal"><EcommerceDemo /></div>
      </div>
    </section>
  )
}

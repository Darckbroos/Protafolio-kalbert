import { useEffect, useRef, useState } from 'react'

/* ── 1. Analytics Dashboard ── */
function AnalyticsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stats, setStats] = useState([0, 0, 0])
  const TARGET = [124500, 3428, 4.2]
  const LABELS = ['Ventas', 'Usuarios', 'Conversión']
  const SUFFIX = ['', '', '%']
  const FORMAT = [(v: number) => `$${(v / 1000).toFixed(1)}K`, (v: number) => v.toFixed(0), (v: number) => v.toFixed(1)]

  useEffect(() => {
    let frame = 0
    const iv = setInterval(() => {
      frame = Math.min(frame + 1, 60)
      const t = frame / 60
      setStats(TARGET.map(tgt => tgt * t))
      if (frame >= 60) clearInterval(iv)
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
      const pad = { l: 32, r: 12, t: 12, b: 28 }
      const cW = W - pad.l - pad.r
      const cH = H - pad.t - pad.b
      const bW = cW / DATA.length * 0.55
      const gap = cW / DATA.length

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,.06)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 4; i++) {
        const y = pad.t + cH - (cH / 4) * i
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke()
        ctx.fillStyle = 'rgba(255,255,255,.25)'
        ctx.font = '9px Poppins'
        ctx.fillText(`${i * 25}`, 2, y + 3)
      }

      // bars
      DATA.forEach((v, i) => {
        const x = pad.l + gap * i + (gap - bW) / 2
        const bH = (v / 100) * cH * p
        const y = pad.t + cH - bH
        const grad = ctx.createLinearGradient(0, y, 0, pad.t + cH)
        grad.addColorStop(0, '#7c3aed')
        grad.addColorStop(1, '#06b6d4')
        ctx.fillStyle = grad
        const r = 4
        ctx.beginPath()
        ctx.moveTo(x + r, y); ctx.lineTo(x + bW - r, y)
        ctx.quadraticCurveTo(x + bW, y, x + bW, y + r)
        ctx.lineTo(x + bW, pad.t + cH); ctx.lineTo(x, pad.t + cH)
        ctx.lineTo(x, y + r)
        ctx.quadraticCurveTo(x, y, x + r, y)
        ctx.closePath(); ctx.fill()

        // label
        ctx.fillStyle = 'rgba(255,255,255,.45)'
        ctx.font = '8px Poppins'
        ctx.textAlign = 'center'
        ctx.fillText(MONTHS[i], x + bW / 2, H - 6)
        ctx.textAlign = 'left'
      })

      // trend line
      ctx.beginPath()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.setLineDash([4, 3])
      DATA.forEach((v, i) => {
        const x = pad.l + gap * i + gap / 2
        const y = pad.t + cH - (v / 100) * cH * p
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.setLineDash([])
    }

    const animate = () => {
      prog = Math.min(prog + 0.025, 1)
      draw(prog)
      if (prog < 1) raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="showcase-panel">
      <div className="showcase-header">
        <span className="showcase-tag">📊 Dashboard Analítico</span>
        <span className="showcase-live">● Live</span>
      </div>
      <div className="showcase-stats-row">
        {LABELS.map((l, i) => (
          <div key={l} className="showcase-stat">
            <div className="showcase-stat-val">{FORMAT[i](stats[i])}{SUFFIX[i]}</div>
            <div className="showcase-stat-label">{l}</div>
            <div className="showcase-stat-delta" style={{ color: '#10b981' }}>↑ {['+18%', '+7%', '+0.8pp'][i]}</div>
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} width={380} height={160} style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}

/* ── 2. UI Components showcase ── */
function UIDemo() {
  const [toggle1, setToggle1] = useState(true)
  const [toggle2, setToggle2] = useState(false)
  const [progress] = useState(72)
  const [selected, setSelected] = useState('pro')
  const [notify, setNotify] = useState(false)

  return (
    <div className="showcase-panel">
      <div className="showcase-header">
        <span className="showcase-tag">🎨 UI Kit</span>
        <span className="showcase-live" style={{ color: '#a78bfa' }}>● Interactivo</span>
      </div>

      {/* Buttons */}
      <div className="ui-row">
        <button className="ui-btn ui-btn-primary" onClick={() => setNotify(true)}>Contratar</button>
        <button className="ui-btn ui-btn-secondary">Ver demo</button>
        <button className="ui-btn ui-btn-ghost">Cancelar</button>
      </div>
      {notify && (
        <div className="ui-toast" onClick={() => setNotify(false)}>
          ✅ ¡Mensaje enviado! Te respondo en &lt;24h
        </div>
      )}

      {/* Plan selector */}
      <div className="ui-plan-row">
        {['basic', 'pro', 'enterprise'].map(p => (
          <button
            key={p}
            className={`ui-plan-btn${selected === p ? ' active' : ''}`}
            onClick={() => setSelected(p)}
          >
            {p === 'basic' ? 'Básico' : p === 'pro' ? 'Pro ★' : 'Enterprise'}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="ui-progress-wrap">
        <div className="ui-progress-label"><span>Progreso del proyecto</span><span style={{ color: '#7c3aed', fontWeight: 700 }}>{progress}%</span></div>
        <div className="ui-progress-track">
          <div className="ui-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Toggles */}
      <div className="ui-toggles">
        <div className="ui-toggle-row">
          <span>Notificaciones</span>
          <div className={`ui-toggle${toggle1 ? ' on' : ''}`} onClick={() => setToggle1(v => !v)}><div className="ui-toggle-thumb" /></div>
        </div>
        <div className="ui-toggle-row">
          <span>Modo oscuro</span>
          <div className={`ui-toggle${toggle2 ? ' on' : ''}`} onClick={() => setToggle2(v => !v)}><div className="ui-toggle-thumb" /></div>
        </div>
      </div>
    </div>
  )
}

/* ── 3. E-commerce / Donut chart ── */
function EcommerceDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cart, setCart] = useState(0)
  const SEGMENTS = [
    { label: 'Proteínas', pct: 38, color: '#7c3aed' },
    { label: 'Pre-workout', pct: 27, color: '#06b6d4' },
    { label: 'Vitaminas', pct: 20, color: '#10b981' },
    { label: 'Otros', pct: 15, color: '#f59e0b' },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const cx = canvas.width / 2, cy = canvas.height / 2
    const R = 56, r = 32
    let prog = 0, raf = 0

    const draw = (p: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let start = -Math.PI / 2
      SEGMENTS.forEach(seg => {
        const slice = (seg.pct / 100) * Math.PI * 2 * p
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, R, start, start + slice)
        ctx.closePath()
        ctx.fillStyle = seg.color
        ctx.fill()
        start += slice
      })
      // hole
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = '#0d0d24'
      ctx.fill()
      // center text
      ctx.fillStyle = '#e2e8f0'
      ctx.font = 'bold 14px Poppins'
      ctx.textAlign = 'center'
      ctx.fillText('Ventas', cx, cy - 4)
      ctx.font = '11px Poppins'
      ctx.fillStyle = '#6b7280'
      ctx.fillText('por categoría', cx, cy + 12)
      ctx.textAlign = 'left'
    }

    const animate = () => {
      prog = Math.min(prog + 0.03, 1)
      draw(prog)
      if (prog < 1) raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="showcase-panel">
      <div className="showcase-header">
        <span className="showcase-tag">🛍️ E-commerce</span>
        <span className="showcase-cart" onClick={() => setCart(0)}>
          🛒 <span className="cart-count">{cart}</span>
        </span>
      </div>
      <div className="ecom-layout">
        <canvas ref={canvasRef} width={144} height={144} />
        <div className="ecom-legend">
          {SEGMENTS.map(s => (
            <div key={s.label} className="ecom-leg-row">
              <span className="ecom-dot" style={{ background: s.color }} />
              <span className="ecom-leg-label">{s.label}</span>
              <span className="ecom-leg-pct" style={{ color: s.color }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ecom-products">
        {[
          { name: 'Whey Pro', price: '$24.990', color: '#7c3aed' },
          { name: 'Pre-W X', price: '$18.500', color: '#06b6d4' },
          { name: 'Creatina', price: '$12.990', color: '#10b981' },
        ].map(p => (
          <div key={p.name} className="ecom-item">
            <div className="ecom-item-dot" style={{ background: p.color }} />
            <span className="ecom-item-name">{p.name}</span>
            <span className="ecom-item-price">{p.price}</span>
            <button className="ecom-add" onClick={() => setCart(c => c + 1)} style={{ borderColor: p.color, color: p.color }}>+</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Section ── */
export default function DesignShowcase() {
  return (
    <section id="diseno">
      <div className="sec-header reveal">
        <div className="sec-tag">Capacidades visuales</div>
        <h2 className="sec-title">Gráficos & <span>diseño UI</span></h2>
        <p className="sec-desc">Ejemplos reales de lo que construyo — dashboards, componentes y e-commerce con datos vivos.</p>
      </div>
      <div className="showcase-grid">
        <div className="reveal"><AnalyticsDemo /></div>
        <div className="reveal"><UIDemo /></div>
        <div className="reveal"><EcommerceDemo /></div>
      </div>
    </section>
  )
}

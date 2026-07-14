import { useEffect, useRef, useState } from 'react'

// ─── fixpc: VS Code typewriter con syntax highlighting ─────────────────────
// Tokens: [texto, color]
const CODE_TOKS: [string, string][] = [
  ['import', '#569cd6'], [' React, { ', '#d4d4d4'],
  ['useState', '#569cd6'], [', ', '#d4d4d4'],
  ['useEffect', '#569cd6'], [' } ', '#d4d4d4'],
  ['from', '#569cd6'], [" 'react'\n", '#ce9178'],

  ['import', '#569cd6'], [' { db } ', '#d4d4d4'],
  ['from', '#569cd6'], [" './lib/supabase'\n\n", '#ce9178'],

  ['interface', '#569cd6'], [' Ticket {\n', '#4ec9b0'],
  ['  id', '#9cdcfe'], [':    ', '#d4d4d4'], ['string\n', '#4ec9b0'],
  ['  title', '#9cdcfe'], [':', '#d4d4d4'], [' string\n', '#4ec9b0'],
  ["  status", '#9cdcfe'], [':', '#d4d4d4'], [" 'open' | 'closed'\n", '#ce9178'],
  ['}\n\n', '#d4d4d4'],

  ['const', '#569cd6'], [' TicketBoard = () => {\n', '#d4d4d4'],
  ['  const', '#569cd6'], [' [tickets, setTickets] = ', '#9cdcfe'],
  ['useState', '#dcdcaa'], ['<Ticket[]>([])\n', '#d4d4d4'],
  ['  const', '#569cd6'], [' [loading, setLoading] = ', '#9cdcfe'],
  ['useState', '#dcdcaa'], ['(', '#d4d4d4'], ['false', '#569cd6'], [')\n\n', '#d4d4d4'],

  ['  const', '#569cd6'], [' create = ', '#9cdcfe'],
  ['async', '#569cd6'], [' (title: ', '#d4d4d4'],
  ['string', '#4ec9b0'], [') => {\n', '#d4d4d4'],
  ['    setLoading', '#dcdcaa'], ['(', '#d4d4d4'], ['true', '#569cd6'], [')\n', '#d4d4d4'],
  ['    const', '#569cd6'], [' { data } = ', '#9cdcfe'],
  ['await', '#569cd6'], [" db.from('tickets')\n", '#9cdcfe'],
  ["      .insert({ title, status: ", '#d4d4d4'], ["'open'", '#ce9178'], [' })\n', '#d4d4d4'],
  ['    setTickets', '#dcdcaa'], ['(p => [...p, data])\n', '#d4d4d4'],
  ['    setLoading', '#dcdcaa'], ['(', '#d4d4d4'], ['false', '#569cd6'], [')\n', '#d4d4d4'],
  ['  }\n\n', '#d4d4d4'],

  ['  return', '#569cd6'], [' (\n', '#d4d4d4'],
  ['    <', '#808080'], ['div', '#4ec9b0'], [' className=', '#9cdcfe'],
  ['"board"', '#ce9178'], ['>\n', '#808080'],
  ['      {tickets.', '#d4d4d4'], ['map', '#dcdcaa'], ['(t => (\n', '#d4d4d4'],
  ['        <', '#808080'], ['TicketCard', '#4ec9b0'],
  [' key=', '#9cdcfe'], ['{t.id} ', '#d4d4d4'],
  ['data=', '#9cdcfe'], ['{t} />\n', '#d4d4d4'],
  ['      ))}\n', '#d4d4d4'],
  ['    </', '#808080'], ['div', '#4ec9b0'], ['>\n', '#808080'],
  ['  )\n', '#d4d4d4'],
  ['}', '#d4d4d4'],
]
const TOTAL_CHARS = CODE_TOKS.reduce((s, [v]) => s + v.length, 0)

function CodeEditor() {
  const [charCount, setCharCount] = useState(0)
  const ref = useRef(0)

  useEffect(() => {
    const iv = setInterval(() => {
      ref.current++
      if (ref.current > TOTAL_CHARS + 55) ref.current = 0
      setCharCount(ref.current)
    }, 30)
    return () => clearInterval(iv)
  }, [])

  // Build rendered tokens up to charCount chars
  let remaining = charCount
  const spans: JSX.Element[] = []
  let lineNum = 1
  let lineNumEls: JSX.Element[] = []
  let lineAccum = 0 // chars in current line
  let key = 0

  for (const [v, c] of CODE_TOKS) {
    if (remaining <= 0) break
    const visible = v.slice(0, remaining)
    remaining -= v.length

    // Split on newlines to track line numbers
    const parts = visible.split('\n')
    parts.forEach((part, pi) => {
      if (pi > 0) {
        lineNum++
        lineAccum = 0
      }
      if (part) {
        spans.push(<span key={key++} style={{ color: c }}>{part}</span>)
        lineAccum += part.length
      }
      if (pi < parts.length - 1) {
        spans.push(<br key={key++} />)
      }
    })
  }

  // Build line numbers array
  const lineNumbers = Array.from({ length: lineNum }, (_, i) => i + 1)

  return (
    <div style={{ background: '#1e1e1e', height: 190, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 10px', background: '#2d2d2d', borderBottom: '1px solid #3c3c3c', flexShrink: 0 }}>
        {['#ff5f57','#ffbd2e','#28c840'].map(c => (
          <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />
        ))}
        <div style={{ display: 'flex', marginLeft: 10, gap: 0 }}>
          <div style={{ padding: '1px 14px', background: '#1e1e1e', borderTop: '1px solid #007acc', color: '#ccc', fontSize: 10 }}>TicketBoard.tsx</div>
          <div style={{ padding: '1px 14px', background: '#2d2d2d', color: '#666', fontSize: 10 }}>db.ts</div>
        </div>
      </div>

      {/* Editor body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Line numbers */}
        <div style={{ color: '#4e4e4e', textAlign: 'right', padding: '8px 8px 8px 0', minWidth: 34, flexShrink: 0, lineHeight: 1.72, userSelect: 'none', background: '#1e1e1e', borderRight: '1px solid #2d2d2d' }}>
          {lineNumbers.map(n => <div key={n}>{n}</div>)}
        </div>

        {/* Code */}
        <div style={{ padding: '8px 10px', overflow: 'hidden', flex: 1, lineHeight: 1.72, whiteSpace: 'pre-wrap', color: '#d4d4d4', position: 'relative' }}>
          {spans}
          <span style={{ display: 'inline-block', width: 7, height: 13, background: '#aeafad', verticalAlign: 'text-bottom', animation: 'blinkCursor .9s step-end infinite', borderRadius: 1 }} />
        </div>
      </div>

      {/* Status bar */}
      <div style={{ display: 'flex', gap: 16, padding: '2px 10px', background: '#007acc', color: '#fff', fontSize: 9, flexShrink: 0 }}>
        <span>⎇ main</span><span>TypeScript React</span><span>UTF-8</span><span>fixpc.cl</span>
      </div>
    </div>
  )
}

// ─── bodybest: tienda de suplementos deportivos ────────────────────────────
const PRODUCTS = [
  { name: 'Whey Protein', sub: 'Chocolate 1 kg', price: '$24.990', badge: 'TOP VENTA', col: '#ec4899', icon: '💪', stock: 94 },
  { name: 'Pre-Workout', sub: 'Frutas 300 g',    price: '$18.500', badge: '-20%',      col: '#f59e0b', icon: '⚡', stock: 57 },
  { name: 'Creatina',    sub: 'Monohidrato 500g', price: '$12.990', badge: 'NUEVO',    col: '#06b6d4', icon: '🔬', stock: 82 },
]

function SupplementsViz() {
  const [cart, setCart] = useState(0)
  const [added, setAdded] = useState<number | null>(null)

  useEffect(() => {
    const iv = setInterval(() => {
      const idx = Math.floor(Math.random() * PRODUCTS.length)
      setAdded(idx)
      setCart(c => c + 1)
      setTimeout(() => setAdded(null), 900)
    }, 2400)
    return () => clearInterval(iv)
  }, [])

  const mono = "'JetBrains Mono',monospace"
  const sans = "'Poppins',sans-serif"

  return (
    <div style={{ background: 'linear-gradient(160deg,#0d001a,#1a0030)', height: 190, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(0,0,0,.4)', borderBottom: '1px solid rgba(236,72,153,.2)', flexShrink: 0 }}>
        <div style={{ fontFamily: sans, fontWeight: 900, fontSize: 13, background: 'linear-gradient(135deg,#ec4899,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          💪 BODYBEST
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontFamily: mono, fontSize: 8, color: '#9d64b8' }}>Suplementos · Nutrición · Fitness</div>
          <div style={{ position: 'relative', background: 'rgba(236,72,153,.2)', border: '1px solid rgba(236,72,153,.4)', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: '#f9a8d4' }}>
            🛒 {cart > 0 && <span style={{ position: 'absolute', top: -6, right: -6, background: '#ec4899', color: '#fff', borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, fontFamily: mono }}>{cart}</span>}
          </div>
        </div>
      </div>

      {/* Banner */}
      <div style={{ background: 'linear-gradient(90deg,rgba(236,72,153,.15),rgba(245,158,11,.15))', padding: '4px 12px', borderBottom: '1px solid rgba(245,158,11,.15)', flexShrink: 0 }}>
        <span style={{ fontFamily: mono, fontSize: 8, color: '#fcd34d', fontWeight: 700 }}>🔥 OFERTA DEL DÍA — Envío gratis sobre $30.000 · Pago con WebPay, MercadoPago</span>
      </div>

      {/* Products */}
      <div style={{ display: 'flex', gap: 8, padding: '8px 10px', flex: 1, overflow: 'hidden' }}>
        {PRODUCTS.map((p, i) => (
          <div key={p.name} style={{
            flex: 1, background: added === i ? `rgba(${p.col === '#ec4899' ? '236,72,153' : p.col === '#f59e0b' ? '245,158,11' : '6,182,212'},.25)` : 'rgba(255,255,255,.04)',
            border: `1px solid ${added === i ? p.col : 'rgba(255,255,255,.08)'}`,
            borderRadius: 10, padding: '8px', display: 'flex', flexDirection: 'column', gap: 4,
            transition: 'all .3s', position: 'relative',
          }}>
            {/* Badge */}
            <div style={{ position: 'absolute', top: 6, right: 6, background: p.col, color: '#000', fontSize: 7, fontWeight: 900, padding: '1px 5px', borderRadius: 4, fontFamily: mono }}>{p.badge}</div>
            <div style={{ fontSize: 22, textAlign: 'center' }}>{p.icon}</div>
            <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2 }}>{p.name}</div>
            <div style={{ fontFamily: mono, fontSize: 8, color: '#94a3b8' }}>{p.sub}</div>
            {/* Stock bar */}
            <div style={{ height: 3, background: 'rgba(255,255,255,.08)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${p.stock}%`, background: p.col, borderRadius: 2, transition: 'width .4s' }} />
            </div>
            <div style={{ fontFamily: mono, fontSize: 8, color: '#64748b' }}>Stock: {p.stock}%</div>
            <div style={{ fontFamily: sans, fontWeight: 900, fontSize: 12, color: p.col, marginTop: 'auto' }}>{p.price}</div>
            <div style={{
              background: p.col + '22', border: `1px solid ${p.col}55`, borderRadius: 6,
              padding: '3px 0', textAlign: 'center', fontFamily: mono, fontSize: 8, fontWeight: 700, color: p.col,
              transition: 'all .2s', ...(added === i ? { background: p.col, color: '#000' } : {}),
            }}>
              {added === i ? '✓ Agregado' : '+ Al carro'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── fixtemp: diagnóstico de hardware en tiempo real ───────────────────────
function FixtempViz() {
  const [metrics, setMetrics] = useState({ cpu: 38, ram: 52, disk: 61, gpu: 44, temp: 47 })
  const [scanLine, setScanLine] = useState(0)
  const [log, setLog] = useState<string[]>(['Inicializando diagnóstico...'])
  const LOGS = [
    'Detectando CPU: Intel Core i7-12700H ✓',
    'RAM: 16 GB DDR5 — sin errores ✓',
    'SSD NVMe 512 GB — salud: 98% ✓',
    'GPU: NVIDIA RTX 3060 — drivers OK ✓',
    'Red: WiFi 5GHz — latencia 8ms ✓',
    'Temperatura normal — sin throttling ✓',
    'Sistema: Windows 11 23H2 actualizado ✓',
    'Diagnóstico completo — Sin fallas ✓',
  ]
  const logIdx = useRef(0)

  useEffect(() => {
    const metIv = setInterval(() => {
      setMetrics({
        cpu:  20 + Math.floor(Math.random() * 60),
        ram:  45 + Math.floor(Math.random() * 30),
        disk: 55 + Math.floor(Math.random() * 20),
        gpu:  30 + Math.floor(Math.random() * 50),
        temp: 42 + Math.floor(Math.random() * 22),
      })
    }, 900)
    const scanIv = setInterval(() => setScanLine(l => (l + 1) % 190), 16)
    const logIv = setInterval(() => {
      if (logIdx.current < LOGS.length) {
        setLog(prev => [...prev.slice(-3), LOGS[logIdx.current++]])
      } else {
        logIdx.current = 0
        setLog(['Reiniciando escaneo...'])
      }
    }, 1100)
    return () => { clearInterval(metIv); clearInterval(scanIv); clearInterval(logIv) }
  }, [])

  const mono = "'JetBrains Mono',monospace"
  const col = (v: number) => v > 80 ? '#f87171' : v > 60 ? '#fbbf24' : '#4ade80'

  const Bar = ({ label, val, unit = '%' }: { label: string; val: number; unit?: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
      <div style={{ width: 34, fontFamily: mono, fontSize: 8, color: '#64748b', flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,.06)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${val}%`, background: `linear-gradient(90deg,${col(val)},${col(val)}aa)`, borderRadius: 3, transition: 'width .6s ease', boxShadow: `0 0 6px ${col(val)}88` }} />
      </div>
      <div style={{ width: 36, fontFamily: mono, fontSize: 8, color: col(val), textAlign: 'right', flexShrink: 0 }}>{val}{unit}</div>
    </div>
  )

  return (
    <div style={{ background: '#050d1a', height: 190, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Scan line effect */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: scanLine % 190, height: 1, background: 'rgba(6,182,212,.08)', pointerEvents: 'none', zIndex: 1 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', background: 'rgba(6,182,212,.08)', borderBottom: '1px solid rgba(6,182,212,.2)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'blink 1.4s ease-in-out infinite' }} />
          <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: '#06b6d4', letterSpacing: 2 }}>FIXTEMP DIAGNOSTIC</span>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#06b6d4,#7c3aed)', color: '#fff', fontFamily: mono, fontSize: 7, fontWeight: 900, padding: '2px 8px', borderRadius: 10 }}>🚀 PRÓXIMAMENTE</div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Metrics panel */}
        <div style={{ flex: 1, padding: '8px 12px', borderRight: '1px solid rgba(6,182,212,.1)' }}>
          <div style={{ fontFamily: mono, fontSize: 7, color: '#475569', marginBottom: 6, letterSpacing: 1 }}>── RECURSOS DEL SISTEMA ──</div>
          <Bar label="CPU" val={metrics.cpu} />
          <Bar label="RAM" val={metrics.ram} />
          <Bar label="DISCO" val={metrics.disk} />
          <Bar label="GPU" val={metrics.gpu} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, padding: '5px 8px', background: 'rgba(6,182,212,.06)', borderRadius: 6, border: '1px solid rgba(6,182,212,.15)' }}>
            <span style={{ fontSize: 14 }}>{metrics.temp > 60 ? '🔥' : '🌡️'}</span>
            <div>
              <div style={{ fontFamily: mono, fontSize: 7, color: '#475569' }}>TEMPERATURA CPU</div>
              <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 900, color: col(metrics.temp) }}>{metrics.temp}°C</div>
            </div>
          </div>
        </div>

        {/* Log panel */}
        <div style={{ width: 155, padding: '8px 10px', background: 'rgba(0,0,0,.3)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: mono, fontSize: 7, color: '#475569', marginBottom: 5, letterSpacing: 1 }}>── LOG DIAGNÓSTICO ──</div>
          {log.map((l, i) => (
            <div key={i} style={{ fontFamily: mono, fontSize: 7.5, color: l.includes('✓') ? '#4ade80' : '#67e8f9', lineHeight: 1.6, opacity: 0.6 + i * 0.15 }}>
              {'>'} {l}
            </div>
          ))}
          <div style={{ fontFamily: mono, fontSize: 7.5, color: '#67e8f9', animation: 'blinkCursor .8s step-end infinite' }}>█</div>
        </div>
      </div>
    </div>
  )
}

// ─── riosuradventure: paisaje con parallax y animaciones ───────────────────
function AdventureViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = 400, H = canvas.height = 190
    let animId: number, t = 0

    const drawMtn = (pts: number[][], fill: string) => {
      ctx.beginPath()
      ctx.moveTo(0, H)
      pts.forEach(([x, y]) => ctx.lineTo(x, y))
      ctx.lineTo(W, H); ctx.closePath()
      ctx.fillStyle = fill; ctx.fill()
    }

    const drawStar = (x: number, y: number, r: number, a: number) => {
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill()
    }

    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * 70,
      r: Math.random() * 1.2 + 0.3, phase: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, W, H)

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H)
      sky.addColorStop(0, '#060b18')
      sky.addColorStop(0.5, '#0e2240')
      sky.addColorStop(1, '#1a3a2a')
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H)

      // Moon + glow
      const moonGlow = ctx.createRadialGradient(330, 28, 0, 330, 28, 40)
      moonGlow.addColorStop(0, 'rgba(255,243,200,.15)')
      moonGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = moonGlow; ctx.fillRect(290, 0, 80, 80)
      ctx.beginPath(); ctx.arc(330, 28, 16, 0, Math.PI * 2)
      ctx.fillStyle = '#fef9c3'; ctx.fill()
      ctx.beginPath(); ctx.arc(338, 23, 14, 0, Math.PI * 2)
      ctx.fillStyle = '#060b18'; ctx.fill()  // crescent shadow

      // Stars twinkle
      stars.forEach(s => drawStar(s.x, s.y, s.r, 0.3 + 0.5 * Math.sin(t * 1.5 + s.phase)))

      // Mist band
      const mist = ctx.createLinearGradient(0, 90, 0, 120)
      mist.addColorStop(0, 'transparent')
      mist.addColorStop(0.5, 'rgba(100,180,200,.06)')
      mist.addColorStop(1, 'transparent')
      ctx.fillStyle = mist; ctx.fillRect(0, 90, W, 30)

      // Mountains far
      drawMtn([[0,110],[50,65],[110,85],[170,45],[230,75],[300,40],[360,68],[W,55]], '#0d2535')
      // Mountains mid
      drawMtn([[0,130],[40,90],[90,110],[150,70],[210,95],[270,62],[330,85],[W,75]], '#0a1f22')
      // Mountains near
      drawMtn([[0,145],[30,110],[70,125],[120,88],[175,108],[230,80],[290,105],[350,92],[W,100]], '#071812')

      // Pine trees
      const pines = [18,55,85,240,295,358]
      pines.forEach(px => {
        const h = 30 + Math.random() * 8
        ;[0, 6, 12].forEach(off => {
          ctx.beginPath()
          ctx.moveTo(px, 145 - off - h + off * 1.2)
          ctx.lineTo(px + 8 - off * 0.3, 145 - off)
          ctx.lineTo(px - 8 + off * 0.3, 145 - off)
          ctx.closePath()
          ctx.fillStyle = `rgba(4,${12 + off},${8 + off},.95)`; ctx.fill()
        })
        ctx.fillStyle = '#030c06'
        ctx.fillRect(px - 2, 145, 4, 10)
      })

      // River with shimmer
      const river = ctx.createLinearGradient(0, 145, 0, H)
      river.addColorStop(0, '#0c2d45')
      river.addColorStop(1, '#071e30')
      ctx.fillStyle = river; ctx.fillRect(0, 145, W, H - 145)

      // River shimmer lines
      for (let i = 0; i < 4; i++) {
        const ry = 153 + i * 10
        const shift = Math.sin(t * 1.2 + i) * 30
        ctx.beginPath()
        ctx.moveTo(shift, ry)
        ctx.bezierCurveTo(W * 0.3 + shift, ry - 2, W * 0.6 + shift, ry + 2, W + shift, ry)
        ctx.strokeStyle = `rgba(100,200,255,${0.04 + 0.03 * Math.sin(t + i)})`
        ctx.lineWidth = 1.5; ctx.stroke()
      }

      // Reflection of moon on river
      const refl = ctx.createLinearGradient(310, 148, 310, H)
      refl.addColorStop(0, 'rgba(255,243,200,.12)')
      refl.addColorStop(1, 'transparent')
      ctx.fillStyle = refl
      ctx.beginPath()
      ctx.ellipse(330, 165, 12, 22, 0, 0, Math.PI * 2)
      ctx.fill()

      // Clouds drifting
      ;[{ x: 40, y: 18, w: 55, d: 0.3 }, { x: 190, y: 30, w: 40, d: 0.2 }].forEach(c => {
        const cx = ((c.x + t * c.d * 15) % (W + 80)) - 40
        const g = ctx.createRadialGradient(cx + c.w / 2, c.y, 0, cx + c.w / 2, c.y, c.w / 2)
        g.addColorStop(0, 'rgba(255,255,255,.07)')
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.ellipse(cx + c.w / 2, c.y, c.w / 2, 10, 0, 0, Math.PI * 2); ctx.fill()
      })

      // Branding
      ctx.font = "bold 9px 'JetBrains Mono', monospace"
      ctx.fillStyle = 'rgba(74,222,128,.7)'
      ctx.fillText('RÍO SUR ADVENTURE', 10, H - 8)

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: 190, display: 'block' }} />
}

// ─── comfleet: dashboard de flotas en canvas ───────────────────────────────
function FleetViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = 400, H = canvas.height = 190
    let animId: number, t = 0

    // Fixed routes (bezier control points)
    const ROUTES = [
      { from: [50, 150], cp: [150, 80], to: [280, 55], col: '#f59e0b', truck: 0 },
      { from: [50, 150], cp: [120, 160], to: [210, 145], col: '#10b981', truck: 0 },
      { from: [280, 55], cp: [340, 70], to: [370, 100], col: '#06b6d4', truck: 0 },
    ]
    const PINS = [[50,150,'#f59e0b'],[280,55,'#10b981'],[210,145,'#06b6d4'],[370,100,'#ec4899']] as const

    // Trucks travel along bezier
    const bezier = (p0: number[], p1: number[], p2: number[], u: number) => {
      const x = (1-u)*(1-u)*p0[0] + 2*(1-u)*u*p1[0] + u*u*p2[0]
      const y = (1-u)*(1-u)*p0[1] + 2*(1-u)*u*p1[1] + u*u*p2[1]
      return [x, y]
    }

    const TRUCK_SPEEDS = [0.0025, 0.002, 0.003]
    const truckPos = [0, 0.3, 0.6]

    let delivered = 18
    const delIv = setInterval(() => { delivered++; if (delivered > 35) delivered = 18 }, 3200)

    const draw = () => {
      t += 0.01
      ctx.clearRect(0, 0, W, H)

      // Background
      const bg = ctx.createLinearGradient(0, 0, W, H)
      bg.addColorStop(0, '#07071a'); bg.addColorStop(1, '#0d0d24')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

      // Grid
      ctx.strokeStyle = 'rgba(245,158,11,.06)'
      ctx.lineWidth = 0.8
      for (let gx = 0; gx < W; gx += 35) { ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,H); ctx.stroke() }
      for (let gy = 0; gy < H; gy += 35) { ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(W,gy); ctx.stroke() }

      // Draw routes (dashed)
      ROUTES.forEach(r => {
        ctx.beginPath()
        ctx.setLineDash([5, 4])
        ctx.moveTo(r.from[0], r.from[1])
        ctx.quadraticCurveTo(r.cp[0], r.cp[1], r.to[0], r.to[1])
        ctx.strokeStyle = r.col + '40'
        ctx.lineWidth = 1.5; ctx.stroke()
        ctx.setLineDash([])
      })

      // Animated progress on each route
      ROUTES.forEach((r, i) => {
        truckPos[i] = (truckPos[i] + TRUCK_SPEEDS[i]) % 1
        const u = truckPos[i]

        // Partial route filled
        ctx.beginPath()
        ctx.moveTo(r.from[0], r.from[1])
        for (let s = 0; s <= u; s += 0.02) {
          const [px, py] = bezier(r.from, r.cp, r.to, s)
          ctx.lineTo(px, py)
        }
        ctx.strokeStyle = r.col
        ctx.lineWidth = 2
        ctx.shadowColor = r.col; ctx.shadowBlur = 6
        ctx.stroke()
        ctx.shadowBlur = 0

        // Truck icon at position
        const [tx, ty] = bezier(r.from, r.cp, r.to, u)
        ctx.font = '14px sans-serif'
        ctx.fillText('🚚', tx - 9, ty + 5)

        // Trail glow
        const tg = ctx.createRadialGradient(tx, ty, 0, tx, ty, 12)
        tg.addColorStop(0, r.col + '55')
        tg.addColorStop(1, 'transparent')
        ctx.fillStyle = tg; ctx.fillRect(tx - 12, ty - 12, 24, 24)
      })

      // Location pins with pulse
      PINS.forEach(([px, py, col], i) => {
        const pulse = Math.abs(Math.sin(t * 2 + i))
        // Outer pulse ring
        ctx.beginPath(); ctx.arc(px, py, 6 + pulse * 12, 0, Math.PI * 2)
        ctx.fillStyle = col + '22'; ctx.fill()
        // Inner dot
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2)
        ctx.fillStyle = col; ctx.fill()
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'; ctx.fill()
      })

      // HUD panel
      const hudW = 120, hudH = 82
      const hudX = W - hudW - 8, hudY = 8
      ctx.fillStyle = 'rgba(7,7,26,.88)'
      ctx.strokeStyle = 'rgba(245,158,11,.3)'
      ctx.lineWidth = 1
      roundRect(ctx, hudX, hudY, hudW, hudH, 8)
      ctx.fill(); ctx.stroke()

      ctx.font = "bold 9px 'JetBrains Mono', monospace"
      ctx.fillStyle = '#f59e0b'
      ctx.fillText('◈ COMFLEET', hudX + 8, hudY + 16)

      const rows = [
        ['En ruta',  `${ROUTES.length} camiones`, '#fbbf24'],
        ['Entregado', `${delivered} paquetes`, '#4ade80'],
        ['ETA avg',  '14 min', '#67e8f9'],
        ['Alertas',  '0', '#f87171'],
      ]
      rows.forEach(([label, val, col], i) => {
        const ry = hudY + 30 + i * 14
        ctx.font = "8px 'JetBrains Mono', monospace"
        ctx.fillStyle = '#6b7280'; ctx.fillText(label, hudX + 8, ry)
        ctx.fillStyle = col as string; ctx.fillText(val, hudX + 68, ry)
      })

      // Branding bottom-left
      ctx.font = "bold 8px 'JetBrains Mono', monospace"
      ctx.fillStyle = 'rgba(245,158,11,.5)'
      ctx.fillText('GESTIÓN DE FLOTAS · TIEMPO REAL', 8, H - 7)

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); clearInterval(delIv) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: 190, display: 'block' }} />
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// ─── Router ─────────────────────────────────────────────────────────────────
const MAP: Record<string, () => JSX.Element> = {
  fixpc: CodeEditor,
  bodybest: SupplementsViz,
  riosuradventure: AdventureViz,
  comfleet: FleetViz,
  fixtemp: FixtempViz,
}

export default function ProjectVisual({ id }: { id: string }) {
  const Component = MAP[id] ?? (() => null)
  return <Component />
}

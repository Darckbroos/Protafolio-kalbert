import { useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const CHIPS = [
  { label: 'Python',     fa: 'fa-brands fa-python',     top: '8%',  left: '2%',  depth: 0.10, color: '#3b82f6' },
  { label: 'React',      fa: 'fa-brands fa-react',      top: '18%', right: '2%', depth: 0.22, color: '#06b6d4' },
  { label: 'Docker',     fa: 'fa-brands fa-docker',     top: '74%', left: '0%',  depth: 0.08, color: '#2563eb' },
  { label: 'AWS',        fa: 'fa-brands fa-aws',        top: '80%', right: '4%', depth: 0.18, color: '#f59e0b' },
  { label: 'Terminal',   fa: 'fa-solid fa-terminal',    top: '46%', right: '0%', depth: 0.14, color: '#10b981' },
]

const FACES = [
  { cls: 'f-front',  fa: 'fa-brands fa-react',          label: 'React',    grad: 'linear-gradient(135deg,#0f2744,#0c4a6e)', accent: '#06b6d4' },
  { cls: 'f-back',   fa: 'fa-brands fa-python',         label: 'Python',   grad: 'linear-gradient(135deg,#1e1b4b,#312e81)', accent: '#818cf8' },
  { cls: 'f-left',   fa: 'fa-solid fa-shield-halved',   label: 'Security', grad: 'linear-gradient(135deg,#1c1917,#3b0764)', accent: '#a855f7' },
  { cls: 'f-right',  fa: 'fa-brands fa-docker',         label: 'Docker',   grad: 'linear-gradient(135deg,#0c2340,#1e3a5f)', accent: '#38bdf8' },
  { cls: 'f-top',    fa: 'fa-brands fa-aws',            label: 'AWS',      grad: 'linear-gradient(135deg,#1c1400,#451a03)', accent: '#f59e0b' },
  { cls: 'f-bottom', fa: 'fa-solid fa-database',        label: 'SQL/NoSQL',grad: 'linear-gradient(135deg,#052e16,#14532d)', accent: '#4ade80' },
]

const AUTO_SPIN = 0.28

export default function Hero() {
  const text = useTypewriter()
  const cubeRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    let spinX = 12, spinY = 0
    let velX = 0, velY = 0
    let tVelX = 0, tVelY = 0
    const depths = CHIPS.map(c => c.depth)
    const cx = new Array(CHIPS.length).fill(0)
    const cy = new Array(CHIPS.length).fill(0)
    const tcx = new Array(CHIPS.length).fill(0)
    const tcy = new Array(CHIPS.length).fill(0)
    let animId: number

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / innerWidth) * 2 - 1   // -1 (left) … +1 (right)
      const ny = (e.clientY / innerHeight) * 2 - 1  // -1 (top)  … +1 (bottom)
      tVelX =  ny * 2.2   // mouse down  → spin forward on X
      tVelY =  nx * 2.2   // mouse right → spin right on Y (auto-spin added separately)
      CHIPS.forEach((_, i) => {
        tcx[i] = nx * depths[i] * 80
        tcy[i] = ny * depths[i] * 80
      })
    }
    window.addEventListener('mousemove', onMove)

    const L = 0.07, Lc = 0.055
    const tick = () => {
      velX += (tVelX - velX) * L
      velY += (tVelY - velY) * L
      spinX += velX
      spinY += velY + AUTO_SPIN   // constant drift separate from mouse
      cube.style.transform = `rotateX(${spinX}deg) rotateY(${spinY}deg)`

      chipsRef.current.forEach((el, i) => {
        if (!el) return
        cx[i] += (tcx[i] - cx[i]) * Lc
        cy[i] += (tcy[i] - cy[i]) * Lc
        el.style.transform = `translate3d(${cx[i]}px,${cy[i]}px,${depths[i] * 60}px)`
      })
      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section id="hero">
      <div className="hero-glow" />
      <div className="hero-layout">

        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            Disponible para proyectos
          </div>
          <h1 className="hero-title">
            <span className="line1">Tu negocio necesita</span>
            <span className="line2">código que funcione.</span>
          </h1>
          <div className="typewriter-wrap">
            {text}<span className="cursor">|</span>
          </div>
          <p className="hero-desc">
            Soy <strong>Kalbert Contreras</strong>, Full Stack Developer &amp; especialista en Ciberseguridad.
            Construyo plataformas web reales — <strong>código propio, sin plantillas</strong> — que escalan y
            se mantienen fácil. Con +4 años de experiencia en proyectos vivos.
          </p>
          <div className="hero-btns">
            <a href="#contacto" className="btn-p">
              <i className="fa-solid fa-rocket" /> Hablemos de tu proyecto
            </a>
            <a href="#proyectos" className="btn-o">
              <i className="fa-solid fa-eye" /> Ver proyectos
            </a>
          </div>
          <div className="hero-stats">
            <div><div className="stat-n">+4</div><div className="stat-l">Años experiencia</div></div>
            <div><div className="stat-n">3</div><div className="stat-l">Proyectos en producción</div></div>
            <div><div className="stat-n">6+</div><div className="stat-l">Tecnologías dominadas</div></div>
          </div>
        </div>

        <div className="hero-right">
          {CHIPS.map((c, i) => (
            <div
              key={c.label}
              className="ft"
              ref={el => { chipsRef.current[i] = el }}
              style={{ top: c.top, left: (c as any).left, right: (c as any).right, position: 'absolute' }}
            >
              <i className={c.fa} style={{ color: c.color, fontSize: '1rem' }} />
              {c.label}
            </div>
          ))}

          <div className="scene">
            <div className="cube" ref={cubeRef}>
              {FACES.map(f => (
                <div
                  key={f.cls}
                  className={`face ${f.cls}`}
                  style={{ background: f.grad, borderColor: `${f.accent}44` }}
                >
                  <div className="face-icon-wrap" style={{ background: `${f.accent}22`, border: `1.5px solid ${f.accent}55` }}>
                    <i className={f.fa} style={{ color: f.accent, fontSize: '2rem' }} />
                  </div>
                  <span className="face-label" style={{ color: f.accent }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

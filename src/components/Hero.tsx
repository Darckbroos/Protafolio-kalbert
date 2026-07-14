import { useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const CHIPS = [
  { label: 'Python', icon: '🐍', top: '8%',  left: '5%',  depth: 0.10 },
  { label: 'React',  icon: '⚛️', top: '20%', right: '4%', depth: 0.22 },
  { label: 'Docker', icon: '🐳', top: '72%', left: '3%',  depth: 0.08 },
  { label: 'AWS',    icon: '☁️', top: '78%', right: '6%', depth: 0.18 },
  { label: 'AI',     icon: '🤖', top: '45%', right: '2%', depth: 0.14 },
]

const FACES = [
  { cls: 'f-front',  icon: '⚛️', label: 'REACT'    },
  { cls: 'f-back',   icon: '🐍', label: 'PYTHON'   },
  { cls: 'f-left',   icon: '🛡️', label: 'SECURITY' },
  { cls: 'f-right',  icon: '☁️', label: 'AWS'      },
  { cls: 'f-top',    icon: '🐳', label: 'DOCKER'   },
  { cls: 'f-bottom', icon: '🗄️', label: 'SQL'      },
]

export default function Hero() {
  const text = useTypewriter()
  const cubeRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLDivElement[]>([])
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    let spinX = 15, spinY = 0
    let velX = 0, velY = 0.35
    let tVelX = 0, tVelY = 0.35
    const depths = CHIPS.map(c => c.depth)
    const cx = new Array(CHIPS.length).fill(0)
    const cy = new Array(CHIPS.length).fill(0)
    const tcx = new Array(CHIPS.length).fill(0)
    const tcy = new Array(CHIPS.length).fill(0)
    let animId: number

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / innerWidth) * 2 - 1
      const ny = (e.clientY / innerHeight) * 2 - 1
      tVelX = ny * 2.0
      tVelY = 0.35 + nx * 2.0
      CHIPS.forEach((_, i) => {
        tcx[i] = nx * depths[i] * 80
        tcy[i] = ny * depths[i] * 80
      })
    }
    window.addEventListener('mousemove', onMove)

    const L = 0.07, Lc = 0.06
    const tick = () => {
      velX += (tVelX - velX) * L
      velY += (tVelY - velY) * L
      spinX += velX
      spinY += velY
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
            Soy <strong>Kalbert Contreras</strong>, Full Stack Developer & especialista en Ciberseguridad.
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
            <div>
              <div className="stat-n">+4</div>
              <div className="stat-l">Años experiencia</div>
            </div>
            <div>
              <div className="stat-n">3</div>
              <div className="stat-l">Proyectos en producción</div>
            </div>
            <div>
              <div className="stat-n">6+</div>
              <div className="stat-l">Tecnologías dominadas</div>
            </div>
          </div>
        </div>

        <div className="hero-right" ref={rightRef} style={{ perspective: '900px', transformStyle: 'preserve-3d' }}>
          {CHIPS.map((c, i) => (
            <div
              key={c.label}
              className="ft"
              ref={el => { if (el) chipsRef.current[i] = el }}
              style={{ top: c.top, left: (c as any).left, right: (c as any).right, position: 'absolute' }}
            >
              <span>{c.icon}</span>{c.label}
            </div>
          ))}
          <div className="scene">
            <div className="cube" ref={cubeRef}>
              {FACES.map(f => (
                <div key={f.cls} className={`face ${f.cls}`}>
                  <span style={{ fontSize: '2.8rem' }}>{f.icon}</span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

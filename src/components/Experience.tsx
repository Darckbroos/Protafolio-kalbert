import { useEffect, useRef } from 'react'
import { EXPERIENCE } from '../data'

export default function Experience() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handlers: Array<{ el: HTMLDivElement; move: (e: MouseEvent) => void; leave: () => void }> = []
    cardsRef.current.forEach(card => {
      if (!card) return
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        const rx = (y - 0.5) * -14
        const ry = (x - 0.5) * 14
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`
        const glow = card.querySelector<HTMLDivElement>('.exp-glow')
        if (glow) {
          glow.style.setProperty('--gx', `${x * 100}%`)
          glow.style.setProperty('--gy', `${y * 100}%`)
          glow.style.opacity = '1'
        }
      }
      const leave = () => {
        card.style.transform = ''
        const glow = card.querySelector<HTMLDivElement>('.exp-glow')
        if (glow) glow.style.opacity = '0'
      }
      card.addEventListener('mousemove', move)
      card.addEventListener('mouseleave', leave)
      handlers.push({ el: card, move, leave })
    })
    return () => handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    })
  }, [])

  return (
    <section id="experiencia">
      <div className="sec-header reveal">
        <div className="sec-tag">Trayectoria</div>
        <h2 className="sec-title">Experiencia <span>real</span></h2>
        <p className="sec-desc">Empresas reales, problemas reales, soluciones que quedaron funcionando.</p>
      </div>

      <div className="exp3d">
        <div className="exp3d-line" />

        {EXPERIENCE.map((e, i) => {
          const isLeft = i % 2 === 0
          return (
            <div key={e.role} className={`exp3d-row${isLeft ? '' : ' exp3d-row--r'}`}>
              <div className="exp3d-slot-a">
                <div
                  className="exp3d-card reveal"
                  ref={el => { cardsRef.current[i] = el }}
                  style={{ '--exp-accent': e.borderColor } as React.CSSProperties}
                >
                  <div className="exp-glow" />
                  <div className="exp3d-period">{e.period}</div>
                  <div className="exp3d-role">{e.role}</div>
                  <div className="exp3d-company" style={{ color: e.iconColor }}>{e.company}</div>
                  <ul className="exp3d-points">
                    {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                </div>
              </div>

              <div className="exp3d-center">
                <div className="exp3d-dot reveal" style={{ borderColor: e.borderColor }}>
                  <i className={e.iconClass} style={{ color: e.iconColor }} />
                  <span className="exp3d-dot-ring" style={{ borderColor: e.borderColor }} />
                </div>
              </div>

              <div className="exp3d-slot-b" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

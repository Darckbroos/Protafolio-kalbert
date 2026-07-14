import { useEffect, useRef } from 'react'
import { PROJECTS } from '../data'
import ProjectVisual from './ProjectVisual'

export default function Projects() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handlers: Array<{ el: HTMLDivElement, move: (e: MouseEvent) => void, leave: () => void }> = []
    cardsRef.current.forEach(card => {
      if (!card) return
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        const rx = (y - 0.5) * -16
        const ry = (x - 0.5) * 16
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`
        const shine = card.querySelector<HTMLDivElement>('.shine')
        if (shine) { shine.style.setProperty('--sx', `${x * 100}%`); shine.style.setProperty('--sy', `${y * 100}%`) }
      }
      const leave = () => { card.style.transform = '' }
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
    <section id="proyectos">
      <div className="sec-header reveal">
        <div className="sec-tag">Proyectos reales</div>
        <h2 className="sec-title">Código en <span>producción</span></h2>
        <p className="sec-desc">No son maquetas ni demos. Son plataformas reales, usadas por clientes reales, construidas desde cero.</p>
      </div>
      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <div key={p.title} className="proj-card reveal" ref={el => { cardsRef.current[i] = el }}>
            <ProjectVisual id={p.id} />
            <div className="proj-body">
              <div className="proj-cat" style={{ color: p.catColor }}>{p.cat}</div>
              <div className="proj-title">
                {p.title}
                {p.honor && <span className="badge-honor">★ Distinción</span>}
                {p.soon && <span className="badge-soon">🚀 Próximamente</span>}
              </div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map(s => <span key={s} className="proj-tag">{s}</span>)}
              </div>
            </div>
            <div className="shine" />
          </div>
        ))}
      </div>
    </section>
  )
}

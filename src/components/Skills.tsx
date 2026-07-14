import { useEffect, useRef } from 'react'
import { SKILLS } from '../data'

export default function Skills() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handlers: Array<{ el: HTMLDivElement, move: (e: MouseEvent) => void, leave: () => void }> = []
    cardsRef.current.forEach(card => {
      if (!card) return
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.03,1.03,1.03)`
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
    <section id="skills">
      <div className="sec-header reveal">
        <div className="sec-tag">Stack técnico</div>
        <h2 className="sec-title">Tecnologías que <span>domino</span></h2>
        <p className="sec-desc">No aprendo en tus proyectos. Llego con stack sólido y experiencia en producción.</p>
      </div>
      <div className="skills-cats">
        {SKILLS.map((cat, i) => (
          <div
            key={cat.title}
            className="skill-cat reveal"
            ref={el => { cardsRef.current[i] = el }}
          >
            <div className="cat-header">
              <div className="cat-icon" style={{ background: cat.color }}>
                <i className={cat.icon} style={{ color: cat.iconColor }} />
              </div>
              <div>
                <div className="cat-title">{cat.title}</div>
                <div className="cat-sub">{cat.sub}</div>
              </div>
            </div>
            <div className="tags">
              {cat.tags.map(t => (
                <span key={t} className={`tag ${cat.variant}`}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

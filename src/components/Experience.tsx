import { EXPERIENCE } from '../data'

export default function Experience() {
  return (
    <section id="experiencia">
      <div className="sec-header reveal">
        <div className="sec-tag">Trayectoria</div>
        <h2 className="sec-title">Experiencia <span>real</span></h2>
        <p className="sec-desc">Empresas reales, problemas reales, soluciones que quedaron funcionando.</p>
      </div>
      <div className="timeline">
        {EXPERIENCE.map(e => (
          <div key={e.role} className="tl-item reveal">
            <div className="tl-dot" style={{ borderColor: e.borderColor }}>
              <i className={e.iconClass} style={{ color: e.iconColor }} />
            </div>
            <div className="tl-content">
              <div className="tl-period">{e.period}</div>
              <div className="tl-role">{e.role}</div>
              <div className="tl-company">{e.company}</div>
              <ul className="tl-points">
                {e.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

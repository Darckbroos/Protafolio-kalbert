import { CERTS } from '../data'

export default function Certifications() {
  return (
    <section id="certificaciones">
      <div className="sec-header reveal">
        <div className="sec-tag">Formación</div>
        <h2 className="sec-title">Educación & <span>certificaciones</span></h2>
      </div>
      <div className="certs-grid">
        {CERTS.map(c => (
          <div key={c.title} className="cert-card reveal">
            <span className="cert-icon">{c.icon}</span>
            <div>
              <div className="cert-title">{c.title}</div>
              <div className="cert-inst">{c.inst}</div>
              <div className="cert-date">{c.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

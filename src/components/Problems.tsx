const PROBLEMS = [
  { icon: '💸', title: '¿Pagaste por un sitio y no vende?', text: 'Te entregaron algo bonito pero sin conversión, sin SEO y sin resultados reales para tu negocio.' },
  { icon: '🐌', title: '¿Tu plataforma va lenta o se cae?', text: 'Un sitio lento pierde clientes. Si tu proveedor no resuelve, el problema crece.' },
  { icon: '🔒', title: '¿Te preocupa la seguridad de tus datos?', text: 'Brechas de seguridad arruinan reputaciones. La mayoría de los proyectos ignoran esto.' },
  { icon: '🤷', title: '¿No entiendes qué hizo tu desarrollador?', text: 'Código heredado, sin documentar, que nadie puede mantener. Es pan para hoy, hambre para mañana.' },
]

export default function Problems() {
  return (
    <section id="problemas">
      <div className="sec-header reveal">
        <div className="sec-tag">El problema real</div>
        <h2 className="sec-title">¿Te suena <span>familiar</span>?</h2>
        <p className="sec-desc">Estos son los problemas que escucho de mis clientes antes de trabajar conmigo.</p>
      </div>
      <div className="prob-grid">
        {PROBLEMS.map(p => (
          <div key={p.title} className="prob-card reveal">
            <div className="prob-emoji">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
      <div className="prob-resolve reveal">
        <p>
          Yo llego con <span className="hl">código propio, stack moderno</span> y una mentalidad de
          <span className="hl"> seguridad desde el primer día</span>. Sin plantillas. Sin excusas.
          Con resultados medibles y un sistema que tú mismo puedes entender.
        </p>
        <a href="#contacto" className="btn-p">
          <i className="fa-solid fa-arrow-right" /> Resolver mi problema ahora
        </a>
      </div>
    </section>
  )
}

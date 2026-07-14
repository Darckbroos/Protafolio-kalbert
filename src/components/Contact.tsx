export default function Contact() {
  return (
    <section id="contacto">
      <div className="cta-box reveal">
        <h2>¿Listo para tener una plataforma que realmente funcione?</h2>
        <p>Cuéntame tu proyecto. Primera consulta sin costo. Respondo en menos de 24h.</p>
        <div className="cta-btns">
          <a href="https://wa.me/56939291484?text=Hola%20Kalbert%2C%20quiero%20hablar%20sobre%20un%20proyecto" className="btn-white" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp" /> WhatsApp directo
          </a>
          <a href="mailto:kalbert.contreras@gmail.com" className="btn-glass">
            <i className="fa-solid fa-envelope" /> Enviar email
          </a>
        </div>
      </div>
      <div className="social-links reveal">
        <a href="https://github.com/Darckbroos" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="fa-brands fa-github" />
        </a>
        <a href="https://linkedin.com/in/kalbert-contreras" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fa-brands fa-linkedin-in" />
        </a>
        <a href="mailto:kalbert.contreras@gmail.com" className="social-link" aria-label="Email">
          <i className="fa-solid fa-envelope" />
        </a>
        <a href="https://wa.me/56939291484" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <i className="fa-brands fa-whatsapp" />
        </a>
      </div>
    </section>
  )
}

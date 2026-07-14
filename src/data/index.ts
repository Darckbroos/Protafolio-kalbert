export const SKILLS = [
  {
    title: 'Backend', sub: 'Servidor & APIs REST',
    icon: 'fa-solid fa-code', color: 'rgba(124,58,237,.15)', iconColor: 'var(--p2)',
    variant: '', tags: ['Python', 'Django', 'Flask', 'Node.js', 'PHP', 'APIs REST', 'Ruby on Rails'],
  },
  {
    title: 'Frontend', sub: 'Interfaces & UX',
    icon: 'fa-solid fa-palette', color: 'rgba(6,182,212,.15)', iconColor: 'var(--s2)',
    variant: 's', tags: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML5/CSS3', 'Bootstrap', 'GSAP'],
  },
  {
    title: 'DevOps & Cloud', sub: 'Infraestructura & CI/CD',
    icon: 'fa-brands fa-docker', color: 'rgba(16,185,129,.15)', iconColor: '#6ee7b7',
    variant: 'g', tags: ['Docker', 'AWS EC2/RDS/S3', 'GitHub Actions', 'Nginx', 'CI/CD', 'Ansible', 'Linux/Ubuntu'],
  },
  {
    title: 'Ciberseguridad', sub: 'Diplomado UDLA · Relator SENCE',
    icon: 'fa-solid fa-shield-halved', color: 'rgba(239,68,68,.15)', iconColor: '#fca5a5',
    variant: 'r', tags: ['Kali Linux', 'OWASP ZAP', 'Pentesting', 'COBIT 5', 'NIST CSF', 'Hacking Ético'],
  },
  {
    title: 'Bases de Datos', sub: 'SQL & NoSQL',
    icon: 'fa-solid fa-database', color: 'rgba(245,158,11,.15)', iconColor: '#fcd34d',
    variant: 'a', tags: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'SQLite'],
  },
  {
    title: 'Agentes IA', sub: 'Prompting avanzado',
    icon: 'fa-solid fa-robot', color: 'rgba(236,72,153,.15)', iconColor: '#f9a8d4',
    variant: 'pk', tags: ['Claude', 'ChatGPT', 'Codex', 'Gemini', 'DeepSeek', 'OpenCode'],
  },
]

export const PROJECTS = [
  {
    id: 'fixpc',
    cat: 'Desarrollo Web', catColor: 'var(--p2)',
    title: 'fixpc.cl', honor: false, soon: false,
    desc: 'Plataforma de desarrollo web con sistema de tickets, portal de clientes y soporte técnico integrado. Código propio, sin plantillas.',
    stack: ['ReactJS', 'Django', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'bodybest',
    cat: 'Tienda de Suplementos', catColor: 'var(--pk)',
    title: 'bodybest.cl', honor: false, soon: false,
    desc: 'E-commerce de suplementos deportivos con catálogo dinámico, carrito a medida, pagos integrados y SEO técnico optimizado.',
    stack: ['ReactJS', 'Django', 'PostgreSQL', 'MercadoPago', 'AWS'],
  },
  {
    id: 'riosuradventure',
    cat: 'Turismo & Aventura', catColor: 'var(--g)',
    title: 'riosuradventure.cl', honor: false, soon: false,
    desc: 'Plataforma de turismo con galería multimedia, sistema de reservas online, rutas interactivas y UX orientado a conversión.',
    stack: ['HTML5/CSS3', 'JavaScript', 'Bootstrap', 'Django'],
  },
  {
    id: 'comfleet',
    cat: 'Gestión de Flotas', catColor: 'var(--a)',
    title: 'ComFleet', honor: true, soon: false,
    desc: 'Plataforma de gestión de flotas de envío con geolocalización Google Maps y notificaciones en tiempo real. Tesis con distinción universitaria.',
    stack: ['Django', 'React', 'Google Maps API', 'Firebase', 'PostgreSQL'],
  },
  {
    id: 'fixtemp',
    cat: 'Diagnóstico de Equipos', catColor: 'var(--s)',
    title: 'fixtemp', honor: false, soon: true,
    desc: 'Herramienta de diagnóstico automático para PC y notebooks — detecta fallas de hardware, temperatura, RAM y disco en minutos.',
    stack: ['Python', 'Electron', 'React', 'SQLite'],
  },
]

export const EXPERIENCE = [
  {
    period: '2024 – 2026', role: 'Desarrollo Independiente & Capacitación',
    company: 'Trabajo Propio · Freelance', iconClass: 'fa-solid fa-laptop-code',
    borderColor: 'var(--p)', iconColor: 'var(--p)',
    points: [
      'Desarrollo y mantención de bodybest.cl, riosuradventure.cl y fixpc.cl con stack ReactJS/Django/PostgreSQL/AWS.',
      'Aprobado como Relator Informático SENCE — módulos de Hacking Ético, Cloud y Frontend.',
      'Diplomado en Ciberseguridad (Kali Linux, Pentesting, OWASP, COBIT 5, NIST).',
    ],
  },
  {
    period: 'Jul 2023 – Feb 2024', role: 'Desarrollador Full Stack & ETL',
    company: 'ZEN LATAM LIMITADA', iconClass: 'fa-solid fa-code',
    borderColor: 'var(--s)', iconColor: 'var(--s)',
    points: [
      'APIs REST en Python/Django con caché Redis (−30% tiempo de proceso).',
      'Pipelines ETL en Pentaho — extracción multifuente a PostgreSQL/SQL Server.',
      'Servidores Ubuntu con Nginx + Gunicorn + SSL, monitoreo Sentry (−25% errores).',
      'Migración a AWS RDS y automatización de backups.',
    ],
  },
  {
    period: 'Mar 2023 – Jul 2023', role: 'Soporte Técnico Superior',
    company: 'Ministerio de Salud', iconClass: 'fa-solid fa-hospital',
    borderColor: 'var(--g)', iconColor: 'var(--g)',
    points: [
      'Mantenimiento preventivo/correctivo en 15 centros de salud (−20% inactividad).',
      'Instalación y actualización de software de gestión clínica con parches de seguridad.',
    ],
  },
  {
    period: 'Ene 2023 – Mar 2023', role: 'Desarrollador Full Stack Node.js/React',
    company: 'AUTOMATISMOS LAU', iconClass: 'fa-brands fa-react',
    borderColor: 'var(--a)', iconColor: 'var(--a)',
    points: [
      'Portal interno con Node.js/Express + React (Hooks, Context API, Bootstrap).',
      'Máquinas de estado en Node.js para flujos de pedidos, reduciendo errores lógicos.',
    ],
  },
  {
    period: 'May 2022 – Nov 2022', role: 'Soporte Técnico',
    company: 'Banco Santander', iconClass: 'fa-solid fa-landmark',
    borderColor: 'var(--pk)', iconColor: 'var(--pk)',
    points: [
      'Configuración de estaciones e implementación de VLANs segmentadas.',
      'Capacitación a técnicos junior en diagnóstico de incidentes.',
    ],
  },
]

export const CERTS = [
  {
    icon: '🎓', title: 'Ingeniero en Ejecución Informática',
    inst: 'Universidad de Las Américas',
    date: '2018 – 2022 · Tesis ComFleet — Mención de Honor',
  },
  {
    icon: '🛡️', title: 'Diplomado en Ciberseguridad',
    inst: 'Universidad de Las Américas — UDLA',
    date: 'Mar – Sep 2024 · Kali Linux, Pentesting, COBIT, NIST',
  },
  {
    icon: '📋', title: 'Relator Informático REUF SENCE',
    inst: 'SENCE Chile',
    date: 'Aprobado Oct 2025 · Hacking Ético, Redes, Cloud, Vue',
  },
]

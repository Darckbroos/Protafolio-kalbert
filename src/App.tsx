import { useEffect } from 'react'
import ParticlesCanvas from './components/ParticlesCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Skills from './components/Skills'
import Projects from './components/Projects'
import DesignShowcase from './components/DesignShowcase'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          e.target.classList.remove('exit-up')
        } else {
          // Exiting upward (scrolled past) → slide out up
          // Exiting downward (not reached yet) → reset to slide-in-from-below
          if (e.boundingClientRect.top < 0) {
            e.target.classList.add('exit-up')
          }
          e.target.classList.remove('visible')
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <ParticlesCanvas />
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <DesignShowcase />
      <Experience />
      <Certifications />
      <Problems />
      <Contact />
      <Footer />
    </>
  )
}

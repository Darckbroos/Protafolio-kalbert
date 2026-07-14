import { useEffect, useState } from 'react'

const ROLES = [
  'Full Stack Developer',
  'Especialista en Ciberseguridad',
  'Relator Informático SENCE',
  'Python · Django · React',
  'DevOps · Docker · AWS',
  'Código propio, sin plantillas',
]

export function useTypewriter() {
  const [text, setText] = useState('')

  useEffect(() => {
    let ri = 0, ci = 0, deleting = false
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const word = ROLES[ri]
      setText(deleting ? word.slice(0, ci--) : word.slice(0, ci++))

      if (!deleting && ci > word.length) {
        deleting = true
        timer = setTimeout(tick, 1400)
        return
      }
      if (deleting && ci < 0) {
        deleting = false
        ri = (ri + 1) % ROLES.length
        ci = 0
      }
      timer = setTimeout(tick, deleting ? 45 : 85)
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return text
}

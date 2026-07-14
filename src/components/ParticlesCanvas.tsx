import { useEffect, useRef } from 'react'

const COLORS = ['#7c3aed', '#06b6d4', '#ec4899', '#f59e0b', '#10b981']
const REPEL_RADIUS = 130
const REPEL_FORCE  = 0.55
const MAX_SPEED    = 3.0
const FRICTION     = 0.97

interface Particle {
  x: number; y: number
  vx: number; vy: number
  bvx: number; bvy: number   // base velocity (natural drift)
  r: number; col: string; op: number
}

export default function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let W = 0, H = 0, pts: Particle[] = []
    let mx = -9999, my = -9999   // mouse off-screen initially

    const resize = () => {
      W = canvas.width  = innerWidth
      H = canvas.height = innerHeight
      pts = Array.from({ length: 90 }, () => {
        const bvx = (Math.random() - .5) * .45
        const bvy = (Math.random() - .5) * .45
        return {
          x: Math.random() * W, y: Math.random() * H,
          vx: bvx, vy: bvy, bvx, bvy,
          r: Math.random() * 1.5 + .5,
          col: COLORS[Math.floor(Math.random() * COLORS.length)],
          op: Math.random() * .5 + .15,
        }
      })
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)
    const onLeave = () => { mx = -9999; my = -9999 }
    window.addEventListener('mouseleave', onLeave)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      pts.forEach(p => {
        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_RADIUS && dist > 0) {
          const strength = (REPEL_RADIUS - dist) / REPEL_RADIUS
          p.vx += (dx / dist) * strength * REPEL_FORCE
          p.vy += (dy / dist) * strength * REPEL_FORCE
        }

        // Friction + drift back toward base velocity
        p.vx = p.vx * FRICTION + (p.bvx - p.vx) * 0.01
        p.vy = p.vy * FRICTION + (p.bvy - p.vy) * 0.01

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > MAX_SPEED) { p.vx = (p.vx / spd) * MAX_SPEED; p.vy = (p.vy / spd) * MAX_SPEED }

        p.x += p.vx; p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.col
        ctx.globalAlpha = p.op
        ctx.fill()
      })

      // Connecting lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = pts[i].col
            ctx.globalAlpha = (1 - d / 130) * .12
            ctx.lineWidth = .6
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

import { useEffect, useRef } from 'react'
import './neural-field.css'

const VOID = '#05070b'
const NODE_COLOR = '94, 234, 255'
const FIRE_COLOR = '180, 140, 255'

const LINK_DISTANCE = 150
const POINTER_RADIUS = 170
const MAX_DPR = 2

function nodeCountFor(width, height) {
  const area = width * height
  return Math.max(36, Math.min(110, Math.round(area / 21000)))
}

export function NeuralField({ paused }) {
  const canvasRef = useRef(null)
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext && canvas.getContext('2d')
    if (!ctx) return undefined

    const prefersReduced = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let nodes = []
    let pulses = []
    let rafId = null
    let lastTime = 0
    let hidden = document.visibilityState === 'hidden'
    const pointer = { x: -9999, y: -9999 }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const targetCount = nodeCountFor(width, height)
      if (nodes.length === 0) {
        nodes = Array.from({ length: targetCount }, () => spawnNode(width, height))
      } else {
        nodes.forEach((n) => {
          n.x = Math.min(n.x, width)
          n.y = Math.min(n.y, height)
        })
      }
    }

    function spawnNode(w, h) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.012 + Math.random() * 0.02
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      }
    }

    function step(dt) {
      nodes.forEach((n) => {
        const dxp = pointer.x - n.x
        const dyp = pointer.y - n.y
        const dist = Math.hypot(dxp, dyp)
        if (dist < POINTER_RADIUS && dist > 0.01) {
          const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.0015
          n.vx -= (dxp / dist) * force * dt
          n.vy -= (dyp / dist) * force * dt
        }

        n.x += n.vx * dt
        n.y += n.vy * dt

        const speed = Math.hypot(n.vx, n.vy)
        const maxSpeed = 0.09
        if (speed > maxSpeed) {
          n.vx = (n.vx / speed) * maxSpeed
          n.vy = (n.vy / speed) * maxSpeed
        }

        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        n.x = Math.max(0, Math.min(width, n.x))
        n.y = Math.max(0, Math.min(height, n.y))
      })

      if (!prefersReduced && Math.random() < dt * 0.0006 && nodes.length > 1) {
        spawnRandomPulse()
      }

      pulses = pulses.filter((p) => {
        p.t += dt / p.duration
        return p.t < 1
      })
    }

    function spawnRandomPulse() {
      const a = nodes[Math.floor(Math.random() * nodes.length)]
      let nearest = null
      let nearestDist = Infinity
      nodes.forEach((b) => {
        if (b === a) return
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < LINK_DISTANCE && d < nearestDist) {
          nearest = b
          nearestDist = d
        }
      })
      if (nearest) {
        pulses.push({ a, b: nearest, t: 0, duration: 700 + Math.random() * 500, color: NODE_COLOR })
      }
    }

    function spawnBurstAt(x, y) {
      let closest = null
      let closestDist = Infinity
      nodes.forEach((n) => {
        const d = Math.hypot(n.x - x, n.y - y)
        if (d < closestDist) {
          closest = n
          closestDist = d
        }
      })
      if (!closest) return
      const origin = { x, y }
      const neighbours = nodes
        .filter((n) => n !== closest)
        .map((n) => ({ n, d: Math.hypot(n.x - closest.x, n.y - closest.y) }))
        .filter((e) => e.d < LINK_DISTANCE * 1.4)
        .sort((e1, e2) => e1.d - e2.d)
        .slice(0, 4)

      pulses.push({ a: origin, b: closest, t: 0, duration: 420, color: FIRE_COLOR, ring: true })
      neighbours.forEach(({ n }) => {
        pulses.push({ a: closest, b: n, t: 0, duration: 550 + Math.random() * 300, color: FIRE_COLOR })
      })
    }

    function draw() {
      ctx.fillStyle = 'rgba(5, 7, 11, 0.34)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * 0.35
            ctx.strokeStyle = `rgba(${NODE_COLOR}, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${NODE_COLOR}, 0.85)`
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      })

      pulses.forEach((p) => {
        const x = p.a.x + (p.b.x - p.a.x) * p.t
        const y = p.a.y + (p.b.y - p.a.y) * p.t
        const fade = Math.sin(Math.min(p.t, 1) * Math.PI)
        ctx.save()
        ctx.shadowBlur = 12
        ctx.shadowColor = `rgba(${p.color}, ${fade})`
        ctx.fillStyle = `rgba(${p.color}, ${fade})`
        ctx.beginPath()
        ctx.arc(x, y, p.ring ? 3 + fade * 4 : 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    function drawStaticFrame() {
      ctx.fillStyle = VOID
      ctx.fillRect(0, 0, width, height)
      draw()
    }

    function loop(time) {
      if (!lastTime) lastTime = time
      const dt = Math.min(time - lastTime, 48)
      lastTime = time

      if (!hidden && !pausedRef.current) {
        step(dt)
        draw()
      }
      rafId = requestAnimationFrame(loop)
    }

    function handlePointerMove(e) {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }

    function handlePointerLeave() {
      pointer.x = -9999
      pointer.y = -9999
    }

    function handleVisibility() {
      hidden = document.visibilityState === 'hidden'
    }

    function handlePulseEvent(e) {
      if (prefersReduced) return
      const { x, y } = e.detail
      spawnBurstAt(x, y)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('neural:pulse', handlePulseEvent)

    if (prefersReduced) {
      drawStaticFrame()
    } else {
      ctx.fillStyle = VOID
      ctx.fillRect(0, 0, width, height)
      rafId = requestAnimationFrame(loop)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('neural:pulse', handlePulseEvent)
    }
  }, [])

  return <canvas ref={canvasRef} className="neural-field" aria-hidden="true" />
}

"use client"

import { useEffect, useRef } from "react"

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 5
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Generate stars
    const stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = []
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    // Generate nebula clouds
    const nebulae: { x: number; y: number; radius: number; hue: number }[] = []
    for (let i = 0; i < 8; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 400 + 200,
        hue: Math.random() > 0.5 ? 270 : 200, // Purple or cyan
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.fillStyle = "#030014"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebulae
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        gradient.addColorStop(0, `hsla(${nebula.hue}, 70%, 50%, 0.1)`)
        gradient.addColorStop(0.5, `hsla(${nebula.hue}, 60%, 30%, 0.05)`)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Draw and animate stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.speed * 5) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()

        // Add glow to larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
          glow.addColorStop(0, `rgba(167, 139, 250, ${0.3 * twinkle})`)
          glow.addColorStop(1, "transparent")
          ctx.fillStyle = glow
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

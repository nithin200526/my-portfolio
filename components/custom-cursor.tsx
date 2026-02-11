"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  type: "explosion" | "trail" | "spark"
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hoverType, setHoverType] = useState<"button" | "link" | "card" | null>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const particles = useRef<Particle[]>([])
  const trailPoints = useRef<{ x: number; y: number; age: number }[]>([])
  const sparkTimer = useRef(0)

  const createExplosion = useCallback((x: number, y: number) => {
    const colors = ["#a78bfa", "#06b6d4", "#ec4899", "#8b5cf6", "#22d3ee", "#f472b6"]

    // Main explosion particles
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16
      const speed = 3 + Math.random() * 5
      particles.current.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        size: 4 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: "explosion",
      })
    }

    // Spark particles
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 5 + Math.random() * 8
      particles.current.push({
        id: Date.now() + 100 + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        size: 2,
        color: "#ffffff",
        type: "spark",
      })
    }
  }, [])

  const createMovementSparks = useCallback((x: number, y: number, velocityMag: number) => {
    if (velocityMag > 15 && Math.random() > 0.5) {
      const colors = ["#a78bfa", "#06b6d4", "#ec4899"]
      particles.current.push({
        id: Date.now() + Math.random(),
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        maxLife: 1,
        size: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: "trail",
      })
    }
  }, [])

  useEffect(() => {
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newVelocity = {
        x: e.clientX - lastX,
        y: e.clientY - lastY,
      }
      const velocityMag = Math.sqrt(newVelocity.x ** 2 + newVelocity.y ** 2)

      velocity.current = newVelocity
      lastX = e.clientX
      lastY = e.clientY
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Add point to comet trail
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      })

      // Limit trail length based on velocity
      const maxTrailLength = Math.min(60, 30 + velocityMag * 2)
      if (trailPoints.current.length > maxTrailLength) {
        trailPoints.current.shift()
      }

      // Create movement sparks
      createMovementSparks(e.clientX, e.clientY, velocityMag)
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      createExplosion(e.clientX, e.clientY)
    }

    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.closest("button")) {
        setIsHovering(true)
        setHoverType("button")
      } else if (target.tagName === "A" || target.closest("a")) {
        setIsHovering(true)
        setHoverType("link")
      } else if (target.closest("[data-cursor='card']") || target.classList.contains("glass")) {
        setIsHovering(true)
        setHoverType("card")
      } else {
        setIsHovering(false)
        setHoverType(null)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      setHoverType(null)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    let animationId: number
    const animate = () => {
      // Smooth interpolation with variable easing
      const ease = isHovering ? 0.25 : 0.15
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease

      // Update main cursor elements
      if (cursorRef.current) {
        const scale = isClicking ? 0.8 : isHovering ? 1.2 : 1
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 24}px, ${cursorPos.current.y - 24}px) scale(${scale})`
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mousePos.current.x - 5}px, ${mousePos.current.y - 5}px)`
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${cursorPos.current.x - 50}px, ${cursorPos.current.y - 50}px)`
      }

      // Update spiral trails with enhanced movement
      trailsRef.current.forEach((trail, index) => {
        if (trail) {
          const delay = (index + 1) * 0.1
          const angle = Date.now() * 0.004 + index * 0.6
          const spiralRadius = 8 + index * 3
          const trailX =
            cursorPos.current.x +
            (mousePos.current.x - cursorPos.current.x) * delay +
            Math.cos(angle) * spiralRadius * (isHovering ? 0.3 : 1)
          const trailY =
            cursorPos.current.y +
            (mousePos.current.y - cursorPos.current.y) * delay +
            Math.sin(angle) * spiralRadius * (isHovering ? 0.3 : 1)
          trail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px) scale(${1 - index * 0.08})`
          trail.style.opacity = `${0.9 - index * 0.1}`
        }
      })

      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Update and draw comet trail with glow
          trailPoints.current = trailPoints.current.filter((point) => {
            point.age += 1
            return point.age < 35
          })

          if (trailPoints.current.length > 2) {
            // Draw glow layer
            ctx.beginPath()
            ctx.moveTo(trailPoints.current[0].x, trailPoints.current[0].y)
            for (let i = 1; i < trailPoints.current.length; i++) {
              const point = trailPoints.current[i]
              const prevPoint = trailPoints.current[i - 1]
              const midX = (prevPoint.x + point.x) / 2
              const midY = (prevPoint.y + point.y) / 2
              ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY)
            }
            ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"
            ctx.lineWidth = 12
            ctx.lineCap = "round"
            ctx.stroke()

            // Draw main trail
            ctx.beginPath()
            ctx.moveTo(trailPoints.current[0].x, trailPoints.current[0].y)
            for (let i = 1; i < trailPoints.current.length; i++) {
              const point = trailPoints.current[i]
              const prevPoint = trailPoints.current[i - 1]
              const midX = (prevPoint.x + point.x) / 2
              const midY = (prevPoint.y + point.y) / 2
              ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY)
            }

            const gradient = ctx.createLinearGradient(
              trailPoints.current[0].x,
              trailPoints.current[0].y,
              trailPoints.current[trailPoints.current.length - 1].x,
              trailPoints.current[trailPoints.current.length - 1].y,
            )
            gradient.addColorStop(0, "rgba(139, 92, 246, 0)")
            gradient.addColorStop(0.3, "rgba(139, 92, 246, 0.4)")
            gradient.addColorStop(0.6, "rgba(6, 182, 212, 0.6)")
            gradient.addColorStop(1, "rgba(236, 72, 153, 0.8)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = 4
            ctx.lineCap = "round"
            ctx.stroke()
          }

          // Update and draw particles with enhanced effects
          particles.current = particles.current.filter((particle) => {
            particle.x += particle.vx
            particle.y += particle.vy

            if (particle.type === "explosion") {
              particle.vy += 0.15
              particle.vx *= 0.96
              particle.vy *= 0.96
              particle.life -= 0.025
            } else if (particle.type === "spark") {
              particle.vy += 0.05
              particle.life -= 0.04
            } else {
              particle.life -= 0.03
            }

            if (particle.life > 0) {
              const alpha = particle.life

              // Draw particle glow
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.size * alpha * 2, 0, Math.PI * 2)
              ctx.fillStyle =
                particle.color +
                Math.floor(alpha * 30)
                  .toString(16)
                  .padStart(2, "0")
              ctx.fill()

              // Draw particle core
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2)
              ctx.fillStyle =
                particle.color +
                Math.floor(alpha * 255)
                  .toString(16)
                  .padStart(2, "0")
              ctx.fill()

              // Add spark trails
              if (particle.type === "spark") {
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particle.x - particle.vx * 3, particle.y - particle.vy * 3)
                ctx.strokeStyle =
                  "#ffffff" +
                  Math.floor(alpha * 150)
                    .toString(16)
                    .padStart(2, "0")
                ctx.lineWidth = 1
                ctx.stroke()
              }
            }

            return particle.life > 0
          })
        }
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [createExplosion, createMovementSparks, isHovering])

  const getCursorStyle = () => {
    if (hoverType === "button") {
      return "w-16 h-16 border-cyan-400 bg-cyan-400/10"
    } else if (hoverType === "link") {
      return "w-14 h-14 border-purple-400 bg-purple-400/10"
    } else if (hoverType === "card") {
      return "w-20 h-20 border-pink-400/50 bg-pink-400/5"
    }
    return "w-12 h-12 border-purple-500/50"
  }

  const getGlowColor = () => {
    if (hoverType === "button") return "rgba(6, 182, 212, 0.25)"
    if (hoverType === "link") return "rgba(139, 92, 246, 0.25)"
    if (hoverType === "card") return "rgba(236, 72, 153, 0.2)"
    return "rgba(139, 92, 246, 0.15)"
  }

  return (
    <>
      {/* Canvas for trail and particles */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9997] hidden md:block" />

      {/* Outer glow effect */}
      <div
        ref={cursorGlowRef}
        className={`fixed top-0 left-0 w-[100px] h-[100px] rounded-full pointer-events-none z-[9996] transition-all duration-300 hidden md:block ${
          isHovering ? "opacity-100" : "opacity-60"
        }`}
        style={{
          background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`,
          willChange: "transform",
        }}
      />

      {/* Cursor ring with dynamic styling */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-300 flex items-center justify-center ${getCursorStyle()}`}
        >
          {/* Inner rotating ring */}
          {isHovering && (
            <div
              className="absolute inset-2 border border-dashed rounded-full"
              style={{
                borderColor: hoverType === "button" ? "#22d3ee" : hoverType === "link" ? "#a78bfa" : "#f472b6",
                animation: "spin 2s linear infinite",
              }}
            />
          )}
          {/* Pulsing inner dot when hovering */}
          {isHovering && (
            <div
              className="w-2 h-2 rounded-full animate-ping"
              style={{
                backgroundColor: hoverType === "button" ? "#22d3ee" : hoverType === "link" ? "#a78bfa" : "#f472b6",
              }}
            />
          )}
        </div>
      </div>

      {/* Cursor dot with enhanced pulse */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] transition-all duration-100 hidden md:block ${
          isHovering ? "scale-0" : "scale-100"
        } ${isClicking ? "scale-150" : ""}`}
        style={{
          background: "linear-gradient(135deg, #a78bfa, #06b6d4, #ec4899)",
          boxShadow: "0 0 15px rgba(139, 92, 246, 0.8), 0 0 30px rgba(6, 182, 212, 0.4)",
          willChange: "transform",
        }}
      />

      {/* Spiral trail particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el
          }}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            background: `linear-gradient(135deg, ${i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#06b6d4" : "#ec4899"}, transparent)`,
            willChange: "transform, opacity",
            filter: `blur(${i * 0.3}px)`,
          }}
        />
      ))}

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}

"use client"

import { useEffect, useState, useRef } from "react"
import { Lock, Shield, Key, Fingerprint, Eye, Database } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { MagneticButton } from "./magnetic-button"

function EncryptedText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovered, setIsHovered] = useState(false)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*"

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text)
      return
    }

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join(""),
      )

      if (iteration >= text.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)

    return () => clearInterval(interval)
  }, [isHovered, text])

  return (
    <span
      className="font-mono cursor-pointer transition-colors hover:text-purple-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  )
}

export function EncryptionSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePos({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Lock Animation */}
          <ScrollReveal direction="left">
            <div className="relative h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Glowing rings with mouse parallax */}
                <div
                  className="absolute w-64 h-64 border border-purple-500/30 rounded-full animate-pulse-glow"
                  style={{
                    transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                />
                <div
                  className="absolute w-80 h-80 border border-cyan-500/20 rounded-full animate-rotate-slow"
                  style={{
                    transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
                  }}
                />
                <div
                  className="absolute w-96 h-96 border border-purple-500/10 rounded-full animate-rotate-slow"
                  style={{
                    animationDirection: "reverse",
                    transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                  }}
                />

                {/* Central lock with 3D effect */}
                <div
                  className="relative"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`,
                    transition: "transform 0.2s ease-out",
                  }}
                >
                  <div className="glass p-8 rounded-3xl animate-float">
                    <div className="relative">
                      {/* Lock top */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-12 border-4 border-t-0 border-purple-400 rounded-t-full" />
                      {/* Lock body */}
                      <div className="w-20 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                        <Key className="w-8 h-8 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating security icons with stagger */}
                {[
                  { Icon: Shield, pos: "top-4 right-4", delay: 0, color: "cyan" },
                  { Icon: Lock, pos: "bottom-4 left-4", delay: 100, color: "purple" },
                  { Icon: Fingerprint, pos: "top-1/4 left-0", delay: 200, color: "pink" },
                  { Icon: Eye, pos: "bottom-1/4 right-0", delay: 300, color: "cyan" },
                  { Icon: Database, pos: "top-0 left-1/3", delay: 400, color: "purple" },
                ].map(({ Icon, pos, delay, color }, index) => (
                  <div
                    key={index}
                    className={`absolute ${pos} animate-float`}
                    style={{
                      animationDelay: `${delay}ms`,
                      transform: `translate(${mousePos.x * (20 + index * 5)}px, ${mousePos.y * (20 + index * 5)}px)`,
                    }}
                  >
                    <MagneticButton>
                      <div
                        className={`glass p-4 rounded-xl hover:bg-${color}-500/30 transition-all duration-300 cursor-pointer`}
                      >
                        <Icon className={`w-6 h-6 text-${color}-400`} />
                      </div>
                    </MagneticButton>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right" delay={200}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300">Performance & Security</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">Encryption</span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                <EncryptedText text="Secure your data with end-to-end encryption" />
              </p>

              <p className="text-gray-400 leading-relaxed">
                Every project is built with security at its core. From secure authentication to encrypted data
                transmission, your digital assets are protected by industry-leading security practices and modern
                encryption standards.
              </p>

              {/* Security badges with hover effects */}
              <div className="flex flex-wrap gap-4">
                {["SSL/TLS", "AES-256", "OAuth 2.0", "JWT"].map((badge, index) => (
                  <MagneticButton key={badge}>
                    <div
                      className="glass px-4 py-2 rounded-full text-sm text-purple-300 border border-purple-500/30 
                        hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200 
                        transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {badge}
                    </div>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

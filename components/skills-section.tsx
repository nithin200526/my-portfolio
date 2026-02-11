"use client"

import { useState, useRef } from "react"
import { ScrollReveal } from "./scroll-reveal"

const frontendSkills = [
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "TypeScript", icon: "🔷" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind", icon: "💨" },
  { name: "Redux", icon: "🔮" },
  { name: "Framer Motion", icon: "✨" },
]

const backendSkills = [
  { name: "Node.js", icon: "🟢" },
  { name: "Express", icon: "🚂" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Firebase", icon: "🔥" },
  { name: "GraphQL", icon: "◈" },
  { name: "Prisma", icon: "💎" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
]

function SkillCarousel({
  skills,
  direction = "left",
}: { skills: typeof frontendSkills; direction?: "left" | "right" }) {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        setHoveredIndex(null)
      }}
    >
      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="flex gap-6 animate-scroll"
        style={{
          width: "max-content",
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {[...skills, ...skills, ...skills].map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`flex items-center gap-3 glass px-6 py-4 rounded-xl transition-all duration-500 cursor-pointer
                ${hoveredIndex === index ? "bg-purple-900/40 scale-110 -translate-y-2 shadow-lg shadow-purple-500/30" : "hover:bg-purple-900/30"}`}
              style={{
                transform:
                  hoveredIndex === index
                    ? "scale(1.1) translateY(-8px) rotateX(5deg)"
                    : hoveredIndex !== null
                      ? "scale(0.95)"
                      : "scale(1)",
              }}
            >
              <span
                className={`text-2xl transition-transform duration-300 ${hoveredIndex === index ? "scale-125" : ""}`}
              >
                {skill.icon}
              </span>
              <span
                className={`font-medium transition-colors duration-300 ${hoveredIndex === index ? "text-white" : "text-gray-300"}`}
              >
                {skill.name}
              </span>
            </div>

            {/* Glow effect on hover */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-xl -z-10 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

      <div className="container mx-auto px-6 mb-16">
        <ScrollReveal direction="up">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm text-purple-300">Technical Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Skills & </span>
              <span className="text-gradient">Technologies</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A comprehensive toolkit of modern technologies for building exceptional digital experiences
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Skill Carousels with staggered reveal */}
      <div className="space-y-8">
        <ScrollReveal direction="left" delay={100}>
          <div>
            <h3 className="text-center text-lg text-gray-400 mb-4">Frontend Development</h3>
            <SkillCarousel skills={frontendSkills} direction="left" />
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={200}>
          <div>
            <h3 className="text-center text-lg text-gray-400 mb-4">Backend & Infrastructure</h3>
            <SkillCarousel skills={backendSkills} direction="right" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

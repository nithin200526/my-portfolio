"use client"

import { Lightbulb, Brain, Settings } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { ParallaxSection } from "./parallax-section"

const features = [
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "I design solutions, not just code features. Every project starts with understanding the real problem.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Brain,
    title: "AI + Web Integration",
    description: "Combining full-stack engineering with AI to build smarter, automated digital experiences.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Settings,
    title: "Scalable Systems",
    description: "Writing clean, maintainable code that scales from prototype to production.",
    gradient: "from-purple-500 to-pink-500",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm text-cyan-300">About Nithin</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">What I </span>
              <span className="text-gradient">bring</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Building intelligent digital products with a focus on impact, scalability, and clean architecture.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              direction={index === 0 ? "left" : index === 2 ? "right" : "up"}
              delay={index * 150}
            >
              <ParallaxSection speed={0.2 + index * 0.1}>
                <div className="group relative h-full">
                  <div className="glass rounded-2xl p-8 h-full transition-all duration-500 hover:scale-105 hover:bg-purple-900/20 hover:-translate-y-2">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="w-full h-full bg-[#0a0520] rounded-xl flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-white group-hover:animate-pulse" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                    {/* Hover glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                    />
                  </div>
                </div>
              </ParallaxSection>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

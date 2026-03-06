"use client"

import { ExternalLink, Github, Globe, Shield, Code2 } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { MagneticButton } from "./magnetic-button"
import { useState } from "react"

const projects = [
  {
    title: "MEDILENS: AI-Powered Lab Report Intelligence",
    description:
      "An AI system that extracts and analyzes lab reports to generate structured health insights. Implements RAG-based explanation pipelines with deterministic validation to reduce hallucinations, and a risk-aware triage engine to classify abnormal parameters and prioritize critical findings.",
    image: "/medilens-cover.png",
    tags: ["Python", "RAG", "LLM", "FastAPI", "Healthcare AI"],
    gradient: "from-purple-600 to-pink-600",
    github: "https://github.com/nithin200526/medilens-health-intelligence",
    link: "https://github.com/nithin200526/medilens-health-intelligence",
    icon: Shield,
    features: ["Lab Report Analysis", "RAG Pipelines", "Risk Triage Engine"],
  },
  {
    title: "RECALL: Context-Aware Relationship Intelligence",
    description:
      "An AI-powered relationship management platform that passively analyzes Gmail conversations. Implements semantic memory and AI reasoning to recall past discussions and pending follow-ups, and a proactive assistant that generates intelligent nudges and context-aware email drafts.",
    image: "/recall-cover.png",
    tags: ["Python", "Gmail API", "LLM", "Semantic Memory", "AI"],
    gradient: "from-cyan-600 to-blue-600",
    github: "https://github.com/jithendra-10/Recall-main",
    link: "https://github.com/jithendra-10/Recall-main",
    icon: Code2,
    features: ["Gmail Analysis", "Semantic Memory", "AI Nudges"],
  },
  {
    title: "DreamWell: AI Dream Interpreter & Mood Tracker",
    description:
      "An AI-powered dream interpretation and mood tracking application for better mental wellness. Features intelligent dream analysis, mood pattern tracking, and personalized insights to help users understand their subconscious mind and emotional health trends.",
    image: "/dreamwell-cover.png",
    tags: ["React", "Node.js", "AI", "Docker", "MongoDB"],
    gradient: "from-emerald-600 to-teal-600",
    github: "https://github.com/nithin200526/DreamWell",
    link: "https://github.com/nithin200526/DreamWell",
    icon: Globe,
    features: ["Dream Interpretation", "Mood Tracking", "AI Insights"],
  },
]

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 animate-pulse-glow">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm text-cyan-300 font-mono">Featured Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">My </span>
              <span className="text-gradient-animated">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              A showcase of my work spanning web development, cybersecurity tools, and creative experiments
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} direction={index % 2 === 0 ? "left" : "right"} delay={index * 150}>
              <div
                className="group relative"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                data-cursor="card"
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700`}
                />

                <div className="relative glass-strong rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.01] hover:-translate-y-2 border border-white/5 group-hover:border-purple-500/30">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image with enhanced effects */}
                    <div className={`relative h-72 md:h-full min-h-[300px] bg-black/20 p-4 md:p-8 overflow-hidden flex items-center justify-center ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      {/* Gradient overlay - heavily reduced for clarity */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-all duration-700 pointer-events-none`}
                      />

                      {/* Image */}
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-105 rounded-lg shadow-2xl"
                      />

                      {/* Animated scan line */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-scan pointer-events-none" />

                      {/* Project icon */}
                      <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} p-0.5`}>
                          <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <project.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Feature badges */}
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        {project.features.map((feature, i) => (
                          <span
                            key={feature}
                            className="px-2 py-1 text-xs bg-black/60 text-white/80 rounded-md backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
                            style={{ transitionDelay: `${i * 100}ms` }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content with enhanced styling */}
                    <div className="p-8 md:p-12 flex flex-col justify-center relative">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Title with gradient on hover */}
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-gradient-animated transition-all duration-500">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 leading-relaxed mb-6 text-base md:text-lg">{project.description}</p>

                      {/* Tags with stagger animation */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="px-4 py-1.5 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-500 hover:scale-105"
                            style={{ transitionDelay: `${tagIndex * 75}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links with magnetic effect */}
                      <div className="flex gap-4">
                        <MagneticButton>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 group/btn shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                          >
                            <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            <span>Visit Site</span>
                          </a>
                        </MagneticButton>
                        <MagneticButton>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-4 glass rounded-xl text-white hover:bg-cyan-500/20 transition-all duration-300 group/btn border border-cyan-500/20 hover:border-cyan-500/40"
                          >
                            <Github className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                            <span>Code</span>
                          </a>
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

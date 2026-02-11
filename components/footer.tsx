"use client"

import { Instagram, Send, Github, Twitter, Linkedin, Heart, Mail } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"
import { MagneticButton } from "./magnetic-button"

const communityLinks = [
  { name: "Github", icon: Github, href: "https://github.com/nithin200526" },
  { name: "Email", icon: Mail, href: "mailto:nandalanithin26@gmail.com" },
]

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/nithin_sn_24?igsh=MWxqanAyZGlmaXU0eg==" },
  { name: "Telegram", icon: Send, href: "https://t.me/nithin200526" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/NandalaNithin" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/nandalanithin/" },
]

const aboutLinks = [
  { name: "About Me", href: "#about" },
  { name: "My Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
]

export function Footer() {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal direction="up" delay={0}>
            <div className="lg:col-span-1">
              <MagneticButton>
                <Link href="#" className="flex items-center gap-3 mb-6 group">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="relative text-2xl font-bold text-white">&lt;/&gt;</span>
                  </div>
                  <span className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                    NITHIN
                  </span>
                </Link>
              </MagneticButton>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Full Stack Developer building scalable web applications powered by AI.
              </p>
              {/* Social icons with magnetic effect */}
              <div className="flex gap-4">
                <MagneticButton href="https://github.com/nithin200526">
                  <div className="p-3 glass rounded-xl hover:bg-purple-500/30 transition-all duration-300 group">
                    <Github className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                </MagneticButton>
                <MagneticButton href="https://www.linkedin.com/in/nandalanithin/">
                  <div className="p-3 glass rounded-xl hover:bg-cyan-500/30 transition-all duration-300 group">
                    <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </MagneticButton>
                <MagneticButton href="https://www.instagram.com/nithin_sn_24?igsh=MWxqanAyZGlmaXU0eg==">
                  <div className="p-3 glass rounded-xl hover:bg-pink-500/30 transition-all duration-300 group">
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>

          {/* Community */}
          <ScrollReveal direction="up" delay={100}>
            <div>
              <h4 className="text-white font-semibold mb-6">Community</h4>
              <ul className="space-y-4">
                {communityLinks.map((link, index) => (
                  <li key={link.name} style={{ transitionDelay: `${index * 50}ms` }}>
                    <MagneticButton href={link.href}>
                      <span className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                        <link.icon className="w-5 h-5 group-hover:text-purple-400 group-hover:scale-110 transition-all" />
                        {link.name}
                      </span>
                    </MagneticButton>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Social Media */}
          <ScrollReveal direction="up" delay={200}>
            <div>
              <h4 className="text-white font-semibold mb-6">Social Media</h4>
              <ul className="space-y-4">
                {socialLinks.map((link, index) => (
                  <li key={link.name} style={{ transitionDelay: `${index * 50}ms` }}>
                    <MagneticButton href={link.href}>
                      <span className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                        <link.icon className="w-5 h-5 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
                        {link.name}
                      </span>
                    </MagneticButton>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* About */}
          <ScrollReveal direction="up" delay={300}>
            <div>
              <h4 className="text-white font-semibold mb-6">About</h4>
              <ul className="space-y-4">
                {aboutLinks.map((link, index) => (
                  <li key={link.name} style={{ transitionDelay: `${index * 50}ms` }}>
                    <MagneticButton>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block"
                      >
                        {link.name}
                      </a>
                    </MagneticButton>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <ScrollReveal direction="up" delay={400}>
          <div className="pt-8 border-t border-purple-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">© 2026 Nithin Nandala. All rights reserved.</p>
              <p className="flex items-center gap-2 text-gray-500 text-sm group cursor-default">
                Made with{" "}
                <Heart className="w-4 h-4 text-red-500 animate-pulse group-hover:scale-125 transition-transform" /> by
                Nithin Nandala
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

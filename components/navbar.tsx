"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Send, Menu, X, Github, Linkedin, Twitter } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

const navLinks = [
  { href: "#about", label: "About me" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["about", "skills", "projects"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <MagneticButton>
          <Link href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity animate-pulse-glow" />
              <span className="relative text-2xl font-bold text-white">&lt;/&gt;</span>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
              NITHIN
            </span>
          </Link>
        </MagneticButton>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <MagneticButton key={link.href}>
              <Link
                href={link.href}
                className={`relative text-gray-300 hover:text-white transition-colors duration-300 group ${activeSection === link.href.slice(1) ? "text-white" : ""
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ${activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            </MagneticButton>
          ))}
        </div>

        {/* Social Links */}
        <div className="hidden md:flex items-center gap-4">
          <MagneticButton href="https://github.com/nithin200526">
            <div className="p-2 rounded-full glass hover:bg-purple-500/30 transition-all duration-300 group">
              <Github className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </div>
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/nandalanithin/">
            <div className="p-2 rounded-full glass hover:bg-cyan-500/30 transition-all duration-300 group">
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </div>
          </MagneticButton>
          <MagneticButton href="https://www.instagram.com/nithin_sn_24?igsh=MWxqanAyZGlmaXU0eg==">
            <div className="p-2 rounded-full glass hover:bg-pink-500/30 transition-all duration-300 group">
              <Instagram className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors" />
            </div>
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu with slide animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="glass mt-2 mx-4 rounded-xl p-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileOpen(false)}
                style={{
                  transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `all 0.3s ease ${index * 0.1}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-4 border-t border-purple-500/30">
              <a
                href="https://github.com/nithin200526"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass hover:bg-purple-500/30 transition-all"
              >
                <Github className="w-5 h-5 text-purple-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/nandalanithin/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass hover:bg-cyan-500/30 transition-all"
              >
                <Linkedin className="w-5 h-5 text-cyan-400" />
              </a>
              <a
                href="https://www.instagram.com/nithin_sn_24?igsh=MWxqanAyZGlmaXU0eg=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass hover:bg-pink-500/30 transition-all"
              >
                <Instagram className="w-5 h-5 text-pink-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

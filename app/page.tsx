import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { EncryptionSection } from "@/components/encryption-section"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"
import { SpaceScene } from "@/components/space-scene"
import { CustomCursor } from "@/components/custom-cursor"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <SpaceScene />
      <CustomCursor />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EncryptionSection />
        <ProjectsSection />
        <Footer />
      </div>
    </main>
  )
}

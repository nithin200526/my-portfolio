"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, PerspectiveCamera, useTexture, Image } from "@react-three/drei"
import * as THREE from "three"
import { easing } from "maath"

function Card() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)

  // Load the profile texture with high quality settings
  const texture = useTexture("/profile.jpg")

  // Force high quality texture settings
  useEffect(() => {
    texture.anisotropy = 16
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false // Keep it sharp
    texture.needsUpdate = true
  }, [texture])

  // Refs for smooth animation values
  const targetScale = hovered ? 1.15 : 1
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (meshRef.current) {
      // 1. Smooth Zoom Effect
      // Using maath for delta-independent smooth damping
      easing.damp3(meshRef.current.scale, [targetScale, targetScale, targetScale], 0.15, delta)

      // 2. Premium Tilt Effect (Mouse Follow)
      // Calculate target rotation based on pointer position
      // Multipliers determine the range of motion (0.5 = 28 degrees roughly)
      const tiltX = -state.pointer.y * 0.4
      const tiltY = state.pointer.x * 0.4

      // Apply smooth damping to rotation
      easing.dampE(
        meshRef.current.rotation,
        [tiltX, tiltY, 0],
        0.2, // Smoothness (seconds)
        delta
      )
    }
  })

  // Premium Side Material (Dark, Glossy Metal)
  const sideMaterial = new THREE.MeshStandardMaterial({
    color: "#0a0a0a",
    roughness: 0.1,
    metalness: 0.9,
  })

  // Responsive scaling
  const { viewport } = useThree()
  const isMobile = viewport.width < 8 // 8 units is roughly mobile breakpoint in this camera setup
  const scaleFactor = isMobile ? 0.65 : 1

  return (
    <Float
      speed={hovered ? 0 : 2} // Stop floating when interacting
      rotationIntensity={0.1}
      floatIntensity={0.5}
      floatingRange={[-0.05, 0.05]}
    >
      <group scale={scaleFactor}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {/* Card Shape: Width 3.2, Height 4.5, Thickness 0.1 */}
          {/* Added extra segments for better lighting on rounded corners if we had them, standard box is fine here */}
          <boxGeometry args={[3.2, 4.5, 0.1]} />

          {/* Materials for 6 sides */}
          <primitive object={sideMaterial} attach="material-0" /> {/* Right */}
          <primitive object={sideMaterial} attach="material-1" /> {/* Left */}
          <primitive object={sideMaterial} attach="material-2" /> {/* Top */}
          <primitive object={sideMaterial} attach="material-3" /> {/* Bottom */}

          {/* Front - High Quality Photo (Unlit for true colors) */}
          <meshBasicMaterial
            attach="material-4"
            map={texture}
            toneMapped={false}
          />

          {/* Back - Dark Metal */}
          <primitive object={sideMaterial} attach="material-5" />
        </mesh>

        {/* Sheen/Glare Effect - Only visible on hover/tilt */}
        {hovered && (
          <mesh position={[0, 0, 0.06]} scale={[3.2, 4.5, 1]} rotation={[0, 0, 0]}>
            <planeGeometry />
            <meshBasicMaterial
              color="white"
              opacity={0.1}
              transparent
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

export function ThreeDPhoto() {
  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center group perspective-1000">
      {/* 1. Deep Atmosphere Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-gradient-to-tr from-violet-600/20 via-transparent to-cyan-500/20 rounded-full blur-[80px] -z-10"
      />

      {/* 2. Intense Core Neon Glow - Pulses and follows theme */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[460px] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-500 rounded-[30px] blur-[50px] opacity-60 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105 animate-pulse-glow"
        style={{ zIndex: 0 }}
      />

      <div className="relative w-full h-full z-10">
        <Canvas dpr={[1, 2]}> {/* Handle high DPI screens */}
          <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />

          {/* Lighting Environment */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
          <pointLight position={[-10, 10, 10]} intensity={2} color="#06b6d4" /> {/* Cyan Rim */}
          <pointLight position={[0, -10, 5]} intensity={1} color="#a855f7" /> {/* Purple Underglow */}

          <Card />
        </Canvas>
      </div>
    </div>
  )
}

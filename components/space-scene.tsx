"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, Html, Trail } from "@react-three/drei"
import * as THREE from "three"

const SOLAR_SYSTEM_DATA = {
  sun: { radius: 3, color: "#FDB813", emissive: "#FF6B00" },
  planets: [
    {
      name: "Mercury",
      radius: 0.12,
      distance: 5,
      speed: 4.15,
      color: "#8c7853",
      tilt: 0.03,
      rotationSpeed: 0.004,
      description: "Smallest planet",
    },
    {
      name: "Venus",
      radius: 0.3,
      distance: 6.5,
      speed: 1.62,
      color: "#e6c87a",
      tilt: 2.64,
      rotationSpeed: -0.002,
      description: "Hottest planet",
    },
    {
      name: "Earth",
      radius: 0.32,
      distance: 8,
      speed: 1,
      color: "#6b93d6",
      tilt: 0.41,
      rotationSpeed: 0.02,
      hasMoon: true,
      hasAtmosphere: true,
      description: "Our home",
    },
    {
      name: "Mars",
      radius: 0.17,
      distance: 10,
      speed: 0.53,
      color: "#c1440e",
      tilt: 0.44,
      rotationSpeed: 0.018,
      hasMoons: 2,
      description: "Red planet",
    },
    {
      name: "Jupiter",
      radius: 1.2,
      distance: 14,
      speed: 0.084,
      color: "#d8ca9d",
      tilt: 0.05,
      rotationSpeed: 0.04,
      hasGreatRedSpot: true,
      hasMoons: 4,
      description: "Gas giant",
    },
    {
      name: "Saturn",
      radius: 1.0,
      distance: 19,
      speed: 0.034,
      color: "#f4d59e",
      tilt: 0.47,
      rotationSpeed: 0.035,
      hasRings: true,
      description: "Ringed beauty",
    },
    {
      name: "Uranus",
      radius: 0.5,
      distance: 24,
      speed: 0.012,
      color: "#d1e7e7",
      tilt: 1.71,
      rotationSpeed: -0.02,
      hasRings: true,
      description: "Ice giant",
    },
    {
      name: "Neptune",
      radius: 0.48,
      distance: 29,
      speed: 0.006,
      color: "#5b5ddf",
      tilt: 0.49,
      rotationSpeed: 0.022,
      description: "Windiest planet",
    },
  ],
}

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null)
  const coronaRef = useRef<THREE.Mesh>(null)
  const flaresRef = useRef<THREE.Group>(null)
  const innerGlowRef = useRef<THREE.Mesh>(null)

  const sunTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext("2d")!

    // Create realistic sun surface with granulation
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512)
    gradient.addColorStop(0, "#FFFFEE")
    gradient.addColorStop(0.2, "#FFE566")
    gradient.addColorStop(0.4, "#FDB813")
    gradient.addColorStop(0.6, "#FF9500")
    gradient.addColorStop(0.8, "#FF6B00")
    gradient.addColorStop(1, "#FF4500")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 1024)

    // Add granulation (convection cells)
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 1024
      const radius = Math.random() * 30 + 10
      const brightness = Math.random()
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, ${180 + brightness * 75}, ${brightness * 100}, ${0.1 + brightness * 0.2})`
      ctx.fill()
    }

    // Add sunspots
    for (let i = 0; i < 15; i++) {
      const x = 256 + Math.random() * 512
      const y = 256 + Math.random() * 512
      const radius = Math.random() * 40 + 15
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      spotGradient.addColorStop(0, "rgba(50, 20, 0, 0.8)")
      spotGradient.addColorStop(0.5, "rgba(100, 50, 0, 0.5)")
      spotGradient.addColorStop(1, "rgba(200, 100, 0, 0)")
      ctx.fillStyle = spotGradient
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z += 0.0003
      coronaRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03)
    }
    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02)
    }
    if (flaresRef.current) {
      flaresRef.current.rotation.z = Math.sin(time * 0.2) * 0.1
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[SOLAR_SYSTEM_DATA.sun.radius, 64, 64]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>

      {/* Inner glow */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[SOLAR_SYSTEM_DATA.sun.radius * 1.1, 32, 32]} />
        <meshBasicMaterial color="#FF8C00" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Corona layers */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[SOLAR_SYSTEM_DATA.sun.radius * 1.3, 32, 32]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh>
        <sphereGeometry args={[SOLAR_SYSTEM_DATA.sun.radius * 1.6, 32, 32]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh>
        <sphereGeometry args={[SOLAR_SYSTEM_DATA.sun.radius * 2.2, 32, 32]} />
        <meshBasicMaterial color="#FF4500" transparent opacity={0.05} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Solar flares */}
      <group ref={flaresRef}>
        {[0, 1, 2, 3, 4].map((i) => (
          <SolarFlare key={i} index={i} sunRadius={SOLAR_SYSTEM_DATA.sun.radius} />
        ))}
      </group>

      {/* Sun light source */}
      <pointLight color="#FFF5E0" intensity={4} distance={150} decay={0.3} />
      <pointLight color="#FFD700" intensity={2} distance={80} decay={0.5} />
    </group>
  )
}

function SolarFlare({ index, sunRadius }: { index: number; sunRadius: number }) {
  const flareRef = useRef<THREE.Mesh>(null)
  const angle = (index / 5) * Math.PI * 2
  const baseHeight = 0.3 + Math.random() * 0.4

  useFrame((state) => {
    if (flareRef.current) {
      const time = state.clock.elapsedTime
      const scale = 1 + Math.sin(time * 2 + index) * 0.3
      flareRef.current.scale.y = scale * baseHeight
      flareRef.current.material.opacity = 0.3 + Math.sin(time * 3 + index * 0.5) * 0.2
    }
  })

  return (
    <mesh
      ref={flareRef}
      position={[Math.cos(angle) * sunRadius * 1.05, 0, Math.sin(angle) * sunRadius * 1.05]}
      rotation={[0, 0, angle + Math.PI / 2]}
    >
      <coneGeometry args={[0.2, 1, 8]} />
      <meshBasicMaterial color="#FF6B00" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

function Planet({
  name,
  radius,
  distance,
  speed,
  color,
  tilt,
  rotationSpeed,
  hasRings = false,
  hasMoon = false,
  hasAtmosphere = false,
  hasGreatRedSpot = false,
  hasMoons = 0,
  description = "",
}: {
  name: string
  radius: number
  distance: number
  speed: number
  color: string
  tilt: number
  rotationSpeed: number
  hasRings?: boolean
  hasMoon?: boolean
  hasAtmosphere?: boolean
  hasGreatRedSpot?: boolean
  hasMoons?: number
  description?: string
}) {
  const planetRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<number>(Math.random() * Math.PI * 2)
  const [hovered, setHovered] = useState(false)

  // Create detailed procedural planet texture
  const planetTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    const baseColor = new THREE.Color(color)
    const hsl = { h: 0, s: 0, l: 0 }
    baseColor.getHSL(hsl)

    // Base gradient
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
    gradient.addColorStop(0, `hsl(${hsl.h * 360}, ${hsl.s * 100}%, ${(hsl.l + 0.1) * 100}%)`)
    gradient.addColorStop(1, `hsl(${hsl.h * 360}, ${hsl.s * 100}%, ${(hsl.l - 0.1) * 100}%)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 512)

    // Add atmospheric bands for gas giants
    if (name === "Jupiter" || name === "Saturn") {
      for (let i = 0; i < 30; i++) {
        const y = i * 17 + Math.random() * 10
        const height = 8 + Math.random() * 15
        ctx.fillStyle = `hsla(${hsl.h * 360 + (Math.random() - 0.5) * 30}, ${hsl.s * 100}%, ${50 + Math.random() * 30}%, ${0.3 + Math.random() * 0.3})`
        ctx.fillRect(0, y, 512, height)
      }
      // Great Red Spot for Jupiter
      if (hasGreatRedSpot) {
        ctx.beginPath()
        ctx.ellipse(350, 280, 50, 30, 0.2, 0, Math.PI * 2)
        const spotGradient = ctx.createRadialGradient(350, 280, 0, 350, 280, 50)
        spotGradient.addColorStop(0, "#8B3A3A")
        spotGradient.addColorStop(0.5, "#CD5C5C")
        spotGradient.addColorStop(1, "transparent")
        ctx.fillStyle = spotGradient
        ctx.fill()
      }
    }

    // Add surface features for rocky planets
    if (name === "Mercury" || name === "Mars" || name === "Venus") {
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * 512
        const y = Math.random() * 512
        const r = Math.random() * 15 + 3
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hsl.h * 360}, ${hsl.s * 100}%, ${(hsl.l + (Math.random() - 0.5) * 0.3) * 100}%, 0.4)`
        ctx.fill()
      }
    }

    // Earth-specific features
    if (name === "Earth") {
      // Oceans
      ctx.fillStyle = "#1a5490"
      ctx.fillRect(0, 0, 512, 512)

      // Continents
      const continents = [
        { x: 100, y: 150, w: 120, h: 100 },
        { x: 280, y: 120, w: 150, h: 130 },
        { x: 350, y: 300, w: 100, h: 80 },
        { x: 50, y: 350, w: 80, h: 60 },
      ]
      continents.forEach((c) => {
        ctx.beginPath()
        ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, Math.random() * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = "#2d5a27"
        ctx.fill()
      })

      // Clouds
      for (let i = 0; i < 50; i++) {
        ctx.beginPath()
        ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 30 + 10, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fill()
      }
    }

    // Ice giants (Uranus, Neptune)
    if (name === "Uranus" || name === "Neptune") {
      for (let i = 0; i < 20; i++) {
        const y = Math.random() * 512
        ctx.fillStyle = `hsla(${hsl.h * 360}, ${hsl.s * 100 + 10}%, ${60 + Math.random() * 20}%, 0.2)`
        ctx.fillRect(0, y, 512, 20 + Math.random() * 30)
      }
    }

    return new THREE.CanvasTexture(canvas)
  }, [color, name, hasGreatRedSpot])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    orbitRef.current += speed * 0.008

    if (groupRef.current) {
      // Elliptical orbit with slight eccentricity
      const eccentricity = 0.05
      const r = distance * (1 - eccentricity * Math.cos(orbitRef.current))
      groupRef.current.position.x = Math.cos(orbitRef.current) * r
      groupRef.current.position.z = Math.sin(orbitRef.current) * r
      groupRef.current.position.y = Math.sin(orbitRef.current * 2) * 0.3
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += rotationSpeed * 1.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Planet */}
      <mesh
        ref={planetRef}
        rotation={[tilt, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={planetTexture} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Atmosphere */}
      {hasAtmosphere && (
        <mesh ref={atmosphereRef} scale={1.08}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial color="#87CEEB" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
      )}

      {/* Atmosphere glow for all planets */}
      <mesh scale={1.05}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Saturn-style rings */}
      {hasRings && <PlanetRings radius={radius} color={color} name={name} />}

      {/* Earth's moon */}
      {hasMoon && <Moon parentRadius={radius} />}

      {/* Multiple moons for Mars, Jupiter */}
      {hasMoons > 0 &&
        Array.from({ length: Math.min(hasMoons, 4) }).map((_, i) => (
          <SmallMoon key={i} parentRadius={radius} index={i} />
        ))}

      {/* Planet label on hover */}
      {hovered && (
        <Html position={[0, radius + 0.8, 0]} center>
          <div className="px-4 py-2 bg-black/90 rounded-lg text-white text-sm font-mono whitespace-nowrap backdrop-blur-md border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <div className="font-bold text-gradient">{name}</div>
            <div className="text-xs text-gray-400">{description}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function PlanetRings({ radius, color, name }: { radius: number; color: string; name: string }) {
  const ringsRef = useRef<THREE.Mesh>(null)

  const ringTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 64
    const ctx = canvas.getContext("2d")!

    // Create detailed ring bands
    const bands = name === "Saturn" ? 12 : 4
    for (let i = 0; i < bands; i++) {
      const x = (i / bands) * 1024
      const width = (1024 / bands) * (0.6 + Math.random() * 0.4)
      const opacity = 0.3 + Math.random() * 0.5

      const gradient = ctx.createLinearGradient(x, 0, x + width, 0)
      gradient.addColorStop(0, "transparent")
      gradient.addColorStop(
        0.2,
        `${color}${Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
      )
      gradient.addColorStop(
        0.5,
        `${color}${Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
      )
      gradient.addColorStop(
        0.8,
        `${color}${Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
      )
      gradient.addColorStop(1, "transparent")

      ctx.fillStyle = gradient
      ctx.fillRect(x, 0, width, 64)
    }

    // Add ring gaps (Cassini division for Saturn)
    if (name === "Saturn") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(450, 0, 30, 64)
      ctx.fillRect(700, 0, 15, 64)
    }

    return new THREE.CanvasTexture(canvas)
  }, [color, name])

  useFrame(() => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.0001
    }
  })

  const innerRadius = name === "Saturn" ? radius * 1.3 : radius * 1.5
  const outerRadius = name === "Saturn" ? radius * 2.5 : radius * 2

  return (
    <mesh ref={ringsRef} rotation={[Math.PI / 2.2, 0.1, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 128]} />
      <meshBasicMaterial map={ringTexture} side={THREE.DoubleSide} transparent opacity={0.9} />
    </mesh>
  )
}

function Moon({ parentRadius }: { parentRadius: number }) {
  const moonRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<number>(0)

  const moonTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext("2d")!

    ctx.fillStyle = "#c4c4c4"
    ctx.fillRect(0, 0, 128, 128)

    // Add craters
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 128
      const y = Math.random() * 128
      const r = Math.random() * 10 + 2
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${100 + Math.random() * 50}, 0.5)`
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame(() => {
    orbitRef.current += 0.015
    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(orbitRef.current) * (parentRadius + 0.7)
      moonRef.current.position.z = Math.sin(orbitRef.current) * (parentRadius + 0.7)
      moonRef.current.position.y = Math.sin(orbitRef.current * 0.5) * 0.1
      moonRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.1, 24, 24]} />
      <meshStandardMaterial map={moonTexture} roughness={0.9} />
    </mesh>
  )
}

function SmallMoon({ parentRadius, index }: { parentRadius: number; index: number }) {
  const moonRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<number>(index * Math.PI * 0.5)
  const distance = parentRadius + 0.4 + index * 0.3
  const speed = 0.02 - index * 0.003

  useFrame(() => {
    orbitRef.current += speed
    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(orbitRef.current) * distance
      moonRef.current.position.z = Math.sin(orbitRef.current) * distance
      moonRef.current.position.y = Math.sin(orbitRef.current + index) * 0.15
    }
  })

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.04 + index * 0.01, 12, 12]} />
      <meshStandardMaterial color="#888888" roughness={0.9} />
    </mesh>
  )
}

function OrbitPath({ distance }: { distance: number }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance))
    }
    return pts
  }, [distance])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
    </line>
  )
}

function AsteroidBelt() {
  const asteroids = useMemo(() => {
    const items = []
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 11.5 + Math.random() * 1.5
      items.push({
        position: [Math.cos(angle) * distance, (Math.random() - 0.5) * 0.8, Math.sin(angle) * distance] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.06 + 0.01,
        speed: Math.random() * 0.0008 + 0.0003,
        angle,
        type: Math.floor(Math.random() * 3),
      })
    }
    return items
  }, [])

  return (
    <group>
      {asteroids.map((asteroid, i) => (
        <Asteroid key={i} {...asteroid} />
      ))}
    </group>
  )
}

function Asteroid({
  position,
  scale,
  speed,
  angle,
  type,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  angle: number
  type: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(angle)
  const distance = Math.sqrt(position[0] ** 2 + position[2] ** 2)

  useFrame(() => {
    angleRef.current += speed
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angleRef.current) * distance
      meshRef.current.position.z = Math.sin(angleRef.current) * distance
      meshRef.current.rotation.x += 0.008
      meshRef.current.rotation.y += 0.004
    }
  })

  const colors = ["#8b7355", "#6b5344", "#9a8a7a"]

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 0 && <dodecahedronGeometry args={[1, 0]} />}
      {type === 1 && <icosahedronGeometry args={[1, 0]} />}
      {type === 2 && <octahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial color={colors[type]} roughness={0.9} />
    </mesh>
  )
}

function KuiperBelt() {
  const objects = useMemo(() => {
    const items = []
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 33 + Math.random() * 8
      items.push({
        position: [Math.cos(angle) * distance, (Math.random() - 0.5) * 2, Math.sin(angle) * distance] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.1 + 0.02,
        speed: Math.random() * 0.0002 + 0.0001,
        angle,
      })
    }
    return items
  }, [])

  return (
    <group>
      {objects.map((obj, i) => (
        <KuiperObject key={i} {...obj} />
      ))}
    </group>
  )
}

function KuiperObject({
  position,
  scale,
  speed,
  angle,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  angle: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(angle)
  const distance = Math.sqrt(position[0] ** 2 + position[2] ** 2)

  useFrame(() => {
    angleRef.current += speed
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angleRef.current) * distance
      meshRef.current.position.z = Math.sin(angleRef.current) * distance
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#445566" roughness={0.95} />
    </mesh>
  )
}

function BackgroundStars() {
  const starsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.003
      starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.001) * 0.05
    }
  })

  return (
    <>
      <Stars ref={starsRef} radius={200} depth={150} count={12000} factor={5} saturation={0.2} fade speed={0.3} />
      <Stars radius={250} depth={100} count={5000} factor={8} saturation={0.1} fade speed={0.1} />
    </>
  )
}

function Nebula() {
  const nebulaRef1 = useRef<THREE.Mesh>(null)
  const nebulaRef2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (nebulaRef1.current) {
      nebulaRef1.current.rotation.z = time * 0.005
      nebulaRef1.current.material.opacity = 0.02 + Math.sin(time * 0.2) * 0.01
    }
    if (nebulaRef2.current) {
      nebulaRef2.current.rotation.z = -time * 0.003
    }
  })

  return (
    <group>
      {/* Purple nebula */}
      <mesh position={[60, 25, -100]} ref={nebulaRef1}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.03} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Cyan nebula */}
      <mesh position={[-70, -15, -90]} ref={nebulaRef2}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.025} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Pink nebula */}
      <mesh position={[30, -40, -120]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.015} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

function ShootingStars() {
  const [stars, setStars] = useState<
    Array<{
      id: number
      start: [number, number, number]
      end: [number, number, number]
      duration: number
    }>
  >([])

  useFrame(() => {
    if (Math.random() < 0.003 && stars.length < 4) {
      const id = Date.now()
      const angle = Math.random() * Math.PI * 2
      const distance = 50 + Math.random() * 30
      setStars((prev) => [
        ...prev,
        {
          id,
          start: [Math.cos(angle) * distance, 25 + Math.random() * 15, Math.sin(angle) * distance - 40],
          end: [Math.cos(angle + 0.4) * (distance - 40), -15, Math.sin(angle + 0.4) * (distance - 40) - 40],
          duration: 1.5 + Math.random() * 2,
        },
      ])

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== id))
      }, 3500)
    }
  })

  return (
    <group>
      {stars.map((star) => (
        <ShootingStar key={star.id} {...star} />
      ))}
    </group>
  )
}

function ShootingStar({
  start,
  end,
  duration,
}: {
  start: [number, number, number]
  end: [number, number, number]
  duration: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const progressRef = useRef(0)

  useFrame((state, delta) => {
    progressRef.current += delta / duration
    if (meshRef.current && progressRef.current <= 1) {
      meshRef.current.position.lerpVectors(new THREE.Vector3(...start), new THREE.Vector3(...end), progressRef.current)
      meshRef.current.scale.setScalar(Math.max(0, 1 - progressRef.current * 0.7))
    }
  })

  return (
    <Trail width={0.8} length={12} color="#ffffff" attenuation={(t) => t * t}>
      <mesh ref={meshRef} position={start}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </Trail>
  )
}

function CameraController() {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 20, 45))

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Gentle orbital camera movement
    targetPos.current.x = Math.sin(time * 0.03) * 8
    targetPos.current.y = 18 + Math.sin(time * 0.02) * 3
    targetPos.current.z = 45 + Math.cos(time * 0.025) * 5

    // Smooth camera interpolation
    camera.position.lerp(targetPos.current, 0.01)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function SolarSystemScene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.03} />

      {/* Background elements */}
      <BackgroundStars />
      <Nebula />
      <ShootingStars />

      {/* Sun */}
      <Sun />

      {/* Orbital paths */}
      {SOLAR_SYSTEM_DATA.planets.map((planet) => (
        <OrbitPath key={`orbit-${planet.name}`} distance={planet.distance} />
      ))}

      {/* Planets */}
      {SOLAR_SYSTEM_DATA.planets.map((planet) => (
        <Planet key={planet.name} {...planet} />
      ))}

      {/* Asteroid belt between Mars and Jupiter */}
      <AsteroidBelt />

      {/* Kuiper Belt beyond Neptune */}
      <KuiperBelt />

      {/* Camera controller */}
      <CameraController />
    </>
  )
}

export function SpaceScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 20, 45], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "linear-gradient(180deg, #030014 0%, #0a0520 50%, #030014 100%)" }}
        dpr={[1, 1.5]}
      >
        <SolarSystemScene />
      </Canvas>
    </div>
  )
}

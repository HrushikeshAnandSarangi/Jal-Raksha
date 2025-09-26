"use client"

import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface ModelProps {
  modelPath: string
}

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath)
  const modelRef = useRef<THREE.Group>(null)

  // Auto-rotate the model slowly
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3 // Slow rotation speed
    }
  })

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={1.5} />
    </group>
  )
}

interface GLTFViewerProps {
  modelPath: string
  heading: string
  tagline: string
}

export function GLTFViewer({ modelPath, heading, tagline }: GLTFViewerProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas with dark blue background */}
      <Canvas
        // To zoom out, I've increased the camera's Z position from 5 to 10.
        // A higher Z value moves the camera further away from the object.
        camera={{ position: [0, 0, 20], fov: 50 }}
        style={{ background: "#00008B" }} // Dark blue background
        shadows
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Environment for better reflections */}
        <Environment preset="studio" />

        {/* 3D Model */}
        <Model modelPath={modelPath} />

        {/* Contact shadows for ground effect */}
        <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={1.5} far={4.5} />

        {/* Disable user interaction by not including OrbitControls */}
      </Canvas>

      {/* Foreground text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-balance">{heading}</h1>
          <p className="text-xl md:text-2xl text-white/80 font-light text-pretty">{tagline}</p>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
    </div>
  )
}

// Preload the GLTF model
useGLTF.preload("/Earth/scene.gltf")

'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function MorphingCore() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.13 + state.pointer.y * 0.12
    ref.current.rotation.y = t * 0.2 + state.pointer.x * 0.18
    ref.current.scale.setScalar(1.5 + Math.sin(t * 1.2) * 0.06)
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.3, 0.035)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.2, 0.035)
  })
  return <Float speed={1.1} rotationIntensity={0.28} floatIntensity={0.65}><mesh ref={ref}><icosahedronGeometry args={[1, 5]} /><MeshDistortMaterial color="#69b7ff" emissive="#5b35ff" emissiveIntensity={0.7} roughness={0.14} metalness={0.86} distort={0.3} speed={1.7} /></mesh></Float>
}

function OrbitRing({ radius, rotation }: { radius: number; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => { if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.12 })
  return <mesh ref={ref} rotation={rotation}><torusGeometry args={[radius, 0.008, 16, 160]} /><meshBasicMaterial color="#69b7ff" transparent opacity={0.5} /></mesh>
}

export default function HeroScene() {
  return <div className="scene-shell" aria-hidden="true"><Canvas camera={{ position: [0, 0, 5.2], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><ambientLight intensity={0.25} /><pointLight position={[3, 3, 4]} color="#69b7ff" intensity={5} /><pointLight position={[-4, -2, 2]} color="#613bff" intensity={8} /><MorphingCore /><OrbitRing radius={2.05} rotation={[0.2, 0.4, 0]} /><OrbitRing radius={2.35} rotation={[1.1, 0.2, 0.9]} /><Sparkles count={110} scale={7} size={2.1} speed={0.3} color="#69b7ff" /></Canvas></div>
}

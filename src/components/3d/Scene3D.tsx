import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';
import type { Mesh, Group } from 'three';

// Animated geometric shape
function AnimatedShape({ position = [0, 0, 0] as [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={hovered ? '#6366f1' : '#3b82f6'}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

// Floating torus knot
function FloatingTorus({ position = [0, 0, 0] as [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
        <meshStandardMaterial
          color="#10b981"
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

// Orbiting spheres
function OrbitingSpheres() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 2.5;
        const z = Math.sin(angle) * 2.5;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
              color={['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'][i]}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Grid floor
function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial
        color="#1e293b"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#374151" wireframe />
    </mesh>
  );
}

// Main Scene Component
export function Scene3D() {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        shadows
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#6366f1" />

          {/* Simple color background instead of HDR environment to avoid external loading */}
          <color attach="background" args={['#0f172a']} />

          {/* 3D Objects */}
          <AnimatedShape position={[0, 0.5, 0]} />
          <FloatingTorus position={[-2.5, 0, 0]} />
          <FloatingTorus position={[2.5, 0, 0]} />
          <OrbitingSpheres />
          <GridFloor />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene3D;

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { isWebGLAvailable } from '../lib/webgl-check';
import ArgensaltaLogo from './ArgensaltaLogo';

function AbstractGoldenLogo() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y -= delta * 0.8; // Giro constante
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3 + 0.5;
    }
  });

  return (
    <group ref={group} scale={2}>
      {/* --- Las 4 Barras Doradas (Los 4 fundadores) --- */}
      <mesh position={[-1.2, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 4.5, 0.5]} />
        <meshStandardMaterial color="#EFC46C" metalness={0.9} roughness={0.1} emissive="#EFC46C" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.4, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 5.5, 0.5]} />
        <meshStandardMaterial color="#EFC46C" metalness={1} roughness={0.1} emissive="#EFC46C" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.4, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 5.5, 0.5]} />
        <meshStandardMaterial color="#EFC46C" metalness={1} roughness={0.1} emissive="#EFC46C" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.2, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 4.5, 0.5]} />
        <meshStandardMaterial color="#EFC46C" metalness={0.9} roughness={0.1} emissive="#EFC46C" emissiveIntensity={0.4} />
      </mesh>

      {/* --- Estructura A y S (Letras entrelazadas) --- */}
      <group position={[0, -0.5, 0.6]}>
         {/* 'A' Pierna Izquierda */}
         <mesh position={[-0.6, 0.4, 0]} rotation={[0, 0, -0.25]} castShadow receiveShadow>
           <boxGeometry args={[0.3, 3, 0.2]} />
           <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
         </mesh>
         
         {/* 'A' Pierna Derecha */}
         <mesh position={[0.6, 0.4, 0]} rotation={[0, 0, 0.25]} castShadow receiveShadow>
           <boxGeometry args={[0.3, 3, 0.2]} />
           <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
         </mesh>

         {/* 'A' Barra Central (Crossbar) */}
         <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
           <boxGeometry args={[1.1, 0.3, 0.2]} />
           <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
         </mesh>

         {/* 'S' construida en bloques */}
         <group position={[0, 0.5, 0.3]}>
           <mesh position={[0, 1, 0]}><boxGeometry args={[1.2, 0.3, 0.2]}/><meshStandardMaterial color="#EFC46C" metalness={0.8} roughness={0.1} /></mesh>
           <mesh position={[0, 0, 0]}><boxGeometry args={[1.2, 0.3, 0.2]}/><meshStandardMaterial color="#EFC46C" metalness={0.8} roughness={0.1} /></mesh>
           <mesh position={[0, -1, 0]}><boxGeometry args={[1.2, 0.3, 0.2]}/><meshStandardMaterial color="#EFC46C" metalness={0.8} roughness={0.1} /></mesh>
           <mesh position={[-0.45, 0.5, 0]}><boxGeometry args={[0.3, 1, 0.2]}/><meshStandardMaterial color="#EFC46C" metalness={0.8} roughness={0.1} /></mesh>
           <mesh position={[0.45, -0.5, 0]}><boxGeometry args={[0.3, 1, 0.2]}/><meshStandardMaterial color="#EFC46C" metalness={0.8} roughness={0.1} /></mesh>
         </group>

         {/* Base horizontal inferior */}
         <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
           <boxGeometry args={[3, 0.2, 0.3]} />
           <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
         </mesh>
      </group>
    </group>
  );
}

export default function ArgensaltaLogo3D({ className = "w-full h-full min-h-[400px]" }: { className?: string }) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  if (hasWebGL === false) {
    return <ArgensaltaLogo className={className} />;
  }

  // Si aún está cargando (null), mostramos un div vacío o un loader sutil para evitar parpadeo
  if (hasWebGL === null) {
    return <div className={className} />;
  }

  return (
    <div className={`${className} pointer-events-none select-none`}>
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false 
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 20]} fov={40} />
        
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={2} castShadow color="#ffffff" />
        <spotLight position={[-10, 5, -10]} angle={0.3} penumbra={1} intensity={2} color="#EFC46C" />
        <pointLight position={[0, 2, 10]} intensity={1.5} color="#EFC46C" />
        
        {/* Abstract Golden Logo */}
        <AbstractGoldenLogo />
        
        <Environment preset="city" />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

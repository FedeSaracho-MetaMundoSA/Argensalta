import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { isWebGLAvailable } from '../lib/webgl-check';
import InteractiveMasterplan from './InteractiveMasterplan';

const generateMockLots = () => {
  const lots = [];
  const blocksCount = 3;
  const lotsPerBlock = 12;

  for (let b = 1; b <= blocksCount; b++) {
    for (let l = 1; l <= lotsPerBlock; l++) {
      const isBackRow = l > 6;
      const l_index = isBackRow ? l - 7 : l - 1; 
      const px = (b - 2) * 10 + (isBackRow ? 1.5 : -1.5);
      const py = (l_index * 2.2) - 5.5;
      
      let status = 'available';
      if (Math.random() > 0.8) status = 'sold';
      else if (Math.random() > 0.85) status = 'reserved';

      lots.push({
        id: `m${b}-l${l}`,
        block: b.toString(),
        lotNumber: l.toString(),
        surface: 300 + Math.floor(Math.random() * 50),
        price: 5500 + Math.floor(Math.random() * 1000),
        status,
        x: px,
        y: py
      });
    }
  }
  return lots;
};

const INITIAL_LOTS = generateMockLots();

function Lot({ lot, onSelect, isSelected }: { lot: any, onSelect: (lot: any) => void, isSelected: boolean }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  // Directly use the layout coordinates
  const px = lot.x;
  const pz = lot.y;

  const color = useMemo(() => {
    if (isSelected) return '#EFC46C';
    if (hovered) return '#FCD34D'; // lighter gold
    if (lot.status === 'sold') return '#ef4444'; // red-500
    if (lot.status === 'reserved') return '#f59e0b'; // amber-500
    return '#10b981'; // emerald-500
  }, [lot.status, hovered, isSelected]);

  const opacity = useMemo(() => {
    if (isSelected || hovered) return 1;
    if (lot.status === 'sold') return 0.4;
    if (lot.status === 'reserved') return 0.6;
    return 0.9; // available
  }, [lot.status, hovered, isSelected]);

  useFrame((state, delta) => {
    if (meshRef.current) {
        // gently float if hovered or selected
        const targetY = isSelected ? 0.5 : (hovered ? 0.3 : 0.1);
        meshRef.current.position.y += (targetY - meshRef.current.position.y) * delta * 5;
    }
  });

  return (
    <group position={[px, 0.1, pz]}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onSelect(lot); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.8, 0.2, 2.0]} />
        <meshStandardMaterial color={color} transparent={true} opacity={opacity} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Tooltip HTML */}
      {hovered && (
        <Html position={[0, 0.5, 0]} center className="pointer-events-none z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100 p-3 min-w-[170px]">
             <div className="flex justify-between items-start mb-1">
               <div>
                 <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Mza {lot.block} - Lt {lot.lotNumber}</p>
                 <p className="text-gray-900 font-bold mt-0.5">${lot.price.toLocaleString()}</p>
               </div>
               <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest text-white shadow-sm" style={{ backgroundColor: color }}>
                 {lot.status === 'available' ? 'Disponible' : lot.status === 'reserved' ? 'Reservado' : 'Vendido'}
               </span>
             </div>
             <div className="flex items-center text-[10px] text-gray-600 font-medium">
                {lot.surface} m²
             </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#1f2937" roughness={0.8} /> 
      {/* gray-800 for the ground */}
    </mesh>
  );
}

export default function InteractiveMasterplan3D({ onSelectLot, selectedLotId, lotsProp }: { onSelectLot?: (lot: any) => void, selectedLotId?: string, lotsProp?: any[] }) {
  const [lots, setLots] = useState<any[]>(INITIAL_LOTS);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    if (lotsProp && lotsProp.length > 0) {
      const mappedLots = lotsProp.map(lot => {
         const b = parseInt(lot.block) || 1;
         const l = parseInt(lot.lotNumber) || 1;
         const isBackRow = l > 6;
         const l_index = isBackRow ? l - 7 : l - 1; 
         const px = (b - 2) * 10 + (isBackRow ? 1.5 : -1.5);
         const py = (l_index * 2.2) - 5.5;
         
         return { ...lot, x: px, y: py };
      });
      setLots(mappedLots);
    }
  }, [lotsProp]);

  if (hasWebGL === false) {
    return <InteractiveMasterplan {...{ onSelectLot, selectedLotId, lotsProp }} />;
  }

  if (hasWebGL === null) {
    return <div className="w-full h-full min-h-[500px] bg-gray-900 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="w-full h-full min-h-[500px] relative bg-gray-900 rounded-2xl overflow-hidden cursor-move">
      <Canvas 
        shadows 
        camera={{ position: [0, 15, 20], fov: 45 }}
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false 
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048} 
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        
        <Ground />
        <gridHelper args={[50, 50, '#4b5563', '#374151']} position={[0, 0.05, 0]} />
        
        {lots.map(lot => (
          <Lot 
            key={lot.id} 
            lot={lot} 
            isSelected={selectedLotId === lot.id} 
            onSelect={(l) => { if(onSelectLot) onSelectLot(l); }} 
          />
        ))}

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.1} // Prevent going below ground
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>
      
      {/* Legend overlays */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10 hidden md:flex flex-col space-y-3 pointer-events-none">
         <div className="flex items-center text-xs font-bold uppercase tracking-wider text-white">
            Leyenda 3D
         </div>
         <div className="flex flex-col space-y-2 text-[10px] font-bold uppercase tracking-wider text-gray-300">
            <div className="flex items-center"><div className="w-3 h-3 rounded-md bg-emerald-500 mr-2" /> Disponible</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-md bg-amber-500 mr-2" /> Reservado</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-md bg-red-500 mr-2" /> Vendido</div>
         </div>
         <p className="text-[9px] text-gray-400 mt-2 max-w-[150px]">
           Use click+drag to rotate, scroll to zoom, right-click+drag to pan.
         </p>
      </div>
    </div>
  );
}

// components/viewer/ModelCanvas.tsx
'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ModelViewer from './ModelViewer';

interface ModelCanvasProps {
    modelUrl: string;
    resetTrigger: number;
}

const LoadingFallback = () => (
    <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a5568" wireframe />
    </mesh>
);

const ModelCanvas: React.FC<ModelCanvasProps> = ({ modelUrl, resetTrigger }) => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            className="w-full h-full"
            style={{ background: '#1a1a2e' }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />

            {/* Environment for reflections (studio preset) */}
            <Environment preset="studio" />

            {/* Model */}
            <Suspense fallback={<LoadingFallback />}>
                <ModelViewer url={modelUrl} resetTrigger={resetTrigger} />
            </Suspense>

            {/* Controls */}
            <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={0.5}
                maxDistance={100}
            />
        </Canvas>
    );
};

export default ModelCanvas;

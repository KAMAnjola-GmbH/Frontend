// components/viewer/ModelViewer.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelViewerProps {
    url: string;
    resetTrigger: number;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ url, resetTrigger }) => {
    const { scene } = useGLTF(url);
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const lastResetTrigger = useRef(resetTrigger);

    // Center and fit model on load
    useEffect(() => {
        if (!scene || !groupRef.current) return;

        // Clone the scene to avoid modifying the cached one
        const clonedScene = scene.clone();

        // Clear previous children
        while (groupRef.current.children.length > 0) {
            groupRef.current.remove(groupRef.current.children[0]);
        }

        groupRef.current.add(clonedScene);

        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Center the model
        clonedScene.position.sub(center);

        // Calculate camera distance to fit the model
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5; // Add some padding

        camera.position.set(0, 0, cameraZ);
        camera.lookAt(0, 0, 0);
    }, [scene, camera]);

    // Handle camera reset
    useEffect(() => {
        if (resetTrigger !== lastResetTrigger.current) {
            lastResetTrigger.current = resetTrigger;

            if (!groupRef.current) return;

            // Recalculate camera position
            const box = new THREE.Box3().setFromObject(groupRef.current);
            const size = box.getSize(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5;

            camera.position.set(0, 0, cameraZ);
            camera.lookAt(0, 0, 0);
        }
    }, [resetTrigger, camera]);

    return <group ref={groupRef} />;
};

export default ModelViewer;

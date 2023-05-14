import React, { useRef, useEffect } from 'react'
import { useFBX, useAnimations } from '@react-three/drei'

export default function Model({ name, scale = 1.0, ...props }) {
    const fbx = useFBX(`/${name}.fbx`)

    fbx.traverse(child => {
        if (child.isMesh) {
            for (const material of child.material) {
                material.shininess = 0.1
            }
        }
    })

    const { animations } = useFBX(`/${name}.fbx`)

    const { ref, actions, names } = useAnimations(animations)

    useEffect(() => {
        actions['AnimalArmature|Eating'].play();
    }, []);

    return (
        <>
            <primitive
                ref={ref}
                object={fbx}
                position={[0, 0, 0]}
                scale={scale}
            />
        </>
    );
}
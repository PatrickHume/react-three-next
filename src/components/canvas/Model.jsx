import React, { useRef, useEffect } from 'react'
import { useFBX, useAnimations } from '@react-three/drei'

/* Load an FBX model from ./public */
export default function Model({ name, scale = 1.0, ...props }) {
    /* Load model and animations. */
    const fbx = useFBX(`/${name}.fbx`)
    const { ref, actions, names } = useAnimations(fbx.animations)

    /* Remove shininess from mesh */
    fbx.traverse(child => {
        if (child.isMesh) {
            for (const material of child.material) {
                material.shininess = 0.1
            }
        }
    })

    /* Play eating animation. */
    useEffect(() => {
        actions['AnimalArmature|Eating'].play();
    }, []);

    /* Return model */
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
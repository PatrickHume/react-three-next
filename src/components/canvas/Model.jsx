import React, { useRef, useLayoutEffect, forwardRef } from 'react'
import { useFBX, useAnimations } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

/* Load an FBX model from ./public */
const Model = forwardRef(function Model({
    name,
    scale = 1.0,
    rotation,
    position,
    sway = false,
    ...props }) {

    /* Load model and animations. */
    const fbx = useFBX(`/${name}.fbx`)
    const ref = useRef();
    // const { ref, actions, names } = useAnimations(fbx.animations)

    /* Remove shininess from mesh */
    fbx.traverse(child => {
        if (child.isMesh) {
            for (const material of child.material) {
                material.shininess = 0.1
            }
        }
    })

    if (sway) {
        useLayoutEffect(() => {
            ref.time = 0
        })

        useFrame((_, delta) => {
            ref.time += delta * 0.2
            ref.current.rotation.z = Math.sin(ref.time) * 0.1
            console.log(ref)
        })
    }

    // /* Play eating animation. */
    // useEffect(() => {
    //     actions['AnimalArmature|Walk'].play();
    // }, []);

    /* Return model */
    return (
        <>
            <primitive
                ref={ref}
                object={fbx}
                position={position}
                rotation={rotation}
                scale={scale}
            />
        </>
    );
})

export default Model
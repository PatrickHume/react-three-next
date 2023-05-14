import React, { useRef } from 'react'
import { useFBX } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'

export default function Model({ name, scale = 1.0, ...props }) {
    const fbx = useFBX(`/${name}.fbx`)
    fbx.traverse(child => {
        if (child.isMesh) {
            for (const material of child.material) {
                console.log(material)
                material.shininess = 0.1
            }
        }
    })
    return <primitive object={fbx} position={[0, 0, 0]} scale={scale} />
}
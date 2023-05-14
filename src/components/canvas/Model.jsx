import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ name, ...props }) {
    const { scene } = useGLTF(`/${name}/scene.gltf`)
    return <primitive object={scene} position={[0, 0, 0]} scale={0.01} />
}

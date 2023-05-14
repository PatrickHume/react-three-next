import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const url = '/supermarine_spitfire/scene.gltf'

export default function Spitfire(props) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} position={[0, 0, 0]} scale={0.01} />
}

useGLTF.preload('/supermarine_spitfire/scene.gltf')
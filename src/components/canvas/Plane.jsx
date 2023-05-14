import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const url = '/supermarine_spitfire/scene.gltf'

export default function Plane(props) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} />
}

useGLTF.preload('/supermarine_spitfire/scene.gltf')
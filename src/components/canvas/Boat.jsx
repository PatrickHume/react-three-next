import { useRef, useLayoutEffect } from 'react'
import { useFrame, useThree } from "@react-three/fiber";
import { Sky } from '@react-three/drei'
import * as THREE from "three";

import Model from './Model'

export default function Boat({ ...props }) {
    const ref = useRef()

    useLayoutEffect(() => {
        ref.time = 0
    })

    useFrame((_, delta) => {
        ref.time += delta
        console.log(ref)
    })

    return (
        <Model ref={ref} name='boats/sailboat' scale={0.5} position={[120, 0, 300]} />
    )
}

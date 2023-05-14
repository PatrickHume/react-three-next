import React, { Suspense, useRef } from 'react'
import { Canvas, useLoader, useFrame, extend, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'

import WasdControls from './WASDControls'
import Model from './Model'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ PointerLockControls })

function Loading() {
    return (
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[1, 16, 16]} />
            <meshStandardMaterial attach="material" color="white" transparent opacity={0.6} roughness={1} metalness={0} />
        </mesh>
    )
}

export function Game({ route = '/blob', ...props }) {
    return (
        <Canvas style={{ background: 'white' }}>
            <directionalLight intensity={0.5} />
            <Suspense fallback={<Loading />}>
                <Model name='animals/Fox' scale={0.005} />
            </Suspense>
            <PointerLockControls />
            <WasdControls />
        </Canvas>
    )
}

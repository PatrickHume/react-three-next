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

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls class.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls

    const {
        camera,
        gl: { domElement }
    } = useThree()

    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef()
    useFrame((state) => controls.current.update())
    return (
        <OrbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={false} // highlight-line
            maxAzimuthAngle={Math.PI / 4} // highlight-line
            maxPolarAngle={Math.PI} // highlight-line
            minAzimuthAngle={-Math.PI / 4} // highlight-line
            minPolarAngle={0} // highlight-line
        />
    )
}

export function Game({ route = '/blob', ...props }) {
    return (
        <Canvas style={{ background: 'white' }}>
            <directionalLight intensity={0.5} />
            <Suspense fallback={<Loading />}>
                <Model name='supermarine_spitfire' />
            </Suspense>
            <PointerLockControls />
            <WasdControls />
        </Canvas>
    )
}

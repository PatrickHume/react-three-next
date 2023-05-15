import React, { Suspense } from 'react'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { PointerLockControls, Environment } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise, BrightnessContrast } from '@react-three/postprocessing'

import WasdControls from './WASDControls'
import Model from './Model'
import Lake from './Lake'
import Sunset from './Sunset'
import * as THREE from "three";

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

    const lookAtSun = new THREE.Quaternion();
    const lookUp = new THREE.Quaternion();

    lookAtSun.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 3.7);
    lookUp.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.1);
    lookAtSun.multiply(lookUp);

    return (
        <Canvas
            dpr={0.5}
            style={{ background: 'white' }}>

            <EffectComposer>
                {/* <BrightnessContrast
                    brightness={-0.2} // brightness. min: -1, max: 1
                    contrast={0.5} // contrast: min -1, max: 1
                /> */}
                <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={1} height={480} />
                {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
                <Noise opacity={0.1} />
                {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
            </EffectComposer>

            {/* <directionalLight intensity={0.5} /> */}
            {/* <Environment preset="forest" background /> */}
            <Suspense fallback={<Loading />}>
                {/* <Model name='animals/Deer' scale={0.01} /> */}
                <Sunset />
                <Environment files="/stars.hdr" background />
                {/* <Environment preset="forest" background /> */}
                <Lake />
            </Suspense>
            <PointerLockControls />
            <WasdControls />
        </Canvas>
    )
}

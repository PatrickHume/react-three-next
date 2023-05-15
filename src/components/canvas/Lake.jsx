import React, { useRef, useMemo } from 'react';
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { FrontSide } from 'three';
import * as THREE from 'three';
import { Water } from 'three-stdlib'

extend({ Water })

export default function Lake() {
    const ref = useRef()
    const gl = useThree((state) => state.gl)
    const waterNormals = useLoader(THREE.TextureLoader, '/waternormals_small.jpeg')
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    const geom = useMemo(() => new THREE.PlaneGeometry(1500, 10000), [])
    const config = useMemo(
        () => ({
            textureWidth: 256,
            textureHeight: 256,
            waterNormals,
            sunDirection: new THREE.Vector3(0.6, 0.1, 1),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 10,
            fog: false,
            format: gl.encoding
        }),
        [waterNormals]
    )
    useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta * 0.1))
    return <water ref={ref} args={[geom, config]} position={[0, 0, 0]} rotation-x={-Math.PI / 2} rotation-z={0.55} />
}
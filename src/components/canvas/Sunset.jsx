import { useRef, useLayoutEffect } from 'react'
import { useFrame, useThree } from "@react-three/fiber";
import { Sky } from '@react-three/drei'
import * as THREE from "three";

function clamp(num, min, max) {
    return num <= min
        ? min
        : num >= max
            ? max
            : num
}

export default function Sunset() {
    const { invalidate } = useThree()

    const ref = useRef()
    const lightRef = useRef()
    const ambientRef = useRef()

    let height
    let opacity
    let darkness
    let rayleigh
    let mieCoefficient
    let intensity
    let ambientIntensity

    const vec = new THREE.Vector3(5, 0.25, 8)

    useLayoutEffect(() => {
        ref.time = 0.3
        ref.interval = setInterval(() => invalidate(), 100)
        ref.fragmentShader = ref.current.material.fragmentShader
        if (ref.fragmentShader.includes("opacity")) {
            return
        }
        ref.current.material.transparent = true;
        ref.fragmentShader = "uniform float opacity;\n" + ref.fragmentShader
        ref.fragmentShader = "uniform float darkness;\n" + ref.fragmentShader
        ref.fragmentShader = ref.fragmentShader.replace("gl_FragColor = vec4( retColor, 1.0 );", "gl_FragColor = vec4( darkness * retColor, opacity );")
        ref.current.material.fragmentShader = ref.fragmentShader
        ref.current.material.uniforms.opacity = { "value": 1.0 };
        ref.current.material.uniforms.darkness = { "value": 1.0 };

        lightRef.current.intensity = 0.05
        ambientRef.current.intensity = 0.05
    }, [])

    useFrame((_, delta) => {
        ref.time += delta * 0.025

        height = ref.time - 1.0
        height = clamp(height, -1.0, 5.0)

        ref.current.material.uniforms.sunPosition.value.y = height

        opacity = 1.0 * (ref.time)
        opacity = clamp(opacity, 0.8, 1.0)
        ref.current.material.uniforms.opacity = { "value": opacity };

        darkness = (ref.time + 0.5)
        darkness = clamp(darkness, 0.0, 1.0)
        ref.current.material.uniforms.darkness = { "value": darkness };

        rayleigh = (3.0 - ref.time * 2.0)
        rayleigh = clamp(rayleigh, 1.0, 3.0)
        ref.current.material.uniforms.rayleigh = { "value": rayleigh };

        mieCoefficient = 0.005 + (ref.time - 2.0) * 0.005
        mieCoefficient = clamp(mieCoefficient, 0.005, 0.010)
        ref.current.material.uniforms.mieCoefficient = { "value": mieCoefficient };

        intensity = 0.05 + (ref.time - 0.5)
        intensity = clamp(intensity, 0.05, 2.0)
        lightRef.current.intensity = intensity

        ambientIntensity = 0.05 + (ref.time - 0.5) * 0.25
        ambientIntensity = clamp(ambientIntensity, 0.05, 0.9)
        ambientRef.current.intensity = ambientIntensity
    })
    return (
        <>
            <ambientLight ref={ambientRef} intensity={0.2} />
            <pointLight ref={lightRef} position={[1800, -1, 3000]} intensity={2.0} />
            <Sky
                ref={ref}
                distance={5000}
                rayleigh={3.0}
                inclination={0.0}
                azimuth={0}
                turbidity={1}
                mieCoefficient={0.005}
                mieDirectionalG={0.8}
                sunPosition={vec}
            />
        </>
    )
}
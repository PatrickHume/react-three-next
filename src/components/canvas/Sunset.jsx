import { useRef, useEffect } from 'react'
import { useFrame } from "@react-three/fiber";
import { Sky } from '@react-three/drei'
import * as THREE from "three";

export default function Sunset() {
    const ref = useRef()

    const vec = new THREE.Vector3(5, 0.25, 8);

    useEffect(() => {
        let fragmentShader = ref.current.material.fragmentShader
        if (fragmentShader.includes("opacity")) {
            return
        }
        ref.current.material.transparent = true;
        fragmentShader = "uniform float opacity;\n" + fragmentShader
        fragmentShader = "uniform float darkness;\n" + fragmentShader
        fragmentShader = fragmentShader.replace("gl_FragColor = vec4( retColor, 1.0 );", "gl_FragColor = vec4( darkness * retColor, opacity );")
        ref.current.material.fragmentShader = fragmentShader
        ref.current.material.uniforms.opacity = { "value": 1.0 };
        ref.current.material.uniforms.darkness = { "value": 1.0 };
    }, [])

    useFrame((_, delta) => {

        let height = ref.current.material.uniforms.sunPosition.value.y
        let opacity = ref.current.material.uniforms.opacity.value ?? 1.0
        let darkness = ref.current.material.uniforms.darkness.value ?? 1.0

        height -= 0.02 * delta

        if (height > -0.5) {
            ref.current.material.uniforms.sunPosition.value.y = height
        }

        if (height < -0.3 && opacity > 0.0) {
            opacity -= 0.01 * delta;
            opacity = Math.max(opacity, 0.0)
            ref.current.material.uniforms.opacity = { "value": opacity };
        }

        if (height < 0.1 && opacity > 0.0) {
            darkness -= 0.01 * delta;
            darkness = Math.max(darkness, 0.0)
            ref.current.material.uniforms.darkness = { "value": darkness };
        }
    })
    return (
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
    )
}
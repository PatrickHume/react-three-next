import { Box, Plane, Sphere, Text } from '@react-three/drei'
import React, { useEffect, useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'

import Model from './Plane'

function generateBoxesFromString(str) {
    const boxes = []
    for (let i = 0; i < str.length; i++) {
        boxes.push({ position: [0, i * (1.1), 0], letter: str[i] })
    }
    return boxes
}

function PhyPlane({ color, ...props }) {
    const [ref] = usePlane(() => ({ ...props }))

    return (
        <Plane args={[1000, 1000]} ref={ref}>
            <meshStandardMaterial color={color} />
        </Plane>
    )
}

function PhyBox({ position, letter, ...props }) {
    const dimensions = [0.8, 1.0, 0.25];
    const [ref, api] = useBox(() => ({ args: dimensions, mass: 500, position: position, ...props }))
    const { scene } = useThree()
    const arrow = useRef(new THREE.ArrowHelper(new THREE.Vector3(), new THREE.Vector3(), 1, 0xff0000, 0.2, 0.2))
    useEffect(() => {
        scene.add(arrow.current)
    }, [])
    return (
        <Box
            args={dimensions}
            ref={ref}
            onClick={(event) => {
                const normal = event.face.normal.clone()
                normal.transformDirection(event.object.matrixWorld)
                normal.normalize()
                normal.multiplyScalar(30.0)

                api.applyImpulse(normal.toArray(), event.point.toArray())
            }}
            onPointerMove={(event) => {
                const normal = event.face.normal.clone();
                normal.transformDirection(event.object.matrixWorld);
                normal.normalize();

                arrow.current.setDirection(normal);
                arrow.current.position.copy(event.point);
            }}
            onPointerEnter={(event) => {

            }}
            onPointerLeave={(event) => {

            }}>
            {/* Add Text component with letter */}
            <Text position={[0, 0, dimensions[2] + 0.01]} fontSize={1} color="black" anchorX="center" anchorY="middle" children={letter} />
            <meshStandardMaterial color="white" />
        </Box >
    )
}

function SphereCursor(props) {
    const [ref, api] = useSphere(() => ({ args: [1.0], position: [0, 5, 0], ...props }))
    const [mousePos, setMousePos] = useState([0, 0])

    useFrame(({ mouse }) => {
        const [x, y] = mousePos
        const [mx, my] = [mouse.x, mouse.y]
        const tx = THREE.MathUtils.lerp(x, mx, 0.1)
        const ty = THREE.MathUtils.lerp(y, my, 0.1)
        setMousePos([tx, ty])
        api.position.set(tx * 5, ty * 5, 0)
    })

    return (
        <Sphere ref={ref} args={[0.1, 32, 32]} visible={true}>
            <meshStandardMaterial />
        </Sphere>
    )
}

export function Game({ route = '/blob', ...props }) {
    const boxes = generateBoxesFromString('This is a big long message.')

    return (
        <Canvas camera={{ fov: 75, position: [0, 0, 20], near: 0.1, far: 1000 }} style={{ background: 'white' }}>
            <Physics gravity={[0, -10, 0]}>
                <PhyPlane color="white" position={[0, -0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                {boxes.map((box, i) => (
                    <PhyBox key={i} position={box.position} letter={box.letter} />
                ))}
                {/*<SphereCursor />*/}
            </Physics>

            <Suspense fallback={null}>
                <Model />
            </Suspense>

            <ambientLight intensity={0.3} />
            <pointLight intensity={0.8} position={[5, 0, 5]} />
        </Canvas>
    )
}

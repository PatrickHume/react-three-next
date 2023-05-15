import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import * as THREE from "three";

// Rotation logic from three/examples/jsm/controls/PointerLockControls.js
export default function Camera() {
  const { camera } = useThree()

  useThree(({ camera }) => {
    const lookAtSun = new THREE.Quaternion()
    const lookUp = new THREE.Quaternion()

    lookAtSun.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 3.7)
    lookUp.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.1)
    lookAtSun.multiply(lookUp)

    camera.position.setComponent(1, 20.0)
    camera.rotation.setFromQuaternion(lookAtSun)
    camera.fov = 40
    camera.updateProjectionMatrix()
  })

  return null
}

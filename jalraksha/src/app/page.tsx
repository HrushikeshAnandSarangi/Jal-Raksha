import { GLTFViewer } from '@/components/EarthViewer'
import React from 'react'

export default function page() {
  return (
    <>
      <GLTFViewer
        modelPath="/Earth/scene.gltf"
        heading="Jal Raksha"
        tagline="RWH and Artificial Recharge"
      />
    </>
  )
}

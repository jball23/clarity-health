'use client'

import { PlasmicCanvasHost, PlasmicRootProvider } from '@plasmicapp/loader-nextjs'
import { PLASMIC } from '@/plasmic-init'

export default function PlasmicHostPage() {
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <PlasmicCanvasHost />
    </PlasmicRootProvider>
  )
}

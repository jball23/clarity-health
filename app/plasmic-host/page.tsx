'use client'

// Side-effect import runs all PLASMIC.registerComponent() calls in the client bundle.
import '@/plasmic-init'
import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs'

export default function PlasmicHostPage() {
  return <PlasmicCanvasHost />
}

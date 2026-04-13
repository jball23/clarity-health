// Side-effect import: triggers all PLASMIC.registerComponent() calls on the client
import '@/plasmic-init'

import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs'

export default function PlasmicHostPage() {
  return <PlasmicCanvasHost />
}

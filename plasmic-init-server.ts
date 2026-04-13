import { initPlasmicLoader } from '@plasmicapp/loader-nextjs/react-server'

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID!,
      token: process.env.NEXT_PUBLIC_PLASMIC_PUBLIC_KEY!,
    },
  ],
  preview: process.env.NODE_ENV === 'development',
})

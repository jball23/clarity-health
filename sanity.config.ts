import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Clarity Health Studio',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

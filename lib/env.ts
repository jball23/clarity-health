// Typed environment variable access — never use process.env directly outside this file

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function optionalEnv(name: string): string | undefined {
  return process.env[name]
}

export const env = {
  sanity: {
    projectId: requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    readToken: optionalEnv('SANITY_API_READ_TOKEN'),
  },
  plasmic: {
    projectId: requireEnv('NEXT_PUBLIC_PLASMIC_PROJECT_ID'),
    publicKey: requireEnv('NEXT_PUBLIC_PLASMIC_PUBLIC_KEY'),
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  },
} as const

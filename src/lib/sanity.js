import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '7o31gm3n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

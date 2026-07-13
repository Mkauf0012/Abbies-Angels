import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '7o31gm3n',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})

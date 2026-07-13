import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '7o31gm3n',
    dataset: 'production',
  },
  studioHost: 'abbies-angels',
  deployment: {
    appId: 'yk8gusnf5t9u0rmayn2hsa1t',
    autoUpdates: true,
  },
})

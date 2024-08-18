/// <reference types="vitest" />
import { defineConfig } from 'vite'
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev'
import { getLoadContext } from './load-context'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy({ getLoadContext }),
    remix({ ignoredRouteFiles: ['**/.test.*'] }),
    tsconfigPaths(),
  ],
})

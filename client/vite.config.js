import { defineConfig, transformWithEsbuild } from 'vite'
import process from 'node:process'

import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

const hmrPort = process.env.VITE_HMR_PORT
  ? parseInt(process.env.VITE_HMR_PORT)
  : 3010

function handleModuleDirectivesPlugin() {
  return {
    name: 'handle-module-directives-plugin',
    transform(code, id) {
      if (id.includes('@vkontakte/icons')) {
        code = code.replace(/"use-client";?/g, '')
      }
      return { code }
    },
  }
}

function treatJsFilesAsJsx() {
  return {
    name: 'treat-js-files-as-jsx',
    async transform(code, id) {
      if (!id.match(/src\/.*\.js$/)) return null

      return transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
      })
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    treatJsFilesAsJsx(),
    handleModuleDirectivesPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  server: {
    port: 3010,
    host: true,
    strictPort: true,
    hmr: {
      clientPort: hmrPort, // При разработке, для тестирования на сервере
    },
    allowedHosts: [
      'localhost',
      '185.251.89.77',
      'sportplans.ru',
      'www.sportplans.ru',
      'vk.ru',
      'www.vk.ru',
      'vk.com',
      'www.vk.com',
    ],
    watch: {
      usePolling: true,
      ignored: ['**/.dockerignore'],
    },
  },
  preview: {
    port: 4444,
    strictPort: true,
  },

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})

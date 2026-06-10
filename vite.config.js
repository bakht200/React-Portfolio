import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Must match your GitHub repo name
const repoName = 'React-Portfolio'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        const indexPath = resolve('dist/index.html')
        writeFileSync(resolve('dist/404.html'), readFileSync(indexPath))
      },
    },
  ],
  base: mode === 'production' ? `/${repoName}/` : '/',
}))

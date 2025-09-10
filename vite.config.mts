import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    // Library build configuration
    return {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          'woby': 'woby',
        }
      },
      esbuild: {
        jsx: 'automatic'
      },
      build: {
        outDir: 'dist',
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'useReact',
          fileName: 'index',
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          external: [
            '@lit/react',
            '@r2wc/react-to-web-component',
            'react',
            'react-dom',
            'react-dom/client',
            'woby'
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react-dom/client': 'ReactDOMClient',
              woby: 'Woby'
            }
          }
        }
      }
    }
  } else {
    // Examples build configuration (default) - bundle all dependencies
    return {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          'woby': 'woby',
        }
      },
      esbuild: {
        jsx: 'automatic'
      },
      build: {
        outDir: 'build',
        rollupOptions: {
          // For examples, we want to bundle all dependencies except external libraries
          // that should remain as external (like large libraries that should be CDN loaded)
          external: [
            // Add any libraries you want to keep external in examples here
            // For most cases, you might want to bundle everything
          ],
          input: {
            main: resolve(__dirname, 'index.html'),
          }
        }
      }
    }
  }
})
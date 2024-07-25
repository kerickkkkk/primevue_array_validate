import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/primevue_array_validate/', // Replace 'your-base-url' with your actual base URL
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      // Correctly configure Components here
      resolvers: [PrimeVueResolver()]
    }),
    AutoImport({
      // targets to transform
      include: [/\.vue$/],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        'vee-validate',
        {
          '@vee-validate/zod': ['toTypedSchema']
        }
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json' // Default `./.eslintrc-auto-import.json`
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

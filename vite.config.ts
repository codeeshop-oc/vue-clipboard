import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom'
  },
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, 'src/index.ts'),
  //     name: 'vue-clipboard',
  //   },
  //   rollupOptions: {
  //     external: ['vue'],
  //     output: {
  //       sourcemap: false,
  //       // Provide global variables to use in the UMD build
  //       // for externalized deps
  //       globals: {
  //         vue: 'Vue'
  //       }
  //     }
  //   }

  // },
    // eslint()
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'center'
        }
      }
    }),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   open: true,
  //   allowedHosts: ['.loca.lt'], // 允许所有 loca.lt 子域名
  //   proxy: {
  //     '/spd/tongji': { // 代理第三方请求到本地 Mock
  //       target: 'http://192.168.1.108:5173',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/spd\/tongji/, '/mock-tongji')
  //     }
  //   }
  // },
  // proxy: {
  //   '/api': {
  //     target: 'http://192.168.1.115:5000',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')
  //   }
  // }
})

import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import type { UserConfig } from 'vite'
import ssr from 'vite-plugin-ssr/plugin'
import windiCSS from 'vite-plugin-windicss'

import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'

const isDev = process.env.NODE_ENV === 'development'

const config: UserConfig = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    ssr(),
    windiCSS({}),
    Icons({}),
    AutoImport({
      dts: './src/import.d.ts',
      imports: ['vue', 'pinia', '@vueuse/core', '@vueuse/head'],
    }),
    Components({
      dirs: ['./src/components'],
      extensions: ['vue'],
      deep: true,
      dts: './src/components.d.ts',
      resolvers: [IconsResolver()],
    }),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,

      include: path.resolve(__dirname, './src/locales/**'),
    }),
  ],

  server: {
    proxy: {
      '/api': {
        target: isDev
          ? 'http://localhost:2333'
          : 'http://localhost:2333/api/v2',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:2333/socket.io',
        ws: true,
      },
    },
  },
}

export default config

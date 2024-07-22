import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { OUTPUT_DIR, brotliSize, chunkSizeWarningLimit, terserOptions, rollupOptions } from './build/constant'
import viteCompression from 'vite-plugin-compression'
import { axiosPre } from './src/settings/httpSetting'
import { viteMockServe } from 'vite-plugin-mock'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ mode }) => defineConfig({
  base: '/kanban2',
  // 路径重定向
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types')
      },
      {
        find: '@',
        replacement: pathResolve('src')
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', //解决i8n警告
      }
    ],
    dedupe: ['vue']
  },
  // 全局 css 注册
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "src/styles/common/style.scss";`
      }
    }
  },
  plugins: [
    vue(),
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html']
    }),
    viteMockServe({
      mockPath: '/src/api/mock',
      // 开发打包开关
      localEnabled: true,
      // 生产打包开关
      prodEnabled: true,
      // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
      supportTs: true,
      // 监视文件更改
      watchFiles: true
    }),
    // 压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  // 打包配置
  build: {
    target: 'es2015',
    outDir: OUTPUT_DIR,
    // assetsDir: 'kanban/assets',
    // minify: 'terser', // 如果需要用terser混淆，可打开这两行
    // terserOptions: terserOptions,
    rollupOptions: rollupOptions,
    brotliSize: brotliSize,
    chunkSizeWarningLimit: chunkSizeWarningLimit
  },
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置
    proxy: {// 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      '/your-address': { 
        target: 'http://web', // 通过代理接口访问实际地址。这里是实际访问的地址。vue会通过代理服务器来代理请求
        changeOrigin: true,
        ws: true,  // 允许websocket代理
        rewrite: (path) => path.replace(/^\/web/, '') // 将api替换为空
      },
      // '/api': {
      //   changeOrigin: true,
      //   rewrite: (p) => p.replace(/^\/api/, '')
      // },
      [axiosPre]: {
        // @ts-ignore
        target: loadEnv(mode, process.cwd()).VITE_DEV_PATH,
        changeOrigin: true,
        ws: true,
        secure: true,
      },
      // '/goApi': {
      //   target:'https://demo.mtruning.club/api/goview',
      //   changeOrigin: true,
      //   rewrite: (p) => p.replace(/^\/goApi/, '')
      // },
      '/sqlserver': {
        target:'http://13.228.89.18:10824/api',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/sqlserver/, '')
      },
      '/goApi': {
        target:'http://192.168.3.22:8083/api/goview',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/goApi/, '')
      },
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import replace from '@rollup/plugin-replace';
import {Buffer} from 'buffer'
import buffer from 'buffer'
import { createRequire } from 'module';
// import nodeBuiltins from 'rollup-plugin-node-builtins';
// import nodeGlobals from 'rollup-plugin-node-globals';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
const require = createRequire(import.meta.url);
// https://vitejs.dev/config/
// console.log('buffer :>> ', buffer);
// console.log(typeof Buffer,'JSON.stringify(Buffer) :>> ', Buffer);
export default defineConfig({
    plugins: [
        // {
        //     ...nodeBuiltins(),
        //     enforce: 'pre',
        //   },
        //   {
        //     ...nodeGlobals(),
        //     enforce: 'pre',
        //   },
          nodePolyfills({
            // 可以在这里指定需要的 polyfill 模块
            include: [
              // 常用的 Node.js 模块
              'buffer',
            //   'stream',
            //   'crypto',
            //   'http',
            //   'https',
            //   'os',
              // 添加更多模块
            ],
          }),
        react(),
        basicSsl(),
        // replace({
        //     'globalThis.Buffer': 'require("buffer").Buffer',
        //     preventAssignment: true,
        // }),
    ],
    // resolve: {
    //     alias: {
    //       // 如果需要，可以设置别名
    //       buffer: 'buffer/', // 例如，确保 buffer 模块正确解析
    //     },
    //   },
    server: {
        historyApiFallback: true, // 确保所有请求重定向到 index.html
    },
    build: {
        outDir: './build'
    },
    base: './',
    // define: {
    //     'globalThis.Buffer': JSON.stringify(Buffer),
    // },
    resolve: {
        alias: {
          buffer: 'buffer/', // 确保 buffer 解析正确
        },
      },
    //   define: {
    //     'globalThis.Buffer': 'Buffer', // 将 Buffer 设置为全局变量
    //   },
})

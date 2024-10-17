import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), basicSsl()],
    server: {
        historyApiFallback: true, // 确保所有请求重定向到 index.html
    },
    build: {
        outDir: 'build'
    },
    base: './'
})

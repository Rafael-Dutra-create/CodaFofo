// vitest.config.mts
import { defineConfig } from 'vitest/config'
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: 'node', // ou 'jsdom' se for frontend
        setupFiles: './src/setupVitest.ts', // <- se for usar setup
        hookTimeout: 30000,
        env:{
            NODE_ENV: 'test'
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})

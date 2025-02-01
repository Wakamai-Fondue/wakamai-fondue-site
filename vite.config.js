import path from 'node:path';

import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
    build: {
        assetsDir: 'js',
        emptyOutDir: true,
        outDir: '../dist',
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'index.css') {
                        return 'css/app.[hash].css';
                    }

                    if (assetInfo.name.endsWith('.jpg')) {
                        return 'img/[name].[hash].jpg';
                    }

                    if (assetInfo.name.endsWith('.svg')) {
                        return 'img/[name].[hash].svg';
                    }

                    return assetInfo.name;
                },
            }
        },
        sourcemap: true,
    },
    plugins: [
        nodePolyfills({
            overrides: {
                assert: require.resolve('assert/'),
                fs: false,
                stream: require.resolve('stream-browserify'),
                util: require.resolve('util/'),
                zlib: require.resolve('browserify-zlib'),
            }
        }),
        vue(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    root: './src',
});

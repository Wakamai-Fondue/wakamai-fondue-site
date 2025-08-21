import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from "vite";
import { analyzer } from 'vite-bundle-analyzer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import { dependencies } from './package.json';

delete dependencies["@wakamai-fondue/engine"];
const vendors = ["vue"];

// Kudos https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
function renderChunks(deps) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (vendors.includes(key)) {
        return;
    }

    chunks[key] = [key];
  });
  return chunks;
}

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
                manualChunks: {
                    vendor: vendors,
                    ...renderChunks(dependencies),
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
        analyzer({
            analyzerMode: 'static',
            openAnalyzer: false
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    root: './src',
});

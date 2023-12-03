import { defineConfig } from 'vite'
import path from 'path'
import scss from 'rollup-plugin-scss'
import ts from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'


const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

// https://vitejs.dev/config/
export default defineConfig({
    // Add entrypoint
    build: {
        // our entry
        rollupOptions: {
          input: path.resolve(__dirname, '/web/themes/custom/contribtracker/ts/main.js'),
          output: {
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name].js`,
            assetFileNames: `assets/[name].[ext]`
          },
        },

        // manifest
        manifest: true,
        outDir: 'web/themes/custom/contribtracker/dist',
    },

    // Adjust Vites dev server for DDEV
    // https://vitejs.dev/config/server-options.html
    server: {
        // respond to all network requests:
        host: '0.0.0.0',
        port: port,
        strictPort: true, 
        // Defines the origin of the generated asset URLs during development
        origin: origin
    },

})

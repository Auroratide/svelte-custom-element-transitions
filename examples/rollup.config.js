import * as path from 'path'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0)
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'example:server', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            })

            process.on('SIGTERM', toExit)
            process.on('exit', toExit)
        }
    }
}

export default {
    input: path.join(__dirname, 'src', 'main.ts'),
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'client',
        file: path.join(__dirname, 'public', 'build', 'bundle.js'),
    },

    plugins: [
        svelte({
            preprocess: sveltePreprocess(),
            compilerOptions: {
                dev: !production,
                customElement: true,
            }
        }),

        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),

        commonjs(),

        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),

        !production && serve(),

        !production && livereload('public'),

        production && terser()
    ],
    watch: {
        clearScreen: false,
    },
}
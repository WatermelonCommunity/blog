import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import alias from '@rollup/plugin-alias'
import sveltePreprocess from 'svelte-preprocess'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const onwarn = (warning, onwarn) =>
    (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
    (warning.code === 'CIRCULAR_DEPENDENCY' &&
        /[/\\]@sapper[/\\]/.test(warning.message)) ||
    onwarn(warning)

const preprocess = sveltePreprocess({ postcss: true })

const projectRootDir = path.resolve(__dirname)
const customResolver = resolve({
    extensions: ['.mjs', '.js', '.json', '.svelte'],
})

export default {
    client: {
        input: config.client.input(),
        output: config.client.output(),
        plugins: [
            replace({
                'process.browser': true,
                'preventAssignment': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            svelte({
                preprocess,
                compilerOptions: {
                    dev,
                    hydratable: true,
                },
            }),
            alias({
                entries: [
                    {
                        find: '@assets',
                        replacement: path.resolve(projectRootDir, 'src/assets'),
                    },
                    {
                        find: '@components', replacement: path.resolve(projectRootDir, 'src/components'),
                    },
                ],
                customResolver,
            }),
            resolve({
                browser: true,
                dedupe: ['svelte'],
            }),
            commonjs(),

            !dev &&
                terser({
                    module: true,
                }),
        ],

        preserveEntrySignatures: false,
        onwarn,
    },

    server: {
        input: config.server.input(),
        output: config.server.output(),
        plugins: [
            replace({
                'process.browser': false,
                'preventAssignment': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            svelte({
                preprocess,
                compilerOptions: {
                    dev,
                    generate: 'ssr',
                    hydratable: true,
                },
                emitCss: false,
            }),
            alias({
                entries: [
                    {
                        find: '@assets',
                        replacement: path.resolve(projectRootDir, 'src/assets'),
                    },
                    {
                        find: '@components', replacement: path.resolve(projectRootDir, 'src/components'),
                    },
                ],
                customResolver,
            }),
            resolve({
                dedupe: ['svelte'],
            }),
            commonjs(),
        ],
        external: Object.keys(pkg.dependencies).concat(
            require('module').builtinModules,
        ),

        preserveEntrySignatures: 'strict',
        onwarn,
    },
}

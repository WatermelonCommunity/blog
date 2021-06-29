const cssnano = require('cssnano')({
    preset: ['default', { discardComments: { removeAll: true } }],
})

const mode = process.env.NODE_ENV
const prod = mode === 'production'

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('postcss-preset-env'),
        ...(prod ? [cssnano] : []),
    ],
}

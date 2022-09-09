module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@nuxt/babel-preset-app',
      ],
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
}

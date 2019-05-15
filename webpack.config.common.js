/* eslint-env node */
const { join } = require('path')
const Webpackbar = require('webpackbar')

module.exports = {
  output: {
    path: join(__dirname, './dist')
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      join(__dirname, './node_modules'),
      join(__dirname, './src')
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/u,
        exclude: /node_modules/u
      }
    ]
  },

  plugins: [
    new Webpackbar({
      name: 'tract-times'
    })
  ]
}

const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')

const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  name: 'app',
  target: 'web',
  mode: 'development',

  entry: [
    join(__dirname, './src/index.js')
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[id].js'
  },

  devtool: 'cheap-module-eval-source-map',

  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        venders: {
          test: /node_modules/u,
          name: 'vendor'
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      hase: true,
      inject: true,
      title: 'Track Times',
      template: join(__dirname, './src/index.html')
    })
  ]
})

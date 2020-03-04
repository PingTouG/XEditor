const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.config.base')

const basePath = '../examples'

module.exports = merge(base.config, {
  mode: 'development',
  entry: base.resolve(`${basePath}/index.ts`),
  // 开启sourceMap
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'XEditor',
      template: base.resolve(`${basePath}/index.html`),
    }),
  ],
  devServer: {
    port: 8080,
  },
})

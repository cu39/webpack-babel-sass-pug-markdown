const path = require('path')

exports.mode = 'development'

exports.entry = {
  app: './src/index.js'
}

exports.output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/js/',
  filename: '[name].js',
  library: ['com', 'example'],
  libraryTarget: 'umd',
}

exports.devServer = {
  port: 8080,
  open: true,
  // openPage: 'index.html',
  contentBase: path.resolve(__dirname, 'public'),
  watchContentBase: true,
}

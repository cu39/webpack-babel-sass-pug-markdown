const path = require('path')

exports.mode = 'development'

exports.output = {
  libraryTarget: 'umd',
}

exports.devServer = {
  port: 8080,
  open: true,
  // openPage: 'index.html',
  contentBase: path.resolve(__dirname, 'public'),
  watchContentBase: true,
}

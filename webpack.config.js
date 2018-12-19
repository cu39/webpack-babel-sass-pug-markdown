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

exports.module = {
  rules: [
    { // Babel
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: { loader: 'babel-loader', }
    },
    { // Sass
      test: /\.s[ac]ss$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        { loader: 'style-loader',
          options: {
          },
        },
        { loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
          },
        },
        { loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        { loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ]
}

exports.devtool = 'inline-source-map'

exports.devServer = {
  port: 8080,
  open: true,
  // openPage: 'index.html',
  contentBase: path.resolve(__dirname, 'public'),
  watchContentBase: true,
}

const path = require('path')
const globule = require('globule')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.resolveLoader = {
  modules: [
    'node_modules',
    path.resolve(__dirname, 'loaders')
  ]
}

exports.mode = 'development'

exports.entry = {
  app: './src/index.js'
}

exports.output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
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
    { // Pug
      test: /\.pug$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        { loader: 'apply-loader' },
        {
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
      ],
    },
    { // Markdown
      test: /\.md$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        { loader: 'apply-loader' },
        {
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
        {
          loader: 'markdown-to-pug-loader',
          options: {
            // linkify: false,
            // typographer: false,
          }
        },
      ],
    },
  ]
}

exports.plugins = pluginConfig()

exports.devtool = 'inline-source-map'

exports.devServer = {
  port: 8080,
  open: true,
  openPage: '',
}

function pluginConfig() {
  const pugDir  = path.resolve(__dirname, 'src', 'pug')
  const mdDir   = path.resolve(__dirname, 'src', 'md')
  const destDir = path.resolve(__dirname, 'dist')
  const blogDir = path.join(destDir, 'blog')

  const mapCallback = o => new HtmlWebpackPlugin({
    template: o['src'][0],
    filename: o['dest'],
  })

  const pages = globule.findMapping({
    src: path.join('**', '*.pug'),
    srcBase: pugDir,
    destBase: destDir,
    ext: '.html',
    extDot: 'last',
    filter: found =>
      !(/_[^\/]+\.pug$/.test(found))
      && found.indexOf(path.join(pugDir, 'layout')) < 0,
  }).map(mapCallback)

  const blogs = globule.findMapping({
    src: path.join('**', '*.md'),
    srcBase: mdDir,
    destBase: blogDir,
    ext: '.html',
    extDot: 'last',
  }).map(mapCallback)

  return pages.concat(blogs)
}

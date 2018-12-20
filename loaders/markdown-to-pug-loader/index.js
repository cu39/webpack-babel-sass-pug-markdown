const loaderUtils = require('loader-utils')

module.exports = function markdownLoader(markdown) {
  const options = loaderUtils.getOptions(this)
  const md2pug = new (require('markdown-to-pug'))(options)
  return md2pug.render(markdown)
}

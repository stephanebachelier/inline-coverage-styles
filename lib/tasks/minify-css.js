const log = require('debug')('ics:task:minify')
const minify = require('../helper/minify')
const find = require('../helper/find')

module.exports = async ({ baseDir, resolve }) => {
  const files = await find('**/*.css', { cwd: baseDir })
  log('css files found %s', files)

  const cssFiles = await Promise.all(
    files.map(async file => {
      const out = await resolve(file)
      await minify(file, out)

      return out
    })
  )
  log('css minification complete')

  return cssFiles
}

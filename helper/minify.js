const log = require('debug')('ics:minify')
const CleanCSS = require('clean-css')
const fs = require('fs-extra')

const helper = async (file, out) => {
  log('load & minify stylesheet %s ~> %s', file, out)
  try {
    const content = await fs.readFile(file)

    const result = await helper.minify(content)

    const ok = result.errors.length === 0

    log('minification complete [%s]', ok ? 'OK' : 'KO')
    await fs.writeFile(out, ok ? result.styles : content)
    log('file written to [%s]', out)
  } catch (e) {
    throw e
  }
}

helper.minify = async content => {
  const stylesheet = new CleanCSS({ returnPromise: true })

  return stylesheet.minify(content)
}
module.exports = helper

const log = require('debug')('ics:task:inline')
const inlineCss = require('../helper/inline-css')
const find = require('../helper/find')

module.exports = async ({ baseDir, resolve }, { css }) => {
  const files = await find('**/*.html', { cwd: baseDir })
  log('html files found %s', files)

  const htmlFiles = await files.reduce((chain, file) =>
    chain.then(async results =>
      inlineCss(file, await resolve(file), { css })
    )
  , Promise.resolve([]))
  log('html css inlining complete')

  return htmlFiles
}

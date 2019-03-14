const log = require('debug')('ics:task:tmp')
const fs = require('../helper/tmp')
const resolver = require('../helper/resolver')

module.exports = async ({ baseDir }) => {
  const tmpDir = fs.getTmpDir()
  log('temp dir %s', tmpDir)

  log('make tmp dir %s', tmpDir)
  await fs.mkTmpDir(tmpDir)

  return resolver({
    baseDir,
    tmpDir
  })
}

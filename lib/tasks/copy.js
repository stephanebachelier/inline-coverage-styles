const log = require('debug')('ics:task:copy')
const fs = require('../helper/tmp')

module.exports = async ({ tmpDir, baseDir }) => {
  await fs.copy(tmpDir, baseDir, { overwrite: true })
  log('copy from %s ~> %s', tmpDir, baseDir)
}

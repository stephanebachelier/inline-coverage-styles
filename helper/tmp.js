const crypto = require('crypto')
const path = require('path')
const os = require('os')
const fse = require('fs-extra')

const helper = {
  getTmpDir: () =>
    path.join(
      os.tmpdir(), crypto.randomBytes(20).toString('hex')
    ),

  mkTmpDir: async dir => {
    await helper.rmdir(dir)
    return helper.mkdirp(dir)
  },

  bindFileToTmpDir: async (file, { baseDir, tmpDir }) => {
    if (!baseDir) {
      throw new Error('missing <baseDir> options')
    }

    if (!tmpDir) {
      throw new Error('missing <tmpDir> options')
    }

    try {
      const filepath = file.replace(baseDir, tmpDir)

      await fse.ensureDir(path.dirname(filepath))

      return filepath
    } catch (e) {
      throw e
    }
  },

  // add these methods
  mkdirp: fse.mkdirp,
  rmdir: fse.remove,
  copy: fse.copy
}

module.exports = helper

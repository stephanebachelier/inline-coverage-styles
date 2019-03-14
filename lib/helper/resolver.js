const fs = require('./tmp')

module.exports = ({ baseDir, tmpDir }) => ({
  baseDir,
  tmpDir,
  resolve: async function (file) {
    return fs.bindFileToTmpDir(file, { baseDir, tmpDir })
  }
})

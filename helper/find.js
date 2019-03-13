const glob = require('glob')
const path = require('path')

const minPattern = /.*\.min\.\w+$/

module.exports = (pattern, options = {}) => new Promise(resolve => {
  glob(pattern, options, (err, files) => {
    if (err) {
      throw err
    }

    const resolver = options.cwd
      ? file => path.resolve(options.cwd, file)
      : file => file

    resolve(
      files
        .filter(file => !minPattern.test(file))
        .map(resolver)
    )
  })
})

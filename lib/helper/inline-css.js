const log = require('debug')('ics:inline-css')

const fs = require('fs')
const link2style = require('./transform/link2style')
const injectStyle = require('./transform/inject-style')

module.exports = async (fin, fout, { css }) =>
  new Promise((resolve, reject) => {
    try {
      log('inline css into %s', fout)

      const rs = fs.createReadStream(fin)
      rs
        .on('error', e => {
          log('inlining error', e)
          reject(e)
        })
        .on('end', () => {
          log('inlining ended')
          resolve(fout)
        })

      rs
        .pipe(link2style(fout))
        .pipe(injectStyle(css))
        .pipe(fs.createWriteStream(fout))
    } catch (e) {
      log('error ! %s', e.message)
      throw e
    }
  })

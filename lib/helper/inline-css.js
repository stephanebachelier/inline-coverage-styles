const log = require('debug')('ics:inline-css')

const fs = require('fs')
const transform = require('./link2style')

module.exports = async (fin, fout) =>
  new Promise((resolve, reject) => {
    try {
      log('inline css info %s', fout)

      const rs = fs.createReadStream(fin)
      rs
        .on('error', e => {
          log('rs error', e)
          reject(e)
        })
        .on('end', () => {
          log('rs end')
          resolve(fout)
        })

      rs
        .pipe(transform(fout))
        .pipe(fs.createWriteStream(fout))
    } catch (e) {
      log('error ! %s', e.message)
      throw e
    }
  })

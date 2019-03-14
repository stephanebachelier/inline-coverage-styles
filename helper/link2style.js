const log = require('debug')('ics:transform')
const trumpet = require('node-trumpet2')
const through = require('through')

const fs = require('fs')
const path = require('path')

module.exports = fout => {
  const tr = trumpet()

  tr.selectAll('link', function (element) {
    const s = through(
      function (data) {
        this.queue(data)
      }
    )

    s.pipe(element.createWriteStream({ outer: true }))
    s.write('<style>')

    const href = element.getAttribute('href')
    const stylesheet = path.resolve(path.dirname(fout), href)
    log('inject stylesheet [%s] from %s', href, stylesheet)

    const rs = fs.createReadStream(stylesheet, { encoding: 'utf8' })
    rs.pipe(s, { end: false })
    rs.on('end', () => {
      s.write('</style>')
      s.end()
    })
    rs.on('error', e => {
      log('error %s for #href %s', e.message, href)
      throw e
    })
  })

  return tr
}

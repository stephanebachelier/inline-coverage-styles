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
      }, function (data) {
        this.queue('</style>')
        this.queue(null)
      }
    )
    s.pipe(element.createWriteStream({ outer: true }))
    s.write('<style>')

    const href = element.getAttribute('href')
    const stylesheet = path.resolve(path.dirname(fout), href)
    log('inject stylesheet [%s] from %s', href, stylesheet)

    fs.createReadStream(stylesheet, { encoding: 'utf8' })
      .pipe(s)
  })

  return tr
}

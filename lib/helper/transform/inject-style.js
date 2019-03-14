const log = require('debug')('ics:transform:inject-style')
const trumpet = require('node-trumpet2')
const through = require('through')

module.exports = style => {
  const tr = trumpet()

  tr.selectAll('head', function (element) {
    const inject = through(
      function (data) {
        this.queue(data)
      }, function () {
        if (style) {
          log('inject stylesheet in head')
          this.queue(`<style type='text/css'>${style}</style>`)
        }
        this.queue(null)
      }
    )

    const stream = element.createStream()

    stream.pipe(inject).pipe(stream)
  })

  return tr
}

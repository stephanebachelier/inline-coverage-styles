const helper = require('helper/minify')
const fs = require('fs-extra')

jest.mock('fs-extra')

test('should use non minified css if minification fails', async () => {
  const css = 'body { color: #000000; }'
  const minCss = 'body{color:#000;}'

  const fin = '/foo/bar.css'
  const fout = '/tmp/foo/bar.css'

  fs.readFile.mockResolvedValue(css)

  helper.minify = jest.fn().mockResolvedValue({
    errors: ['foo'],
    styles: minCss
  })

  await helper(fin, fout)

  expect(fs.readFile).toHaveBeenCalledWith(fin)
  expect(helper.minify).toHaveBeenCalledTimes(1)
  expect(helper.minify).toHaveBeenCalledWith(css)
  expect(fs.writeFile).toHaveBeenCalledWith(fout, css)
})

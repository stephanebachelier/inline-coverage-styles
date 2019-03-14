const helper = require('lib/helper/minify')
const fs = require('fs-extra')

jest.mock('fs-extra')

test('should use non minified css if minification fails', async () => {
  const css = 'body { color: #000000; }'

  const fin = '/foo/bar.css'
  const fout = '/tmp/foo/bar.css'

  fs.readFile.mockResolvedValue(css)
  helper.minify = jest.fn().mockRejectedValue(new Error('Minification Boom'))

  try {
    await helper(fin, fout)
  } catch (e) {
    expect(e.message).toMatch(/Minification Boom/)
  }

  expect(fs.readFile).toHaveBeenCalledWith(fin)
  expect(helper.minify).toHaveBeenCalledTimes(1)
  expect(fs.writeFile).not.toHaveBeenCalled()
})

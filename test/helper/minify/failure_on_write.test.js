const helper = require('helper/minify')
const fs = require('fs-extra')

jest.mock('fs-extra')

test('should throw if fail to write minified file to disk', async () => {
  const css = 'body { color: #000000; }'
  const minCss = 'body{color:#000;}'

  const fin = '/foo/bar.css'
  const fout = '/tmp/foo/bar.css'

  fs.readFile.mockResolvedValue(css)
  fs.writeFile.mockRejectedValue('Boom')

  helper.minify = jest.fn().mockResolvedValue({
    errors: [],
    styles: minCss
  })

  // use try/catch as await expect(fun call).rejects.toThrow does not work here
  try {
    await helper(fin, fout)
  } catch (e) {
    expect(e).toEqual('Boom')
  }

  expect(fs.readFile).toHaveBeenCalledWith(fin)
  expect(helper.minify).toHaveBeenCalledTimes(1)
  expect(helper.minify).toHaveBeenCalledWith(css)
  expect(fs.writeFile).toHaveBeenCalledWith(fout, minCss)
})

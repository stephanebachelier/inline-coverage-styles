const helper = require('helper/minify')
const fs = require('fs-extra')

jest.mock('fs-extra')

test('should throw if no valid css input file', async () => {
  const fin = '/foo/bar.css'
  const fout = '/tmp/foo/bar.css'

  fs.readFile.mockRejectedValue(new Error('Boom'))
  helper.minify = jest.fn()

  await expect(
    helper(fin, fout)
  ).rejects.toThrow(/Boom/)

  expect(fs.readFile).toHaveBeenCalledWith(fin)
  expect(helper.minify).not.toHaveBeenCalled()
  expect(fs.writeFile).not.toHaveBeenCalled()
})

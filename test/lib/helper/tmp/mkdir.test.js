jest.mock('fs-extra')
const helper = require('lib/helper/tmp')
const fse = require('fs-extra')

test('should export fs-extra `mkdirp` method', () => {
  const folder = '/foo/bar'

  helper.mkdirp(folder)

  expect(fse.mkdirp).toHaveBeenCalledWith(folder)
})

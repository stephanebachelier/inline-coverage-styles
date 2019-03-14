jest.mock('fs-extra')
const helper = require('lib/helper/tmp')
const fse = require('fs-extra')

test('should export fs-extra `remove` method', () => {
  const folder = '/foo/bar'

  helper.rmdir(folder)

  expect(fse.remove).toHaveBeenCalledWith(folder)
})

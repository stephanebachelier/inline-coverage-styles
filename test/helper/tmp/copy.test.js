jest.mock('fs-extra')
const helper = require('helper/tmp')
const fse = require('fs-extra')

test('should export fs-extra `copy` method', () => {
  const folder = '/foo/bar'

  helper.copy(folder)

  expect(fse.copy).toHaveBeenCalledWith(folder)
})

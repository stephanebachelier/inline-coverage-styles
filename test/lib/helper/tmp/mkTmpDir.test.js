const helper = require('lib/helper/tmp')

test('should remove if existing prior to creating tmp folder', async () => {
  const name = helper.getTmpDir()

  helper.rmdir = jest.fn(() => {})
  helper.mkdirp = jest.fn(() => {})

  await helper.mkTmpDir(name)

  expect(helper.rmdir).toHaveBeenCalledWith(name)
  expect(helper.mkdirp).toHaveBeenCalledWith(name)

  expect(helper.rmdir.mock.invocationCallOrder[0]).toEqual(1)
  expect(helper.mkdirp.mock.invocationCallOrder[0]).toEqual(2)
})

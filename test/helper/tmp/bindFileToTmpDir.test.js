jest.mock('fs-extra')
const helper = require('helper/tmp')
const path = require('path')
const fse = require('fs-extra')

test('should create any tree hierarchy needed for a file in tmp folder and return the absolute path in tmp dir', async () => {
  const baseDir = '/base/dir'
  const tmpDir = helper.getTmpDir()

  expect(
    await helper.bindFileToTmpDir('/base/dir/foo.js', { baseDir, tmpDir })
  ).toEqual(path.join(tmpDir, 'foo.js'))

  expect(fse.ensureDir).toHaveBeenCalledWith(tmpDir)

  expect(
    await helper.bindFileToTmpDir('/base/dir/foo/bar.js', { baseDir, tmpDir })
  ).toEqual(path.join(tmpDir, 'foo/bar.js'))

  expect(fse.ensureDir).toHaveBeenCalledWith(path.join(tmpDir, 'foo'))
})

test('should throw if missing baseDir', async () => {
  const tmpDir = helper.getTmpDir()

  await expect(
    helper.bindFileToTmpDir('/base/dir/foo.js', { tmpDir })
  ).rejects.toThrowError(/missing <baseDir> options/)
})

test('should throw if missing tmpDir', async () => {
  const baseDir = '/base/dir'

  await expect(
    helper.bindFileToTmpDir('/base/dir/foo.js', { baseDir })
  ).rejects.toThrowError(/missing <tmpDir> options/)
})

test('should throw if any issue with file system', async () => {
  const baseDir = '/base/dir'
  const tmpDir = helper.getTmpDir()

  const error = new Error('Boom')
  fse.ensureDir = jest.fn().mockRejectedValue(error)

  await expect(
    helper.bindFileToTmpDir('/base/dir/foo.js', { baseDir, tmpDir })
  ).rejects.toThrow(error)
})

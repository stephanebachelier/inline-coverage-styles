jest.mock('glob')
const helper = require('helper/find')
const glob = require('glob')

test('should throw error if glob failed', async () => {
  const error = new Error('Boom')

  glob.mockImplementation((a, b, fn) => {
    fn(error)
  })

  const pattern = '*.html'
  const options = {}

  await expect(
    helper(pattern, options)
  ).rejects.toThrow(error)

  expect(glob.mock.calls[0][0]).toEqual(pattern)
  expect(glob.mock.calls[0][1]).toEqual(options)
  expect(glob.mock.calls[0][2]).toBeFunction()
})

test('should return all the local file paths if no `cwd` options', async () => {
  glob.mockImplementation((a, b, fn) => {
    fn(null, [
      'foo.js',
      'bar.js',
      'foo/bar.js'
    ])
  })

  const pattern = '*.js'
  const options = {}

  await expect(
    helper(pattern, options)
  ).resolves.toEqual([
    'foo.js',
    'bar.js',
    'foo/bar.js'
  ])
})

test('should return all the non minified local file paths if no `cwd` options', async () => {
  glob.mockImplementation((a, b, fn) => {
    fn(null, [
      'foo.js',
      'foo.min.js',
      'bar.js',
      'bar.min.js',
      'foo/bar.js',
      'foo/bar.min.js',
      'bar/foo.min.js',
      'plop.min.js'
    ])
  })

  const pattern = '*.js'
  const options = {}

  await expect(
    helper(pattern, options)
  ).resolves.toEqual([
    'foo.js',
    'bar.js',
    'foo/bar.js'
  ])
})

test('should return the absolute path of all the files', async () => {
  glob.mockImplementation((a, b, fn) => {
    fn(null, [
      'foo.js',
      'bar.js',
      'foo/bar.js'
    ])
  })

  const pattern = '*.js'
  const options = {
    cwd: '/some/folder'
  }

  await expect(
    helper(pattern, options)
  ).resolves.toEqual([
    '/some/folder/foo.js',
    '/some/folder/bar.js',
    '/some/folder/foo/bar.js'
  ])
})

test('should return only the absolute path of all the non minified files', async () => {
  glob.mockImplementation((a, b, fn) => {
    fn(null, [
      'foo.js',
      'foo.min.js',
      'bar.js',
      'bar.min.js',
      'foo/bar.js',
      'foo/bar.min.js',
      'bar/foo.min.js',
      'plop.min.js'
    ])
  })

  const pattern = '*.js'
  const options = {
    cwd: '/some/folder'
  }

  await expect(
    helper(pattern, options)
  ).resolves.toEqual([
    '/some/folder/foo.js',
    '/some/folder/bar.js',
    '/some/folder/foo/bar.js'
  ])
})

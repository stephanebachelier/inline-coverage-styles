const { getTmpDir } = require('lib/helper/tmp')
const os = require('os')
const path = require('path')

test('should generate a random directory in tmp folder', () => {
  const name = getTmpDir()

  expect(name).toStartWith(os.tmpdir())

  const tmpFolder = name.replace(os.tmpdir(), '')
  expect(tmpFolder[0]).toMatch(path.sep)
  expect(tmpFolder.substring(1)).toHaveLength(40)
})

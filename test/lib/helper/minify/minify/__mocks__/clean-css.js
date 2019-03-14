const minify = jest.fn()

const mock = jest.fn().mockImplementation(() => ({
  minify
}))

mock.minify = minify

module.exports = mock

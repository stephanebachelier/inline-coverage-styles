const helper = require('helper/minify')
const mockCleanCSS = require('clean-css')

jest.mock('clean-css')

test('should call clean-css `minify` with CSS content', async () => {
  const css = 'body { color: #000000; }'
  const minCss = 'body{color:#000;}'

  const expected = {
    errors: [],
    styles: minCss
  }
  mockCleanCSS.minify.mockResolvedValue(expected)

  expect(await helper.minify(css)).toEqual(expected)

  expect(mockCleanCSS).toHaveBeenCalledTimes(1)
  expect(mockCleanCSS.minify).toHaveBeenCalledTimes(1)
  expect(mockCleanCSS.minify).toHaveBeenCalledWith(css)
})

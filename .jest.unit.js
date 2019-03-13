module.exports = Object.assign({}, require('./.jest.config'), {
  testRegex: [
    '/test/(.*).test.js$'
  ],
  verbose: true,
  restoreMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'helper/**/*.js'
  ],
  coverageReporters: ['html', 'cobertura']
})

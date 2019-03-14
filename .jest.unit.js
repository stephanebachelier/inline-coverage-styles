module.exports = Object.assign({}, require('./.jest.config'), {
  testRegex: [
    '/test/(.*).test.js$'
  ],
  verbose: true,
  restoreMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'index.js',
    'lib/**/*.js'
  ],
  coverageReporters: ['html', 'lcov', 'cobertura']
})

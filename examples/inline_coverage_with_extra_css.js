const inlineCoverageStyles = require('..')
const path = require('path')
const fs = require('fs-extra')

const run = async () => {
  try {
    const css = await fs.readFile(path.join(__dirname, 'extra.css'), { encoding: 'utf8' })
    console.log(css)
    inlineCoverageStyles({
      baseDir: path.resolve('coverage'),
      css
    })
  } catch (e) {
    throw e
  }
}

run()

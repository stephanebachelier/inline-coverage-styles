const tasks = require('./lib/tasks')

const run = async ({ baseDir, css }) => {
  try {
    const resolver = await tasks.tmpDir({ baseDir })

    await tasks.minifyCss(resolver)

    await tasks.inlineCss(resolver, { css })

    await tasks.copy(resolver)
  } catch (e) {
    console.error(e)
  }
}

module.exports = run

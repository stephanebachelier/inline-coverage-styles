const tasks = require('./lib/tasks')

const run = async baseDir => {
  try {
    const resolver = await tasks.tmpDir({ baseDir })

    await tasks.minifyCss(resolver)

    await tasks.inlineCss(resolver)

    await tasks.copy(resolver)
  } catch (e) {
    console.error(e)
  }
}

module.exports = run

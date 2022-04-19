const test = require('spekky')

async function run() {
  console.time('Test run')

  await test('reqroute')

  console.timeEnd('Test run')
}
run()

const assert = require('assert')
const router = require('../../index.js')

const it = {}, x = {}

it['should return empty from get non-existing path'] = async function() {
  const req = {
    pathname: '/none',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/hello': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, undefined)
}

it['should return route from get existing path'] = async function() {
  const req = {
    pathname: '/hello',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/hello': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
}

it['should return empty from wrong method'] = async function() {
  const req = {
    pathname: '/hello',
    method: 'POST',
    params: {}
  }
  const routes = {
    'get#/hello': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, undefined)
}

it['should return empty from post non-existing path'] = async function() {
  const req = {
    pathname: '/empty',
    method: 'POST',
    params: {}
  }
  const routes = {
    'post#/hello': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, undefined)
}

it['should return route from post existing path'] = async function() {
  const req = {
    pathname: '/hello',
    method: 'POST',
    params: {}
  }
  const routes = {
    'post#/hello': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
}

it['should return include params from get dynamic path'] = async function() {
  const req = {
    pathname: '/project/master',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/project/_project_link': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
  assert.deepEqual(req.params.project_link, 'master')
}

it['should return include multiple params from get dynamic path'] = async function() {
  const req = {
    pathname: '/project/master/comment/1234',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/project/_project_link/comment/_comment_id': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
  assert.deepEqual(req.params.project_link, 'master')
  assert.deepEqual(req.params.comment_id, '1234')
}

module.exports = it

// TODO: Tests from Waveorb
// it('should load the home page', async () => {
//   const page = pager('get#/', $)
//   expect(await page($)).toBe(`<div>Home</div>`)
// })

// it('should include the page name', async () => {
//   const page = pager('get#/', $)
//   expect(page.pagename).toBe('index')
// })

// it('should load the about page', async () => {
//   const page = pager('get#/about', $)
//   expect(await page($)).toBe(`<div>About</div>`)
// })

// it('should load the deep page', async () => {
//   const page = pager('get#/docs/deep', $)
//   expect(await page($)).toBe(`<div>Deep</div>`)
// })

// it('should load pages via routes as string', async () => {
//   $.app.config = {
//     routes: { 'get#/om-oss.html': 'en@about' }
//   }
//   $.app.routes['get#/om-oss'] = 'about'
//   const page = pager('get#/om-oss', $)
//   expect(await page($)).toBe(`<div>About</div>`)
// })

// it('should load pages via routes as string deeply', async () => {
//     $.app.config = {
//     routes: { 'get#/hello/om-oss.html': 'en@about' }
//   }
//   $.app.routes['get#/hello/om-oss'] = 'about'
//   const page = pager('get#/hello/om-oss', $)
//   expect(await page($)).toBe(`<div>About</div>`)
// })

// it('should work with dynamic routes', async () => {
//   const _index = async function($) {
//     return `<div>HTML</div>`
//   }
//   $.app = {
//     pages: {
//       _index
//     }
//   }
//   $.app.routes = { 'get#/_index': '_index' }
//   const page = pager('get#/dynamic', $)
//   expect(await page($)).toBe(`<div>HTML</div>`)
// })

// it('should work with dynamic deep non index routes', async () => {
//   const _cat = async function($) {
//     return `<div>Cat</div>`
//   }
//   const _show = async function($) {
//     return `<div>Show</div>`
//   }
//   $.app = {
//     pages: {
//       _hello: {
//         _cat
//       },
//       _show
//     }
//   }
//   $.app.routes = { 'get#/_hello/_cat': 'get#_hello._cat', 'get#/_show': '_show' }
//   const page = pager('get#/dynamic', $)
//   expect(await page($)).toBe(`<div>Show</div>`)
// })

// it('should work with nested dynamic index routes', async () => {
//   const _index = async function($) {
//     return `<div>${$.params.index}</div>`
//   }
//   $.app = {
//     pages: {
//       doc: {
//         _index
//       }
//     }
//   }
//   $.app.routes = { 'get#/doc/_index': 'doc/_index'}
//   const page = pager('get#/doc/hello', $)
//   expect(await page($)).toBe(`<div>hello</div>`)
// })

// it('should work with nested dynamic non index routes', async () => {
//   const _actions = async function($) {
//     return `<div>${$.params.actions}</div>`
//   }
//   $.app = {
//     pages: {
//       doc: {
//         _actions
//       }
//     }
//   }
//   $.app.routes = { 'get#/doc/_actions': 'doc/_actions'}
//   const page = pager('get#/doc/hello', $)
//   expect(await page($)).toBe(`<div>hello</div>`)
// })

// it('should match dynamic routes non greedy', async () => {
//   const page = pager('get#/site/hello/form/new', $)
//   expect(flat(await page($))).toBe(`<div>New form</div>`)
// })

// it('should collect query params from URL', async () => {
//   const article = async function($) {
//     return `<div>${$.params.year}/${$.params.month}</div>`
//   }
//   $.app = {
//     pages: {
//       _year: {
//         _month: {
//           article
//         }
//       }
//     }
//   }
//   $.app.routes = { 'get#/_year/_month/article': '_year/_month/article' }
//   const page = pager('get#/2020/12/article', $)
//   expect(await page($)).toBe(`<div>2020/12</div>`)
// })

// it('should avoid dynamic route if template exists', async () => {
//   const _index = async function($) {
//     return `<div>HTML</div>`
//   }
//   $.app = {
//     pages: {
//       about,
//       _index
//     }
//   }
//   $.app.routes = { 'get#/about': 'about', '/_index': '_index' }
//   const page = pager('get#/about', $)
//   expect(await page($)).toBe(`<div>About</div>`)
// })

// it('should avoid dynamic route if template exists, sorted', async () => {
//   const _index = async function($) {
//     return `<div>HTML</div>`
//   }
//   $.app = {
//     pages: {
//       _index,
//       about
//     }
//   }
//   $.app.routes = { 'get#/about': 'about', 'get#/_index': '_index' }
//   const page = pager('get#/about', $)
//   expect(await page($)).toBe(`<div>About</div>`)
// })

// it('should work with dynamic route and routes', async () => {
//   const _index = async function($) {
//     return `<div>HTML</div>`
//   }
//   $.app = {
//     pages: {
//       about,
//       _index
//     },
//     config: {
//       routes: {
//         'get#/something.html': 'en@something'
//       }
//     }
//   }
//   $.app.routes = { 'get#/about': 'about', 'get#/_index': '_index', 'get#/something': 'something' }
//   const page = pager('get#/om-oss', $)
//   expect(await page($)).toBe(`<div>HTML</div>`)
// })

// it('should work with dynamic routes in route config', async () => {
//   const _index = async function($) {
//     return `<div>HTML</div>`
//   }
//   $.app = {
//     pages: {
//       _index
//     },
//     config: {
//       routes: {
//         'get#/artikkel/_article.html': 'no@_index'
//       }
//     }
//   }
//   $.app.routes = { 'get#/_index': '_index', 'get#/artikkel/_article': '_index' }
//   const page = pager('get#/artikkel/om-oss', $)
//   expect(await page($)).toBe(`<div>HTML</div>`)
// })

// it('should work with dynamic routes in route config deeply', async () => {
//   $.app = {
//     pages: {
//       article: {
//         _article: async function($) {
//           return `<div>${$.params.article}</div>`
//         }
//       }
//     },
//     config: {
//       routes: {
//         'get#/artikkel/_article.html': 'no@article/_article'
//       }
//     }
//   }
//   $.app.routes = {
//     'get#/article/_article': 'article/_article',
//     'get#/artikkel/_article': 'article/_article'
//   }
//   const page = pager('get#/artikkel/om-oss', $)
//   expect(await page($)).toBe(`<div>om-oss</div>`)
// })

// it('should collect query params from URL in route config', async () => {
//   const article = async function($) {
//     return `<div>${$.params.year}/${$.params.month}</div>`
//   }
//   $.app = {
//     pages: {
//       _year: {
//         _month: {
//           article
//         }
//       }
//     },
//     config: {
//       routes: {
//         'get#/_year/_month/artikkel.html': 'en@_year/_month/article'
//       }
//     }
//   }
//   $.app.routes = {
//     'get#/_year/_month/artikkel': '_year/_month/article'
//   }
//   const page = pager('get#/2020/12/artikkel', $)
//   expect(await page($)).toBe(`<div>2020/12</div>`)
// })

// it('should show root markdown', async () => {
//   const page = pager('get#/root', $)
//   expect(flat(await page($))).toBe(`<p>root</p>`)
// })

// it('should show deep markdown', async () => {
//   const page = pager('get#/docs/hello', $)
//   expect(flat(await page($))).toBe(`<p>hello</p>`)
// })

// it('should show root markdown html', async () => {
//   const page = pager('get#/down.html', $)
//   expect(flat(await page($))).toBe(`<p>down</p>`)
// })

// it('should show deep markdown html', async () => {
//   const page = pager('get#/docs/inner.html', $)
//   expect(flat(await page($))).toBe(`<p>inner</p>`)
// })

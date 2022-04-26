const assert = require('assert')
const router = require('../../index.js')

const it = {}, x = {}

it['should find root level index'] = async function() {
  const req = {
    pathname: '/',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
}

it['should find deep level index'] = async function() {
  const req = {
    pathname: '/deep/',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/deep/': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
}

it['should match files with extensions'] = async function() {
  const req = {
    pathname: '/ext.html',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/ext.html': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
}

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

it['should work with root level dynamic routes'] = async function() {
  const req = {
    pathname: '/page',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/_index': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
  assert.deepEqual(req.params.index, 'page')
}

it['should work with deep dynamic routes'] = async function() {
  const req = {
    pathname: '/deep/page',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/deep/_index': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
  assert.deepEqual(req.params.index, 'page')
}

it['should work with deep dynamic index routes'] = async function() {
  const req = {
    pathname: '/deep/page/',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/deep/_index/': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
  assert.deepEqual(req.params.index, 'page')
}

it['should prefer direct match before dynamic'] = async function() {
  const req = {
    pathname: '/direct',
    method: 'GET',
    params: {}
  }
  const routes = {
    'get#/_index': 'hello',
    'get#/direct': 'direct'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'direct')
  assert.deepEqual(req.params.index, undefined)
}

module.exports = it

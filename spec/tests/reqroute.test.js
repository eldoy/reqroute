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
    'get#hello': 'hello'
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
    'get#hello': 'hello'
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
    'get#hello': 'hello'
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
    'post#hello': 'hello'
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
    'post#hello': 'hello'
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
    'get#project/_project_link': 'hello'
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
    'get#project/_project_link/comment/_comment_id': 'hello'
  }
  router(req, routes)
  assert.deepEqual(req.route, 'hello')
  assert.deepEqual(req.params.project_link, 'master')
  assert.deepEqual(req.params.comment_id, '1234')
}

module.exports = it

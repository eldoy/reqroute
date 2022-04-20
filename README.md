# Reqroute

Routing lookup for NodeJS web servers. Supports dynamic URLs.

### Install

```
npm i reqroute
```

### Usage

The routes support both `get` and `post` requests.

```js
const http = require('http')
const rekvest = require('rekvest')
const router = require('reqroute')

// Create routes
const routes = {
  'get#hello': 'hello',
  'post#project/create': 'project/create'
}

// NodeJS web server
const server = http.createServer(function(req, res) {

  // Add pathname to request object
  rekvest(req)

  router(req, routes)

  // If match, the value in the routes is found here
  req.route // 'hello'
})
```

### Dynamic URLs

Requests support _dynamic URLs_.

The parts of the URL that should be dynamic is prefixed by an _underscore_:

```js
const routes = {
  'get#project/_project_link': 'project/show'
}

// Assume req.pathname is '/project/master'
const server = http.createServer(function(req, res) {

  // Add pathname to request object
  rekvest(req)

  router(req, routes)

  req.route // 'project/show'
  req.params.project_link // 'master'
})
```

ISC Licensed. Enjoy!

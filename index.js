// Find dynamic routes
function getRoute(req, routes, name) {
  for (var route in routes) {
    var pattern = route
      .split('/')
      .map((x) => (x[0] == '_' ? '[^/]+' : x))
      .join('/')

    var match = new RegExp(`^\/?${pattern}$`).test(name)
    if (!match) continue

    // Add params
    route.split('/').forEach((val, i) => {
      if (val.startsWith('_')) {
        req.params[val.slice(1)] = name.split('/')[i]
      }
    })
    return routes[route]
  }
}

module.exports = function (req, routes) {
  if (!req.params) req.params = {}
  var method = req.method.toLowerCase()

  // Remove /api at the beginning for production servers
  var path = req.pathname.replace(/^\/api\//, '/')

  var name = `${method}#${path}`
  req.route = routes[name] || getRoute(req, routes, name)
}

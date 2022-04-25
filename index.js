// Find dynamic routes
function getRoute(req, routes, name) {
  for (const route in routes) {
    const pattern = route
      .split('/')
      .map(x => x[0] == '_' ? '[^\/]+' : x)
      .join('/')

    const match = new RegExp(`^\/?${pattern}$`).test(name)
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

module.exports = function(req, routes) {
  if (!req.params) req.params = {}
  const method = req.method.toLowerCase()

  // Remove /api at the beginning for production servers
  const path = req.pathname.replace(/^\/api\//, '/')

  const name = `${method}#${path}`
  req.route = routes[name] || getRoute(req, routes, name)
}

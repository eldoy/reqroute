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
  const name = `${req.method.toLowerCase()}#${req.pathname}`
  req.route = routes[name] || getRoute(req, routes, name)
}

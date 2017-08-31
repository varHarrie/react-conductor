import Route from './Route'
import {IRouteConfig} from './Route'

export interface IRouteMap {
  [name: string]: Route
}

function parseRoute (option: IRouteConfig, parent: string, map: IRouteMap) {
  const route = new Route(option, parent)

  let children = Array.isArray(option.children)
    ? {default: option.children}
    : option.children || {}
  
  for (const key in children) {
    if (children[key]) {
      route.children[key] = children[key].map((child) => parseRoute(child, route.path, map))
    }
  }

  const name = route.name
  if (name) {
    if (map[name]) {
      throw new Error('Already existed route name: ' + name)
    } else {
      map[name] = route
    }
  }
  return route
}

export default function parseRoutes (options: IRouteConfig[], mount: string = '/') {
  const routeMap: IRouteMap = {}
  const routes = options.map((option) => parseRoute(option, mount, routeMap))

  return {routeMap, routes}
}

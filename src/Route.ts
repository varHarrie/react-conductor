import * as qs from 'query-string'
import * as React from 'react'
import {matchPath} from 'react-router'

export interface IRouteConfig {
  path: string

  name?: string

  component: React.ComponentClass<any>

  exact?: boolean

  strict?: boolean
  
  meta?: any

  children?: IRouteConfig[] | {[name: string]: IRouteConfig[]}
}

export interface IRouteProps<P = any, Q = any> {
  $route: MatchedRoute<P, Q>,
  $push: (name: string, params?: any, query?: any) => void,
  $replace: (name: string, params?: any, query?: any) => void,
  $isMatched: (name: string) => boolean
}

export default class Route implements IRouteConfig {
  path: string
  
  name: string

  component: React.ComponentClass<IRouteProps>

  exact: boolean

  strict: boolean

  meta: any

  children: {
    [name: string]: Route[]
  }

  constructor (options: IRouteConfig, parent: string = '') {
    this.path = ensurePath(parent) + ensurePath(options.path)
    this.name = options.name || ''
    this.exact = !!options.exact
    this.strict = !!options.strict
    this.component = options.component
    this.meta = options.meta
    this.children = {}
  }
}

export class MatchedRoute<P = any, Q = any> extends Route {
  params: P = {} as any

  query: Q = {} as any

  url: string

  search: string

  constructor (route: Route, url: string, search: string = '') {
    super(route)

    const match = matchPath<P>(url, this)
    if (match) {
      this.params = match.params
    }

    if (search) {
      this.query = qs.parse(search)
    }

    this.url = url
    this.search = search
  }
}

function ensurePath (path: string = '') {
  return (!path || path === '/')
    ? ''
    : path[0] === '/'
    ? path
    : '/' + 'path'
}

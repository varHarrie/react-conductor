import {createBrowserHistory, History} from 'history'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import {Router as OriginalRouter} from 'react-router'
import parseRoutes, {IRouteMap} from './parseRoutes'
import Route, {IRouteConfig, MatchedRoute} from './Route'
import stringify from './stringify'

// tslint:disable-next-line:no-empty
const warn = console && console.warn || (() => {})

export interface IConductorProps {
  history?: History
  mount?: string
  routes: IRouteConfig[]
}

export default class Conductor extends React.Component<IConductorProps> {
  
  static childContextTypes = {
    $children: PropTypes.any,
    $push: PropTypes.any,
    $replace: PropTypes.any,
    $route: PropTypes.any,
    $$setMatchedRoute: PropTypes.any
  }

  route: MatchedRoute | null
  routes: Route[]
  routeMap: IRouteMap
  history: History

  constructor (props: IConductorProps) {
    super(props)

    const {routes, mount, history} = props
    const rs = parseRoutes(routes, mount)

    this.routes = rs.routes
    this.routeMap = rs.routeMap
    this.history = history || createBrowserHistory()

    this.route = null
  }

  getChildContext = () => {
    const context = {
      $children: {default: this.routes},
      $push: this.handlePush,
      $replace: this.handleReplace,
      $route: this.route,
      $$setMatchedRoute: this.setMatchedRoute
    }
    return context
  }

  setMatchedRoute = (route: MatchedRoute) => {
    this.route = route
  }

  matchRoute = (name: string, params: any, query: any) => {
    const route = this.routeMap[name]

    if (!route) {
      warn('Cannot found route name: ' + name)
      return null
    }

    return route
  }

  handlePush = (name: string, params: any, query: any) => {
    const route = this.matchRoute(name, params, query)
    if (route) {
      this.history.push(stringify(route.path, params, query))
    }
  }

  handleReplace = (name: string, params: any, query: any) => {
    const route = this.matchRoute(name, params, query)
    if (route) {
      this.history.replace(stringify(route.path, params, query))
    }
  }

  render () {
    const {children} = this.props

    return (
      <OriginalRouter
        history={this.history}
        children={children}/>
    )
  }
}

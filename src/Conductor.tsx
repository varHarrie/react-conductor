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

export interface IConductorState {
  matchedRoute: MatchedRoute
}

export default class Conductor extends React.Component<IConductorProps, IConductorState> {
  
  static childContextTypes = {
    $routes: PropTypes.any,
    $route: PropTypes.any,
    $push: PropTypes.any,
    $replace: PropTypes.any,
    $__setMatchRoute: PropTypes.any
  }

  history: History
  routes: Route[]
  routeMap: IRouteMap

  getChildContext = () => {
    return {
      $routes: this.routes,
      $matchedRoute: this.state.matchedRoute,
      $push: this.handlePush,
      $replace: this.handleReplace,
      $__setMatchedRoute: this.setMatchedRoute
    }
  }

  componentWillMount () {
    const {routes, mount, history} = this.props
    const rs = parseRoutes(routes, mount)

    this.routes = rs.routes
    this.routeMap = rs.routeMap
    this.history = history || createBrowserHistory()
  }

  setMatchedRoute = (matchedRoute: MatchedRoute) => {
    this.setState({matchedRoute})
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

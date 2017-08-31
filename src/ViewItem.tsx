import {Location} from 'history'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import {RouteComponentProps} from 'react-router'
import Route, {MatchedRoute} from './Route'

export interface IViewItemProps extends RouteComponentProps<any> {
  route: Route
}

export default class ViewItem extends React.Component<IViewItemProps> {

  static contextTypes = {
    $__setMatchedRoute: PropTypes.func,
    $push: PropTypes.func,
    $replace: PropTypes.func
  }

  static childContextTypes = {

  }

  componentWillMount () {
    const {route, location} = this.props
    this.setMatchRoute(route, location)
  }

  componentWillReceiveProps ({route, location}: IViewItemProps) {
    this.setMatchRoute(route, location)
  }

  setMatchRoute = (route: Route, location: Location) => {
    const {pathname, search} = location
    const matchedRoute = new MatchedRoute(route, pathname, search)
    this.context.$__setMatchedRoute(matchedRoute)
  }

  handlePush = (name: string, params?: any, query?: any) => {
    console.log(name)
  }

  handleReplace = () => {
    console.log(name)
  }

  handleIsMatched = () => {
    return true
  }

  render () {
    const {route} = this.props
    const Component = route.component
    const matchedRoute = this.context.$matchedRoute

    return (
      <Component
        $route={matchedRoute}
        $push={this.handlePush}
        $replace={this.handleReplace}
        $isMatched={this.handleIsMatched}/>
    )
  }
}

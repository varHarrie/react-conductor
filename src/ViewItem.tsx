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
    $route: PropTypes.any,
    $push: PropTypes.func,
    $replace: PropTypes.func,
    $isMatched: PropTypes.func,
    $$setMatchedRoute: PropTypes.func
  }

  static childContextTypes = {
    $children: PropTypes.any
  }

  getChildContext = () => {
    const context = {
      $children: this.props.route.children,
    }
    return context
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
    this.context.$$setMatchedRoute(matchedRoute)
  }

  render () {
    const {route} = this.props
    const {$route, $push, $replace, $isMatched} = this.context
    const Component = route.component

    return (
      <Component
        $route={$route}
        $push={$push}
        $replace={$replace}
        $isMatched={$isMatched}/>
    )
  }
}

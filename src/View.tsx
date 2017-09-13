import * as PropTypes from 'prop-types'
import * as React from 'react'
import {Route as OriginalRoute, Switch} from 'react-router'
import Route from './Route'
import ViewItem from './ViewItem'

export interface IViewProps {
  name?: string
}

export default class View extends React.Component<IViewProps> {

  static contextTypes = {
    $children: PropTypes.any
  }

  context: {
    $children: {
      [name: string]: Route[]
    }
  }

  render () {
    const {name = 'default'} = this.props
    const {$children} = this.context
    const routes = $children && $children[name]

    return routes ? (
      <Switch>
        {routes.map((route, i) => (
          <OriginalRoute
            key={i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => (
              <ViewItem
                {...props}
                route={route}/>
            )}/>
        ))}
      </Switch>
    ) : null
  }
}

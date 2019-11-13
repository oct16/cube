import React, { Component } from 'react'
import Loadable from 'react-loadable'
import { Redirect, Route, Switch } from 'react-router'
import Layout from '../layout'
import loading from './loading'
import NoMatchComponent from './no-match'

export default class Main extends Component {
    public render() {
        return (
            <Switch>
                <Layout
                    exact={true}
                    path=""
                    component={Loadable({
                        loader: () => import('@/components/editor'),
                        loading
                    })}
                />
                <Route exact={true} component={NoMatchComponent} />
            </Switch>
        )
    }
}

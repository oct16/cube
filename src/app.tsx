import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import Main from './components/base/main'
import history from './utils/history'

export default class App extends Component {
    public render() {
        // <Provider store={store}>
        return (
            <Router history={history}>
                <div className="app">
                    <Main />
                </div>
            </Router>
        )
        // </Provider>
    }
}

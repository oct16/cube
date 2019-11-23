import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import Main from './components/base/main'
import store from './redux/store'
import history from './utils/history'

export default class App extends Component {
    public render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="app">
                        <Main />
                    </div>
                </Router>
            </Provider>
        )
    }
}

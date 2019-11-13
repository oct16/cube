import React, { Component } from 'react'
import Left from '../layout/left'
import Right from '../layout/right'
import Toolbar from './toolbar'

export default class Editor extends Component {
    public render() {
        return (
            <div className="d-flex">
                <Left>
                    <Toolbar />
                </Left>
                <Right />
            </div>
        )
    }
}

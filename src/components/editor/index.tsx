import React, { Component } from 'react'
import Center from '../layout/center'
import Left from '../layout/left'
import Right from '../layout/right'
import Menubar from './bar/menu'
import PropertyBar from './bar/property'
import Toolbar from './bar/tool'
import EditBoard from './board'
export default class Editor extends Component {
    public render() {
        return (
            <div className="d-flex">
                <Left>
                    <Menubar />
                </Left>
                <div className="d-flex flex-column w-100">
                    <Toolbar />
                    <div className="d-flex justify-content-center w-100">
                        <Center>
                            <EditBoard />
                        </Center>
                        <Right>
                            <PropertyBar />
                        </Right>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
export default class Center extends Component {
    public render() {
        return (
            <div className="w-100">
                {this.props.children}
            </div>
        )
    }
}

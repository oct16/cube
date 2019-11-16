import { Button as ButtonEl } from 'antd'
import React, { Component } from 'react'

export class Button extends Component {
    public render() {
        return <ButtonEl {...this.props}>Button</ButtonEl>
    }
}

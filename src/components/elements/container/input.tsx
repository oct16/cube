import { Input as InputEl } from 'antd'
import React, { Component } from 'react'

export class Input extends Component {
    public size: number
    constructor(props: { size: number }) {
        super(props)
        this.size = props.size
    }
    public render() {
        return <InputEl placeholder="input type" style={{ width: '120px' }} />
    }
}

import React, { Component } from 'react'
import ElWrap from '../el-wrap'

export class Text extends Component {
    public render() {
        return (
            <ElWrap inline {...this.props}>
                {this.props.children}
            </ElWrap>
        )
    }
}

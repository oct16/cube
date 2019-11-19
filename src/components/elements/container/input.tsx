import { Input as InputEl } from 'antd'
import React, { Component } from 'react'
import ElWrap from '../el-wrap'

export class Input extends Component<any, any> {
    public size: number

    public render() {
        return (
            <ElWrap inline={true} {...this.props}>
                <InputEl placeholder="input type" style={{ width: '120px' }} />
            </ElWrap>
        )
    }
}

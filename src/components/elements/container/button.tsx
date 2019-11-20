import { Button as ButtonEl } from 'antd'
import React, { Component } from 'react'
import ElWrap from '../el-wrap'
export class Button extends Component<any> {
    public render() {
        return (
            <ElWrap inline={true} {...this.props}>
                <ButtonEl>Button</ButtonEl>
            </ElWrap>
        )
    }
}

import { Button as ButtonEl } from 'antd'
import React, { Component } from 'react'
import ElWrap from '../el-wrap'
export class Button extends Component<any> {
    public render() {
        const { className, type, children, ..._props } = this.props
        return (
            <ElWrap {..._props} inline={true}>
                <ButtonEl type={type} className={className}>
                    {children}
                </ButtonEl>
            </ElWrap>
        )
    }
}

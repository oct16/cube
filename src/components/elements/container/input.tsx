import { Input as InputEl } from 'antd'
import React, { Component } from 'react'
import ElWrap from '../el-wrap'

export class Input extends Component<any, any> {
    public render() {
        const { className, value, defaultValue, width, placeholder, type, children } = this.props

        return (
            <ElWrap inline={true} {...this.props}>
                <InputEl
                    type={type}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    style={{ width: width || '120px' }}
                />
            </ElWrap>
        )
    }
}

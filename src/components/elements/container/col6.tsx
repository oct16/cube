import cn from 'classnames'
import React, { Component } from 'react'
import ElWrap from '../el-wrap'
import styles from './style.module.styl'

export class Col6 extends Component<any> {
    public render() {
        const { children, ...props } = this.props
        const { className, ..._props } = props
        return (
            <ElWrap className={cn(styles.col, 'col-6')} {..._props}>
                {this.props.children}
            </ElWrap>
        )
    }
}

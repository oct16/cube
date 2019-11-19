import cn from 'classnames'
import React, { Component } from 'react'
import ElWrap from '../el-wrap'
import styles from './style.module.styl'

export class Col extends Component<any> {
    public render() {
        const { children, ...props } = this.props
        const { className, ..._props } = props
        return (
            <ElWrap className={cn(styles.col, 'col-12')} {..._props}>
                {this.props.children}
            </ElWrap>
        )
    }
}

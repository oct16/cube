import cn from 'classnames'
import React, { Component } from 'react'
import styles from './style.module.styl'

export class Container extends Component {
    public render() {
        const { children, ...props } = this.props
        const { className, ..._props } = props as any

        return (
            <div {..._props} className={cn(styles.container, '')}>
                <div {..._props} className={cn(styles.row, 'row')}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

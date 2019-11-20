import cn from 'classnames'
import React, { Component } from 'react'
import styles from './style.module.styl'

export class Container extends Component {
    public render() {
        const { children, ...props } = this.props
        const { className, onDeleteItem, ..._props } = props as any

        return (
            <div className={cn(styles.container)}>
                <div className={cn(styles.row, 'row')} {..._props}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

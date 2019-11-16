import cn from 'classnames'
import React, { Component } from 'react'
import styles from './style.module.styl'

export class Col6 extends Component {
    public size: number
    constructor(props: { size: number }) {
        super(props)
        this.size = props.size
    }
    public render() {
        const { children, ...props } = this.props
        const { className, ..._props } = props as any
        return (
            <div className={cn(styles.col, 'col-6')} {..._props}>
                {this.props.children}
            </div>
        )
    }
}

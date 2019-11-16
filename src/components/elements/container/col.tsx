import cn from 'classnames'
import React, { Component } from 'react'
import styles from './style.module.styl'

export class Col extends Component {
    public size: number
    constructor(props: { size: number }) {
        super(props)
        this.size = props.size
    }
    public render() {
        return (
            <div className={cn(styles.col, 'col-12')} {...this.props}>
                {this.props.children}
            </div>
        )
    }
}

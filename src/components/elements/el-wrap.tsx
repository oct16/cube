import cn from 'classnames'
import React, { Component } from 'react'
import styles from './styles.module.styl'
export default class ElWrap extends Component<any, any> {
    public render() {
        const { className, children, onDragStart, inline, 'p-v': pv, ..._props } = this.props
        return (
            <div
                onDragStart={onDragStart}
                className={cn(styles.dragEl, className, inline ? 'd-inline-block' : '')}
                {..._props}
            >
                {children}
            </div>
        )
    }
}

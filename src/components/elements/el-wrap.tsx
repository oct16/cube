import cn from 'classnames'
import React, { Component } from 'react'
import { findWrapNode } from '../../utils/editor'
import styles from './styles.module.styl'
export default class ElWrap extends Component<any, any> {
    public handleClick(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        const target = e.target as HTMLElement
        const p = findWrapNode(target, e.currentTarget)

        if (this.isDelete(e)) {
            if (p) {
                this.props.onDeleteItem(p)
            }
            return
        }

        this.props.onSelectItem(p)
    }

    public isDelete(e: React.MouseEvent): boolean {
        const target = e.target as HTMLElement
        const { x, y, width } = target.getBoundingClientRect() as DOMRect
        const deleteBtn = {
            x: 17,
            y: 20
        }
        const xLimit = x + width - deleteBtn.x
        const yLimit = y + deleteBtn.y

        if (e.clientX > xLimit && e.clientY < yLimit) {
            return true
        }
        return false
    }
    public render() {
        const {
            className,
            selected,
            onSelectItem,
            onDeleteItem,
            children,
            onDragStart,
            inline,
            'p-v': pv,
            ..._props
        } = this.props

        return (
            <div
                onDragStart={onDragStart}
                onClick={this.handleClick.bind(this)}
                className={cn(
                    styles.dragEl,
                    className,
                    inline ? 'd-inline-block' : '',
                    selected ? styles.selected : ''
                )}
                {..._props}
            >
                {children}
            </div>
        )
    }
}

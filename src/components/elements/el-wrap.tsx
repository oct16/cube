import { getTargetData } from '@/utils/editor'
import cn from 'classnames'
import React, { Component } from 'react'
import styles from './styles.module.styl'
export default class ElWrap extends Component<any, any> {
    public handleClick(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()

        if (this.isDelete(e)) {
            const target = e.target as HTMLElement
            const p = target.getAttribute('data-p')
            if (p) {
                this.deleteItem(p)
            }
        }
    }

    public deleteItem(p: string) {
        this.props.onDeleteItem(p)
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
        const { className, onDeleteItem, children, onDragStart, inline, 'p-v': pv, ..._props } = this.props
        return (
            <div
                onDragStart={onDragStart}
                onClick={this.handleClick.bind(this)}
                className={cn(styles.dragEl, className, inline ? 'd-inline-block' : '')}
                {..._props}
            >
                {children}
            </div>
        )
    }
}

import cn from 'classnames'
import { throttle } from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as elements from '../elements'
import styles from './index.module.styl'

export default class Preview extends Component {
    public nodeRef: any

    public onDragOver = (() => {
        const onOver = throttle((target: HTMLElement) => {
            console.log(target)
        }, 500)
        return (e: React.DragEvent<HTMLElement>) => {
            e.preventDefault()
            const target = e.target as HTMLElement
            return onOver(target)
        }
    })()

    constructor(props) {
        super(props)
        this.nodeRef = React.createRef()
    }

    public render() {
        return (
            <div
                ref={this.nodeRef}
                className={cn('preview', styles.preview)}
                onDrop={this.drop.bind(this)}
                onDragOver={this.onDragOver.bind(this)}
            >
                onPreview
            </div>
        )
    }

    public drop(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        const type = e.dataTransfer.getData('type')
        const eleType = elements[type]
        const node = React.createElement(eleType)

        const { current: root } = this.nodeRef

        
        ReactDOM.render(node, root)

        // ;(e.target as HTMLDivElement).appendChild(this.getHtmlNode(data) as ChildNode)
    }

    public getPreviewNode(): HTMLElement {
        const wrap = document.createElement('div')
        wrap.className = 'wrap'
        return wrap
    }
}

import { throttle } from 'lodash'
import React, { Component } from 'react'
import * as elements from '../elements'
interface CNode {
    tag: string
    attr: { [key: string]: string | number }
    children: CNode[]
}
export default class EditBoard extends Component {
    public state = {
        nodes: [
            {
                tag: 'Container',
                attr: { className: 'test1' },
                children: [
                    {
                        tag: 'Col6',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'Text',
                                attr: {},
                                children: ['我是你爸爸']
                            }
                        ]
                    },
                    {
                        tag: 'Col',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'HForm',
                                attr: { className: 'test2' },
                                children: []
                            }
                        ]
                    },
                    {
                        tag: 'Col',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'Table',
                                attr: { className: 'test2' },
                                children: []
                            }
                        ]
                    },
                    {
                        tag: 'Col',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'Button',
                                attr: { className: 'test2' },
                                children: []
                            },
                            {
                                tag: 'Input',
                                attr: { className: 'test2' },
                                children: []
                            }
                        ]
                    },
                    {
                        tag: 'Col6',
                        attr: { className: 'test2' },
                        children: []
                    },
                    {
                        tag: 'Col6',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'Button',
                                attr: { type: 'primary' },
                                children: []
                            }
                        ]
                    }
                ]
            }
        ] as CNode[]
    }

    public onDragOver = (() => {
        const onOver = throttle((target: HTMLElement) => {
            // console.log(target)
        }, 500)
        return (e: React.DragEvent<HTMLElement>) => {
            e.preventDefault()
            const target = e.target as HTMLElement
            return onOver(target)
        }
    })()

    public hasClassName(node: HTMLElement, name: string): boolean {
        return !!~node.className.indexOf(name)
    }

    public drop(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        const addType = e.dataTransfer.getData('add')
        const movePosition = e.dataTransfer.getData('move')
        const target = e.target as HTMLElement
        const position = target.getAttribute('v-p')

        if (addType) {
            if (this.canDrop(target, addType)) {
                if (position) {
                    this.insertItem(position, addType)
                } else {
                    this.state.nodes.push({
                        tag: addType,
                        attr: {},
                        children: []
                    })
                    this.forceUpdate()
                }
            }
        }

        if (movePosition) {
            const { tag } = this.getTargetData(movePosition)
            if (this.canDrop(target, tag)) {
                if (position) {
                    const from = e.dataTransfer.getData('move')
                    this.moveItem(from, position)
                }
            }
        }
    }

    public getTargetData(position: string): CNode {
        const indexArr = position.match(/\d+/g)
        let nodes = this.state.nodes
        let node: any
        if (indexArr) {
            indexArr.forEach(i => {
                node = nodes[i]
                nodes = node.children
            })
        }
        return node
    }

    public moveItem(from: string, to: string) {
        if (from === to) {
            return
        }
        const matches = from.match(/(.+?)-(\d)$/)
        const [, position, index] = matches!

        const parentNode = this.getTargetData(position)
        const toNode = this.getTargetData(to).children

        if (index || Number(index) === 0) {
            if (parentNode) {
                const [node] = parentNode.children.splice(Number(index), 1)
                if (toNode) {
                    toNode.push(node)
                    this.forceUpdate()
                }
            }
        }
    }

    // position: e.g. 0-0-1
    public insertItem(position: string, type: string) {
        const nodes = this.getTargetData(position).children
        if (nodes) {
            nodes.push({
                tag: type,
                attr: {},
                children: []
            })
            this.forceUpdate()
        }
    }

    public drag(e: DragEvent) {
        const target = e.target as HTMLElement
        const position = target.getAttribute('v-p')
        if (position) {
            e.dataTransfer!.setData('move', position)
        }
        e.stopPropagation()
    }

    public canDrop(target: HTMLElement, type?: string): boolean {
        if (type === 'Col' || type === 'Col6') {
            return this.hasClassName(target, 'row')
        } else if (type === 'Container') {
            return this.hasClassName(target, 'board')
        }
        return this.hasClassName(target, 'col')
    }

    public travelNodes(arr: CNode[], path: string = ''): JSX.Element[] {
        return arr.map((node, index) => {
            if (typeof node === 'string') {
                return node
            }
            const Element = elements[node.tag]
            const currentPath = path ? path + '-' + index : String(index)
            return (
                <Element
                    {...node.attr}
                    onDragStart={this.drag}
                    draggable
                    key={currentPath}
                    v-p={currentPath}
                    data-type={node.tag}
                >
                    {this.travelNodes(node.children, currentPath)}
                </Element>
            )
        })
    }

    public render() {
        return (
            <div
                onDrop={this.drop.bind(this)}
                onDragOver={this.onDragOver.bind(this)}
                style={{ paddingBottom: '20px' }}
                className="board"
            >
                {this.travelNodes(this.state.nodes)}
            </div>
        )
    }
}

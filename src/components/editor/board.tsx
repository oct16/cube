import { throttle, uniqueId } from 'lodash'
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
                                tag: 'Button',
                                attr: { type: 'primary' },
                                children: []
                            },
                            {
                                tag: 'Button',
                                attr: { className: 'test32' },
                                children: []
                            }
                        ]
                    }
                ]
            }
            {
                tag: 'Container',
                attr: { className: 'test1' },
                children: [
                    {
                        tag: 'Col6',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'Button',
                                attr: { type: 'primary' },
                                children: []
                            },
                            {
                                tag: 'Button',
                                attr: { className: 'test32' },
                                children: []
                            }
                        ]
                    }
                ]
            }
        ] as CNode[],
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
        return node.className.indexOf(name) !== -1
    }

    public drop(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        const type = e.dataTransfer.getData('type')

        const target = e.target as HTMLElement

        if (this.canDrop(target, type)) {
            const position = target.getAttribute('v-p')
            if (position) {
                this.insertItem(position, type)
            } else {
                this.state.nodes.push({
                    tag: type,
                    attr: {},
                    children: []
                })
                this.forceUpdate()
            }
        }
    }

    // position: e.g. 0-0-1
    public insertItem(position: string, type: string) {
        const indexArr = position.match(/\d+/g)
        let nodes = this.state.nodes
        if (indexArr) {
            indexArr.forEach(i => {
                nodes = nodes[i].children
            })

            nodes.push({
                tag: type,
                attr: {},
                children: []
            })
            this.forceUpdate()
        }
    }

    public canDrop(target: HTMLElement, type: string): boolean {
        if (type === 'Col' || type === 'Col6') {
            return this.hasClassName(target, 'row')
        } else if (type === 'Container') {
            return this.hasClassName(target, 'board')
        }
        return this.hasClassName(target, 'col')
    }

    public travelNodes(arr: CNode[], path: string = ''): JSX.Element[] {
        return arr.map((node, index) => {
            const Element = elements[node.tag]
            const currentPath = path ? path + '-' + index : String(index)

            return (
                <Element key={uniqueId()} {...node.attr} v-p={currentPath}>
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

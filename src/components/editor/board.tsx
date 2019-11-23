import { CNode } from '@/interfaces/editor'
import { canDrop, createElementByType, getTargetData } from '@/utils/editor'
import { throttle } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSelect } from '../../redux/actions'
import * as elements from '../elements'
class EditBoard extends Component<any, any> {
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
                            },
                            {
                                tag: 'Button',
                                attr: { className: 'test2', type: 'primary' },
                                children: ['Button按钮']
                            },
                            {
                                tag: 'Input',
                                attr: { value: 123123 },
                                children: []
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

    public handleDrop(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        const addType = e.dataTransfer.getData('add')
        const movePosition = e.dataTransfer.getData('move')
        const target = e.target as HTMLElement
        const position = target.getAttribute('data-p')

        if (addType) {
            if (canDrop(target, addType)) {
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
            const { tag } = getTargetData(movePosition, this.state.nodes)
            if (canDrop(target, tag)) {
                if (position) {
                    const from = e.dataTransfer.getData('move')
                    this.moveItem(from, position)
                }
            }
        }
    }

    public moveItem(from: string, to?: string) {
        if (from === to) {
            return
        }
        const matches = from.match(/(.+?)-(\d)$/)
        const [, position, index] = matches!
        const parentNode = getTargetData(position, this.state.nodes)
        let toNode: CNode[] | undefined
        if (to) {
            toNode = getTargetData(to, this.state.nodes).children
        }
        if (index || Number(index) === 0) {
            if (parentNode) {
                const [node] = parentNode.children.splice(Number(index), 1)
                if (toNode) {
                    toNode.push(node)
                }
                this.forceUpdate()
            }
        }
    }

    // position: e.g. 0-0-1
    public insertItem(position: string, type: string) {
        const nodes = getTargetData(position, this.state.nodes).children
        if (nodes) {
            nodes.push(createElementByType(type))
            this.forceUpdate()
        }
    }

    public deleteItem(position: string) {
        this.moveItem(position)
    }

    public handleSelect(position: string) {
        const node = getTargetData(position, this.state.nodes)
        this.props.addSelect(node)
        this.forceUpdate()
    }

    public handleDrag(e: DragEvent) {
        const target = e.target as HTMLElement
        const position = target.getAttribute('data-p')
        if (position) {
            e.dataTransfer!.setData('move', position)
        }
        e.stopPropagation()
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
                    selected={this.props.selectNode === node ? true : false}
                    {...node.attr}
                    onSelectItem={this.handleSelect.bind(this)}
                    onDragStart={this.handleDrag}
                    onDeleteItem={this.deleteItem.bind(this)}
                    draggable
                    key={currentPath}
                    data-p={currentPath}
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
                onDrop={this.handleDrop.bind(this)}
                onDragOver={this.onDragOver.bind(this)}
                style={{ paddingBottom: '20px' }}
                className="board"
            >
                {this.travelNodes(this.state.nodes)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { selectNode } = state.select
    return { selectNode }
}

export default connect(
    mapStateToProps,
    { addSelect }
)(EditBoard)

import { CNode } from '@/interfaces/editor'
import { updateNodes, updateSelect } from '@/redux/actions'
import ProjectService from '@/services/project.service'
import { canDrop, createElementByType, getTargetData } from '@/utils/editor'
import { throttle } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as elements from '../elements'
class EditBoard extends Component<any, any> {
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

    public componentDidMount() {
        const data = ProjectService.getData()
        this.props.updateNodes(data)
    }

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
                    this.props.nodes.push({
                        tag: addType,
                        attr: {},
                        children: []
                    })
                    this.forceUpdate()
                }
            }
        }

        if (movePosition) {
            const { node } = getTargetData(movePosition, this.props.nodes)
            if (canDrop(target, node.tag)) {
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
        const { node: parentNode } = getTargetData(position, this.props.nodes)
        let toNode: CNode[] | undefined
        if (to) {
            toNode = getTargetData(to, this.props.nodes).children
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
        const nodes = getTargetData(position, this.props.nodes).children
        if (nodes) {
            nodes.push(createElementByType(type))
            this.forceUpdate()
        }
    }

    public deleteItem(position: string) {
        this.moveItem(position)
    }

    public handleSelect(position: string) {
        const { node } = getTargetData(position, this.props.nodes)
        this.props.updateSelect(node, position)
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
            <div onDrop={this.handleDrop.bind(this)} onDragOver={this.onDragOver.bind(this)} className="board mb-2">
                {this.travelNodes(this.props.nodes)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { selectNode } = state.select
    const { nodes } = state.nodes
    return { selectNode, nodes }
}

export default connect(
    mapStateToProps,
    { updateSelect, updateNodes }
)(EditBoard)

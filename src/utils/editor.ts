import { CNode } from '@/interfaces/editor'

export const getTargetData = (position: string, nodes: CNode[]): CNode => {
    const indexArr = position.match(/\d+/g)
    let node: any
    if (indexArr) {
        indexArr.forEach(i => {
            node = nodes[i]
            nodes = node.children
        })
    }
    return node
}

export const canDrop = (target: HTMLElement, type?: string): boolean => {
    if (type === 'Col' || type === 'Col6') {
        return hasClassName(target, 'row')
    } else if (type === 'Container') {
        return hasClassName(target, 'board')
    }
    return hasClassName(target, 'col')
}

export const hasClassName = (node: HTMLElement, name: string): boolean => {
    return !!~node.className.indexOf(name)
}

import { CNode } from '@/interfaces/editor'

export const getTargetData = (
    position: string,
    nodes: CNode[]
): { node: CNode; index: number; children: CNode[]; parent: CNode } => {
    const indexArr = position.match(/\d+/g)!
    return indexArr.reduce(
        (acc, i, index) => {
            let parent
            const node = nodes[i] as CNode
            if (index === indexArr.length - 2) {
                parent = nodes[i]
            }
            nodes = node.children

            return {
                node,
                index: Number(i),
                children: nodes,
                parent: parent || acc.parent
            }
        },
        {
            node: (null as unknown) as CNode,
            index: (null as unknown) as number,
            children: (null as unknown) as CNode[],
            parent: (null as unknown) as CNode
        }
    )
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

export const createElementByType = (type: string) => {
    const children: any[] = []
    switch (type) {
        case 'Text':
            children.push('text element')
            break
        default:
            break
    }
    return {
        tag: type,
        attr: {},
        children
    }
}

export const findWrapNode = (targetNode: HTMLElement, currentTarget: HTMLElement) => {
    const p = targetNode.getAttribute('data-p')
    if (!p && targetNode.parentElement && currentTarget !== targetNode) {
        return findWrapNode(targetNode.parentElement, currentTarget)
    }
    return p
}

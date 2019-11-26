import { getTargetData } from '@/utils/editor'
import { CNode } from '../interfaces/editor'
import { UPDATE_NODES, UPDATE_SELECT_NODE } from './action-types'
import store from './store'

export const updateNodes = (nodes: CNode[]) => {
    return {
        type: UPDATE_NODES,
        payload: { nodes }
    }
}

export const updateNodeInNodes = (node: CNode) => {
    const { nodes, select } = store.getState()
    const { nodes: _nodes } = JSON.parse(JSON.stringify(nodes))
    const { parent, index } = getTargetData(select.path, _nodes)
    parent.children.splice(index, 1, node)

    return {
        type: UPDATE_NODES,
        payload: { nodes: _nodes }
    }
}

export const updateSelect = (selectNode: CNode, path: string) => {
    return {
        type: UPDATE_SELECT_NODE,
        payload: { selectNode, path }
    }
}

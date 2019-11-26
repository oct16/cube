import { UPDATE_NODES, UPDATE_TARGET_NODE } from '../action-types'

const initialState = {
    nodes: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_NODES: {
            const { nodes } = action.payload
            return {
                ...state,
                nodes
            }
        }
        case UPDATE_TARGET_NODE: {
            const { node } = action.payload
            return {
                ...state,
                node
            }
        }
        default:
            return state
    }
}

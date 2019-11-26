import { UPDATE_SELECT_NODE } from '../action-types'

const initialState = {
    selectNode: {},
    path: ''
}

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SELECT_NODE: {
            const { selectNode, path } = action.payload
            return {
                ...state,
                selectNode,
                path
            }
        }
        default:
            return state
    }
}

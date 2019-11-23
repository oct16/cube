import { ADD_SELECT_NODE } from '../action-types'

const initialState = {
    selectNode: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_SELECT_NODE: {
            const { selectNode } = action.payload
            return {
                ...state,
                selectNode
            }
        }
        default:
            return state
    }
}

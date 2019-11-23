import { CNode } from '../interfaces/editor'
import { ADD_SELECT_NODE } from './action-types'

export const addSelect = (selectNode: CNode) => {
    return {
        type: ADD_SELECT_NODE,
        payload: { selectNode }
    }
}

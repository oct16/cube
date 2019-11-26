import { combineReducers } from 'redux'
import nodes from './nodes'
import select from './select'

export default combineReducers({ select, nodes })

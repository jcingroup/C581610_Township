import { combineReducers } from 'redux'
import {search, edit_type, grid_items, page_operator, oper_type} from './comm'
import {field} from './field'
const stateApp = combineReducers({
    search,
    edit_type,
    grid_items,
    page_operator,
    oper_type,
    field
})

export default stateApp

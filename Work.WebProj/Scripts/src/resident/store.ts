import update = require('react-addons-update');
import { combineReducers } from 'redux'
import {ac_type_comm} from '../action_type';


let searchData = {
    keyword: '',
};

export const search = (state = searchData, action) => {

    switch (action.type) {
        case ac_type_comm.chg_sch_val:
            let struct = {
                [action.name]: { $set: action.value }
            };
            let n_state = update(state, struct);
            return n_state;
        default:
            return state
    }
}
const grid = (state: Array<server.Resident> = [], action): Array<server.Resident> => {
    switch (action.type) {
        case ac_type_comm.load:
            return action.items;
        default:
            return state;
    }
}

let page_operator_state: server.PageInfo = {
    page: 0,
    startcount: 0,
    endcount: 0,
    total: 0,
    records: 0,
    //field: null,
    //sort: null
}
export const page_operator = (state = page_operator_state, action) => {
  
    switch (action.type) {
        case ac_type_comm.load:
            return action.pageinfo;
        default:
            return state
    }
}

const field = (state: server.Resident = {}, action) => {

    switch (action.type) {
        case ac_type_comm.chg_fld_val:
            let struct = {
                [action.name]: { $set: action.value }
            };
            let n_state = update(state, struct);
            return n_state;
        case ac_type_comm.add:
            return action.data;
        case ac_type_comm.update:
            return action.data;
        case ac_type_comm.load:
            return {};

        default:
            return state
    }
}

const edit_type = (state = IEditType.none, action: Redux.Action): IEditType => {

    switch (action.type) {
        case ac_type_comm.load:
            return IEditType.none;
        case ac_type_comm.grid:
            return IEditType.none;
        case ac_type_comm.add:
            return IEditType.insert;
        case ac_type_comm.update:
            return IEditType.update;
        default:
            return state
    }
}


export const combine = combineReducers({
    grid, field, edit_type, page_operator, search 
})

export default combine;
import update = require('react-addons-update');
import { combineReducers } from 'redux'
import {ac_type_comm} from '../action_type';

const grid = (state: Array<server.Resident> = [], action): Array<server.Resident> => {
    switch (action.type) {
        case ac_type_comm.load:
            return action.data;
        default:
            return state
    }
}

const field = (state = {}, action) => {

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



interface Init_Params {
    item: number,
}

let init_params: Init_Params = { item: null };
const params = (state = init_params, action): any => {
    switch (action.type) {
        case ac_type_comm.load: {
            return init_params;
        }
        case ac_type_comm.add:
            let r_a: Init_Params = {
                item: 0
            };
            return r_a;
        case ac_type_comm.update:
            let r_u: Init_Params = {
                item: action.item
            };
            return r_u;
        default:
            return state
    }
}

export const combine = combineReducers({
    grid, field, edit_type, params
})

export default combine;
import update = require('react-addons-update');
import Moment = require('moment');
import {config} from '../ts-comm/def-data';
import { combineReducers } from 'redux'
import {ac_type_comm} from '../action_type';

declare var id: number;
declare var json_data: server.OrderInfo;


let init_data: server.Reserve = {
    reserve_id: 0,
    resident_id: 0,
    facility_id: id,
    name: json_data.name + ' ' + json_data.gender,
    tel: json_data.tel,
    person: 0,
    day: Moment().format(config.dateTime),
    s_time: '10:00',
    e_time: '10:00'
};
const field = (state: server.Reserve = init_data, action) => {

    switch (action.type) {
        case ac_type_comm.chg_fld_val:
            let f_struct_1 = {
                [action.name]: { $set: action.value }
            };
            let n_state_1 = update(state, f_struct_1);
            return n_state_1;
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

const info = (state: server.OrderInfo = json_data, action) => {
    switch (action.type) {
        default:
            return state
    }
}


export const combine = combineReducers({
    field, info
})

export default combine;
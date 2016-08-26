import {callGet, callPost, callPut, callDelete} from '../ts-comm/ajax';
import {ac_type_comm} from '../action_type';
import {tosMessage} from '../ts-comm/comm-func';

//ajax--
export const ajaxGridItem = (search: any) => {
    return dispatch => {
        return callGet(gb_approot + 'api/Resident', search)
            .done((data, textStatus, jqXHRdata) => {
                dispatch(getGridItem(data));
            })
    }
}

export const ajaxEditItem = (id: number | string) => {

    return dispatch => {
        return callGet('/api/Resident', { id: id })
            .done((data, textStatus, jqXHRdata) => {
                dispatch(editState(ac_type_comm.update, data));
            })
    }
}
export const ajaxDeleteItem = (id: number | string) => {

    return dispatch => {
        return callDelete('/api/Resident', { id: id })
            .done((data, textStatus, jqXHRdata) => {
                if (data.result) {
                    tosMessage(null, '刪除完成', 1);
                } else {
                    alert(data.message);
                }
            })
    }
}
//ajax--
const getGridItem = (data) => {
    return {
        type: ac_type_comm.load,
        items: data.rows,
        pageinfo: {
            total: data.total,
            page: data.page,
            records: data.records,
            startcount: data.startcount,
            endcount: data.endcount
        }
    }
}

export const setInputValue = (type, name, value) => {
    return {
        type: type,
        name,
        value
    }
}

export const setFieldValue = (type, item) => {
    return {
        type: type,
        item
    }
}

export const editState = (type, data) => {
    return {
        type: type,
        data
    }
}
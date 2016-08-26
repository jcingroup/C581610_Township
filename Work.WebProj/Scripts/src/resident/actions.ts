import {callGet, callPost, callPut, callDelete} from '../ts-comm/ajax';
import {ac_type_comm} from '../action_type';
import {tosMessage} from '../ts-comm/comm-func';


export const ajaxGridItem = (search: any) => {
    //console.log('queryGridData', search);
    return dispatch => {
        return callGet(gb_approot + 'api/Community', search)
            .done((data, textStatus, jqXHRdata) => {
                dispatch(getGridItem(data));
            })
    }
}

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
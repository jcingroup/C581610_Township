import {callGet, callPost, callPut, callDelete} from '../ts-comm/ajax';
import {ac_type_comm} from '../action_type';
import {tosMessage} from '../ts-comm/comm-func';

//ajax--
const apiPath: string = gb_approot + 'api/Editor';
const apiDetailPath: string = gb_approot + 'api/EditorDetail';

export const ajaxEditItem = (id: number | string) => {

    return dispatch => {
        return callGet(apiPath, { id: id })
            .done((data, textStatus, jqXHRdata) => {
                dispatch(editState(ac_type_comm.update, id, data.data));
            })
    }
}

interface IDName {
    id: number | string //數字型用id 字串型用no
}
interface CallResult extends IResultBase, IDName { }
export const ajaxSubmit = (id, md: server.Resident, edit_type: IEditType) => {
    return dispatch => {
        let pm = { id: id, md: md };

        if (edit_type == IEditType.insert) {
            return callPost(apiPath, md)
                .done((data: CallResult, textStatus, jqXHRdata) => {
                    if (data.result) {
                        tosMessage(null, '新增完成', 1);
                        dispatch(ajaxEditItem(data.id));//新增完成後狀態更新為修改
                    } else {
                        alert(data.message);
                    }
                })
        }

        if (edit_type == IEditType.update) {
            return callPut(apiPath, pm)
                .done((data: CallResult, textStatus, jqXHRdata) => {
                    if (data.result) {
                        tosMessage(null, '修改完成', 1);
                    } else {
                        alert(data.message);
                    }
                })
        }
    }
}
export const ajaxGridDetailItem = (main_id: number) => {
    return dispatch => {
        return callGet(apiDetailPath + '/GetDetailList', { main_id: main_id })
            .done((data, textStatus, jqXHRdata) => {
                dispatch(setInputValue(ac_type_comm.chg_fld_val, "EditorDetail", data));
            })
    }
}
export const ajaxDelDetail = (i, id, edit_state: IEditType) => {
    return dispatch => {
        if (edit_state == IEditType.insert) {
            tosMessage(null, '刪除完成', 1);
            dispatch(delDetailState(i));
        }
        if (edit_state == IEditType.update) {
            return callDelete(apiDetailPath, { id: id })
                .done((data: CallResult, textStatus, jqXHRdata) => {
                    if (data.result) {
                        tosMessage(null, '刪除完成', 1);
                        dispatch(delDetailState(i));
                    } else {
                        alert(data.message);
                    }
                })
        }
    }
}
//ajax--


export const setInputValue = (type, name, value) => {
    return {
        type: type,
        name,
        value
    }
}
export const setDetailInputValue = (type, i, name, value) => {
    return {
        type: type,
        i,
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

export const editState = (type, id, data) => {
    return {
        type: type,
        id,
        data
    }
}

export const addDeatilState = (data) => {
    return {
        type: ac_type_comm.add_detail,
        data
    }
}
export const delDetailState = (i) => {
    return {
        type: ac_type_comm.del_detail,
        i
    }
}
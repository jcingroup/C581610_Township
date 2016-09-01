import {callGet, callPost, callPut, callDelete} from '../ts-comm/ajax';
import {ac_type_comm} from '../action_type';
import {tosMessage} from '../ts-comm/comm-func';

//ajax--
const apiPath: string = gb_approot + 'Service/sendOrder';

interface IDName {
    id: number | string //數字型用id 字串型用no
}
interface CallResult extends IResultBase, IDName { }
export const ajaxSubmit = (md) => {
    return dispatch => {
        let pm = { md: md };
        $("body").mask("檢查中請稍後...");
        return callPost(apiPath, md)
            .done((data: CallResult, textStatus, jqXHRdata) => {
                $("body").unmask();
                if (data.result) {
                    alert(data.message);
                    location.href = gb_approot + "Service";
                } else {
                    alert(data.message);
                }
            })
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


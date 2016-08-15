import {callGet, callPost, callDelete, callPut} from '../../ts-comm/ajax';

export const setInputValue = (type, name, value) => {
    return {
        type: type,
        value,
        name
    }
}

export const ajaxGridItem = (search: any) => {
    //console.log('queryGridData', search);
    return dispatch => {
        return callGet('/api/Community', search)
            .done((data, textStatus, jqXHRdata) => {
                dispatch(getGridItem(data));
            })
    }
}
const getGridItem = (data) => {
    return {
        type: 'load',
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

export const clearGridItem = () => {
    return {
        type: 'clear'
    }
}
export const delItemOne = (id: number | string) => {
    return {
        type: 'delItemOne'
    }

}
export const queryGridData = (search) => {

    return {
        type: 'query'
    }
}

export const operatorInsert = () => {
    return {
        type: 'insert'
    }
}

export const ajaxOperatorEdit = (id: number | string) => {

    return dispatch => {
        return callGet('/api/Community', { id: id })
            .done((data, textStatus, jqXHRdata) => {
                dispatch(getEditData(data));
            })
    }
}
const getEditData = (data) => {
    return {
        type: 'edit',
        field: data.data
    }
}


export const operatorGrid = () => {
    return {
        type: 'grid'
    }
}
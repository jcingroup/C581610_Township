import update = require('react-addons-update');

let list_operator_state = {
    community_name: null,
};

export const search = (state = list_operator_state, action) => {

    switch (action.type) {
        case 'change_search':
            let struct = {
                [action.name]: { $set: action.value }
            };
            let n_state = update(state, struct);
            return n_state;
        default:
            return state
    }
}
export const grid_items = (state = [], action): Array<server.Community> => {
    //console.log('state', 'grid_items', state);
    switch (action.type) {
        case 'load':
            //console.log('state', 'grid_items', 'load', action.items);
            return action.items;
        case 'clear':
            return [];

        //case 'delItemOne':

        default:
            return state
    }
}

let page_operator_state = {
    page: 0,
    startcount: 0,
    endcount: 0,
    total: 0,
    records: 0,
    field: null,
    sort: null
}
export const page_operator = (state = page_operator_state, action) => {
    switch (action.type) {
        case 'load':
            return action.pageinfo;
        default:
            return state
    }
}

export const edit_type = (state = IEditType.none, action: Redux.Action): IEditType => {
    switch (action.type) {
        case 'load':
            return IEditType.none;
        case 'insert':
            return IEditType.insert;
        case 'edit':
            return IEditType.update;
        case 'grid':
            return IEditType.none
        default:
            return state
    }
}

export const oper_type = (state = OperatorType.grid, action: Redux.Action): OperatorType => {
    //console.log('oper_type action...', action.type)
    switch (action.type) {
        case 'load':
            return OperatorType.grid;
        case 'insert':
            return OperatorType.edit;
        case 'edit':
            return OperatorType.edit;
        case 'grid':
            return OperatorType.grid;
        default:
            return state
    }
}
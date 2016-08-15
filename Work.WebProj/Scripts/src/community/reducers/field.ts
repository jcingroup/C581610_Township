import update = require('react-addons-update');

let field_state: server.Community = {};
export const field = (state = field_state, action): server.Community => {

    switch (action.type) {
        case 'change_field':
            let struct = {
                [action.name]: { $set: action.value }
            };
            let n_state = update(state, struct);
            return n_state;
        case 'insert': //©ñ¹w³]­È
            return {
            };
        case 'edit':
            return action.field;
        default:
            return state
    }
}
"use strict";
const update = require('react-addons-update');
let search_state = {
    key: 'Hi'
};
exports.search = (state = search_state, action) => {
    switch (action.type) {
        case 'setInputValue':
            let struct = {
                [action.name]: { $set: action.name.value }
            };
            let n_state = update(state, struct);
            return n_state;
        default:
            return state;
    }
};
exports.edit_type = (state = 0, action) => {
    switch (action.type) {
        case 'setInputValue':
        default:
            return state;
    }
};
exports.grid_items = (state = [], action) => {
    switch (action.type) {
        case 'load':
            console.log('state', 'grid_items', 'load', action.items);
            return action.items;
        default:
            return state;
    }
};

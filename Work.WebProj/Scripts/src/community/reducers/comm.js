"use strict";
var update = require('react-addons-update');
var list_operator_state = {
    community_name: null,
};
exports.search = function (state, action) {
    if (state === void 0) { state = list_operator_state; }
    switch (action.type) {
        case 'change_search':
            var struct = (_a = {},
                _a[action.name] = { $set: action.value },
                _a
            );
            var n_state = update(state, struct);
            return n_state;
        default:
            return state;
    }
    var _a;
};
exports.grid_items = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case 'load':
            return action.items;
        case 'clear':
            return [];
        default:
            return state;
    }
};
var page_operator_state = {
    page: 0,
    startcount: 0,
    endcount: 0,
    total: 0,
    records: 0,
    field: null,
    sort: null
};
exports.page_operator = function (state, action) {
    if (state === void 0) { state = page_operator_state; }
    switch (action.type) {
        case 'load':
            return action.pageinfo;
        default:
            return state;
    }
};
exports.edit_type = function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'load':
            return 0;
        case 'insert':
            return 1;
        case 'edit':
            return 2;
        case 'grid':
            return 0;
        default:
            return state;
    }
};
exports.oper_type = function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'load':
            return 0;
        case 'insert':
            return 1;
        case 'edit':
            return 1;
        case 'grid':
            return 0;
        default:
            return state;
    }
};

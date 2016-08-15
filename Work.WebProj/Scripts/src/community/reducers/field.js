"use strict";
var update = require('react-addons-update');
var field_state = {};
exports.field = function (state, action) {
    if (state === void 0) { state = field_state; }
    switch (action.type) {
        case 'change_field':
            var struct = (_a = {},
                _a[action.name] = { $set: action.value },
                _a
            );
            var n_state = update(state, struct);
            return n_state;
        case 'insert':
            return {};
        case 'edit':
            return action.field;
        default:
            return state;
    }
    var _a;
};

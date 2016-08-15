"use strict";
var redux_1 = require('redux');
var comm_1 = require('./comm');
var field_1 = require('./field');
var stateApp = redux_1.combineReducers({
    search: comm_1.search,
    edit_type: comm_1.edit_type,
    grid_items: comm_1.grid_items,
    page_operator: comm_1.page_operator,
    oper_type: comm_1.oper_type,
    field: field_1.field
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stateApp;

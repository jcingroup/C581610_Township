"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _this = this;
var React = require('react');
var react_redux_1 = require('react-redux');
var actions_1 = require("../actions");
require("react-datepicker/dist/react-datepicker.css");
var ButtonItemDel = function (_a) {
    var clickItemDel = _a.clickItemDel, prim_key = _a.prim_key;
    return React.createElement("button", {type: "button", onClick: clickItemDel.bind(_this, prim_key)}, "Click");
};
var ButtonItemEdit = function (_a) {
    var clickItemDel = _a.clickItemDel, prim_key = _a.prim_key;
    return React.createElement("button", {type: "button", onClick: clickItemDel.bind(_this, prim_key)}, "Edit");
};
var Rows = function (_a) {
    var item = _a.item, clickItemDel = _a.clickItemDel, clickItemEdit = _a.clickItemEdit;
    return (React.createElement("tr", null, React.createElement("td", null, React.createElement(ButtonItemDel, {clickItemDel: clickItemDel, prim_key: item.community_id})), React.createElement("td", null, React.createElement(ButtonItemEdit, {clickItemDel: clickItemEdit, prim_key: item.community_id})), React.createElement("td", null, item.community_name), React.createElement("td", null, item.address)));
};
var GridTable = (function (_super) {
    __extends(GridTable, _super);
    function GridTable() {
        _super.call(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {
            searchData: null
        };
    }
    GridTable.prototype.componentDidMount = function () {
    };
    GridTable.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    GridTable.prototype.componentWillUnmount = function () {
    };
    GridTable.prototype.render = function () {
        var _this = this;
        var out_html = null;
        out_html =
            (React.createElement("table", {className: "table table-sm table-bordered table-striped"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "刪除"), React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "修改"), React.createElement("th", {style: { "width": "26%" }}, "編號"), React.createElement("th", {style: { "width": "60%" }}, "社區名稱"))), React.createElement("tbody", null, this.props.grid_items.map(function (item, i) {
                return React.createElement(Rows, {key: item.community_id, item: item, clickItemDel: _this.props.clickItemDel, clickItemEdit: _this.props.clickItemEdit});
            }))));
        return out_html;
    };
    return GridTable;
}(React.Component));
exports.GridTable = GridTable;
var mapStateToProps = function (state, ownProps) {
    return {
        grid_items: state.grid_items,
        page_operator: state.page_operator
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        clickItemDel: function (id) {
            dispatch(actions_1.delItemOne(id));
        },
        clickItemEdit: function (id) {
            dispatch(actions_1.ajaxOperatorEdit(id));
        }
    };
};
var GridTablePart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridTable);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GridTablePart;

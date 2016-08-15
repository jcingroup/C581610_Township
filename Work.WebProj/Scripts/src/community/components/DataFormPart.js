"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_redux_1 = require('react-redux');
var redux_1 = require('redux');
var DatePicker = require('react-datepicker');
var actions_1 = require("../actions");
require("react-datepicker/dist/react-datepicker.css");
var def_data_1 = require('../../ts-comm/def-data');
function makeInputValue(e) {
    var input = e.target;
    var value;
    if (input.value == 'true') {
        value = true;
    }
    else if (input.value == 'false') {
        value = false;
    }
    else {
        value = input.value;
    }
    return value;
}
var DataForm = (function (_super) {
    __extends(DataForm, _super);
    function DataForm() {
        _super.call(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {};
    }
    DataForm.prototype.componentDidMount = function () {
    };
    DataForm.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    DataForm.prototype.componentWillUnmount = function () {
    };
    DataForm.prototype.changeValue = function (name, e) {
        var value = makeInputValue(e);
        this.props.changeValue('change_field', name, value);
    };
    DataForm.prototype.setChangeDate = function (collentName, name, date) {
    };
    DataForm.prototype.render = function () {
        var out_html = null;
        var field = this.props.field;
        out_html =
            (React.createElement("form", {className: "form form-sm"}, React.createElement("h4", {className: "h4"}, "商家基本資料"), React.createElement("div", {className: "form-group row"}, React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, React.createElement("small", {className: "text-danger"}, "*"), "  商家名稱"), React.createElement("div", {className: "col-xs-7"}, React.createElement("input", {type: "text", className: "form-control", value: field.community_name, maxLength: 64, onChange: this.changeValue.bind(this, 'community_name'), required: true}))), React.createElement("div", {className: "form-group row"}, React.createElement("label", {className: "col-xs-1 form-control-label text-xs-right"}, React.createElement("small", {className: "text-danger"}, "*"), "  日期"), React.createElement("div", {className: "col-xs-7"}, React.createElement(DatePicker, {dateFormat: def_data_1.dateFT, isClearable: true, required: true, locale: "zh-TW", showYearDropdown: true, onChange: this.setChangeDate.bind(this, this.props.fdName, 'start_date'), className: "form-control"}))), React.createElement("div", {className: "form-action"}, React.createElement("div", {className: "col-xs-offset-1"}, React.createElement("button", {type: "submit", className: "btn btn-sm btn-primary"}, React.createElement("i", {className: "fa-check"}), " 儲存"), " ", React.createElement("button", {type: "button", className: "btn btn-sm btn-secondary", onClick: this.props.clickReturnGrid}, React.createElement("i", {className: "fa-times"}), " 回前頁")))));
        return out_html;
    };
    return DataForm;
}(React.Component));
exports.DataForm = DataForm;
var mapStateToProps = function (state, ownProps) {
    return {
        field: state.field,
        oper_type: state.oper_type
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    var r = redux_1.bindActionCreators({
        clickReturnGrid: actions_1.operatorGrid,
        changeValue: actions_1.setInputValue,
    }, dispatch);
    return r;
};
var DataFormPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataFormPart;

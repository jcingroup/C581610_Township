"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_redux_1 = require('react-redux');
var redux_1 = require('redux');
var actions_1 = require("../actions");
var GridTablePart_1 = require("./GridTablePart");
var NavPart_1 = require("./NavPart");
require("react-datepicker/dist/react-datepicker.css");
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
var SearchForm = (function (_super) {
    __extends(SearchForm, _super);
    function SearchForm() {
        _super.call(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {};
    }
    SearchForm.prototype.componentDidMount = function () {
    };
    SearchForm.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    SearchForm.prototype.componentWillUnmount = function () {
    };
    SearchForm.prototype.submitQuery = function (e) {
        e.preventDefault();
        var params = this.props.search;
        params['page'] = this.props.page;
        this.props.submitQuery(params);
        return;
    };
    SearchForm.prototype.changeValue = function (name, e) {
        var value = makeInputValue(e);
        this.props.changeValue('change_search', name, value);
    };
    SearchForm.prototype.render = function () {
        var out_html = null;
        var pp = this.props;
        var search = pp.search;
        out_html =
            (React.createElement("form", {onSubmit: this.submitQuery}, React.createElement("div", {className: "table-responsive"}, React.createElement("div", {className: "table-header"}, React.createElement("div", {className: "table-filter"}, React.createElement("div", {className: "form-inline"}, React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "sr-only"}, "搜尋社區名稱"), " ", React.createElement("input", {type: "text", className: "form-control form-control-sm", value: search.community_name, onChange: this.changeValue.bind(this, 'community_name'), placeholder: "社區名稱"}), React.createElement("button", {className: "btn btn-sm btn-primary", type: "submit"}, React.createElement("i", {className: "fa-search"}), " 搜尋")))))), React.createElement(GridTablePart_1.default, null), React.createElement(NavPart_1.default, {showAdd: true})));
        return out_html;
    };
    return SearchForm;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    return {
        search: state.search,
        count: state.grid_items.length,
        page: state.page_operator.page
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    var r = redux_1.bindActionCreators({
        changeValue: actions_1.setInputValue,
        submitQuery: actions_1.ajaxGridItem
    }, dispatch);
    return r;
};
var SearchFormPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SearchForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchFormPart;

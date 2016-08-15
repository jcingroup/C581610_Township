"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_redux_1 = require('react-redux');
var SearchFormPart_1 = require("./SearchFormPart");
var DataFormPart_1 = require("./DataFormPart");
var GridForm = (function (_super) {
    __extends(GridForm, _super);
    function GridForm() {
        _super.call(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {
            searchData: null
        };
    }
    GridForm.prototype.componentDidMount = function () {
    };
    GridForm.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    GridForm.prototype.componentWillUnmount = function () {
    };
    GridForm.prototype.render = function () {
        var out_html = null;
        var operator_view = null;
        if (this.props.oper_type == 0) {
            operator_view = React.createElement(SearchFormPart_1.default, null);
        }
        if (this.props.oper_type == 1) {
            operator_view = React.createElement(DataFormPart_1.default, null);
        }
        out_html =
            (React.createElement("div", null, React.createElement("ul", {className: "breadcrumb"}, React.createElement("li", null, React.createElement("i", {className: "fa-caret-right"}), " ", this.props.menuName), React.createElement("li", null, React.createElement("i", {className: "fa-angle-right"}), " ", this.props.caption)), React.createElement("h3", {className: "h3"}, this.props.caption), operator_view));
        return out_html;
    };
    return GridForm;
}(React.Component));
exports.GridForm = GridForm;
var mapStateToProps = function (state, ownProps) {
    return {
        oper_type: state.oper_type
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        onClick: function () {
        }
    };
};
var GridFormPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GridFormPart;

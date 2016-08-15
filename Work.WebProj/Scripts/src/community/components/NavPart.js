"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_redux_1 = require('react-redux');
var actions_1 = require("../actions");
var redux_1 = require('redux');
var GridNavPage = (function (_super) {
    __extends(GridNavPage, _super);
    function GridNavPage(props) {
        _super.call(this, props);
        this.nextPage = this.nextPage.bind(this);
        this.prvePage = this.prvePage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.mapPage = this.mapPage.bind(this);
    }
    GridNavPage.prototype.mapPage = function (page) {
        var params = this.props.search;
        params['page'] = this.props.page;
        this.props.clickChangePage(params);
    };
    GridNavPage.prototype.firstPage = function () {
        this.mapPage(1);
    };
    GridNavPage.prototype.lastPage = function () {
        this.mapPage(this.props.total);
    };
    GridNavPage.prototype.nextPage = function () {
        if (this.props.page < this.props.total) {
            this.mapPage(this.props.page + 1);
        }
    };
    GridNavPage.prototype.prvePage = function () {
        if (this.props.page > 1) {
            this.mapPage(this.props.page - 1);
        }
    };
    GridNavPage.prototype.jumpPage = function () {
    };
    GridNavPage.prototype.render = function () {
        var setAddButton = null, setDeleteButton = null;
        if (this.props.showAdd) {
            setAddButton = (React.createElement("button", {className: "btn btn-sm btn-success", type: "button", onClick: this.props.clickEditInsert}, React.createElement("i", {className: "fa-plus-circle"}), " 新增"));
        }
        if (this.props.showDelete) {
            setDeleteButton = React.createElement("button", {className: "btn btn-sm btn-danger", type: "button"}, React.createElement("i", {className: "fa-trash-o"}), " 刪除");
        }
        var oper = null;
        oper = (React.createElement("div", {className: "table-footer clearfix"}, React.createElement("div", {className: "pull-xs-left"}, setAddButton, " ", setDeleteButton), React.createElement("small", {className: "pull-xs-right"}, "第", this.props.startcount, "-", this.props.endcount, "筆，共", this.props.records, "筆"), React.createElement("ul", {className: "pager pager-sm"}, React.createElement("li", null, React.createElement("a", {href: "#", title: "移至第一頁", tabIndex: -1, onClick: this.firstPage}, React.createElement("i", {className: "fa-angle-double-left"}))), " ", React.createElement("li", null, React.createElement("a", {href: "#", title: "上一頁", tabIndex: -1, onClick: this.prvePage}, React.createElement("i", {className: "fa-angle-left"}))), " ", React.createElement("li", {className: "form-inline"}, React.createElement("div", {className: "form-group"}, React.createElement("label", null, "第"), ' ', React.createElement("input", {style: { "width": "100px" }, className: "form-control form-control-sm text-xs-center", type: "number", min: "1", tabIndex: -1, value: this.props.page, onChange: this.jumpPage}), ' ', React.createElement("label", null, "頁，共", this.props.total, "頁"))), " ", React.createElement("li", null, React.createElement("a", {href: "#", title: "@Resources.Res.NextPage", tabIndex: -1, onClick: this.nextPage}, React.createElement("i", {className: "fa-angle-right"}))), " ", React.createElement("li", null, React.createElement("a", {href: "#", title: "移至最後一頁", tabIndex: -1, onClick: this.lastPage}, React.createElement("i", {className: "fa-angle-double-right"}))))));
        return oper;
    };
    return GridNavPage;
}(React.Component));
exports.GridNavPage = GridNavPage;
var mapStateToProps = function (state, ownProps) {
    var p = state.page_operator;
    return {
        page: p.page,
        startcount: p.startcount,
        endcount: p.endcount,
        total: p.total,
        records: p.records,
        search: state.search
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    var r = redux_1.bindActionCreators({
        clickChangePage: actions_1.ajaxGridItem,
        clickEditInsert: actions_1.operatorInsert
    }, dispatch);
    return r;
};
var NavPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridNavPage);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavPart;

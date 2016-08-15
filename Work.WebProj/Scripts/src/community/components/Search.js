"use strict";
const React = require('react');
require("react-datepicker/dist/react-datepicker.css");
class GridForm extends React.Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {
            searchData: null
        };
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    render() {
        var out_html = null;
        out_html =
            (React.createElement("div", null, React.createElement("ul", {className: "breadcrumb"}, React.createElement("li", null, React.createElement("i", {className: "fa-caret-right"}), " ", this.props.menuName), React.createElement("li", null, React.createElement("i", {className: "fa-angle-right"}), " ", this.props.caption)), React.createElement("h3", {className: "h3"}, this.props.caption), React.createElement("form", null, React.createElement("div", {className: "table-responsive"}, React.createElement("div", {className: "table-header"}, React.createElement("div", {className: "table-filter"}, React.createElement("div", {className: "form-inline"}, React.createElement("div", {className: "form-group"}, React.createElement("label", {className: "sr-only"}, "搜尋社區名稱"), " ", React.createElement("input", {type: "text", className: "form-control form-control-sm", value: '', placeholder: "社區名稱"}), " ", React.createElement("button", {className: "btn btn-sm btn-primary", type: "submit"}, React.createElement("i", {className: "fa-search"}), " 搜尋"))))), React.createElement("table", {className: "table table-sm table-bordered table-striped"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "刪除"), React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "修改"), React.createElement("th", {style: { "width": "26%" }}, "編號"), React.createElement("th", {style: { "width": "60%" }}, "社區名稱"))), React.createElement("tbody", null))))));
        return out_html;
    }
}
GridForm.defaultProps = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GridForm;

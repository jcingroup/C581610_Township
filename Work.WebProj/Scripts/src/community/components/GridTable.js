"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
require("react-datepicker/dist/react-datepicker.css");
class GridTable extends React.Component {
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
            (React.createElement("table", {className: "table table-sm table-bordered table-striped"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "刪除"), React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "修改"), React.createElement("th", {style: { "width": "26%" }}, "編號"), React.createElement("th", {style: { "width": "60%" }}, "社區名稱"))), React.createElement("tbody", null, this.props.grid_items.map((item, i) => React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null), React.createElement("td", null, item.community_name), React.createElement("td", null, item.company))))));
        return out_html;
    }
}
exports.GridTable = GridTable;
const mapStateToProps = (state, ownProps) => {
    return {
        grid_items: state.grid_items
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
        }
    };
};
const GridTablePart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridTable);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GridTablePart;

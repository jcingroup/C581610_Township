"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const Rows = ({ active }) => {
    return (React.createElement("tr", null, React.createElement("td", null, "A"), React.createElement("td", null, "B"), React.createElement("td", null, "C"), React.createElement("td", null, "D")));
};
class GridTableRow extends React.Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {};
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
            (React.createElement("table", {className: "table table-sm table-bordered table-striped"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "刪除"), React.createElement("th", {style: { "width": "7%" }, className: "text-xs-center"}, "修改"), React.createElement("th", {style: { "width": "26%" }}, "編號"), React.createElement("th", {style: { "width": "60%" }}, "社區名稱"))), React.createElement("tbody", null, this.props.grid_items.map((item, i) => React.createElement(Rows, {key: item.community_id, active: item})))));
        return out_html;
    }
}
exports.GridTableRow = GridTableRow;
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
const GridTableRowPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridTableRow);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GridTableRowPart;

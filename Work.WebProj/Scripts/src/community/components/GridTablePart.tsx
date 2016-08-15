import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import Moment = require('moment');

import DatePicker = require('react-datepicker');
import {delItemOne, ajaxOperatorEdit} from "../actions";
import "react-datepicker/dist/react-datepicker.css";

const ButtonItemDel = ({ clickItemDel, prim_key }: { clickItemDel: Function, prim_key?: string | number }) => {
    return <button type="button" onClick={clickItemDel.bind(this, prim_key) }>Click</button>;
}

const ButtonItemEdit = ({ clickItemDel, prim_key }: { clickItemDel: Function, prim_key?: string | number }) => {
    return <button type="button" onClick={clickItemDel.bind(this, prim_key) }>Edit</button>;
}

const Rows = ({ item, clickItemDel, clickItemEdit}: { item: server.Community, clickItemDel: Function, clickItemEdit: Function }) => {

    return (
        <tr>
            <td><ButtonItemDel clickItemDel={clickItemDel} prim_key={item.community_id} /></td>
            <td><ButtonItemEdit clickItemDel={clickItemEdit} prim_key={item.community_id} /></td>
            <td>{item.community_name}</td>
            <td>{item.address}</td>
        </tr>
    )
}

export class GridTable extends React.Component<{
    grid_items: Array<server.Community>,
    page_operator: any,
    clickItemDel: any,
    clickItemEdit: any
}, any>{

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
        let out_html: JSX.Element = null;
        //this.props;

        out_html =
            (
                <table className="table table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style={{ "width": "7%" }} className="text-xs-center">刪除</th>
                            <th style={{ "width": "7%" }} className="text-xs-center">修改</th>
                            <th style={{ "width": "26%" }}>編號</th>
                            <th style={{ "width": "60%" }}>社區名稱</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.grid_items.map(
                            (item, i) =>
                                <Rows
                                    key={item.community_id}
                                    item={item}
                                    clickItemDel={this.props.clickItemDel}
                                    clickItemEdit={this.props.clickItemEdit}
                                    />
                        ) }
                    </tbody>
                </table>
            );

        return out_html;
    }
}
const mapStateToProps = (state: { grid_items: Array<server.Community>, page_operator: any }, ownProps) => {
    //console.log('GridTable mapStateToProps', state)
    return {
        grid_items: state.grid_items,
        page_operator: state.page_operator
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickItemDel: (id: number) => {
            //console.log(id);
            dispatch(delItemOne(id))
        },

        clickItemEdit: (id: number) => {
            //console.log(id);
            dispatch(ajaxOperatorEdit(id))
        }
    }
}
const GridTablePart = connect(mapStateToProps, mapDispatchToProps)(GridTable)

export default GridTablePart;
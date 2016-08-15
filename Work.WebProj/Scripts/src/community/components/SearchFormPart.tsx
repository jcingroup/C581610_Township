import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment = require('moment');

import DatePicker = require('react-datepicker');
import {clearGridItem, setInputValue, ajaxGridItem } from "../actions";
import * as actionCreate from "../actions";

import GridTablePart from "./GridTablePart";
import NavPart from "./NavPart";
import "react-datepicker/dist/react-datepicker.css";

function makeInputValue(e: React.SyntheticEvent) {
    let input: HTMLInputElement = e.target as HTMLInputElement;
    let value;

    if (input.value == 'true') {
        value = true;
    } else if (input.value == 'false') {
        value = false;
    } else {
        value = input.value;
    }

    return value;
}

interface MyProps {
    chgValue?: Function,
    submitQuery?: Function
}

class SearchForm extends React.Component<any, any>{

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        //---
        this.submitQuery = this.submitQuery.bind(this);
        this.changeValue = this.changeValue.bind(this);
        //--state
        this.state = {};
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {

    }

    submitQuery(e: React.SyntheticEvent) {
        e.preventDefault();

        let params = this.props.search;
        params['page'] = this.props.page;

        this.props.submitQuery(params);
        return;
    }
    changeValue(name: string, e: React.SyntheticEvent) {
        let value = makeInputValue(e);
        this.props.changeValue('change_search',name, value);
    }
    render() {

        let out_html: JSX.Element = null;
        let pp = this.props;
        let search = pp.search;
        //console.log('Check search', this.props);
        out_html =
            (
                <form onSubmit={this.submitQuery}>
                    <div className="table-responsive">
                        <div className="table-header">
                            <div className="table-filter">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label className="sr-only">搜尋社區名稱</label> { }
                                        <input type="text" className="form-control form-control-sm"
                                            value={search.community_name}
                                            onChange= {this.changeValue.bind(this, 'community_name') }
                                            placeholder="社區名稱" />
                                        <button className="btn btn-sm btn-primary" type="submit">
                                            <i className="fa-search"></i> 搜尋
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GridTablePart />
                    <NavPart showAdd={true} />
                </form>

            );

        return out_html;
    }
}



const mapStateToProps = (state, ownProps) => {
    //console.log('SearchForm mapStateToProps search', state.search);
    return {
        search: state.search,
        count: state.grid_items.length,
        page: state.page_operator.page
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {

    //console.log('Check mapDispatchToProps', ownProps);
    //let r = {
    //    chgValue: (name: string, e: React.SyntheticEvent) => {
    //        let value = makeInputValue(e);
    //        //console.log('value', value);
    //        dispatch(setInputValue(name, value));
    //        //console.log('Check ownProps', ownProps);
    //    },
    //    submitQuery: (search: any) => {
    //        //console.log('submit', search, ownProps);
    //    }
    //};

    let r = bindActionCreators({
        changeValue: setInputValue,
        submitQuery: ajaxGridItem
    }, dispatch);

    //let r = bindActionCreators<any>(actionCreate, dispatch);

    return r;
}
const SearchFormPart = connect(mapStateToProps, mapDispatchToProps)(SearchForm)
export default SearchFormPart;
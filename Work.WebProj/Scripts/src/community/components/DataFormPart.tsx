import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import Moment = require('moment');
import { bindActionCreators } from 'redux';
import DatePicker = require('react-datepicker');
import {operatorGrid, setInputValue} from "../actions";
import "react-datepicker/dist/react-datepicker.css";
import SearchFormPart from "./SearchFormPart";

import {dateFT} from '../../ts-comm/def-data';

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

export class DataForm extends React.Component<any, any>{

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
        };

    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {

    }

    changeValue(name: string, e: React.SyntheticEvent) {
        let value = makeInputValue(e);
        this.props.changeValue('change_field', name, value);
    }

    setChangeDate(collentName: string, name: string, date: moment.Moment) {

        //var v = date == null ? null : date.format();
        //var objForUpdate = {
        //    [collentName]:
        //    {
        //        [name]: {
        //            $set: v
        //        }
        //    }
        //};
        //var newState = update(this.state, objForUpdate);
        //this.setState(newState);
    }


    render() {
        let out_html: JSX.Element = null;
        let field: any = this.props.field;
        out_html =
            (
                <form className="form form-sm" >

                    <h4 className="h4">商家基本資料</h4>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  商家名稱</label>
                        <div className="col-xs-7">
                            <input type="text" className="form-control"
                                value={field.community_name}
                                maxLength={64}
                                onChange={this.changeValue.bind(this, 'community_name') }
                                required />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  日期</label>
                        <div className="col-xs-7">
                            <DatePicker 
                                dateFormat={dateFT}
                                isClearable={true}
                                required={true}
                                locale="zh-TW"
                                showYearDropdown
                                onChange={this.setChangeDate.bind(this, this.props.fdName, 'start_date') }
                                className="form-control" />
                        </div>
                    </div>

                    <div className="form-action">
                        <div className="col-xs-offset-1">
                            <button type="submit" className="btn btn-sm btn-primary"><i className="fa-check"></i> 儲存</button> { }
                            <button type="button" className="btn btn-sm btn-secondary" onClick={this.props.clickReturnGrid}><i className="fa-times"></i> 回前頁</button>
                        </div>
                    </div>

                </form>
            );

        return out_html;
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        field: state.field,
        oper_type: state.oper_type
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    let r = bindActionCreators({
        clickReturnGrid: operatorGrid,
        changeValue: setInputValue,
    }, dispatch);


    return r;
}
const DataFormPart = connect(mapStateToProps, mapDispatchToProps)(DataForm)

export default DataFormPart;
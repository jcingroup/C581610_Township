﻿import $ = require('jquery');
import React = require('react');
import Moment = require('moment');
import {config, UIText, NewsTypeData, IHideTypeData_v2} from '../ts-comm/def-data';
import { makeInputValue, clone, MntV} from '../ts-comm/comm-func'
import { RadioBox} from '../ts-comm/comm-cmpt'
import {ac_type_comm} from '../action_type';

import DatePicker = require('react-datepicker');
import "react-datepicker/dist/react-datepicker.css";

export class Edit extends React.Component<any, any>{

    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);

        this.chgVal = this.chgVal.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.callSubmit = this.callSubmit.bind(this);

        this.state = {
        };
    }
    componentDidMount() {
        CKEDITOR.replace('a_content', { customConfig: '../ckeditor/inlineConfig.js' });
    }
    componentDidUpdate(prevProps, prevState) {
    }
    chgVal(name: string, e: React.SyntheticEvent) {
        let value = makeInputValue(e);
        this.props.setInputValue(ac_type_comm.chg_fld_val, name, value);
    }
    chgDate(name: string, MM: moment.Moment) {

        if (MM != null) {
            console.log(MM.format());
            this.props.setInputValue(ac_type_comm.chg_fld_val, name, MM.format());
        } else {
            this.props.setInputValue(ac_type_comm.chg_fld_val, name, null);
        }
    }
    onDateChange(a, b, m: moment.Moment) {

        if (m != null) {
            this.setState({ my_date: m.format() });
            console.log(m.format());
        } else {
            this.setState({ my_date: null });
        }
    }
    callSubmit(e: React.FormEvent) {
        e.preventDefault();
        let pp = this.props
        let ppp = pp.params;
        let field: server.MsgBoard = pp.field;
        field.a_content = CKEDITOR.instances['a_content'].getData();
        this.props.ajaxSubmit(ppp.id, pp.field, pp.edit_type);
        return;
    }

    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let field: server.MsgBoard = pp.field;

        out_html =
            (
                <form className="form form-sm" onSubmit={this.callSubmit}>
                    <h4 className="h4">住戶提問內容</h4>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">住戶編號</label>
                        <div className="col-xs-3">
                            {field.resident_no}
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right">住戶姓名</label>
                        <div className="col-xs-3">
                            {field.q_name}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">聯絡電話</label>
                        <div className="col-xs-3">
                            {field.q_tel}
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right">email</label>
                        <div className="col-xs-3">
                            {field.q_email}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">提問標題</label>
                        <div className="col-xs-7">
                            {field.q_title}
                        </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-xs-1 form-control-label text-xs-right">提問類型</label>
                        <div className="col-xs-3">
                            <RadioBox
                                inputViewMode={InputViewMode.view}
                                value={field.msg_type_id}
                                id="RadioMsg"
                                name="RadioMsg"
                                radioList={pp.type_list}
                                required={true} />
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right">提問日期</label>
                        <div className="col-xs-3">
                            {Moment(field.i_InsertDateTime).format(config.dateFT) }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">提問內容</label>
                        <div className="col-xs-4">
                            {field.q_content}
                        </div>
                    </div>
                    <h4 className="h4">問題回復</h4>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>狀態</label>
                        <div className="col-xs-4">
                            <RadioBox
                                inputViewMode={InputViewMode.edit}
                                value={field.i_Hide}
                                id="RadioIHide"
                                name="RadioIHide"
                                onChange={this.chgVal.bind(this, 'i_Hide') }
                                radioList={IHideTypeData_v2}
                                required={true} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">回覆內容</label>
                        <div className="col-xs-8">
                            <textarea type="date" className="form-control" id="a_content" name="news_content"
                                value={field.a_content} onChange={this.chgVal.bind(this, 'a_content') }></textarea>
                        </div>
                    </div>
                    <div className="form-action">
                        <div className="col-xs-offset-1">
                            <button type="submit" className="btn btn-sm btn-primary"><i className="fa-check"></i> {UIText.save}</button> { }
                            <button type="button" onClick={this.props.ajaxGridItem.bind(this, null) } className="btn btn-sm btn-secondary"><i className="fa-times"></i> {UIText.return}</button>
                        </div>
                    </div>

                </form>
            );

        return out_html;
    }
}
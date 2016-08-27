import $ = require('jquery');
import React = require('react');
import Moment = require('moment');
import {config, UIText, NewsTypeData, IHideTypeData} from '../ts-comm/def-data';
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
        CKEDITOR.replace('news_content', { customConfig: '../ckeditor/inlineConfig.js' });
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
        let field: server.News = pp.field;
        field.news_content = CKEDITOR.instances['news_content'].getData();
        this.props.ajaxSubmit(ppp.id, pp.field, pp.edit_type);
        return;
    }

    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let field: server.News = pp.field;
        let mnt_day = MntV(field.day);
        out_html =
            (
                <form className="form form-sm" onSubmit={this.callSubmit}>
                    <h4 className="h4">基本資料</h4>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  標題</label>
                        <div className="col-xs-7">
                            <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'news_title') } value={field.news_title} maxLength={128}
                                required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  類型</label>
                        <div className="col-xs-7">
                            <RadioBox
                                inputViewMode={InputViewMode.edit}
                                value={field.news_type}
                                id="RadioNewsT"
                                name="RadioNewsT"
                                onChange={this.chgVal.bind(this, 'news_type') }
                                radioList={NewsTypeData}
                                required={true} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small> 日期</label>
                        <div className="col-xs-3">
                            <DatePicker selected={mnt_day}
                                dateFormat={config.dateFT}
                                isClearable={true}
                                required={true}
                                locale="zh-TW"
                                showYearDropdown
                                minDate={Moment() }
                                onChange={this.chgDate.bind(this, 'day') }
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>狀態</label>
                        <div className="col-xs-4">
                            <RadioBox
                                inputViewMode={InputViewMode.edit}
                                value={field.i_Hide}
                                id="RadioIHide"
                                name="RadioIHide"
                                onChange={this.chgVal.bind(this, 'i_Hide') }
                                radioList={IHideTypeData}
                                required={true} />
                            {/*<div className="radio-inline">
                                <label>
                                    <input type="radio"
                                        name="i_Hide"
                                        value={true}
                                        checked={field.i_Hide === true}
                                        onChange={this.chgVal.bind(this, 'i_Hide') }
                                        />
                                    <span>隱藏</span>
                                </label>
                            </div>
                            <div className="radio-inline">
                                <label>
                                    <input type="radio"
                                        name="i_Hide"
                                        value={false}
                                        checked={field.i_Hide === false}
                                        onChange={this.chgVal.bind(this, 'i_Hide') }
                                        />
                                    <span>顯示</span>
                                </label>
                            </div>*/}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">內容</label>
                        <div className="col-xs-8">
                            <textarea type="date" className="form-control" id="news_content" name="news_content"
                                value={field.news_content} onChange={this.chgVal.bind(this, 'news_content') }></textarea>
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
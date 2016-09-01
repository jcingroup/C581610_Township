import $ = require('jquery');
import React = require('react');
import Moment = require('moment');
import {config, UIText, ISameTypeData, IHideTypeData, ITime} from '../ts-comm/def-data';
import { makeInputValue, clone, MntV, uniqid} from '../ts-comm/comm-func';
import { RadioBox, MasterImageUpload} from '../ts-comm/comm-cmpt';
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
        //CKEDITOR.replace('info', { customConfig: '../ckeditor/inlineConfig.js?v=' + uniqid() });
        CKEDITOR.replace('role_content', { customConfig: '../ckeditor/inlineConfig.js?v=' + uniqid() });
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
        let field: server.Facility = pp.field;
        //field.info = CKEDITOR.instances['info'].getData();
        field.role_content = CKEDITOR.instances['role_content'].getData();
        this.props.ajaxSubmit(ppp.id, pp.field, pp.edit_type);
        return;
    }

    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let field: server.Facility = pp.field;
        let up_img = null;
        if (pp.edit_type == IEditType.update) {
            up_img = <div className="form-group row">
                <label className="col-xs-1 form-control-label text-xs-right">代表圖</label>
                <div className="col-xs-7">
                    <MasterImageUpload FileKind="FacilityOrder"
                        MainId={field.facility_id}
                        ParentEditType={pp.edit_type}
                        url_upload={gb_approot + 'Active/ResidentInfo/axFUpload'}
                        url_list={gb_approot + 'Active/ResidentInfo/axFList'}
                        url_delete={gb_approot + 'Active/ResidentInfo/axFDelete'}
                        url_sort={gb_approot + 'Active/ResidentInfo/axFSort'} />
                    <small className="text-muted">最多可上傳 1 張圖片</small>
                </div>
            </div>;
        }

        out_html =
            (
                <form className="form form-sm" onSubmit={this.callSubmit}>
                    {up_img}
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>公設名稱</label>
                        <div className="col-xs-3">
                            <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'name') } value={field.name} maxLength={64}
                                required />
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>排序</label>
                        <div className="col-xs-3">
                            <input type="number" className="form-control" onChange={this.chgVal.bind(this, 'sort') } value={field.sort}
                                required />
                            <small className="text-muted">數字越大越前面!</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small> 可使用時間</label>
                        <div className="col-xs-3">
                            <select className="form-control" value={field.s_date}
                                onChange={this.chgVal.bind(this, 's_date') } required>
                                {
                                    ITime.map((item, i) => <option key={i} value={item.id}>{item.label}</option>)
                                }
                            </select>
                        </div>
                        <span className="col-xs-1 form-control-label text-xs-center">~</span>
                        <div className="col-xs-3">
                            <select className="form-control" value={field.e_date}
                                onChange={this.chgVal.bind(this, 'e_date') } required>
                                {
                                    ITime.map((item, i) => <option key={i} value={item.id}>{item.label}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>同時申請</label>
                        <div className="col-xs-3">
                            <RadioBox
                                inputViewMode={InputViewMode.edit}
                                value={field.same}
                                id="RadioSame"
                                name="RadioSame"
                                onChange={this.chgVal.bind(this, 'same') }
                                radioList={ISameTypeData}
                                required={true} />
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>狀態</label>
                        <div className="col-xs-3">
                            <RadioBox
                                inputViewMode={InputViewMode.edit}
                                value={field.i_Hide}
                                id="RadioHide"
                                name="RadioHide"
                                onChange={this.chgVal.bind(this, 'i_Hide') }
                                radioList={IHideTypeData}
                                required={true} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">簡介</label>
                        <div className="col-xs-8">
                        <textarea type="date" className="form-control" id="info" name="info" rows={5}
                                value={field.info} onChange={this.chgVal.bind(this, 'info') }></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">使用規則</label>
                        <div className="col-xs-8">
                            <textarea type="date" className="form-control" id="role_content" name="role_content"
                                value={field.role_content} onChange={this.chgVal.bind(this, 'role_content') }></textarea>
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
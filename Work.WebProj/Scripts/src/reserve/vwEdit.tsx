import $ = require('jquery');
import React = require('react');
import Moment = require('moment');
import {config, UIText, IReserveStateData, IReserveStateData_v2} from '../ts-comm/def-data';
import { makeInputValue, clone, MntV} from '../ts-comm/comm-func'
import { RadioBox} from '../ts-comm/comm-cmpt'
import {ac_type_comm} from '../action_type';

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
        let field: server.Reserve = pp.field;
        this.props.ajaxSubmit(ppp.id, pp.field, pp.edit_type);
        return;
    }

    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let field: server.Reserve = pp.field;

        out_html =
            (
                <form className="form form-sm" onSubmit={this.callSubmit}>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">住戶編號</label>
                        <div className="col-xs-3">
                            <span className="text-primary text-sm">{field.resident_no}</span>
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right">住戶名稱</label>
                        <div className="col-xs-3">
                            <span className="text-primary text-sm">{field.name}</span>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">預約項目</label>
                        <div className="col-xs-7">
                            <span className="text-primary text-sm">{field.facility_name}</span>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">預約日期</label>
                        <div className="col-xs-3">
                            <span className="text-primary text-sm">{Moment(field.day).format(config.dateFT) } {field.s_time}~{field.e_time}</span>
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right">使用人數</label>
                        <div className="col-xs-3">
                            <span className="text-primary text-sm">{field.person} 人</span>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>狀態</label>
                        <div className="col-xs-6">
                            <RadioBox
                                inputViewMode={field.state == -2 ? InputViewMode.view : InputViewMode.edit}
                                value={field.state}
                                id="RadioIHide"
                                name="RadioIHide"
                                onChange={this.chgVal.bind(this, 'state') }
                                radioList={field.state == -2 ? IReserveStateData : IReserveStateData_v2}
                                required={true}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right">失敗原因</label>
                        <div className="col-xs-7">
                            <input type="text" className="form-control" value={field.fail_info} onChange={this.chgVal.bind(this, 'fail_info') } required={field.state == -1} />
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
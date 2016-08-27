import $ = require('jquery');
import React = require('react');
import Moment = require('moment');
import {config, UIText} from '../ts-comm/def-data';
import { makeInputValue, clone, MntV} from '../ts-comm/comm-func'

//import {InputText, SelectText, PWButton, AreaText} from '../components';
import {ac_type_comm} from '../action_type';

export class Edit extends React.Component<any, any>{

    constructor() {
        super();

        this.chgVal = this.chgVal.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.callSubmit = this.callSubmit.bind(this);

        this.state = {
        };
    }
    chgVal(name: string, e: React.SyntheticEvent) {
        let value = makeInputValue(e);
        this.props.setInputValue(ac_type_comm.chg_fld_val, name, value);
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
        this.props.ajaxSubmit(ppp.id, pp.field, pp.edit_type);
        return;
    }
    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let field: server.Resident = pp.field;
        out_html =
            (
                <form className="form form-sm" onSubmit={this.callSubmit}>
                    <h4 className="h4">編輯器管理</h4>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  住戶編號</label>
                        <div className="col-xs-7">
                            <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'resident_no') } value={field.resident_no} maxLength={64}
                                required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  住戶名稱</label>
                        <div className="col-xs-7">
                            <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'resident_name') } value={field.resident_name} maxLength={64}
                                required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small> 登入帳號</label>
                        <div className="col-xs-3">
                            <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'account') } value={field.account} maxLength={64} disabled={pp.edit_type == IEditType.update}
                                required />
                            <small className="text-muted">登入帳號與其他住戶不可重複!</small>
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small> 登錄密碼</label>
                        <div className="col-xs-3">
                            <input type="password" className="form-control"
                                onChange={this.chgVal.bind(this, 'passwd') }
                                value={field.passwd}
                                maxLength={64}
                                required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  email</label>
                        <div className="col-xs-7">
                            <input type="email" className="form-control" onChange={this.chgVal.bind(this, 'email') } value={field.email} maxLength={50}
                                required />
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
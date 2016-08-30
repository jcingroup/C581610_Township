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

        this.chgVal = this.chgVal.bind(this);
        this.callSubmit = this.callSubmit.bind(this);

        this.state = {
        };
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
    callSubmit(e: React.FormEvent) {
        e.preventDefault();
        let pp = this.props
        let ppp = pp.params;
        let field: server.News = pp.field;
        this.props.ajaxSubmit(ppp.id, pp.field, pp.edit_type);
        return;
    }

    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let field: server.MsgType = pp.field;
        out_html =
            (
                <form className="form form-sm" onSubmit={this.callSubmit}>
                    <h4 className="h4">基本資料</h4>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  名稱</label>
                        <div className="col-xs-7">
                        <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'name') } value={field.name} maxLength={64}
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
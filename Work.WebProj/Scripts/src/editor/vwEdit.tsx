import React = require('react');
import Moment = require('moment');
import {config, UIText, IHideTypeData} from '../ts-comm/def-data';
import { makeInputValue, clone, MntV} from '../ts-comm/comm-func'
import { RadioBox} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';
import {EditDetailView} from './containers';

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
        let field: server.Editor = pp.field;
        out_html =
            (
                <form className="form form-sm" onSubmit={this.callSubmit}>
                    <h4 className="h4">主檔</h4>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small> 名稱 </label>
                        <div className="col-xs-7">
                            <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'name') } value={field.name} maxLength={64}
                                required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"> BodyClass</label>
                        <div className="col-xs-3">
                            <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'body_class') } value={field.body_class} maxLength={64} />
                        </div>
                        <label className="col-xs-1 form-control-label text-xs-right"> Url</label>
                        <div className="col-xs-3">
                            <input type="text" className="form-control" onChange={this.chgVal.bind(this, 'url') } value={field.url} maxLength={64}  />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-xs-1 form-control-label text-xs-right"><small className="text-danger">*</small>  sort</label>
                        <div className="col-xs-3">
                            <input type="number" className="form-control" onChange={this.chgVal.bind(this, 'sort') } value={field.sort}
                                required />
                            <small className="text-muted">數字越大越前面!</small>
                        </div>
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
                        </div>
                    </div>

                    <EditDetailView />

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
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

                    <EditDetailView />

                    <div className="form-action">
                        <div className="col-xs-offset-1">
                            <button type="submit" className="btn btn-sm btn-primary"><i className="fa-check"></i> {UIText.save}</button> { }
                        </div>
                    </div>

                </form>
            );

        return out_html;
    }
}
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
        //this.props.callSubmit(ppp.ENCustId, ppp.YY, ppp.item, pp.field, pp.edit_type);
        this.props.callSubmit(ppp.item, pp.field, pp.edit_type);
        return;
    }
    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let field: server.Resident = pp.field;
        out_html =
            (
                <form onSubmit={this.callSubmit}>
                edit
                </form>
            );

        return out_html;
    }
}
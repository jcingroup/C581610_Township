import React = require('react');
import Moment = require('moment');

//import {ReportEditView} from './containers';

export class AStart extends React.Component<any, any>{

    constructor() {
        super();
        this.state = {};
    }

    render() {
        let out_html: JSX.Element = null;

        out_html =
            (
            <div>
                你好
                </div>
            );

        return out_html;
    }
}
import React = require('react');
import Moment = require('moment');
import {config, UIText} from '../ts-comm/def-data';
import {PWButton} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';

interface GridSearchProps {
    search: any,
    changeSearchVal: Function
}

export class GridSearch extends React.Component<GridSearchProps, any>{

    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let search = pp.search;

        out_html =
            (
                <div className="table-responsive">
                    <div className="table-header">
                        <div className="table-filter">
                            <div className="form-inline">
                                <div className="form-group">
                                    <label className="sr-only">搜尋名稱</label> { }
                                    <input type="text" className="form-control form-control-sm"
                                    value={search.keyword}
                                    onChange= {pp.changeSearchVal.bind(this, 'keyword') }
                                    placeholder="名稱" /> { }
                                    <PWButton
                                    className="btn btn-sm btn-primary"
                                    iconClassName="fa-search"
                                    type="submit"
                                    enable={true}>搜尋</PWButton> { }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        return out_html;
    }
}
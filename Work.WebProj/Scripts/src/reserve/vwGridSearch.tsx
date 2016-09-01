import React = require('react');
import Moment = require('moment');
import {config, UIText} from '../ts-comm/def-data';
import {PWButton} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';

interface GridSearchProps {
    search: any,
    changeSearchVal: Function,
    init_list: Array<server.StateTemplate>
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
        let list = pp.init_list == undefined ? [] : pp.init_list;
        out_html =
            (
                <div className="table-responsive">
                    <div className="table-header">
                        <div className="table-filter">
                            <div className="form-inline">
                                <div className="form-group">
                                    <label className="sr-only">搜尋住戶名稱</label> { }
                                    <input type="text" className="form-control form-control-sm"
                                        value={search.keyword}
                                        onChange= {pp.changeSearchVal.bind(this, 'keyword') }
                                        placeholder="住戶名稱" /> { }
                                    <label className="sr-only">搜尋類型</label> { }
                                    <select className="form-control form-control-sm"
                                    value={search.facility_id} onChange= {pp.changeSearchVal.bind(this, 'facility_id') }>
                                        <option value="" defaultValue="">選擇預約項目</option>
                                        {
                                            list.map((item, i) => {
                                                return <option key={i} value={item.id}>{item.label}</option>;
                                            })
                                        }
                                    </select> { }
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
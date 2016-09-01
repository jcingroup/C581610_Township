import React = require('react');
import Moment = require('moment');
import {config, UIText, IReserveStateData} from '../ts-comm/def-data';
import {PWButton, RadioBox} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';


const Rows = ({ item, clickItemDel, clickItemEdit, type_list}: { item: server.Reserve, clickItemDel: Function, clickItemEdit: Function, type_list: Array<server.StateTemplate> }) => {
    let delete_html = null;
    if (gb_roles == 'Admins') {
        delete_html = <td className="text-xs-center"><PWButton iconClassName="fa-times" className="btn-link btn-lg text-danger" enable={true} onClick={clickItemDel} /></td>;
    }
    return (
        <tr>
            {delete_html}
            <td className="text-xs-center"><PWButton iconClassName="fa-search-plus" className="btn-link btn-lg" enable={true} onClick={clickItemEdit} /></td>
            <td>{item.facility_name}</td>
            <td className="text-xs-center">{Moment(item.day).format(config.dateFT) + " " + item.s_time + "~" + item.e_time }</td>
            <td className="text-xs-center">{item.person}</td>
            <td className="text-xs-center">{item.resident_no}</td>
            <td className="text-xs-center">{item.name}</td>
            <td className="text-xs-center">
                <RadioBox
                    inputViewMode={InputViewMode.view}
                    value={item.state}
                    id="RadioIHide"
                    name="RadioIHide"
                    radioList={IReserveStateData} />
            </td>
        </tr>
    )
}
interface GridTableProps {
    grid: Array<server.Reserve>;
    type_list: Array<server.StateTemplate>;
    clickItemDel?: Function;
    clickItemEdit: Function;
}
export class GridTable extends React.Component<GridTableProps, any>{

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let type_list = pp.type_list == undefined ? [] : pp.type_list;
        let delete_html = null;
        if (gb_roles == 'Admins') {
            delete_html = <th style={{ "width": "7%" }} className="text-xs-center">{UIText.delete}</th>;
        }
        out_html =
            (
                <table className="table table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            {delete_html}
                            <th style={{ "width": "10%" }} className="text-xs-center">{UIText.check}</th>
                            <th style={{ "width": "10%" }}>預約項目</th>
                            <th style={{ "width": "18%" }} className="text-xs-center">預約日期</th>
                            <th style={{ "width": "10%" }} className="text-xs-center">使用人數</th>
                            <th style={{ "width": "10%" }} className="text-xs-center">住戶編號</th>
                            <th style={{ "width": "14%" }} className="text-xs-center">住戶名稱</th>
                            <th style={{ "width": "14%" }} className="text-xs-center">預約結果</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pp.grid.map(
                            (item, i) =>
                                <Rows
                                    key={item.reserve_id}
                                    item={item}
                                    clickItemDel={this.props.clickItemDel.bind(this, item.reserve_id) }
                                    clickItemEdit={this.props.clickItemEdit.bind(this, item.reserve_id) }
                                    type_list={type_list}
                                    />
                        ) }
                    </tbody>
                </table>
            );

        return out_html;
    }
}
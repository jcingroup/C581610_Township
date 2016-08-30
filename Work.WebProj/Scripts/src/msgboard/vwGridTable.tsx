import React = require('react');
import Moment = require('moment');
import {config, UIText, NewsTypeData, MsgTypeData} from '../ts-comm/def-data';
import {PWButton, RadioBox} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';


const Rows = ({ item, clickItemDel, clickItemEdit, type_list}: { item: server.MsgBoard, clickItemDel: Function, clickItemEdit: Function, type_list: Array<server.StateTemplate> }) => {
    return (
        <tr>
            <td className="text-xs-center"><PWButton iconClassName="fa-times" className="btn-link btn-lg text-danger" enable={true} onClick={clickItemDel} /></td>
            <td className="text-xs-center"><PWButton iconClassName="fa-pencil" className="btn-link btn-lg" enable={true} onClick={clickItemEdit} /></td>
            <td>{item.q_content}</td>
            <td className="text-xs-center">
                <RadioBox
                    inputViewMode={InputViewMode.view}
                    value={item.msg_type_id}
                    id="RadioType"
                    name="RadioType"
                    radioList={type_list} />
            </td>
            <td className="text-xs-center">{Moment(item.i_InsertDateTime).format(config.dateFT) }</td>
            <td className="text-xs-center">
                <RadioBox
                    inputViewMode={InputViewMode.view}
                    value={item.state}
                    id="RadioIHide"
                    name="RadioIHide"
                    radioList={MsgTypeData} />
            </td>
        </tr>
    )
}
interface GridTableProps {
    grid: Array<server.MsgBoard>;
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
        out_html =
            (
                <table className="table table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style={{ "width": "7%" }} className="text-xs-center">{UIText.delete}</th>
                            <th style={{ "width": "7%" }} className="text-xs-center">{UIText.modify}</th>
                            <th style={{ "width": "40%" }}>標題</th>
                            <th style={{ "width": "16%" }} className="text-xs-center">類型</th>
                            <th style={{ "width": "15%" }} className="text-xs-center">日期</th>
                            <th style={{ "width": "15%" }} className="text-xs-center">狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pp.grid.map(
                            (item, i) =>
                                <Rows
                                    key={item.msg_board_id}
                                    item={item}
                                    clickItemDel={this.props.clickItemDel.bind(this, item.msg_board_id) }
                                    clickItemEdit={this.props.clickItemEdit.bind(this, item.msg_board_id) }
                                    type_list={type_list}
                                    />
                        ) }
                    </tbody>
                </table>
            );

        return out_html;
    }
}
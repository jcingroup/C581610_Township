import React = require('react');
import Moment = require('moment');
import {config, UIText, NewsTypeData, IHideTypeData} from '../ts-comm/def-data';
import {PWButton, RadioBox} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';


const Rows = ({ item, clickItemDel, clickItemEdit}: { item: server.MsgType, clickItemDel: Function, clickItemEdit: Function }) => {
    return (
        <tr>
            <td className="text-xs-center"><PWButton iconClassName="fa-times" className="btn-link btn-lg text-danger" enable={true} onClick={clickItemDel} /></td>
            <td className="text-xs-center"><PWButton iconClassName="fa-pencil" className="btn-link btn-lg" enable={true} onClick={clickItemEdit} /></td>
            <td>{item.name}</td>
        </tr>
    )
}
interface GridTableProps {
    grid: Array<server.MsgType>;
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

        out_html =
            (
                <table className="table table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style={{ "width": "7%" }} className="text-xs-center">{UIText.delete}</th>
                            <th style={{ "width": "7%" }} className="text-xs-center">{UIText.modify}</th>
                            <th style={{ "width": "86%" }}>名稱</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pp.grid.map(
                            (item, i) =>
                                <Rows
                                    key={item.msg_type_id}
                                    item={item}
                                    clickItemDel={this.props.clickItemDel.bind(this, item.msg_type_id) }
                                    clickItemEdit={this.props.clickItemEdit.bind(this, item.msg_type_id) }
                                    />
                        ) }
                    </tbody>
                </table>
            );

        return out_html;
    }
}
import React = require('react');
import Moment = require('moment');
import {config, UIText, IHideTypeData} from '../ts-comm/def-data';
import {PWButton, RadioBox} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';


const Rows = ({ item, clickItemDel, clickItemEdit}: { item: server.Editor_L2, clickItemDel: Function, clickItemEdit: Function }) => {

    return (
        <tr>
            <td className="text-xs-center"><PWButton iconClassName="fa-times" className="btn-link btn-lg text-danger" enable={true} onClick={clickItemDel} /></td>
            <td className="text-xs-center"><PWButton iconClassName="fa-pencil" className="btn-link btn-lg" enable={true} onClick={clickItemEdit} /></td>
            <td>{item.l2_name}</td>
            <td>{item.sort}</td>
            <td>
                <RadioBox
                    inputViewMode={InputViewMode.view}
                    value={item.i_Hide}
                    id="RadioIHide"
                    name="RadioIHide"
                    radioList={IHideTypeData} />
            </td>
        </tr>
    )
}
interface GridTableProps {
    grid: Array<server.Editor_L2>;
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
                            <th style={{ "width": "20%" }}>名稱</th>
                            <th style={{ "width": "20%" }}>排序</th>
                            <th style={{ "width": "20%" }}>狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pp.grid.map(
                            (item, i) =>
                                <Rows
                                    key={item.editor_l2_id}
                                    item={item}
                                    clickItemDel={this.props.clickItemDel.bind(this, item.editor_l2_id) }
                                    clickItemEdit={this.props.clickItemEdit.bind(this, item.editor_l2_id) }
                                    />
                        ) }
                    </tbody>
                </table>
            );

        return out_html;
    }
}
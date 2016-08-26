import React = require('react');
import Moment = require('moment');
import {config, UIText} from '../ts-comm/def-data';
import {PWButton} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';


const Rows = ({ item, clickItemDel, clickItemEdit}: { item: server.Resident, clickItemDel: Function, clickItemEdit: Function }) => {

    return (
        <tr>
            <td className="text-xs-center"><PWButton iconClassName="fa-times" className="btn-link btn-lg text-danger" enable={true} onClick={clickItemDel} /></td>
            <td className="text-xs-center"><PWButton iconClassName="fa-pencil" className="btn-link btn-lg" enable={true} onClick={clickItemEdit} /></td>
            <td>{item.resident_no}</td>
            <td>{item.resident_name}</td>
            <td>{item.account}</td>
            <td>{item.passwd}</td>
        </tr>
    )
}
interface GridTableProps {
    grid: Array<server.Resident>;
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
                            <th style={{ "width": "16%" }}>住戶編號</th>
                            <th style={{ "width": "30%" }}>住戶名稱</th>
                            <th style={{ "width": "20%" }}>帳號</th>
                            <th style={{ "width": "20%" }}>密碼</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pp.grid.map(
                            (item, i) =>
                                <Rows
                                    key={item.resident_id}
                                    item={item}
                                    clickItemDel={this.props.clickItemDel.bind(this, item.resident_id) }
                                    clickItemEdit={this.props.clickItemEdit.bind(this, item.resident_id) }
                                    />
                        ) }
                    </tbody>
                </table>
            );

        return out_html;
    }
}
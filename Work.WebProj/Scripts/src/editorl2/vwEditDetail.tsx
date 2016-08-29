import $ = require('jquery');
import React = require('react');
import Moment = require('moment');
import ReactBootstrap = require("react-bootstrap");
import {config, UIText, IHideTypeData} from '../ts-comm/def-data';
import { makeInputValue, clone, MntV} from '../ts-comm/comm-func'
import { RadioBox} from '../ts-comm/comm-cmpt';

import {ac_type_comm} from '../action_type';

interface DetailFieldProps {
    key: any,
    iKey: number,
    field: server.Editor_L3,
    chgDVal?: Function,
    delItem?: Function
}
export class DetailField extends React.Component<DetailFieldProps, any>{
    constructor() {
        super()
        this.componentDidMount = this.componentDidMount.bind(this);
        this.chgDetailVal = this.chgDetailVal.bind(this);
        this.setEditor = this.setEditor.bind(this);
        this.state = {
            open: true,
            editorObj: null
        }
    }
    static defaultProps = {
        key: 0,
        field: {}
    }
    componentDidMount() {
        this.setEditor('content-' + this.props.iKey, this.props.iKey);
    }
    chgDetailVal(name: string, e: React.SyntheticEvent) {
        let value = makeInputValue(e);
        this.props.chgDVal(ac_type_comm.chg_dil_fld_val, this.props.iKey, name, value);
    }
    setEditor(editorName: string, iKey) {
        let editorObj = this.state.editorObj, _this = this;

        editorObj = CKEDITOR.replace(editorName, { customConfig: '../ckeditor/inlineConfig.js' });
        editorObj.on('change', function (evt) {
            _this.props.chgDVal(ac_type_comm.chg_dil_fld_val, iKey, 'l3_content', editorObj.getData());
        }.bind(this));
    }
    render() {
        let out_html = null;
        let Collapse = ReactBootstrap.Collapse;
        let pp = this.props;
        let field = pp.field;
        out_html = (
            <div className="card" data-id={pp.key}>
                <div className="card-header">
                    <ul className="list-inline clearfix m-b-0">
                        <li className="pull-xs-left"><strong># {pp.iKey}</strong></li>
                        <li className="pull-xs-right m-l-1"><button className="btn btn-link text-sm text-danger" type="button" title={UIText.delete} onClick={this.props.delItem} ><i className="fa-times"></i> 刪除</button></li>
                        <li className="pull-xs-right"><button onClick={() => this.setState({ open: !this.state.open }) } type="button" className="btn btn-link text-sm text-muted"><i className="fa-chevron-down"></i> 收合/展開</button></li>
                    </ul>
                </div>
                <Collapse in={this.state.open}>
                    <div className="card-block">
                        <div className="form-group row">
                            <label className="col-xs-1 form-control-label text-xs-right"> 名稱</label>
                            <div className="col-xs-3">
                                <input type="text" className="form-control" onChange={this.chgDetailVal.bind(this, 'l3_name') } value={field.l3_name} maxLength={64} required/>
                                <small className="text-muted">最多64字!</small>
                            </div>
                            <label className="col-xs-1 form-control-label text-xs-right"> 排序</label>
                            <div className="col-xs-3">
                                <input type="number" className="form-control" onChange={this.chgDetailVal.bind(this, 'sort') } value={field.sort} maxLength={64} required />
                                <small className="text-muted">數字越大越前面!</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-12">
                                <textarea type="date" rows={4} className="form-control" id={'content-' + this.props.iKey} name={'content-' + this.props.iKey}
                                    value={field.l3_content} onChange={this.chgDetailVal.bind(this, 'l3_content') }></textarea>
                            </div>
                        </div>
                    </div>
                </Collapse>


            </div>
        );
        return out_html;
    }
}
export class EditDetail extends React.Component<any, any>{

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);

        this.addDetail = this.addDetail.bind(this);
        this.delDetail = this.delDetail.bind(this);
        this.chgVal = this.chgVal.bind(this);

        this.state = {
        };
    }
    componentDidMount() {
        this.props.ajaxGridDetailItem(this.props.params.id);
    }
    chgVal(name: string, e: React.SyntheticEvent) {
        let value = makeInputValue(e);
        this.props.setInputValue(ac_type_comm.chg_fld_val, name, value);
    }
    addDetail(e: React.SyntheticEvent) {
        let item: server.Editor_L3 = {
            editor_l1_id: gb_id,
            editor_l2_id: this.props.params.id,
            editor_l3_id: 0,
            l3_name: '',
            l3_content: '',
            sort: 0,
            i_Hide: false,
            edit_state: IEditType.insert
        };
        this.props.addDeatilState(item);
    }
    delDetail(i: number, id: number, edit_state: IEditType, e: React.SyntheticEvent) {
        if (!confirm('確定是否刪除?')) {
            return;
        }
        this.props.ajaxDelDetail(i, id, edit_state);
    }
    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let detail: Array<server.Editor_L3> = pp.field.Editor_L3 == undefined ? [] : pp.field.Editor_L3;

        if (pp.edit_type == IEditType.update) {
            out_html =
                (
                    <div>
                        <h4 className="h4">明細檔</h4>
                        <p>
                        <button className="btn btn-sm btn-success" type="button" onClick={this.addDetail.bind(this) }>
                            <i className="fa-plus-circle"></i> {UIText.add}
                            </button>
                        </p>
                        <div ref="SortForm" id="SortForm">
                            {
                                detail.map((item, i) => {
                                return <DetailField
                                    key={i + '-' + item.editor_l3_id}
                                        iKey={i}
                                        field={item}
                                        chgDVal={this.props.setDetailInputValue}
                                        delItem={this.delDetail.bind(this, i, item.editor_l3_id, item.edit_state) }/>;
                                })
                            }
                        </div>
                    </div>
                );
        }

        return out_html;
    }
}
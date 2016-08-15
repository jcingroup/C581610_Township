import $ = require('jquery');
import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import Moment = require('moment');
import ReactBootstrap = require("react-bootstrap");
import dt = require('dt');
import DatePicker = require('react-datepicker');
import { OrderButton } from '../ts-comm/OrderButton';
import { jqGet, jqPost, jqPut, jqDelete, showAjaxError, MntV, tosMessage } from '../ts-comm/comm-func';
import { GridButtonModify, GridButtonDel, GridNavPage, GridCheckDel, MasterImageUpload, TwAddress} from '../ts-comm/comm-cmpt';
import "../../../Content/css/react-datepicker.css";

namespace Matter {
    interface Rows {
        check_del: boolean,
        matter_id: number,
        matter_name: string,
        sn: string,
        community_name: string
    }
    interface GirdFormState<G, F> extends BaseDefine.GirdFormStateBase<G, F> {
        searchData?: {
            keyword: string
        },
        options_community?: Array<server.Community>
    }
    interface IDName {
        id: number | string //數字型用id 字串型用no
    }
    interface CallResult extends IResultBase, IDName { }

    class GridRow extends React.Component<BaseDefine.GridRowPropsBase2<Rows>, BaseDefine.GridRowStateBase> {
        constructor() {
            super();
            //this.delCheck = this.delCheck.bind(this);
            this.modify = this.modify.bind(this);
        }
        static defaultProps = {
        }
        //delCheck(i, chd) {
        //    this.props.delCheck(i, chd);
        //}
        modify() {
            this.props.updateType(this.props.primKey)
        }
        render() {
            return <tr>
                <td className="text-xs-center">
                    <GridButtonDel
                        removeItemSubmit={this.props.removeItemSubmit}
                        primKey={this.props.primKey} />
                </td>
                <td className="text-xs-center">
                    <GridButtonModify modify={this.modify}/>
                </td>
                <td>{this.props.itemData.sn}</td>
                <td>{this.props.itemData.community_name}</td>
                <td>{this.props.itemData.matter_name}</td>
            </tr>;
        }
    }
    export class GirdForm extends React.Component<BaseDefine.GridFormPropsBase, GirdFormState<Rows, server.Matter>>{

        constructor() {

            super();
            this.updateType = this.updateType.bind(this);
            this.noneType = this.noneType.bind(this);
            this.queryGridData = this.queryGridData.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleSearch = this.handleSearch.bind(this);
            this.removeItemSubmit = this.removeItemSubmit.bind(this);

            this.deleteSubmit = this.deleteSubmit.bind(this);
            this.delCheck = this.delCheck.bind(this);
            this.checkAll = this.checkAll.bind(this);

            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentDidUpdate = this.componentDidUpdate.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);
            this.changeAddress = this.changeAddress.bind(this);
            this.setSort = this.setSort.bind(this);
            this.insertType = this.insertType.bind(this);
            this.state = {
                fieldData: null,
                gridData: {
                    rows: [],
                    page: 1,
                    field: 'matter_name',
                    sort: 'asc'
                },
                edit_type: 0,
                searchData: { keyword: null },
                editPrimKey: null,
                options_community: []
            };

        }

        static defaultProps: BaseDefine.GridFormPropsBase = {
            fdName: 'fieldData',
            gdName: 'searchData',
            apiPath: gb_approot + 'api/Matter'
        }
        componentDidMount() {
            //init component data
            jqGet(gb_approot + 'Api/GetAction/GetOptionsCommunity', {})
                .done((data: Array<server.Community>) => {
                    //console.log(data);
                    this.setState({ options_community: data });

                })

            this.queryGridData(1);
        }
        componentDidUpdate(prevProps, prevState) {
            if ((prevState.edit_type == IEditType.none && (this.state.edit_type == IEditType.insert || this.state.edit_type == IEditType.update))) {
                CKEDITOR.replace('context_life', { customConfig: '../ckeditor/inlineConfig.js' });
            }
        }
        componentWillUnmount() {
            //元件被從 DOM 卸載之前執行，通常我們在這個方法清除一些不再需要地物件或 timer。
        }
        gridData(page: number) {

            var parms = {
                page: page == 0 ? this.state.gridData.page : page,
                sort: this.state.gridData.sort,
                field: this.state.gridData.field
            };
            $.extend(parms, this.state.searchData);

            return jqGet(this.props.apiPath, parms);
        }

        setSort(field, sort) {

            var parms = {
                page: this.state.gridData.page,
                sort: sort,
                field: field
            };
            $.extend(parms, this.state.searchData);

            return jqGet(this.props.apiPath, parms)
                .done((data, textStatus, jqXHRdata) => {
                    if (data.records == 0) {
                        tosMessage(null, '無任何資料', ToastrType.warning);
                    }

                    this.setState({ gridData: data });
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    showAjaxError(errorThrown);
                });;

        }

        queryGridData(page: number) {
            this.gridData(page)
                .done((data, textStatus, jqXHRdata) => {
                    if (data.records == 0) {
                        tosMessage(null, '無任何資料', ToastrType.warning);
                    }
                    this.setState({ gridData: data });
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    showAjaxError(errorThrown);
                });
        }
        handleSubmit(e: React.FormEvent) {
            e.preventDefault();

            this.state.fieldData.context_life = CKEDITOR.instances['context_life'].getData();
            if (this.state.edit_type == 1) {
                jqPost(this.props.apiPath, this.state.fieldData)
                    .done((data: CallResult, textStatus, jqXHRdata) => {
                        if (data.result) {
                            tosMessage(null, '新增完成', 1);
                            this.updateType(data.id);
                        } else {
                            alert(data.message);
                        }
                    })
                    .fail((jqXHR, textStatus, errorThrown) => {
                        showAjaxError(errorThrown);
                    });
            }
            else if (this.state.edit_type == 2) {

                var packData = { id: this.state.editPrimKey, md: this.state.fieldData };

                $.ajax(
                    {
                        type: "PUT",
                        url: this.props.apiPath,
                        data: packData,
                        dataType: 'json',
                        cache: false
                    }).done((data, textStatus, jqXHRdata) => {
                        if (data.result) {
                            tosMessage(null, '修改完成', 1);
                        } else {
                            alert(data.message);
                        }
                    })
                    .fail((jqXHR, textStatus, errorThrown) => {
                        showAjaxError(errorThrown);
                    });
            };
            return;
        }
        deleteSubmit() {
            if (!confirm('確定是否刪除?')) {
                return;
            }

            var ids = [];
            for (var i in this.state.gridData.rows) {
                if (this.state.gridData.rows[i].check_del) {
                    ids.push('ids=' + this.state.gridData.rows[i].matter_id);
                }
            }

            if (ids.length == 0) {
                tosMessage(null, '未選擇刪除項', 2);
                return;
            }

            jqDelete(this.props.apiPath + '?' + ids.join('&'), {})
                .done(function (data, textStatus, jqXHRdata) {
                    if (data.result) {
                        tosMessage(null, '刪除完成', 1);
                        this.queryGridData(0);
                    } else {
                        alert(data.message);
                    }
                }.bind(this))
                .fail(function (jqXHR, textStatus, errorThrown) {
                    showAjaxError(errorThrown);
                });
        }
        removeItemSubmit(primKey) {
            if (!confirm('確定是否刪除?')) {
                return;
            }

            jqDelete(this.props.apiPath, { id: primKey })
                .done(function (data, textStatus, jqXHRdata) {
                    if (data.result) {
                        tosMessage(null, '刪除完成', 1);
                        this.queryGridData(0);
                    } else {
                        alert(data.message);
                    }
                }.bind(this))
                .fail(function (jqXHR, textStatus, errorThrown) {
                    showAjaxError(errorThrown);
                });
        }

        handleSearch(e: React.FormEvent) {
            e.preventDefault();
            this.queryGridData(0);
            return;
        }
        delCheck(i: number, chd: boolean) {
            let newState = this.state;
            this.state.gridData.rows[i].check_del = !chd;
            this.setState(newState);
        }
        checkAll() {

            let newState = this.state;
            newState.checkAll = !newState.checkAll;
            for (var prop in this.state.gridData.rows) {
                this.state.gridData.rows[prop].check_del = newState.checkAll;
            }
            this.setState(newState);
        }
        insertType() {
            // Inset data default value
            this.setState({
                edit_type: IEditType.insert,
                fieldData: {
                    state: 'A'
                }
            });
        }
        updateType(id: number | string) {
            var idPack: IDName = { id: id }
            jqGet(this.props.apiPath, idPack)
                .done((data, textStatus, jqXHRdata) => {
                    this.setState({
                        edit_type: IEditType.update,
                        fieldData: data.data,
                        editPrimKey: id
                    });
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    showAjaxError(errorThrown);
                });
        }
        noneType() {
            this.gridData(0)
                .done((data, textStatus, jqXHRdata) => {
                    this.setState({ edit_type: IEditType.none, gridData: data, editPrimKey: null });
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    showAjaxError(errorThrown);
                });
        }
        changeFDValue(name: string, e: React.SyntheticEvent) {
            this.setEventValue(this.props.fdName, name, e);
        }
        changeGDValue(name: string, e: React.SyntheticEvent) {
            this.setEventValue(this.props.gdName, name, e);
        }
        setEventValue(collentName: string, name: string, e: React.SyntheticEvent) {
            let input: HTMLInputElement = e.target as HTMLInputElement;
            let value;

            if (input.value == 'true') {
                value = true;
            } else if (input.value == 'false') {
                value = false;
            } else {
                value = input.value;
            }
            var objForUpdate = {
                [collentName]:
                {
                    [name]: { $set: value }
                }
            };
            var newState = update(this.state, objForUpdate);
            this.setState(newState);
        }
        setInputValue(collentName: string, name: string, v: any) {
            var objForUpdate = {
                [collentName]:
                {
                    [name]: { $set: v }
                }
            };
            var newState = update(this.state, objForUpdate);
            this.setState(newState);
        }
        setInputValueMuti(collentName: string, name: Array<string>, v: Array<any>) {

            var objForUpdate = { [collentName]: {} };

            for (var i = 0; i < name.length; i++) {
                var item = name[i];
                var value = v[i];
                objForUpdate[collentName][item] = { $set: value }
            }

            var newState = update(this.state, objForUpdate);
            this.setState(newState);
        }
        changeAddress(data, e) {
            if (data.type == 1) {

            }
            if (data.type == 2) {
                this.setInputValue(this.props.fdName, 'city', data.city_value);
            }
            if (data.type == 3) {
                this.setInputValueMuti(this.props.fdName, ['zip', 'country'], [data.zip_value, data.country_value]);
            }
            if (data.type == 4) {
                this.setInputValue(this.props.fdName, 'address', data.address_value);
            }
        }

        setChangeDate(collentName: string, name: string, date: moment.Moment) {

            var v = date == null ? null : date.format();
            var objForUpdate = {
                [collentName]:
                {
                    [name]: {
                        $set: v
                    }
                }
            };
            var newState = update(this.state, objForUpdate);
            this.setState(newState);
        }

        render() {

            var outHtml: JSX.Element = null;
            //var GridNavPage = GridNavPage;

            if (this.state.edit_type == IEditType.none) {
                var search = this.state.searchData;
                outHtml =
                    (
                        <div>
                            <ul className="breadcrumb">
                                <li>
                                    <i className="fa-caret-right"></i> { }
                                    {this.props.menuName}
                                </li>
                                <li>
                                    <i className="fa-angle-right"></i> { }
                                    {this.props.caption}
                                </li>
                            </ul>
                            <h3 className="h3">
                                {this.props.caption}
                            </h3>
                            <form onSubmit={this.handleSearch}>
                                <div className="table-responsive">
                                    <div className="table-header">
                                        <div className="table-filter">
                                            <div className="form-inline">
                                                <div className="form-group">
                                                    <label className="sr-only">搜尋物件</label> { }
                                                    <input type="text" className="form-control form-control-sm" onChange={this.changeGDValue.bind(this, 'keyword') } value={this.state.searchData.keyword} placeholder="物件名稱" /> { }
                                                    <button className="btn btn-primary btn-sm" type="submit"><i className="fa-search"></i> 搜尋</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-sm table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-xs-center">刪除</th>
                                                <th className="text-xs-center">修改</th>
                                                <th>
                                                    <OrderButton
                                                        title="編號"
                                                        field={'sn'}
                                                        sort={this.state.gridData.sort}
                                                        now_field={this.state.gridData.field}
                                                        setSort={this.setSort} />
                                                </th>
                                                <th>
                                                    <OrderButton
                                                        title="商家名稱"
                                                        field={'Community.community_name'}
                                                        sort={this.state.gridData.sort}
                                                        now_field={this.state.gridData.field}
                                                        setSort={this.setSort} />
                                                </th>
                                                <th>
                                                    <OrderButton
                                                        title="物件名稱"
                                                        field={'matter_name'}
                                                        sort={this.state.gridData.sort}
                                                        now_field={this.state.gridData.field}
                                                        setSort={this.setSort} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.gridData.rows.map(
                                                (itemData, i) =>
                                                    <GridRow key={i}
                                                        primKey={itemData.matter_id}
                                                        itemData={itemData}
                                                        //delCheck={this.delCheck}
                                                        removeItemSubmit={this.removeItemSubmit}
                                                        updateType={this.updateType} />
                                            ) }
                                        </tbody>
                                    </table>
                                </div>
                                <GridNavPage
                                    startCount={this.state.gridData.startcount}
                                    endCount={this.state.gridData.endcount}
                                    recordCount={this.state.gridData.records}
                                    totalPage={this.state.gridData.total}
                                    nowPage={this.state.gridData.page}
                                    queryGridData={this.queryGridData}
                                    insertType={this.insertType}
                                    deleteSubmit={this.deleteSubmit}
                                    showDelete={false}
                                    />
                            </form>
                        </div>
                    );
            }
            else if (this.state.edit_type == IEditType.insert || this.state.edit_type == IEditType.update) {

                let field = this.state.fieldData;
                let mnt_start_date = MntV(field.start_date);
                let mnt_end_date = MntV(field.end_date);
                let end_date_disabled: boolean = mnt_start_date == null ? true : false; //1、如啟始日期無值 結束日期不可填 2、另結束日期不可小於開始日期

                let up_MatterList = null;
                let up_MatterPhoto = null;
                let up_MatterStyle = null;

                if (this.state.edit_type == IEditType.update || this.state.edit_type == IEditType.insert) {
                    up_MatterList = <div className="form-group row">
                        <label className="col-xs-2 text-xs-right form-control-label">物件代表圖</label>
                        <div className="col-xs-8">
                            <MasterImageUpload FileKind="MatterList"
                                MainId={field.matter_id}
                                ParentEditType={this.state.edit_type}
                                url_upload={gb_approot + 'Active/Matter/axFUpload'}
                                url_list={gb_approot + 'Active/Matter/axFList'}
                                url_delete={gb_approot + 'Active/Matter/axFDelete'}
                                url_sort={gb_approot + 'Active/Matter/axFSort'} />
                            <small className="text-muted">最多可上傳 1 張圖片</small>
                        </div>
                    </div>;

                    up_MatterPhoto = <div className="form-group row">
                        <label className="col-xs-2 text-xs-right form-control-label">物件實景照片</label>
                        <div className="col-xs-8">
                            <MasterImageUpload FileKind="MatterPhoto"
                                MainId={field.matter_id}
                                ParentEditType={this.state.edit_type}
                                url_upload={gb_approot + 'Active/Matter/axFUpload'}
                                url_list={gb_approot + 'Active/Matter/axFList'}
                                url_delete={gb_approot + 'Active/Matter/axFDelete'}
                                url_sort={gb_approot + 'Active/Matter/axFSort'} />
                            <small className="text-muted">最多可上傳 10 張圖片</small>
                        </div>
                    </div>;

                    up_MatterStyle = <div className="form-group row">
                        <label className="col-xs-2 text-xs-right form-control-label">格局圖</label>
                        <div className="col-xs-8">
                            <MasterImageUpload FileKind="MatterStyle"
                                MainId={field.matter_id}
                                ParentEditType={this.state.edit_type}
                                url_upload={gb_approot + 'Active/Matter/axFUpload'}
                                url_list={gb_approot + 'Active/Matter/axFList'}
                                url_delete={gb_approot + 'Active/Matter/axFDelete'}
                                url_sort={gb_approot + 'Active/Matter/axFSort'} />
                            <small className="text-muted">最多可上傳 10 張圖片</small>
                        </div>
                    </div>

                }


                var outHtml = (
                    <div>
                        <ul className="breadcrumb">
                            <li>
                                <i className="fa-caret-right"></i> { }
                                {this.props.menuName}
                            </li>
                            <li>
                                <i className="fa-angle-right"></i> { }
                                {this.props.caption}
                            </li>
                            <li>
                                <i className="fa-angle-right"></i> { }
                                資料維護
                            </li>
                        </ul>
                        <h3 className="h3">
                            {this.props.caption}
                            <small className="sub"><i className="fa-angle-double-right"></i> 資料維護</small>
                        </h3>
                        <form className="form form-sm" onSubmit={this.handleSubmit}>
                            <h4 className="h4">物件基本資料</h4>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label"><span className="text-danger">*</span> 物件編號</label>
                                <div className="col-xs-4">
                                    <input type="text" className="form-control" maxLength={10} required
                                        onChange={this.changeFDValue.bind(this, 'sn') }
                                        value={field.sn}
                                        />
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label"><span className="text-danger">*</span> 出租 / 出售</label>
                                <div className="col-xs-3">
                                    <select className="form-control"
                                        value={field.info_type}
                                        onChange={this.changeFDValue.bind(this, 'info_type') } required>
                                        <option value="" selected disabled>請選擇</option>
                                        <option value="S">出售</option>
                                        <option value="R">出租</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">刊登狀態</label>
                                <div className="col-xs-1">
                                    <select className="form-control"
                                        value={field.state}
                                        onChange={this.changeFDValue.bind(this, 'state') }>
                                        <option value="A">刊登中</option>
                                        <option value="C">關閉</option>
                                    </select>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label"><span className="text-danger">*</span> 刊登時間</label>
                                <div className="col-xs-3">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-addon">起</span>
                                        <DatePicker selected={mnt_start_date}
                                            dateFormat={dt.dateFT}
                                            isClearable={true}
                                            required={true}
                                            locale="zh-TW"
                                            showYearDropdown

                                            onChange={this.setChangeDate.bind(this, this.props.fdName, 'start_date') }
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-addon">迄</span>
                                        <DatePicker selected={mnt_end_date}
                                            dateFormat={dt.dateFT}
                                            isClearable={true}
                                            required={true}
                                            locale="zh-TW"
                                            showYearDropdown
                                            onChange={this.setChangeDate.bind(this, this.props.fdName, 'end_date') }
                                            className="form-control"
                                            minDate={mnt_start_date}
                                            disabled={end_date_disabled}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label"><span className="text-danger">*</span> 物件名稱</label>
                                <div className="col-xs-8">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'matter_name') }
                                        value={field.matter_name}
                                        maxLength={64}
                                        required />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label"><span className="text-danger">*</span> 物件副標題</label>
                                <div className="col-xs-8">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'title') }
                                        value={field.title}
                                        maxLength={64}
                                        required />
                                    <small className="text-muted">特色介紹，例如: 近公園/學校、交通便利</small>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">物件型態</label>
                                <div className="col-xs-2">
                                    <select className="form-control"
                                        value={field.typeOfHouse}
                                        onChange={this.changeFDValue.bind(this, 'typeOfHouse') }>
                                        <option value="" selected disabled>請選擇</option>
                                        <option value="H">住宅大樓</option>
                                        <option value="D">公寓</option>
                                        <option value="T">透天</option>
                                        <option value="F">辦公大樓</option>
                                    </select>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">建造狀態</label>
                                <div className="col-xs-2">
                                    <select className="form-control"
                                        value={field.build_state}
                                        onChange={this.changeFDValue.bind(this, 'build_state') }>
                                        <option value="" selected disabled>請選擇</option>
                                        <option value="I">成屋</option>
                                        <option value="S">預售屋</option>
                                    </select>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">屋齡</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" step="0.1" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'age') }
                                            value={field.age}
                                            />
                                        <span className="input-group-addon">年</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label"><span className="text-danger">*</span> 物件所屬商家</label>
                                <div className="col-xs-8">
                                    <select className="form-control"
                                        required
                                        value={field.community_id}
                                        onChange={this.changeFDValue.bind(this, 'community_id') }>
                                        <option value="" selected disabled>請選擇</option>
                                        {
                                            this.state.options_community.map(function (item, i) {
                                                return (
                                                    <option value={item.community_id} key={item.community_id}>{item.community_name}</option>);
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">物件地址</label>
                                <div className="col-xs-8">
                                    <TwAddress
                                        identity="AD1"
                                        city_value={field.city}
                                        country_value={field.country}
                                        address_value={field.address}
                                        zip_value={field.zip}
                                        onChange={this.changeAddress}
                                        index={0}
                                        />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">物件格局</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'bedrooms') }
                                            value={field.bedrooms}
                                            />
                                        <span className="input-group-addon">房</span>
                                    </div>
                                </div>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'livingrooms') }
                                            value={field.livingrooms}
                                            />
                                        <span className="input-group-addon">廳</span>
                                    </div>
                                </div>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'bathrooms') }
                                            value={field.bathrooms}
                                            />
                                        <span className="input-group-addon">衛</span>
                                    </div>
                                </div>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'rooms') }
                                            value={field.rooms}
                                            />
                                        <span className="input-group-addon">室</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">車位</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'parking') }
                                        value={field.parking}
                                        />
                                    <small className="text-muted">例如: 坡道平面</small>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">電梯</label>
                                <div className="col-xs-2">
                                    <label className="checkbox-inline">
                                        <input type="checkbox"
                                            onChange={this.setInputValue.bind(this, this.props.fdName, 'is_elevator', !field.is_elevator) }
                                            checked={field.is_elevator}
                                            /> 有
                                    </label>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">建物登記坪數</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" step="0.01" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'build_area') }
                                            value={field.build_area}
                                            />
                                        <span className="input-group-addon">坪</span>
                                    </div>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">物件樓層</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        maxLength={50}
                                        onChange={this.changeFDValue.bind(this, 'site_floor') }
                                        value={field.site_floor}
                                        />
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">總樓層</label>
                                <div className="col-xs-2">
                                    <input type="number" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'total_floor') }
                                        value={field.total_floor}
                                        />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">Google 地圖嵌入</label>
                                <div className="col-xs-8">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'map_iframe') }
                                        value={field.map_iframe}
                                        maxLength={4000}
                                        />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">生活機能</label>
                                <div className="col-xs-8">
                                    <textarea type="date" className="form-control" id="context_life" name="context_life"
                                        value={field.context_life} onChange={this.changeFDValue.bind(this, 'context_life') }></textarea>
                                </div>
                            </div>
                            <hr className="sm" />
                            <h4 className="h4">物件照片</h4>
                            {up_MatterList}
                            {up_MatterPhoto}
                            {up_MatterStyle}
                            <hr className="sm" />
                            <h4 className="h4">出售物件詳細資料</h4>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">物件售價</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'price') }
                                            value={field.price} />
                                        <span className="input-group-addon">元</span>
                                    </div>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">月管理費</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" step="10" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'managementFeeOfMonth') }
                                            value={field.managementFeeOfMonth}
                                            />
                                        <span className="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">土地登記坪數</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" step="0.01" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'land_area') }
                                            value={field.land_area}
                                            />
                                        <span className="input-group-addon">坪</span>
                                    </div>
                                </div>

                                <label className="col-xs-1 text-xs-right form-control-label">每坪單價</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'unit_area_price') }
                                            value={field.unit_area_price}
                                            />

                                    </div>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">主建物實際坪數</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" step="0.01" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'house_area') }
                                            value={field.house_area}
                                            />
                                        <span className="input-group-addon">坪</span>
                                    </div>
                                </div>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-addon">陽台</span>
                                        <input type="number" step="0.01" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'balcony_area') }
                                            value={field.balcony_area}
                                            />
                                        <span className="input-group-addon">坪</span>
                                    </div>
                                </div>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-addon">雨遮</span>
                                        <input type="number" step="0.01" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'umbrella_aea') }
                                            value={field.umbrella_aea}
                                            />
                                        <span className="input-group-addon">坪</span>
                                    </div>
                                </div>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-addon">公設</span>
                                        <input type="number" step="0.01" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'public_area') }
                                            value={field.public_area}
                                            />
                                        <span className="input-group-addon">坪</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">該層戶數</label>
                                <div className="col-xs-2">
                                    <input type="number" step="1" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'buildhouses') }
                                        value={field.buildhouses}
                                        />
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">朝向</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'orientation') }
                                        value={field.orientation}
                                        />
                                </div>
                                <div className="col-xs-3">
                                    <label className="checkbox-inline">
                                        <input type="checkbox"
                                            onChange={this.setInputValue.bind(this, this.props.fdName, 'is_end', !field.is_end) }
                                            checked={field.is_end}
                                            /> 邊間
                                    </label>
                                    <label className="checkbox-inline">
                                        <input type="checkbox"
                                            onChange={this.setInputValue.bind(this, this.props.fdName, 'is_darkroom', !field.is_darkroom) }
                                            checked={field.is_darkroom}
                                            /> 暗房
                                    </label>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">警衛管理</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'guard') }
                                        value={field.guard}
                                        />
                                    <small className="text-muted">例如: 有，全天候</small>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">建物結構</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'architecture') }
                                        value={field.architecture}
                                        />
                                    <small className="text-muted">例如: 鋼筋混凝土</small>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">外牆建材</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'wall_materials') }
                                        value={field.wall_materials}
                                        />
                                    <small className="text-muted">例如: 方塊磚</small>
                                </div>
                            </div>
                            <hr className="sm" />
                            <h4 className="h4">出租物件詳細資料</h4>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">每月租金</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="number" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'rentOfMonh') }
                                            value={field.rentOfMonh}
                                            disabled={field.info_type != 'R'}
                                            />
                                        <span className="input-group-addon">元</span>
                                    </div>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">押金</label>
                                <div className="col-xs-2">
                                    <input type="number" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'deposit') }
                                        value={field.deposit}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 2 個月</small>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">管理費</label>
                                <div className="col-xs-2">
                                    <div className="input-group input-group-sm">
                                        <input type="text" className="form-control"
                                            onChange={this.changeFDValue.bind(this, 'rent_management') }
                                            value={field.rent_management}
                                            maxLength={50}
                                            disabled={field.info_type != 'R'}
                                            />
                                        <span className="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">最短租期</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'rent_short_date') }
                                        value={field.rent_short_date}
                                        maxLength={50}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 6 個月</small>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">可遷入日</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'rent_start_date') }
                                        value={field.rent_start_date}
                                        maxLength={50}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 隨時</small>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">可開伙</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'rent_cook') }
                                        value={field.rent_cook}
                                        maxLength={50}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 不可以</small>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">身分要求</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'rent_identity') }
                                        value={field.rent_identity}
                                        maxLength={50}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 學生</small>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">性別要求</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'rent_sex') }
                                        value={field.rent_sex}
                                        maxLength={50}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 不拘</small>
                                </div>
                                <label className="col-xs-1 text-xs-right form-control-label">可養寵物</label>
                                <div className="col-xs-2">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'rent_pet') }
                                        value={field.rent_pet}
                                        maxLength={50}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 不可以</small>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">家具提供</label>
                                <div className="col-xs-8">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'rent_furniture') }
                                        value={field.rent_furniture}
                                        maxLength={50}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 床、衣櫃、沙發、桌子</small>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xs-2 text-xs-right form-control-label">設備提供</label>
                                <div className="col-xs-8">
                                    <input type="text" className="form-control"
                                        onChange={this.changeFDValue.bind(this, 'rent_equip') }
                                        value={field.rent_equip}
                                        maxLength={50}
                                        disabled={field.info_type != 'R'}
                                        />
                                    <small className="text-muted">例如: 洗衣機、冰箱、電視、冷氣、熱水器、網路、第四台</small>
                                </div>
                            </div>
                            <div className="form-action">
                                <div className="col-xs-offset-2">
                                    <button type="submit" className="btn btn-sm btn-primary"><i className="fa-check"></i> 儲存</button> { }
                                    <button type="button" className="btn btn-sm btn-secondary" onClick={this.noneType}><i className="fa-times"></i> 回前頁</button>
                                </div>
                            </div>

                        </form>
                    </div>
                );
            }
            return outHtml;
        }
    }
}

var dom = document.getElementById('page_content');
ReactDOM.render(<Matter.GirdForm caption={gb_caption} menuName={gb_menuname} iconClass="fa-list-alt" />, dom); 
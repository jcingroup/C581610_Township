import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import {ajaxGridItem, operatorInsert} from "../actions";
import { bindActionCreators } from 'redux';

type NavPageProps = {
    page?: number,
    startcount?: number,
    endcount?: number,
    total?: number,
    records?: number,
    search?: any,
    showAdd?: boolean
    showDelete?: boolean,
    clickChangePage?: Function,
    clickEditInsert?: Function
}
export class GridNavPage extends React.Component<NavPageProps, {}> {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this);
        this.prvePage = this.prvePage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.mapPage = this.mapPage.bind(this);
    }

    mapPage(page: number) {

        let params = this.props.search;
        params['page'] = this.props.page;

        this.props.clickChangePage(params);
    }

    firstPage() {
        this.mapPage(1);
    }
    lastPage() {
        this.mapPage(this.props.total);
    }
    nextPage() {
        if (this.props.page < this.props.total) {
            this.mapPage(this.props.page + 1);
        }
    }
    prvePage() {
        if (this.props.page > 1) {
            this.mapPage(this.props.page - 1);
        }
    }
    jumpPage() {

    }

    render() {
        var setAddButton = null, setDeleteButton = null;
        if (this.props.showAdd) {
            setAddButton = (
                <button className="btn btn-sm btn-success" type="button" onClick={this.props.clickEditInsert}>
                    <i className="fa-plus-circle"></i> 新增
                </button>);
        }

        if (this.props.showDelete) {
            setDeleteButton = <button className="btn btn-sm btn-danger" type="button">
                <i className="fa-trash-o"></i> 刪除
            </button>;

        }
        var oper = null;

        oper = (
            <div className="table-footer clearfix">
                <div className="pull-xs-left">
                    {setAddButton} { }
                    {setDeleteButton}
                </div>
                <small className="pull-xs-right">第{this.props.startcount}-{this.props.endcount}筆，共{this.props.records}筆</small>

                <ul className="pager pager-sm">
                    <li>
                        <a href="#" title="移至第一頁" tabIndex={-1} onClick={this.firstPage}>
                            <i className="fa-angle-double-left"></i>
                        </a>
                    </li> { }
                    <li>
                        <a href="#" title="上一頁" tabIndex={-1} onClick={this.prvePage}>
                            <i className="fa-angle-left"></i>
                        </a>
                    </li> { }
                    <li className="form-inline">
                        <div className="form-group">
                            <label>第</label>
                            {' '}
                            <input style={{ "width": "100px" }} className="form-control form-control-sm text-xs-center" type="number" min="1" tabIndex={-1} value={this.props.page}
                                onChange={this.jumpPage} />
                            {' '}
                            <label>頁，共{this.props.total}頁</label>
                        </div>
                    </li> { }
                    <li>
                        <a href="#" title="@Resources.Res.NextPage" tabIndex={-1} onClick={this.nextPage}>
                            <i className="fa-angle-right"></i>
                        </a>
                    </li> { }
                    <li>
                        <a href="#" title="移至最後一頁" tabIndex={-1} onClick={this.lastPage}>
                            <i className="fa-angle-double-right"></i>
                        </a>
                    </li>
                </ul>
            </div>
        );

        return oper;
    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log('NavPart mapStateToProps', state);

    let p = state.page_operator;

    return {
        page: p.page,
        startcount: p.startcount,
        endcount: p.endcount,
        total: p.total,
        records: p.records,
        search: state.search
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    let r = bindActionCreators({
        clickChangePage: ajaxGridItem,
        clickEditInsert: operatorInsert
    }, dispatch);

    return r;
}
const NavPart = connect<{}, {}, NavPageProps>(mapStateToProps, mapDispatchToProps)(GridNavPage)
export default NavPart;
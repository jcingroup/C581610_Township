import React = require('react');
import ReactDOM = require('react-dom');
import update = require('react-addons-update');
import { connect } from 'react-redux';
import Moment = require('moment');
import { bindActionCreators } from 'redux';
import SearchFormPart from "./SearchFormPart";
import DataFormPart from "./DataFormPart";
export class GridForm extends React.Component<any, any>{

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        this.state = {
            searchData: null
        };

    }
    componentDidMount() {
        //dispatch();
        //console.log('componentDidMount')
    }
    componentDidUpdate(prevProps, prevState) {
        //console.log('componentDidUpdate')
    }
    componentWillUnmount() {
        //元件被從 DOM 卸載之前執行，通常我們在這個方法清除一些不再需要地物件或 timer。
        //console.log('componentWillUnmount')
    }

    render() {
        let out_html: JSX.Element = null;
        let operator_view = null;
        //console.log('OperatorType', this.props.oper_type);
        if (this.props.oper_type == OperatorType.grid) {
            operator_view = <SearchFormPart />
        }

        if (this.props.oper_type == OperatorType.edit) {
            operator_view = <DataFormPart />
        }
        out_html =
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
                    {operator_view}
                </div>
            );

        return out_html;
    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log('GridForm mapStateToProps', state);
    return {
        oper_type: state.oper_type
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    //console.log('GridForm', 'mapStateToProps', ownProps);
    return {
        onClick: () => {
            //dispatch(setVisibilityFilter(ownProps.filter))
        }
    }

    //let r = bindActionCreators({
    //    clickChangePage: ajaxGridItem,
    //    clickEditInsert: operatorInsert
    //}, dispatch);

}
const GridFormPart = connect(mapStateToProps, mapDispatchToProps)(GridForm)
//const GridFormPart = connect()(GridForm)
export default GridFormPart;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//view
import {AStart} from './vwAStart';
import {EditDetail} from './vwEditDetail';


import {  setInputValue, editState, ajaxEditItem, ajaxSubmit,
    ajaxGridDetailItem, setDetailInputValue, addDeatilState, ajaxDelDetail} from './actions'

const m1ToProps = (state, ownProps) => {
    return {
        edit_type: state.edit_type,
        field: state.field,
        params: state.params
    }
}

const m1Dispatch = (dispatch, ownProps) => {
    let s = bindActionCreators({
        setInputValue,
        editState,
        ajaxEditItem,
        ajaxSubmit
    }, dispatch);

    return s;
}
export const AStartView = connect(m1ToProps, m1Dispatch)(AStart);

const m2ToProps = (state, ownProps) => {
    return {
        edit_type: state.edit_type,
        field: state.field,
        params: state.params
    }
}

const m2Dispatch = (dispatch, ownProps) => {
    let s = bindActionCreators({
        ajaxGridDetailItem,
        setDetailInputValue,
        addDeatilState,
        ajaxDelDetail
    }, dispatch);

    return s;
}
export const EditDetailView = connect(m2ToProps, m2Dispatch)(EditDetail);


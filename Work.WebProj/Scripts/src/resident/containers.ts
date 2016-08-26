import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//view
import {AStart} from './vwAStart';


import { ajaxGridItem, setInputValue, editState, ajaxEditItem, ajaxDeleteItem} from './actions'

const m1ToProps = (state, ownProps) => {
    return {
        edit_type: state.edit_type,
        page_operator: state.page_operator,
        search: state.search,
        grid: state.grid
    }
}

const m1Dispatch = (dispatch, ownProps) => {
    let s = bindActionCreators({
        ajaxGridItem,
        setInputValue,
        editState,
        ajaxEditItem,
        ajaxDeleteItem
    }, dispatch);

    return s;
}
export const AStartView = connect(m1ToProps, m1Dispatch)(AStart);


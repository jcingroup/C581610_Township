import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//view
import {AStart} from './vwAStart';


import { ajaxSubmit, setInputValue} from './actions'

const m1ToProps = (state, ownProps) => {
    return {
        field: state.field,
        info: state.info
    }
}

const m1Dispatch = (dispatch, ownProps) => {
    let s = bindActionCreators({
        ajaxSubmit,
        setInputValue
    }, dispatch);

    return s;
}
export const AStartView = connect(m1ToProps, m1Dispatch)(AStart);


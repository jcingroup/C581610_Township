import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//view
import {AStart} from './vwAStart';


//import { editState, cancelState, setInputValue, setFieldValue, updateData} from './actions'

const m1ToProps = (state, ownProps) => {
    return {
    }
}

const m1Dispatch = (dispatch, ownProps) => {
    return {

    }
}
export const AStartView = connect(m1ToProps, m1Dispatch)(AStart);

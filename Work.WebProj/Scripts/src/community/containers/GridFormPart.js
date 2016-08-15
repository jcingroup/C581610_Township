"use strict";
const react_redux_1 = require('react-redux');
const actions_1 = require('../actions');
const GridForm_1 = require('../components/GridForm');
const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter,
        myage: 6
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            console.log(1, 'Event');
            dispatch(actions_1.setVisibilityFilter(ownProps.filter));
        }
    };
};
const GridFormPart = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridForm_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GridFormPart;

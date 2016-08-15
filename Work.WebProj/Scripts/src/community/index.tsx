import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';

import GridFormPart from './components/GridFormPart';
import Reducers from './reducers';
import {ajaxGridItem} from './actions';
import thunkMiddleware from 'redux-thunk';
//import * as createLogger from 'redux-logger';
//const loggerMiddleware = createLogger();
const store = createStore(
    Reducers,
    applyMiddleware(
        thunkMiddleware
    ));

store.dispatch(ajaxGridItem(null));

var dom = document.getElementById('page_content');
render(<Provider store={store}><GridFormPart /></Provider>, dom);

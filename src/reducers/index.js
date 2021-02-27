import {combineReducers} from 'redux';
import userReducer from './userReducer';
import threadsReducer from './threadsReducer';
import snackReducer from './snackbarReducer';

export default combineReducers({
    user: userReducer,
    threads: threadsReducer,
    snack: snackReducer,
})

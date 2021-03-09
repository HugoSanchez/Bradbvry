import {combineReducers} from 'redux';
import userReducer from './userReducer';
import threadsReducer from './threadsReducer';

export default combineReducers({
    user: userReducer,
    threads: threadsReducer,
})

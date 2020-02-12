import {combineReducers} from 'redux';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer,
})

/*
 * Redux is not beig used at the moment, 
 * but it's already set up for the future.
 */
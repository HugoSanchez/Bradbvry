import {SET_INITIAL_CONFIG} from '../actions/types';
import {takeEvery} from 'redux-saga/effects';


function* handleConfig() {
    console.log('Hello World')
}

export default function * watchInitialConfig() {
    yield takeEvery(SET_INITIAL_CONFIG, handleConfig)
}


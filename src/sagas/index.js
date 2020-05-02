import {all} from 'redux-saga/effects';
import setConfigSaga from './setConfigSaga';

export default function * rootSaga() {
    yield all([
        setConfigSaga(),
    ])
}


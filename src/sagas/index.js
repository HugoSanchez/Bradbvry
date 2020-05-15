import {all} from 'redux-saga/effects';
import setConfigSaga from './setConfigSaga';
import saveItemSaga from './saveItemSaga';

export default function * rootSaga() {
    yield all([
        setConfigSaga(),
        saveItemSaga(),
    ])
}


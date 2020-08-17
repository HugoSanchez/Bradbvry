import {all} from 'redux-saga/effects';
import setConfigSaga from './setConfigSaga';
import saveItemSaga from './saveItemSaga';
import saveImageSaga from './saveImageSaga';

export default function * rootSaga() {
    yield all([
        setConfigSaga(),
        saveImageSaga(),
        saveItemSaga(),
    ])
}


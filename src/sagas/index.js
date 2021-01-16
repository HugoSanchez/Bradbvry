import {all} from 'redux-saga/effects';
import setConfigSaga from './setConfigSaga';
import saveItemSaga from './saveItemSaga';
import saveImageSaga from './saveImageSaga';
import deleteItemSaga from './deleteItemSaga';
import addNewCollection from './addNewCollection';
import createCollectionSaga from './createCollectionSaga';

export default function * rootSaga() {
    yield all([
        setConfigSaga(),
        saveImageSaga(),
        saveItemSaga(),
        deleteItemSaga(),
        addNewCollection(),
        createCollectionSaga(),
    ])
}


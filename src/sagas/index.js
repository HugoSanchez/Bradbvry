import {all} from 'redux-saga/effects';
import setConfigSaga from './setConfigSaga';
import saveItemSaga from './saveItemSaga';
import saveImageSaga from './saveImageSaga';
import deleteItemSaga from './deleteItemSaga';
import addNewCollection from './addNewCollection';
import handleThreadsSaga from './handleThreadsSaga';
import handleRenderSnack from './handleSnackBarSaga';
import createCollectionSaga from './createCollectionSaga';
import updateCollectionSaga from './updateCollectionSaga';
import deleteCollectionSaga from './deleteCollectionSaga';

export default function * rootSaga() {
    yield all([
        setConfigSaga(),
        saveImageSaga(),
        saveItemSaga(),
        deleteItemSaga(),
        addNewCollection(),
        createCollectionSaga(),
        updateCollectionSaga(),
        deleteCollectionSaga(),
        handleThreadsSaga(),
        handleRenderSnack()
    ])
}


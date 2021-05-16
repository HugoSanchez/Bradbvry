import {take, put, select} from 'redux-saga/effects';
import {setThreadArray_Action, handleSnackBarRender_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';
import {uploadUrl} from '../constants';
import axios from 'axios';

import {

    HANDLE_CREATE_COLLECTION,
    SNACK_TYPE_ERROR,
    SNACK_TYPE_SUCCESS,
    SNACK_TYPE_INFO,
    SNACK_DISMISS

} from '../actions/types';

const getThreadsState = state => state

function* handleCreateCollection(action) {
 
    const state = yield select(getThreadsState)
    const client = state.user.client
    const address = state.user.address
    const identity = state.user.identity
    const identityString = state.user.identityString
    const masterThreadID = state.threads.masterThreadID

    yield put(handleSnackBarRender_Action(SNACK_TYPE_INFO))


    try {
        // 1. Get image URL.
        let protoCofig = action.payload
        let formData = new FormData();
        formData.append('file', action.payload.image);
        formData.append('type', action.payload.image.type);
        let res = yield axios.post(uploadUrl, formData)

        // 2. Create new ThreadDB and add DB to global.
        protoCofig.image = res.data.contentURI
        let {collectionObject} = yield Textile.createNewThreadDB(client, action.payload, address, identityString, identity)
        yield client.create(masterThreadID, 'collections-list', [collectionObject])

        // 3. Get new collections list and set in state.
        let collections = yield client.find(masterThreadID, 'collections-list', {})
        yield put(setThreadArray_Action(collections))

        // 4. Fire callback and track event
        yield put(handleSnackBarRender_Action(SNACK_DISMISS))
        yield put(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS))
        Mixpanel.track('NEW_COLLECTION_CREATED')
    }

    catch (e) {
        if (e.toString().includes('multiple write errors')) {
            yield put(handleSnackBarRender_Action(SNACK_DISMISS))
            yield put(handleSnackBarRender_Action(SNACK_TYPE_ERROR, 
                'Please choose a different name!'))
        }
        else {
            yield put(handleSnackBarRender_Action(SNACK_DISMISS))
            yield put(handleSnackBarRender_Action(SNACK_TYPE_ERROR))
            yield console.log(e)
        }
    }
}


export default function* watchCreateCollection() {
    while(true) {
        let action = yield take(HANDLE_CREATE_COLLECTION)
        yield handleCreateCollection(action)    
    }
}

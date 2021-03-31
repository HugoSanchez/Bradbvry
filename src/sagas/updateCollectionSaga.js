import {take, put, select} from 'redux-saga/effects';
import ThreadID from '@textile/threads-id';
import {uploadUrl, updateCollectionUrl} from '../constants';
import axios from 'axios';

import {

    setThreadArray_Action, 
    handleSnackBarRender_Action, 
    setActiveThread_Action

} from '../actions';


import {

    HANDLE_UPDATE_COLLECTION,
    SNACK_TYPE_ERROR,
    SNACK_TYPE_SUCCESS,

} from '../actions/types';


const getThreadsState = state => state

function* handleUpdateCollection(action) {

    const state = yield select(getThreadsState)
    const client = state.user.client
    const address = state.user.address
    const masterThreadID = state.threads.masterThreadID

    try {
        // 1. Update name, description and image if any.
        let updatedThread = Object.assign({}, action.activeThread)
        updatedThread.name = action.payload.name
        updatedThread.description = action.payload.description

        if (action.payload.image) {
            let formData = new FormData();
            formData.append('file', action.payload.image);
            formData.append('type', action.payload.image.type);
            let res = yield axios.post(uploadUrl, formData)
            updatedThread.image = res.data.contentURI
        }

        // 2. Updateconfig collection in DB.
        let threadId = ThreadID.fromString(action.activeThread.id)
        let config = yield client.find(threadId, 'config', {})
        let updatedConfig = Object.assign({}, config[0])
        updatedConfig.name = updatedThread.name
        updatedConfig.description = updatedThread.description
        updatedConfig.image = updatedThread.image
        yield client.save(threadId, 'config', [updatedConfig])
        yield axios.post(updateCollectionUrl, {collection: updatedConfig})

        // 3. Update master thread too.
        yield client.save(masterThreadID, 'collections-list', [updatedThread])
        let collections = yield client.find(masterThreadID, 'collections-list', {})

        // 4. Update redux state. 
        yield put(setThreadArray_Action(collections))
        yield put(setActiveThread_Action(updatedThread))

        // 4. Fire callback and snackbar
        yield action.callback(true)
        yield action.history.push(`/app/${address}/${updatedThread.name}`)
        yield put(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS))
    }

    catch (e) {
        if (e.toString().includes('multiple write errors')) {
            yield put(handleSnackBarRender_Action(SNACK_TYPE_ERROR, 
                'Please choose a different name!'))
        }
        else {
            yield put(handleSnackBarRender_Action(SNACK_TYPE_ERROR))
            yield console.log(e)
        }
        yield action.callback(false)
    }
}


export default function* watchUpdateCollection() {
    while(true) {
        let action = yield take(HANDLE_UPDATE_COLLECTION)
        yield handleUpdateCollection(action)    
    }
}

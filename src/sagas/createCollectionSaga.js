import {take, put, select} from 'redux-saga/effects';
import {setThreadArray_Action, handleSnackBarRender_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';
import {addCollection} from '../constants';
import axios from 'axios';

import {
    HANDLE_CREATE_COLLECTION,
    SNACK_TYPE_ERROR,
    SNACK_TYPE_SUCCESS,

} from '../actions/types';



const getThreadsState = state => state

function* handleCreateCollection(action) {
 
    const state = yield select(getThreadsState)
    const client = state.user.client
    const address = state.user.address
    const identityString = state.user.identityString
    const masterThreadID = state.threads.masterThreadID

    try {
        // Create new ThreadDB and lists all DB's
        let {threadID, collectionObject} = yield Textile.createNewThreadDB(client, action.payload, address, identityString)
        yield client.create(masterThreadID, 'collections-list', [collectionObject])

        yield axios.post(addCollection, collectionObject)

        // Get new collections list and set in state.
        let collections = yield client.find(masterThreadID, 'collections-list', {})
        yield put(setThreadArray_Action(collections))

        // Fire callback and track event
        yield action.callback(true)
        yield put(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS))
        Mixpanel.track('NEW_COLLECTION_CREATED')
    }

    catch (e) {
        yield console.log(e)
        yield action.callback(false)
        yield put(handleSnackBarRender_Action(SNACK_TYPE_ERROR))
    }
}


export default function* watchCreateCollection() {
    while(true) {
        let action = yield take(HANDLE_CREATE_COLLECTION)
        yield handleCreateCollection(action)    
    }
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////


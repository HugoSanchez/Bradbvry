import {take, put, select} from 'redux-saga/effects';
import {handleSnackBarRender_Action, setThreadArray_Action, setUserItems_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';
import {deleteCollection} from '../constants';
import axios from 'axios'

import {
    HANDLE_DELETE_COLLECTION,
    SNACK_TYPE_SUCCESS,
    SNACK_TYPE_ERROR,
} from '../actions/types';




const getThreadsState = state => state

function* handleDeleteCollection(action) {
 
    const state = yield select(getThreadsState)
    const client = state.user.client
    const address = state.user.address
    const activeThread = state.threads.activeThread
    const masterThreadID = state.threads.masterThreadID


    try {

        /**
         * To do: How do we unpin files from fleek?
         */

        // Remove from master thread entries collection
        let collectionEntryID = activeThread._id
        yield client.delete(masterThreadID, 'collections-list', [collectionEntryID])

        // Update redux state
        let collections = yield client.find(masterThreadID, 'collections-list', {})
        yield put(setThreadArray_Action(collections))
        yield put(setUserItems_Action([]))
        
        // Redirect and track.
        yield action.history.push(`/app/${address}`)
        yield put(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS))
        yield axios.post(deleteCollection, {id: activeThread.id})
        yield Mixpanel.track('COLLECTION_DELETED')
    }

    catch (e) {
        yield console.log(e)
        yield put(handleSnackBarRender_Action(SNACK_TYPE_ERROR))
    }
}


export default function* watchCreateCollection() {
    while(true) {
        let action = yield take(HANDLE_DELETE_COLLECTION)
        yield handleDeleteCollection(action)    
    }
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////


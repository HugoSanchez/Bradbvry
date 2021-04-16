import {take, put, select} from 'redux-saga/effects';
import {Mixpanel, Textile} from '../utils';

import {
    handleSnackBarRender_Action, 
    handleDeleteFromPreview_Action,
    setThreadArray_Action, 
    setUserItems_Action
} from '../actions';


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
    const threadItems = state.threads.threadItems
    const activeThread = state.threads.activeThread
    const threadsArray = state.threads.threadsArray
    const masterThreadID = state.threads.masterThreadID


    try {

        /**
         * To do: How do we unpin files from fleek?
         */
        
        // Remove from master thread entries collection
        let collection = threadsArray.filter(thread => thread.threadId === activeThread.threadId)
        yield client.delete(masterThreadID, 'collections-list', [collection[0]._id])

        // Update redux state
        let collections = yield client.find(masterThreadID, 'collections-list', {})
        yield put(handleDeleteFromPreview_Action(threadItems))
        yield put(setThreadArray_Action(collections))
        yield put(setUserItems_Action([]))
        
        // Redirect and track.
        yield action.history.push(`/app/${address}`)
        yield put(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS))

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


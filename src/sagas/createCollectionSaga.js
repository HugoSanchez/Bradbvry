import {HANDLE_CREATE_COLLECTION} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setThreadArray_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';

const getThreadsState = state => state

function* handleCreateCollection(action) {
 
    const state = yield select(getThreadsState)
    const client = state.user.client
    const threadsArray = state.threads.threadsArray

    try {
        // Create new ThreadDB and lists all DB's
        let threadID = yield Textile.createNewThreadDB(client, action.payload)
        let threads = yield client.listThreads()

        // Find the new one and query the config object.
        let threadInstance = threads.find(thread => thread.id === threadID.toString())
        let config = yield client.find(threadID, 'config', {})
        threadInstance.config = config[0]

        // Copy threadsArray and update copy with new threadDB.
        let newThreadsArray = Array.from(threadsArray)
        newThreadsArray.unshift(threadInstance)

        // Dispatch new thread array to reducer and use callback
        yield put(setThreadArray_Action(newThreadsArray))
        yield action.callback(true)
        Mixpanel.track('NEW_COLLECTION')
    }

    catch (e) {
        yield console.log(e)
        yield action.callback(false)
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


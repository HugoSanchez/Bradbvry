import {HANDLE_CREATE_COLLECTION} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setThreadArray_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';

const getThreadsState = state => state

function* handleCreateCollection(action) {
 
    const state = yield select(getThreadsState)
    const client = state.user.client
    const threadsArray = state.threads.threadsArray
    const masterThreadID = state.threads.masterThreadID


    try {
        // Create new ThreadDB and lists all DB's
        let {threadID, collectionObject} = yield Textile.createNewThreadDB(client, action.payload)
        yield console.log(collectionObject)
        yield client.create(masterThreadID, 'collections-list', [collectionObject])

        // Get new collections list and set in state.
        let collections = yield client.find(masterThreadID, 'collections-list', {})
        yield put(setThreadArray_Action(collections))

        // Fire callback and track event
        yield action.callback(true)
        Mixpanel.track('NEW_COLLECTION_CREATED')
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


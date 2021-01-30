import {HANDLE_DELETE_COLLECTION} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setThreadArray_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';


const getThreadsState = state => state

function* handleDeleteCollection(action) {
 
    const state = yield select(getThreadsState)
    const client = state.user.client
    const address = state.user.address
    const activeThread = state.threads.activeThread
    const masterThreadID = state.threads.masterThreadID


    try {
        
        // Remove from master thread entries collection
        let collectionEntryID = activeThread._id
        yield client.delete(masterThreadID, 'collections-list', [collectionEntryID])
        yield console.log('1')

        // DeleteDB
        // let threadID = yield Textile.getThreadID(activeThread)
        // yield client.deleteDB(threadID)
        yield console.log('2')
        
        // Update redux state
        let collections = yield client.find(masterThreadID, 'collections-list', {})
        yield put(setThreadArray_Action(collections))
        yield console.log('3', collections)
        // Redirect and track.
        
        yield action.history.push(`/app/${address}`)
        yield Mixpanel.track('COLLECTION_DELETED')
        yield console.log('4')

    }

    catch (e) {
        yield console.log(e)
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


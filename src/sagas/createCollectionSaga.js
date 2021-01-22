import {HANDLE_CREATE_COLLECTION} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setThreadArray_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';
import {getFunctionBody} from '@textile/threads-client'


const getThreadsState = state => state

function* handleCreateCollection(action) {
 
    const state = yield select(getThreadsState)
    const client = state.user.client
    const identityString = state.user.identityString
    const threadsArray = state.threads.threadsArray
    const masterThreadID = state.threads.masterThreadID

    // In order to have a write permission set, we first need to 
    // create this function
    const replaceThisValidator = (writer) => {
        if (writer === 'replaceThis') {
          return true
        } else {
            return false
        }
    }

    // Turn it into a string, and replace the 'replaceThis' with the identity
    const writeValidatorString = getFunctionBody(
        replaceThisValidator
    ).replace('replaceThis', identityString)

    // Then turn back the string into a function again.
    let writeValidator = new Function(writeValidatorString)

    try {
        // Create new ThreadDB and lists all DB's
        let {threadID, collectionObject} = yield Textile.createNewThreadDB(client, action.payload, writeValidator)
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


import {HANDLE_ADD_COLLECTION} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {ThreadID, DBInfo} from '@textile/hub';
import {Mixpanel, Textile, getBase64} from '../utils';

import {
    setThreadItems_Action,
    setThreadArray_Action
} from '../actions'


const getThreadsState = state => state

function* handleAddCollectionToMaster_Action(action) {

    // Instantiiate the things
    const state = yield select(getThreadsState)
    const client = state.user.client
    const address = state.user.address
    const threads = state.threads.threadsArray
    const masterThreadID = state.threads.masterThreadID

    // Get threadID.
    let threadID = ThreadID.fromString(action.payload)

    // Get Config and Entries
    let config = yield client.find(threadID, 'config', {})
    console.log('Config!: ', config)
    let entries = yield client.find(threadID, 'entries', {})
    console.log('Entries!!: ', entries)

    // Parse and set in state
    let alreadyExists = threads.find(thread => thread.name === config[0].name)
    if (!alreadyExists) {
        let newCollection = {}
        newCollection.id = action.payload
        newCollection.name = config[0].name
        newCollection.config = config[0]

        let newCollectionsArrray = Array.from(threads)
        newCollectionsArrray.unshift(newCollection)

        try {
            yield put(setThreadItems_Action(entries))
            yield put(setThreadArray_Action(newCollectionsArrray))
            yield client.create(masterThreadID, 'collections-list', [newCollection])
        }
        catch (e) {console.log(e)}
    }
    else {
        // We will need to handle the case where
        // user already follows this collection.
    }

    yield action.history.push(`/app/${address}`)

    // Send message to owner notifying with: address, identity. (owner needs to update)
    Mixpanel.track('NEW_COLLECTION_SHARED', {type: 'invitee'})
}


export default function* watchSaveImage() {
    while(true) {
        let action = yield take(HANDLE_ADD_COLLECTION)
        yield handleAddCollectionToMaster_Action(action)    
    }
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

import {HANDLE_ADD_COLLECTION} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {Mixpanel} from '../utils';
import {setThreadArray_Action} from '../actions'


const getThreadsState = state => state

function* handleAddCollectionToMaster(action) {

    // Instantiate the things
    const state = yield select(getThreadsState)
    const client = state.user.client
    const threads = state.threads.threadsArray
    const masterThreadID = state.threads.masterThreadID

    let collection = action.payload
    let safetyCheck = threads.find(thread => thread.threadId === collection.threadId)

    if (!safetyCheck) {
        yield client.create(masterThreadID, 'collections-list', [collection])
        let newCollectionsArrray = Array.from(threads)
        newCollectionsArrray.unshift(collection)
        yield put(setThreadArray_Action(newCollectionsArrray))
    }

    // Mixpanel.track('NEW_FOLLOW')
    if (action.redirect) yield action.redirect()
}


export default function* watchAddCollection() {
    while(true) {
        let action = yield take(HANDLE_ADD_COLLECTION)
        yield handleAddCollectionToMaster(action)    
    }
}
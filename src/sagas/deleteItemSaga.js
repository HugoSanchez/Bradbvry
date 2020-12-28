import {HANDLE_DELETE_ITEM} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {Mixpanel} from '../utils';
import {deleteEntry_Action} from '../actions';

const getThreadsState = state => state

function* handleSaveImage(action) {
    // Super simple saga to delete an item from a thread.
    // It deletes de item and updates the state in the reducer.
    const state = yield select(getThreadsState)
    const client = state.user.client
    const threadItems = state.threads.threadItems
    const activeThread = state.threads.activeThread

    yield console.log(action.payload)
    if (!activeThread) {throw new Error('no selected thread')}

    // Delete the given item in its thread.
    const threadID = ThreadID.fromString(activeThread.id)
    yield client.delete(threadID, 'entries', [action.payload._id])

    // Update the state and track the action.
    let newItems = Array.from(threadItems)
    newItems = newItems.filter(item => item !== action.payload)
    Mixpanel.track('ITEM_DELETED', {type: action.payload.type})
    yield put(deleteEntry_Action(newItems))
}


export default function* watchSaveImage() {
    while(true) {
        let action = yield take(HANDLE_DELETE_ITEM)
        yield handleSaveImage(action)    
    }
}

import {HANDLE_DELETE_ITEM} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {Mixpanel} from '../utils';
import {
    setUserItems_Action,
    setThreadItems_Action,
    handleDeleteFromPreview_Action,
} from '../actions';

const getThreadsState = state => state

function* handleDeleteItem(action) {
    // Super simple saga to delete an item from a thread.
    // It deletes de item and updates the state in the reducer.
    const state = yield select(getThreadsState)
    const client = state.user.client
    const itemsArray = state.threads.itemsArray
    const activeThread = state.threads.activeThread

    if (!activeThread) {throw new Error('no selected thread')}

    // Delete the given item in its thread.
    const threadID = ThreadID.fromString(activeThread.threadId)
    yield client.delete(threadID, 'entries', [action.payload._id])

    // Update the state and track the action.
    let entries = yield client.find(threadID, 'entries', {})
    yield put(setThreadItems_Action(entries.reverse()))

    Mixpanel.track('ITEM_DELETED', {type: action.payload.type})
    if (action.callback !== undefined) {yield action.callback()}

    let newItemsArray = filterItemOut(itemsArray, action.payload)
    yield put(setUserItems_Action(newItemsArray))
    yield put(handleDeleteFromPreview_Action(action.payload))

}
export default function* watchSaveImage() {
    while(true) {
        let action = yield take(HANDLE_DELETE_ITEM)
        yield handleDeleteItem(action)    
    }
}


/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

const filterItemOut = (itemsArray, itemToDelete) => {
    let array = Array.from(itemsArray)
    return array.filter(item => item.contentUri !== itemToDelete.contentUri)
}
import {HANDLE_ADD_ITEM_TO_PREVIEW} from '../actions/types';
import {take, select, put} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {replaceItemInArray} from '../utils/utils';
import {setThreadArray_Action} from '../actions';
const getThreadsState = state => state

function* addItemToPreview(action) {

    /**
     *    Every time the user adds a new item/image to a collection
     *    the preview array of the config object for that collection
     *    (threadDB) must be updated! :)
     */
     
    const state = yield select(getThreadsState)

    const client = state.user.client
    const activeThread = state.threads.activeThread
    const threadsArray = state.threads.threadsArray
    const masterThreadID = state.threads.masterThreadID
    
    // 1. Create copies of both, the active thread
    // and the preview array from that thread.
    let newConfig = Object.assign(activeThread, {})
    let newPreviewItemsArray = Array.from(newConfig.previewEntries)

    // 2. If there is more than 10 items, remove the oldest;
    // either way, add new one to the front of the array.
    if (action.subType === 'CREATE') {
        if (newPreviewItemsArray.length > 10) {newPreviewItemsArray.pop()}
        newPreviewItemsArray.unshift(action.payload[action.payload.length - 1])
    }

    else if (action.subType === 'DELETE') {
        newPreviewItemsArray = newPreviewItemsArray.filter(
            item => item._id !== action.payload._id)
    }
    
    // 3. Update config object
    newConfig.previewEntries = newPreviewItemsArray
    let threadId = ThreadID.fromString(activeThread.id)
    yield client.save(threadId, 'config', [newConfig])

    // 4. Update Master Thread
    yield client.save(masterThreadID, 'collections-list', [newConfig])

    // 5. Update redux state.
    let newThreadsArray = replaceItemInArray(threadsArray, activeThread, newConfig)
    yield put(setThreadArray_Action(newThreadsArray))
}


export default function* watchSaveImage() {
    while(true) {
        let action = yield take(HANDLE_ADD_ITEM_TO_PREVIEW)
        yield addItemToPreview(action)   
    }
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

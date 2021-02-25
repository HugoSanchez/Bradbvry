import {HANDLE_ADD_ITEM_TO_PREVIEW} from '../actions/types';
import {take, select, put} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {replaceItemInArray} from '../utils/utils';
import {setThreadArray_Action, setUserItems_Action} from '../actions';
const getThreadsState = state => state

function* addItemToPreview(action) {

    /**
     *    Every time the user adds a new item/image to a collection
     *    the preview array of the config object for that collection
     *    (threadDB) must be updated! :)
     */
     
    const state = yield select(getThreadsState)

    const client = state.user.client

    const itemsArray = state.threads.itemsArray
    const activeThread = state.threads.activeThread
    const threadsArray = state.threads.threadsArray
    const masterThreadID = state.threads.masterThreadID
    
    // 1. Create copies of both, the active thread
    // and the preview array from that thread.
    let newConfig = Object.assign(activeThread, {})
    let newPreviewItemsArray = Array.from(newConfig.previewEntries)

    // 2. If there is more than 10 items, remove the oldest;
    // either way, add new one to the front of the array
    let item
    if (action.subType === 'CREATE') {
        item = action.payload[action.payload.length - 1]
        if (newPreviewItemsArray.length > 10) {newPreviewItemsArray.pop()}
        newPreviewItemsArray.unshift(item)
    }

    let oldItem
    if (action.subType === 'UPDATE') {
        item = action.payload
        oldItem = itemsArray.filter(tem => tem._id == item._id)
        newPreviewItemsArray = replaceItemInArray(newPreviewItemsArray, oldItem[0], item)
    }

    else if (action.subType === 'DELETE') {
        item = action.payload
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
    let newItemsArray = updatePreviewItems(action.subType, itemsArray, item, oldItem)
    yield put(setUserItems_Action(newItemsArray))
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


const updatePreviewItems = (type, array, item, oldItem) => {
    switch (type) {
        case 'CREATE':
            array.unshift(item)
            return array
        case 'UPDATE':
            return replaceItemInArray(array, oldItem[0], item)
        case 'DELETE': 
            return array.filter(tem => tem._id !== item._id) 
    }
}
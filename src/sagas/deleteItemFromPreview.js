import {HANDLE_DELETE_FROM_PREVIEW} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {setUserItems_Action} from '../actions';


function* handleDeleteFromPreview(itemsToDelete) {
    // Super simple saga to delete an item from preview.
    // It deletes de item and updates the state in the reducer.
    let state = yield select(state => state)
    let client = state.user.client
    let itemsArray = state.threads.itemsArray

    let arrayToDelete = getDeleteItemsArray(itemsToDelete, itemsArray)

    let previewThreadId = localStorage.getItem('previewEntriesID')
    let threadID = ThreadID.fromString(previewThreadId)    
    yield client.delete(threadID, 'preview-entries', arrayToDelete)

    let previews2 = yield client.find(threadID, 'preview-entries', {})
    yield put(setUserItems_Action(previews2))
}   

export default function* watchSaveImage() {
    while(true) {
        let action = yield take(HANDLE_DELETE_FROM_PREVIEW)
        yield handleDeleteFromPreview(action.payload)    
    }
}


/////////////////////////////////////////////
///////// Helper Functions
////////////////////////////////////////////

const getDeleteItemsArray = (itemsToDelete, previews) => {
    let array = []
    for (let i = 0; i < itemsToDelete.length; i++) {
        let item = previews.filter(item => item.timestamp === itemsToDelete[i].timestamp)
        if (item[0] !== undefined) array.push(item[0]._id)
    }

    return array;
}
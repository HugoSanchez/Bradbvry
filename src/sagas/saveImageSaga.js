import {HANDLE_SAVE_IMAGE} from '../actions/types';
import {take, select, put, call} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {Mixpanel, Textile} from '../utils';
import {uploadUrl} from '../constants';
import axios from 'axios';

import {
    handleAddItemToPreview_Action, 
    addItemToThreadItems_Action,
    addItemToItemsArray_Action,
    setUserItems_Action,
    setThreadItems_Action
} from '../actions';

const getThreadsState = state => state

function* handleSaveImage(action) {
    // Every time the user saves a new photo from the UploadImageForm
    // this saga gets executed.
    const state = yield select(getThreadsState)
    const files = action.payload.files 

    const client = state.user.client
    const address = state.user.address
    const threadItems = state.threads.threadItems
    const activeThread = state.threads.activeThread

    if (files.length === 0){throw new Error('no files present')}
    if (!activeThread) {throw new Error('no selected thread')}
    const threadId = ThreadID.fromString(activeThread.id)

    for (let i = 0; i < files.length; i++) {

        let formData = new FormData();
        formData.append('file', files[i]);
        formData.append('type', files[i].type);

        let res = yield axios.post(uploadUrl, formData) 
        let entry = {contentURI: res.data.contentURI, type: files[i].type, createdBy: address, timestamp: Date.now()}
        let saved = yield Textile.createNewEntry(client, threadId, entry)
        let savedEntries = yield client.find(threadId, 'entries', {_id: saved[0]})
        let savedEntry = savedEntries[threadItems.length + i]
        yield put(addItemToThreadItems_Action(savedEntry))
        yield put(addItemToItemsArray_Action(savedEntry))
        yield addItemToPreview(client, savedEntry)
        Mixpanel.track('NEW_ITEM', {type: 'image'})
    }
}

function* addItemToPreview(client, item) {
    let previewThreadId = localStorage.getItem('previewEntriesID')
    let threadID = ThreadID.fromString(previewThreadId)
    yield client.create(threadID, 'preview-entries', [item])
}


export default function* watchSaveImage() {
    while(true) {
        let action = yield take(HANDLE_SAVE_IMAGE)
        yield handleSaveImage(action)    
    }
}

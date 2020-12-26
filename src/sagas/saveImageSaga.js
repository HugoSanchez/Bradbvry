import {HANDLE_SAVE_IMAGE} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {Mixpanel, Textile, getBase64} from '../utils';

const getThreadsState = state => state

function* handleSaveImage(action) {
    // Every time the user saves a new photo from the UploadImageForm
    // this saga gets executed.
    const state = yield select(getThreadsState)
    const files = action.payload.files

    const client = state.user.client
    const activeThread = state.threads.activeThread

    if (files.length === 0){throw new Error('no files present')}
    if (!activeThread) {throw new Error('no selected thread')}
    const threadId = ThreadID.fromString(activeThread.id)

    for (let i = 0; i < files.length; i++) {
        let file = yield getBase64(files[i])
        let entry = {entry: file, type: 'file'}
        let saved = yield Textile.createNewEntry(client, threadId, entry)
        Mixpanel.track('NEW_ITEM', {type: 'image'})
    }
}


export default function* watchSaveImage() {
    while(true) {
        let action = yield take(HANDLE_SAVE_IMAGE)
        yield handleSaveImage(action)    
    }
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

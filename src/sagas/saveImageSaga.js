import {HANDLE_SAVE_IMAGE} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {Mixpanel, Textile, getBase64} from '../utils';
import axios from 'axios';

const getThreadsState = state => state

function* handleSaveImage(action) {
    // Every time the user saves a new photo from the UploadImageForm
    // this saga gets executed.
    const state = yield select(getThreadsState)
    const files = action.payload.files 

    const client = state.user.client
    const address = state.user.address
    const activeThread = state.threads.activeThread

    if (files.length === 0){throw new Error('no files present')}
    if (!activeThread) {throw new Error('no selected thread')}
    const threadId = ThreadID.fromString(activeThread.id)

    for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        let file = yield getBase64(files[i])
        let data = {entry: file, type: files[i].type, path: files[i].path}

        let res = yield axios.post("http://localhost:1000/api/uploadToIpfs", data) 
        let entry = {metadataURI: res.data.contentUrl, type: files[i].type, createdBy: address}
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

import {HANDLE_SAVE_ITEM} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {Mixpanel, Textile} from '../utils';
import {ThreadID} from '@textile/hub';
import {uploadUrl} from '../constants';
import axios from 'axios';

import {
    addItemToItemsArray_Action,
    setThreadItems_Action,
    setUserItems_Action, 
} from '../actions';


const getThreadsState = state => state

function* handleSaveItem(action) {

    // Every time the user presses the round "back button" in the Editor
    // this function gets called which handles 3 posible scenarios:
    // 1) A new post, 2) an update to existing one, 3) nothing.

    let post = action.payload
    let blocks = post.blocks
    
    const state = yield select(getThreadsState)
    const isContent = action.payload.blocks.find(
        block => block.text.length > 0 || block.type == 'image')

    const {
        client,
        address
    } = state.user;

    const {
        activeItem,
        activeThread,
        threadItems,
    } = state.threads;

    // First check if there is activeThread, and throw error if not
    // Then get the threadId instance for the current thread.
    if (!activeThread) {throw new Error('No selected thread')}
    const threadId = ThreadID.fromString(activeThread.threadId)

    // If activeItem exists, it means that the user edited an existing post
    // We check weather any changes were actually made and update if so.
    if (activeItem) {

        let {data} = yield axios.get(activeItem.contentURI)

        let stringItem = JSON.stringify(data)
        let stringContent = JSON.stringify(post)        

        if (stringContent !== stringItem) { 
            // 1. Make a copy of activeItem and update images.
            let updatedEntry = Object.assign({}, activeItem)            
            let updatedPost = yield checkIfImageAndUploadToIPFS(post)

            // 2. Upload entry to IPFS and update copy.
            let res = yield uploadEntryToIPFS(updatedPost)
            updatedEntry.contentURI = res.data.contentURI

            // 3. Update threadDB.
            yield client.save(threadId, 'entries', [updatedEntry])

            // 4. Update redux state.
            let index = threadItems.indexOf(activeItem)
            let array = threadItems.filter(item => item !== activeItem)
            array.splice(index, 0, updatedEntry)
            yield put(setThreadItems_Action(array))

            // 5. Update preview.
            yield updatePreviewItem(client, activeItem, updatedEntry)
        }

    }

    // If there was no activeItem, content is new. We check if content is not empty
    // if so, post new entry and update itemsArray.
    else if (isContent) {
        
        // Check images and upload them 
        let updatedPost = yield checkIfImageAndUploadToIPFS(post)

        // 1. Upload entry to IPFS
        let data = {type: 'application/json', entry: updatedPost}
        let res = yield axios.post(uploadUrl, data) 
        
        // 2. Save entry in threadDB
        let entry = {contentURI: res.data.contentURI, type: 'post', createdBy: address, threadId: activeThread.threadId,}
        let saved = yield Textile.createNewEntry(client, threadId, entry)

        // 3. Update redux state with new entry
        let savedEntries = yield client.find(threadId, 'entries', {})
        let savedEntry = savedEntries.filter(entry => entry._id === saved[0])
        let updatedItems = Array.from(threadItems)
		updatedItems.unshift(savedEntry)

        // 4. Add item to preview and track
        yield put(addItemToItemsArray_Action(savedEntry[0]))
        yield addItemToPreview(client, savedEntry[0])
        Mixpanel.track('NEW_ITEM', {type: 'post'})
    }

        yield action.callback()
}

function* addItemToPreview(client, item) {
    let previewThreadId = localStorage.getItem('previewEntriesID')
    let threadID = ThreadID.fromString(previewThreadId)
    yield client.create(threadID, 'preview-entries', [item])
}

function* updatePreviewItem(client, oldItem, newItem) {
    let previewThreadId = localStorage.getItem('previewEntriesID')
    let threadID = ThreadID.fromString(previewThreadId)
    let previews = yield client.find(threadID, 'preview-entries', {})

    let itemToUpdate = previews.filter(item => item._id === oldItem._id)
    newItem._id = itemToUpdate[0]._id
    yield client.save(threadID, 'preview-entries', [newItem])
    let previews2 = yield client.find(threadID, 'preview-entries', {})
    yield put(setUserItems_Action(previews2.reverse()))
}


export default function* watchSaveItem() {
    while(true) {
        let action = yield take(HANDLE_SAVE_ITEM)
        yield handleSaveItem(action)    
    }
}

/////////////////////////////////////////////////
/////// Helper Functions
////////////////////////////////////////////////

const checkIfImageAndUploadToIPFS = async (post) => {
    // This for loop takes any image in the entry
    // uploades it to IPFS, and updates the entry.
    let blocks = post.blocks

    for (let i = 0; i < blocks.length; i++) {
        // 1. Check if contains new images
        if (blocks[i].type === 'image' && 
            !blocks[i].data.url.includes('fleek')) { 
            
            // 2. If so, get binary data.
            let blob = await fetch(blocks[i].data.url).then(r => r.blob())
            
            // 3. Instantiate form data.
            let formData = new FormData();
            formData.append('file', blob)
            formData.append('type', 'image')
            
            // 4. Send to backend and update entry
            let res = await axios.post(uploadUrl, formData) 
            post.blocks[i].data.url = res.data.contentURI
        }
    }

    return post
}

const uploadEntryToIPFS = async (post) => {
    // Upload JSON object to IPFS.
    let data = {type: 'application/json', entry: post}
    return await axios.post(uploadUrl, data) 
}


import {HANDLE_SAVE_ITEM} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setThreadItems_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';
import {ThreadID} from '@textile/hub';
import {uploadUrl} from '../constants';
import axios from 'axios';


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
    const threadId = ThreadID.fromString(activeThread.id)

    // If activeItem exists, it means that the user edited an existing post
    // We check weather any changes were actually made and update if so.
    if (activeItem) {
        let stringItem = activeItem.entry
        let stringContent = action.payload

        if (stringContent !== stringItem) { 
            let updatedPost = Object.assign({}, activeItem)
            updatedPost.entry = stringContent

            let index = threadItems.indexOf(activeItem)
            let array = threadItems.filter(item => item !== activeItem)
            array.splice(index, 0, updatedPost)

            yield client.save(threadId, 'entries', [updatedPost])
            yield put(setThreadItems_Action(array))
        }
    }

    // If there was no activeItem, content is new. We check if content is not empty
    // if so, post new entry and update itemsArray.
    else if (isContent) {

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].type === 'image') { 
                // This for loop takes any image in the entry
                // uploades it to IPFS, and updates the entry.
                let blob = yield fetch(blocks[i].data.url).then(r => r.blob())

                let formData = new FormData();
                formData.append('file', blob)
                formData.append('type', 'image')

                let res = yield axios.post(uploadUrl, formData) 
                post.blocks[i].data.url = res.data.contentURI
            }
        }

        // 1. Upload entry to IPFS
        let data = {type: 'application/json', entry: post}
        let res = yield axios.post(uploadUrl, data) 
        
        // 2. Save entry in threadDB
        let entry = {contentURI: res.data.contentURI, type: 'post', createdBy: address}
        let saved = yield Textile.createNewEntry(client, threadId, entry)

        // 3. Update redux state with new entry
        let savedEntry = yield client.find(threadId, 'entries', {_id: saved[0]})
        let updatedItems = Array.from(threadItems)
		updatedItems.unshift(savedEntry)
        yield put(setThreadItems_Action(updatedItems))
        Mixpanel.track('NEW_ITEM', {type: 'post'})
    }
}


export default function* watchSaveItem() {
    while(true) {
        let action = yield take(HANDLE_SAVE_ITEM)
        yield handleSaveItem(action)    
    }
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

const postAndParse = async (activeThread, newItem) => {
    // First post new entry, then get entry from thread, 
    // and parse it with thread info. Return pasred post.
    let newPostId = await activeThread.post(newItem)
    let posts = await activeThread.getPosts()
    let newPost = posts.find(post => post.postId === newPostId)
    newPost.threadAddress = activeThread.address
    newPost.threadName = activeThread._name
    newPost.threadOwner = activeThread._firstModerator
    return newPost
}

function binaryStringToBuffer(string) {
    const groups = string.match(/[01]{16}/g);
    const numbers = groups.map(binary => parseInt(binary, 2))

    return Buffer.from(new Uint16Array(numbers).buffer);
}
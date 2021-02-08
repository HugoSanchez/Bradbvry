import {HANDLE_SAVE_ITEM} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setThreadItems_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';
import {ThreadID} from '@textile/hub';


const getThreadsState = state => state

function* handleSaveItem(action) {

    // Every time the user presses the round "back button" in the Editor
    // this function gets called which handles 3 posible scenarios:
    // 1) A new post, 2) an update to existing one, 3) nothing.

    const state = yield select(getThreadsState)
    const newItem = {type: 'post', entry: JSON.stringify(action.payload)}
    const isContent = action.payload.blocks.find(block => block.text.length > 0)

    const {
        client
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
        console.log('1')
        let saved = yield Textile.createNewEntry(client, threadId, newItem)
        console.log('2')
        let entry = yield client.find(threadId, 'entries', {_id: saved[0]})

        let updatedItems = Array.from(threadItems)
		updatedItems.unshift(entry)

        // yield put(setThreadItems_Action(updatedItems))
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
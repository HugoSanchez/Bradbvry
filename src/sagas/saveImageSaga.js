import {HANDLE_SAVE_IMAGE} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {ThreadID} from '@textile/hub';
import {setUserItems_Action} from '../actions';
import {Mixpanel, Textile, getBase64} from '../utils';

const getThreadsState = state => state

function* handleSaveImage(action) {
    // Every time the user saves a new photo from the UploadImageForm
    // this saga gets executed.
    const state = yield select(getThreadsState)
    const files = action.payload.files

    const client = state.user.client
    const {
        activeThread,
        itemsArray,
    } = state.threads;

    if (files.length === 0){throw new Error('no files present')}
    if (!activeThread) {throw new Error('no selected thread')}
    const threadId = ThreadID.fromString(activeThread.id)

    for (let i = 0; i < files.length; i++) {
        let file = yield getBase64(files[i])
        let entry = {entry: file, type: 'file'}
        let saved = yield Textile.createNewEntry(client, threadId, entry)
        console.log('Saved: ', saved)
        Mixpanel.track('NEW_ITEM', {'type': 'image'})
    }


    /** 
    // It stringifies the object, posts it and 
    // updates the state with the parsed post.
    let newPost = yield postAndParse(activeThread, newImage)
    let newArray = [...itemsArray]
    newArray.push(newPost)
    yield put(setUserItems_Action(newArray))
    Mixpanel.track('NEW_ITEM', {'type': 'image'})
    */
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

const postAndParse = async (activeThread, newImage) => {
    // First post new entry, then get entry from thread, 
    // and parse it with thread info. Return pasred post.
    let newPostId = await activeThread.post(newImage)
    let posts = await activeThread.getPosts()
    let newPost = posts.find(post => post.postId === newPostId)
    newPost.threadAddress = activeThread.address
    newPost.threadName = activeThread._name
    newPost.threadOwner = activeThread._firstModerator
    return newPost
}
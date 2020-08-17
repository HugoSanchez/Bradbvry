import {HANDLE_SAVE_IMAGE} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setUserItems_Action} from '../actions';

const getThreadsState = state => state.threads

function* handleSaveImage(action) {
    // Every time the user saves a new photo from the UploadImageForm
    // this saga gets executed.
    const state = yield select(getThreadsState)
    const newImage = {type: 'image', content: action.payload}

    const {
        activeThread,
        itemsArray,
    } = state;

    // It stringifies the object, posts it and 
    // updates the state with the parsed post.
    let newPost = yield postAndParse(activeThread, newImage)
    let newArray = [...itemsArray]
    newArray.push(newPost)
    yield put(setUserItems_Action(newArray))
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
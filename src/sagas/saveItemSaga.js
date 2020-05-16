import {HANDLE_SAVE_ITEM} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setUserItems_Action} from '../actions';

const getThreadsState = state => state.threads

function* handleSaveItem(action) {
    // Every time the user presses the round "back button" in the Editor
    // this function gets called which handles 3 posible scenarios:
    // A new post, a update to existing one, nothing.

    const state = yield select(getThreadsState)
    const newItem = {type: 'entry', content: action.payload}
    const isContent = newItem.content.blocks.find(block => block.text.length > 0)

    const {
        activeItem,
        activeThread,
        itemsArray,
    } = state;

    // If activeItem exists, it means that the user edited an existing post
    // We check weather any changes were actually made and update if so.
    if (activeItem) {
        let stringContent = JSON.stringify(newItem.content.blocks)
        let stringItem = JSON.stringify(activeItem.message.content.blocks)

        if (stringContent !== stringItem) { 
            yield activeThread.deletePost(activeItem.postId)
            let newPost = yield postAndParse(activeThread, newItem)
            let index = itemsArray.indexOf(activeItem)
            let array = itemsArray.filter(item => item !== activeItem)
            array.splice(index, 0, newPost)
            yield put(setUserItems_Action(array))
        }
    }
    // If there was no activeItem, content is new. We check if content is not empty
    // if so, post new entry and update itemsArray.
    else if (isContent) {
        let newPost = yield postAndParse(activeThread, newItem)
        let array = itemsArray.push(newPost)
        yield put(setUserItems_Action(array))
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
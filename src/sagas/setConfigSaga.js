import {SET_INITIAL_CONFIG} from '../actions/types';
import {takeEvery, put} from 'redux-saga/effects';
import {ThreeBox} from '../utils';
import Box from '3box';
import {
    setUserItems_Action,
    setThreadArray_Action,
    setInitialUserData_Action
} from '../actions';


function* handleThreads(threads, space, account) {    
    if (threads.length === 0) {

        let privateThreadConfigObject = ThreeBox.getPrivateThreadObject()
        let privateThread = yield ThreeBox.createConfidentialThread(
            space, account, 'private-thread', 'private')
        yield privateThread.post({type: 'config', content: privateThreadConfigObject})

        
        let globalThreadConfigObject = ThreeBox.getGlobalThreadObject()
        let globalThread = yield ThreeBox.createConfidentialThread(
            space, account, 'bradbvry-global-test', 'public')
        yield globalThread.post({type: 'config', content: globalThreadConfigObject})
    }

    let {itemsArray, parsedThreads} = yield parseThreadsAndPosts_Helper(threads, space)
    yield put(setThreadArray_Action(parsedThreads))

    let sortedItems = yield sortItemsArray(itemsArray)
    yield put(setUserItems_Action(sortedItems))
}

function* handleConfig() {

    let accounts    = yield window.ethereum.enable();
    let box         = yield Box.openBox(accounts[0], window.ethereum)
    let space       = yield box.openSpace('bradbvry--main')
    let profile     = yield Box.getProfile(accounts[0])
    let threads     = yield space.subscribedThreads()

    yield put(setInitialUserData_Action({box, space, profile, accounts}))
    yield handleThreads(threads, space, accounts[0])
}

export default function * watchInitialConfig() {
    yield takeEvery(SET_INITIAL_CONFIG, handleConfig)
}


/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

const parseThreadsAndPosts_Helper = async (threads, space) => {
    let itemsArray = [];
    let parsedThreads = [];

    for (let i = 0; i < threads.length; i++) {
        let thread = await space.joinThreadByAddress(threads[i].address)
        let posts = await thread.getPosts()

        for(let z = 0; z < posts.length; z++) {
            if (posts[z].message.type === 'config') {
                thread.config = posts[z].message.content
                parsedThreads.push(thread)
            }
            else { 
                posts[z].threadName = thread._name
                posts[z].threadAddress = thread.address
                posts[z].threadowner = thread._firstModerator
                itemsArray.push(posts[z])
            }
        }
    }
    return {itemsArray, parsedThreads}
}

const sortItemsArray = (itemsArray) => {
    return itemsArray.sort((a, b) => {
       return parseInt(b.message.timestamp) - parseInt(a.message.timestamp)
    });
}
        
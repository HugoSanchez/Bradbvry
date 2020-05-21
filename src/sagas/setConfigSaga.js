import {SET_INITIAL_CONFIG} from '../actions/types';
import {takeEvery, put} from 'redux-saga/effects';
import {firstDefaultEntry} from '../constants';
import {ThreeBox} from '../utils';
import Box from '3box';
import {
    setUserItems_Action,
    setThreadArray_Action,
    setInitialUserData_Action
} from '../actions';

function* handleThreads(threads, space, account) {  
    // If it's a new user, it creates the first two threads with its config posts
    // and also it posts the welcome message. If not, for each thread, 
    // it parses and sets the items.
    
    if (threads.length === 0) {
        let stringify = JSON.stringify(firstDefaultEntry)
        let parse = JSON.parse(stringify)

        let privateThreadConfigObject_one = ThreeBox.getFirstPrivateThreadObject()
        let privateThread_one = yield ThreeBox.createConfidentialThread(
            space, account, 'random-notes', 'private')
        yield privateThread_one.post({type: 'config', content: privateThreadConfigObject_one})
        yield privateThread_one.post({type: 'entry', content: parse})

        let privateThreadConfigObject_two = ThreeBox.getSecondPrivateThreadObject()
        let privateThread_two = yield ThreeBox.createConfidentialThread(
            space, account, 'diary-entries', 'private')
        yield privateThread_two.post({type: 'config', content: privateThreadConfigObject_two})
        yield privateThread_two.post({type: 'entry', content: parse})

        let privateThreadConfigObject_three = ThreeBox.getThirdPrivateThreadObject()
        let privateThread_three = yield ThreeBox.createConfidentialThread(
            space, account, 'photo-collection', 'private')
        yield privateThread_three.post({type: 'config', content: privateThreadConfigObject_three})
        yield privateThread_three.post({type: 'entry', content: parse})

        let globalThreadConfigObject = ThreeBox.getGlobalThreadObject()
        let globalThread = yield ThreeBox.createConfidentialThread(
            space, account, 'bradbvry-global-test', 'public')
        yield globalThread.post({type: 'config', content: globalThreadConfigObject})
       
    }

    let reversedThreads = threads.reverse()
    let {itemsArray, parsedThreads} = yield parseThreadsAndPosts_Helper(reversedThreads, space)
    yield put(setThreadArray_Action(parsedThreads))

    let sortedItems = yield sortItemsArray(itemsArray)
    yield put(setUserItems_Action(sortedItems))
}

function* handleConfig() {
    // Identify user, instantiate 3box elements, 
    // and set them in redux state. Next handle threads.
    let accounts    = yield window.ethereum.enable();
    let box         = yield Box.openBox(accounts[0], window.ethereum)
    let space       = yield box.openSpace('bradbvry--main')
    let profile     = yield Box.getProfile(accounts[0])
    let threads     = yield space.subscribedThreads()

    // threads.forEach(async thread => await space.unsubscribeThread(thread.address))

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
        // let stringify = JSON.stringify(firstDefaultEntry)
        // let parse = JSON.parse(stringify)
        // await thread.post({type: 'entry', content: parse})
        // await thread.post({type: 'entry', content: parse})
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
        
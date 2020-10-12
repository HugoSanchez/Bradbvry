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

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

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

        let privateThreadConfigObject_three = ThreeBox.getThirdPrivateThreadObject()
        let privateThread_three = yield ThreeBox.createConfidentialThread(
            space, account, 'photo-collection', 'private')
        yield privateThread_three.post({type: 'config', content: privateThreadConfigObject_three})

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
    let data        = yield magic.user.getMetadata()
    let email       = data.email
    let address     = data.publicAddress
    let box         = yield Box.openBox(address, magic.rpcProvider)
    let space       = yield box.openSpace('bradbvry--main')
    let profile     = yield Box.getProfile(address)
    let threads     = yield space.subscribedThreads()
    yield console.log(threads)
    
    //threads.forEach(async thread => await space.unsubscribeThread(thread.address))
    //let threads2     = yield space.subscribedThreads()
    //yield console.log(threads2)

    yield put(setInitialUserData_Action({box, space, profile, address, email}))
    yield handleThreads(threads, space, address)

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
        try {
            let thread = await space.joinThreadByAddress(threads[i].address)
            let posts = await thread.getPosts()
            console.log('Thread ', i)
            console.log(posts)


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
        catch (error) {
            console.log('error', error)
            return null
        }
        
    }
    return {itemsArray, parsedThreads}
}

const sortItemsArray = (itemsArray) => {
    return itemsArray.sort((a, b) => {
       return parseInt(b.timestamp) - parseInt(a.timestamp)
    });
}
        
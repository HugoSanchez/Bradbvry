import {SET_INITIAL_CONFIG} from '../actions/types';
import {takeEvery, put, call, all} from 'redux-saga/effects';
import {ThreeBox} from '../utils';
import Box from '3box';
import {
    setThreadArray_Action,
    setInitialUserData_Action
} from '../actions';


function* handleThreads(threads, space, account) {
    let parsedThreads = [];
    let itemsArray = [];
    
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

    let array = yield call(parseThreadsAndPosts_Helper, space, threads, [], [])
    yield console.log('here', array)
    
    // yield put(setThreadArray_Action(parsedThreads))    
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

function parseThreadsAndPosts_Helper(space, threads, itemsArray, parsedThreads) {

    return new Promise((resolve, reject) => {
        threads.forEach(async threadObj => {

            let thread = await space.joinThreadByAddress(threadObj.address) 
            let posts = await thread.getPosts()
        
            posts.forEach(post => {
    
                if (post.message.type === 'config') { 
                    thread.config = post.message.content
                    parsedThreads.push(thread)
                }
                else {
                    post.threadName = thread.config.name
                    post.threadAddress = thread.address
                    post.threadowner = thread._firstModerator
                    itemsArray.push(post)
                    console.log(itemsArray)
                }
            })
        })
        resolve({itemsArray, parsedThreads})
    })
}
    
        
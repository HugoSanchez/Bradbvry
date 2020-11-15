import {SET_INITIAL_CONFIG} from '../actions/types';
import {takeLeading, put} from 'redux-saga/effects';
import {firstDefaultEntry} from '../constants';
import {ThreeBox} from '../utils';
import Box from '3box';
import {
    setUserItems_Action,
    setThreadArray_Action,
    setInitialUserData_Action,
    setUserIsLogged_Action
} from '../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

function* handleThreads(threads, space, account) {  
    
    if (threads.length <= 1) {

        // If it's a new user, it creates the first three threads with its config posts
        // and also it posts the welcome message.
        let {sortedItems, parsedThreads} = yield createFirstThreeCollections(space, account)
        yield put(setThreadArray_Action(parsedThreads))
        yield put(setUserItems_Action(sortedItems))

    } else {

        // If not, for each thread, 
        // it parses and sets the items.
        let {sortedItems, parsedThreads} = yield parseThreadsAndPosts_Helper(threads, space)
        yield put(setThreadArray_Action(parsedThreads))
        yield put(setUserItems_Action(sortedItems))

    }
}


function* handleConfig() {
    // Identify user, instantiate 3box elements, 
    // and set them in redux state. Next handle threads.
    let data        = yield magic.user.getMetadata()
    let email       = data.email
    let address     = data.publicAddress
    // Set first user data.
    yield put(setUserIsLogged_Action({
        bool: true,
        address,
        email
    }))
    // Instantiate 3Box space and threads.
    // Console.log each step for debugging (will delete someday).
    let box         = yield Box.openBox(address, magic.rpcProvider)
    yield console.log('1 - box')
    let space       = yield box.openSpace('bradbvry--main')

    // yield space.unsubscribeThread('/orbitdb/zdpuAm53JATNbiyhvhUie9VoMiy4c2JQGgDHsYyRNNPpqaUbv/3box.thread.bradbvry--main.photo-collection')
    // yield space.unsubscribeThread("/orbitdb/zdpuAm53JATNbiyhvhUie9VoMiy4c2JQGgDHsYyRN…qaUbv/3box.thread.bradbvry--main.photo-collection")
    // yield space.unsubscribeThread("/orbitdb/zdpuArwbRYpf5w4gjTRQzkspwdwegd3KnUWE6JygHepeioAQv/3box.thread.bradbvry--main.photo-collection")

    

    
    yield console.log('2- space')
    let profile     = yield Box.getProfile(address)
    yield console.log('3- profile')
    let threads     = yield space.subscribedThreads()
    yield console.log('4- threads: ', threads)

    if (threads.length === 0) {
        // We are instantiating 3box and spaces twice to make sure that 
        // 3box is not returning an empty array by mistake (it happens when
        // user clears cookies or user is new). Ugly fix, but works.
        let box         = yield Box.openBox(address, magic.rpcProvider)
        yield console.log('5- box 2')
        let space       = yield box.openSpace('bradbvry--main')
        yield console.log('6- space 2')
        let threads     = yield space.subscribedThreads()
        yield console.log('7- threads2: ', threads)
    }
    // threads.forEach(async thread => await space.unsubscribeThread(thread.address))
    // let threads2     = yield space.subscribedThreads()
    // yield console.log(threads2)
    yield put(setInitialUserData_Action({box, space, profile, address, email}))
    yield handleThreads(threads, space, address)

}

export default function * watchInitialConfig() {
    yield takeLeading(SET_INITIAL_CONFIG, handleConfig)
}


/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

const createFirstThreeCollections = async (space, account) => {
    let stringify = JSON.stringify(firstDefaultEntry)
    let parse = JSON.parse(stringify)

    let privateThreadConfigObject_one = ThreeBox.getFirstPrivateThreadObject()
    let privateThread_one = await ThreeBox.createConfidentialThread(
        space, account, 'random-notes', 'private')
    await privateThread_one.post({type: 'config', content: privateThreadConfigObject_one})
    await privateThread_one.post({type: 'entry', content: parse})

    let privateThreadConfigObject_two = ThreeBox.getSecondPrivateThreadObject()
    let privateThread_two = await ThreeBox.createConfidentialThread(
        space, account, 'diary-entries', 'private')
    await privateThread_two.post({type: 'config', content: privateThreadConfigObject_two})

    let privateThreadConfigObject_three = ThreeBox.getThirdPrivateThreadObject()
    let privateThread_three = await ThreeBox.createConfidentialThread(
        space, account, 'photo-collection', 'private')
    await privateThread_three.post({type: 'config', content: privateThreadConfigObject_three})

    let threadsUpatedAgain = await space.subscribedThreads()
    let {sortedItems, parsedThreads} = await parseThreadsAndPosts_Helper(threadsUpatedAgain, space)
    
    return {sortedItems, parsedThreads}
}

const parseThreadsAndPosts_Helper = async (threads, space) => {

    console.log('Parsing user data...')

    let itemsArray = [];
    let parsedThreads = [];
    let reversedThreads = threads.reverse()
    
    for (let i = 0; i < reversedThreads.length; i++) {
        try {

            let thread = await space.joinThreadByAddress(reversedThreads[i].address)
            console.log(reversedThreads[i].address)
            let posts = await thread.getPosts()
            console.log(posts)
            for(let z = 0; z < posts.length; z++) {
                if (posts[z].message.type === 'config') {
                    // console.log(posts[z])
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
        }
    }
    console.log('for loop done')
    let sortedItems = await sortItemsArray(itemsArray)
    return {sortedItems, parsedThreads}
}

const sortItemsArray = (itemsArray) => {
    return itemsArray.sort((a, b) => {
       return parseInt(b.timestamp) - parseInt(a.timestamp)
    });
}
        
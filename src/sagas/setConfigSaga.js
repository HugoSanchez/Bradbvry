import {SET_INITIAL_CONFIG} from '../actions/types';
import {takeLeading, put} from 'redux-saga/effects';
import {firstDefaultEntry} from '../constants';
import {ThreeBox, Textile} from '../utils';
import Box from '3box';

import {Client, ThreadID, Buckets, Users, Identity, UserAuth, PrivateKey, createUserAuth} from '@textile/hub';

import {
    setUserItems_Action,
    setThreadArray_Action,
    setInitialUserData_Action,
    setUserIsLogged_Action
} from '../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

function* handleThreads(threads, client) {  

    
    yield console.log('threads: ', threads)

    let config = {name: 'hello', description: 'world'}
    // yield Textile.createNewThreadDB(client, config)

    // yield Textile.createNewEntry(client, 'something', config)
}


function* handleConfig() {
    // Get user address and email from magic.
    let data = yield magic.user.getMetadata()
    let email = data.email
    let address = data.publicAddress

    // Get user public profile.
    let profile = yield Box.getProfile(address)

    // Get user identity (textile), instantiate client, 
    // Authenticate user, and fetch its threads.
    let hubKey = process.env.REACT_APP_TEXTILE_HUB_KEY
    let identity    = yield Textile.getIdentity(magic)
    let client      = yield Client.withKeyInfo({key: hubKey})
    let userToken   = yield client.getToken(identity)  
    let threads     = yield client.listThreads()
    console.log('threads: ', threads)

    // Dispatch initial user data to reducer
    yield put(setInitialUserData_Action({
        email,
        address, 
        client,
        identity,
        profile
    }))

    yield handleThreads(threads, client)
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
                    console.log(posts[z])
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
        
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

function* handleThreads(threads, space, account) {  
    
}


function* handleConfig() {
    yield console.log('we are here')
    let identity = yield Textile.getIdentity(magic)
    yield console.log('done: ', identity)
    let hubKey = process.env.REACT_APP_TEXTILE_HUB_KEY
    let client = yield Client.withKeyInfo({key: hubKey})
    console.log(client)

    let userToken = yield client.getToken(identity)
    console.log('userto: ', userToken)
      
    let threads = yield client.listThreads()
    console.log('threads: ', threads)
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
        
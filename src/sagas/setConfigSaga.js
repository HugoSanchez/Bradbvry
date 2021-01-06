import {SET_INITIAL_CONFIG} from '../actions/types';
import {take, put} from 'redux-saga/effects';
import {Textile} from '../utils';
import Box from '3box';

import {
    Client, 
    ThreadID, 
    Users
} from '@textile/hub';

import {
    setUserItems_Action,
    setThreadArray_Action,
    setInitialUserData_Action,
    setMasterThreadID_Action,
    setUserIsLogged_Action
} from '../actions';
import { identify } from 'mixpanel-browser';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

function* handleThreads(threads, client, identity, action) { 
    // Get master thread name string.
    let masterThreadName = Textile.getMasterThreadString(identity)
    
    if (threads.length === 0) {
        let masterThreadID = yield Textile.createMasterThreadDB(client, masterThreadName)
    }

    let masterThread = threads.find(thread => thread.name === masterThreadName)
    let threadID = ThreadID.fromString(masterThread.id)
    let entries = yield client.find(threadID, 'collections-list', {})

    console.log('ENTRIES: ', entries)

    let {itemsArray, parsedThreads} = yield parseThreadsAndPosts_Helper(threads, client)

    yield put(setMasterThreadID_Action(threadID))
    yield put(setThreadArray_Action(parsedThreads))

    yield console.log(typeof action.callback)
    if (action.callback !== undefined) { yield action.callback(parsedThreads)}
}


function* handleConfig(action) {
    // Get user address and email from magic.
    let data = yield magic.user.getMetadata()
    let email = data.email
    let address = data.publicAddress

    // Get user public profile.
    let profile         = yield Box.getProfile(address)

    // Get user identity (textile), instantiate client, 
    // Authenticate user, and fetch its threads.
    let hubKey          = process.env.REACT_APP_TEXTILE_HUB_KEY
    let identity        = yield Textile.getIdentity(magic)
    let client          = yield Client.withKeyInfo({key: hubKey})
    let userToken       = yield client.getToken(identity)  
    let threads         = yield client.listThreads()

    // Set up user mailbox.
    let mailboxClient   = yield Users.withKeyInfo({key: hubKey})
    let mailToken       = yield mailboxClient.getToken(identity)
    let mailboxID       = yield mailboxClient.setupMailbox()
    let inbox           = yield mailboxClient.listInboxMessages()
    mailboxClient.watchInbox(mailboxID, (event) => {console.log('OP: ', event)})


    // let message = 'This is a new message to you u u'
    // yield Textile.sendMessage(mailboxClient, message, identity, identity.public)
    yield Textile.decodeMessages(identity, inbox)

    yield console.log('ID: ', mailboxID)
    yield console.log('Meesages: ', inbox)




    // Dispatch initial user data to reducer
    yield put(setInitialUserData_Action({
        email,
        address, 
        client,
        identity,
        profile
    }))

    yield handleThreads(threads, client, identity, action)
}

export default function * watchInitialConfig() {
    while(true) {
        let action = yield take(SET_INITIAL_CONFIG)
        yield handleConfig(action)    
    }
}


/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////


const parseThreadsAndPosts_Helper = async (threads, client) => {

    console.log('Parsing user data...')

    let itemsArray = [];
    let parsedThreads = [];
    
    for (let i = 0; i < threads.length; i++) {
        try {

            // Get config object and thread entries.
            let threadId = ThreadID.fromString(threads[i].id)
            let config = await client.find(threadId, 'config', {})
            let entries = []
            // await client.find(threadId, 'entries', {})
            // Parse thread object.
            threads[i].config = config[0]
            parsedThreads.push(threads[i])
            
            // Iterate over entries and parse.
            for(let z = 0; z < entries.length; z++) {
                entries[z].threadName = threads[i].name
                entries[z].threadAddress = threads[i].id
                itemsArray.push(entries[z])
            }
        } 
        catch (error) {
            console.log('error', error)
        }
    }
    return {itemsArray, parsedThreads}
}

const sortItemsArray = (itemsArray) => {
    return itemsArray.sort((a, b) => {
       return parseInt(b.timestamp) - parseInt(a.timestamp)
    });
}
        
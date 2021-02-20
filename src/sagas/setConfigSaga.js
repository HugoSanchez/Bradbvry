import {SET_INITIAL_CONFIG} from '../actions/types';
import {take, put} from 'redux-saga/effects';
import {Textile, Eth} from '../utils';

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
    setUserMailbox_Action,
    setUserIsLogged_Action
} from '../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

function* handleThreads(threads, client, identity, action) { 
    // Get master thread name string.
    let masterThreadName = Textile.getMasterThreadString(identity)
    
    if (threads.length === 0) {
        // If user is new, create masterThread and set state
        // Collections will be an empty array.
        let masterThreadID = yield Textile.createMasterThreadDB(client, masterThreadName)
        let collections = yield client.find(masterThreadID, 'collections-list', {})
        yield put(setMasterThreadID_Action(masterThreadID))
        yield put(setThreadArray_Action(collections))


        if (action.callback !== undefined) {
            yield action.callback() }
    } 
    
    else {
        // Else, get masterThreadID and set collections.
        // This will be improved by sacing the master thread id somewhere.
        let masterThread = threads.find(thread => thread.name === masterThreadName)
        let threadID = ThreadID.fromString(masterThread.id)
        let collections = yield client.find(threadID, 'collections-list', {})
        // let {itemsArray, parsedThreads} = yield parseThreadsAndPosts_Helper(threads, client)
        yield put(setMasterThreadID_Action(threadID))
        yield put(setThreadArray_Action(collections))

        if (action.callback !== undefined) {
            yield action.callback() }
    } 
    
    
}

function* handleMailboxSetUp(identity) {
    // Set up user mailbox.
    let hubKey          = process.env.REACT_APP_TEXTILE_HUB_KEY
    let mailboxClient   = yield Users.withKeyInfo({key: hubKey})
    let mailToken       = yield mailboxClient.getToken(identity)
    let mailboxID       = yield mailboxClient.setupMailbox()
    let inbox           = yield mailboxClient.listInboxMessages()
    let sentBox         = yield mailboxClient.listSentboxMessages() 
    mailboxClient.watchInbox(mailboxID, (event) => {console.log('OP: ', event)})

    // let message = 'This is a new message to you u u'
    // yield Textile.sendMessage(mailboxClient, message, identity, identity.public)
    yield Textile.decodeMessages(identity, inbox)
    yield Textile.decodeMessages(identity, sentBox)

    yield put(setUserMailbox_Action({mailboxClient, inbox, sentBox}))
}


function* handleConfig(action) {
    yield console.time('set')
    // Get user address and email from magic.
    let data = yield magic.user.getMetadata()
    let email = data.email
    let address = data.publicAddress
    let provider = magic.rpcProvider

    // Get user public profile and signer.
    // Get user identity (textile), instantiate client, 
    let signer          = yield Eth.getSigner(magic)
    let hubKey          = process.env.REACT_APP_TEXTILE_HUB_KEY
    let identity        = yield Textile.getIdentity(magic)
    let client          = yield Client.withKeyInfo({key: hubKey})
    let userToken       = yield client.getToken(identity)  
    let threads         = yield client.listThreads()
    let identityString  = identity.public.toString()

    // Dispatch initial user data to reducer
    yield put(setInitialUserData_Action({
        email,
        address, 
        client,
        identity,
        signer,
        provider,
        identityString
    }))
    yield console.timeEnd('set')
    yield handleThreads(threads, client, identity, action)
    yield handleMailboxSetUp(identity)
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
        
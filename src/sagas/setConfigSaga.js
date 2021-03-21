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
        yield put(setThreadArray_Action(collections.reverse()))


        if (action.callback !== undefined) {
            yield action.callback() }
    } 
    
    else {
        // Else, get masterThreadID and set collections.
        // This will be improved by sacing the master thread id somewhere.
        let masterThread = threads.find(thread => thread.name === masterThreadName)
        let threadID = ThreadID.fromString(masterThread.id)
        let collections = yield client.find(threadID, 'collections-list', {})
        let previewItems = yield concatPreviewItems(collections, client)

        yield put(setMasterThreadID_Action(threadID))
        yield put(setThreadArray_Action(collections.reverse()))
        yield put(setUserItems_Action(previewItems))
        
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


const sortItemsArray = (itemsArray) => {
    return itemsArray.sort((a, b) => {
       return parseInt(b.timestamp) - parseInt(a.timestamp)
    });
}


const concatPreviewItems = async (threadsArray, client) => {
    // For each collection, get all entries 
    // and set the most recent ones in the itemsArray for preview.
    let itemsArray = [];

    for (let i = 0; i < threadsArray.length; i++) {
        let threadID = ThreadID.fromString(threadsArray[i].id)
        let entries = await client.find(threadID, 'entries', {})
        itemsArray = itemsArray.concat(entries.slice(entries.length - 10, entries.length))
    }

    return sortItemsArray(itemsArray)
}
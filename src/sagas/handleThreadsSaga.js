import { HANDLE_THREADS } from '../actions/types';
import { take, put, select } from 'redux-saga/effects';
import { Textile } from '../utils';
import { ThreadID } from '@textile/hub';

import {
    setUserItems_Action,
    setThreadArray_Action,
    setMasterThreadID_Action,
} from '../actions';
import axios from 'axios';
import { createUserUrl } from '../constants';


function* handleThreads(action) { 

    // This is the MAIN function and handles three possible scenarios: 
    // 1 - User is completly new (new signup).
    // 2 - User already exists but is logging in a new device.
    // 3 - User exists and is reloading or logging in again.
    
    // We first get the client and identity,
    // and check if master thread exists in local storage.
    let {client, identity} = action
    let address = yield select(state => state.user.address)
    let masterThreadID = localStorage.getItem('masterThreadID')
    if (!masterThreadID) {
        // We first check wether the user has threads or not.
        let threads = yield client.listThreads()
        // If, masterThread does not exist, and threads.length is 0,
        // this is a new signup and everything should be instantiated first.
        if (threads.length === 0) { yield handleNewUser(client, identity, address) }
        // If masterThread does not exist in localStorage, but threads is > 0
        // this is an existing user logging from a new device or clean browser.
        else { yield handleExistingUserNewSession(threads, client, identity) }
    }
    // Else user is realoding probably 
    // or loging in again in the same device.
    else { yield handleExistingUser(client, masterThreadID, address) }    

    if (action.callback !== undefined) {
        yield action.callback() }
}

///////////////////////////////////////////////////
///// SCENARIO 1: NEW USER SIGN UP
///////////////////////////////////////////////////
function* handleNewUser(client, identity, address) {
    // If user is new, create masterThread and set state
    // Collections will be an empty array.
    let masterThreadName = Textile.getMasterThreadString(identity)
    let masterThreadID = yield Textile.createMasterThreadDB(client, masterThreadName)
    let previewEntriesThreadID = yield Textile.createMasterPreviewEntriesDB(client, masterThreadName)
    //  Set local sotage for future sessions and create user
    localStorage.setItem('masterThreadID', masterThreadID)
    localStorage.setItem('previewEntriesID', previewEntriesThreadID)
    yield axios.post(createUserUrl, {address, masterThreadID, previewEntriesThreadID})

    // Set redux state.
    yield put(setMasterThreadID_Action(masterThreadID))
    yield put(setThreadArray_Action([]))
}

///////////////////////////////////////////////////
///// SCENARIO 2: EXISTING USER, NEW DEVICE
///////////////////////////////////////////////////
function* handleExistingUserNewSession(threads, client, identity) {
    // If the user is loging from a new device, 
    // get the names for master thread and preview.
    let masterThreadName = Textile.getMasterThreadString(identity)
    let previewEntriesName = Textile.getPreviewEntriesString(masterThreadName)
    // Get the threads objects.
    let masterThread = threads.find(thread => thread.name === masterThreadName)
    let previewEntriesThread = threads.find(thread => thread.name === previewEntriesName)
    // Set local storage for future reloads.
    localStorage.setItem('masterThreadID', masterThread.id)
    localStorage.setItem('previewEntriesID', previewEntriesThread.id)
    // Move on.
    yield handleExistingUser(client, masterThread.id)
}

///////////////////////////////////////////////////
///// SCENARIO 3: EXISTING USER, EXISTING DEVICE
///////////////////////////////////////////////////
function* handleExistingUser(client, masterThreadID, address) {
    // If user already exists, get their collections,
    // and preview items and set state.
    let threadID = ThreadID.fromString(masterThreadID)
    let collections = yield client.find(threadID, 'collections-list', {})
    // Set redux state.
    yield put(setMasterThreadID_Action(threadID))
    yield put(setThreadArray_Action(collections.reverse()))
    // Handle previewItems.
    yield handlePreviewItems(client)
}

function* handlePreviewItems(client) {
    let previewThreadId = localStorage.getItem('previewEntriesID')
    let threadID = ThreadID.fromString(previewThreadId)
    let previewItems = yield client.find(threadID, 'preview-entries', {})
    yield put(setUserItems_Action(sortItemsArray(previewItems)))
}

export default function * watchHandleThreads() {
    while(true) {
        let action = yield take(HANDLE_THREADS)
        yield handleThreads(action)    
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
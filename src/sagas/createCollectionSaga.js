import {HANDLE_CREATE_COLLECTION} from '../actions/types';
import {take, put, select} from 'redux-saga/effects';
import {setUserItems_Action} from '../actions';
import {Mixpanel, Textile} from '../utils';

const getThreadsState = state => state

function* handleCreateCollection(action) {
 
    const state = yield select(getThreadsState)
    const client = state.user.client

    let threadID = yield Textile.createNewThreadDB(client, action.payload)
    console.log('All whent well?: ', threadID)
    
    Mixpanel.track('NEW_COLLECTION')
}


export default function* watchCreateCollection() {
    while(true) {
        let action = yield take(HANDLE_CREATE_COLLECTION)
        yield handleCreateCollection(action)    
    }
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////


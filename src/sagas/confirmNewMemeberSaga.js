import {take, put, select} from 'redux-saga/effects';
import {Mixpanel, Textile} from '../utils';
import {handleSnackBarRender_Action} from '../actions'

import {
    HANDLE_CONFIRM_NEW_MEMBER, 
    SNACK_TYPE_SUCCESS
} from '../actions/types';


function* handleConfirmNewMemeber(action) {

    // Instantiate the things
    const state = yield select(state => state)
    const client = state.user.client

    let collection = action.payload
    let identities = collection.keyOwners.map(keyOwner => keyOwner.memberId)

    let writeValidator = Textile.getWriteValidator(identities)
    let newKeyOwnerArray = collection.keyOwners.map(keyOwner => {
        if (keyOwner.acknowledged === false) keyOwner.acknowledged = true
        return keyOwner
    })

    let threadID = Textile.getThreadIDFromString(collection.threadId)
    let config = Object.assign(collection, {})
    config.keyOwners = newKeyOwnerArray

    yield client.updateCollection(threadID, {name: 'entries', writeValidator})
    yield client.save(threadID, 'config', [config])
    yield put(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS))
    // Mixpanel.track('NEW_FOLLOW')
}


export default function* watchConfirmNewMember() {
    while(true) {
        let action = yield take(HANDLE_CONFIRM_NEW_MEMBER)
        yield handleConfirmNewMemeber(action)    
    }
}
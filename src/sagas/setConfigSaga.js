import {SET_INITIAL_CONFIG} from '../actions/types';
import {takeEvery, put} from 'redux-saga/effects';
import {
    setThreadArray_Action,
    setInitialUserData_Action} from '../actions';
import Box from '3box';


function* handleThreads(threads, space) {
    console.log('THREAAAAADS!!! ', threads)
}

function* handleConfig() {
    console.log('SAGA HIT!!')
    let accounts    = yield window.ethereum.enable();
    let box         = yield Box.openBox(accounts[0], window.ethereum)
    let space       = yield box.openSpace('bradbvry--main')
    let profile     = yield Box.getProfile(accounts[0])

    let threads     = yield space.subscribedThreads()
    // Pending: create threads if they don't exists.
    console.log('HERE!')
    yield put(setInitialUserData_Action({
        box, 
        space, 
        profile,
        accounts
        // threads, 
        // parsedItems, 
    }))
    console.log('THERE!')
    yield handleThreads(threads, space)
}

export default function * watchInitialConfig() {
    yield takeEvery(SET_INITIAL_CONFIG, handleConfig)
}


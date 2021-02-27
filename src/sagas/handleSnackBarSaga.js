import {
    HANDLE_SNACKBAR_RENDER,
    SNACK_TYPE_SUCCESS,
    SNACK_TYPE_ERROR,
} from '../actions/types';

import {
    setShowSnack_Action,
    setSnackColor_Action,
    setSnackMessage_Action,

} from '../actions';

import {
    take, 
    put, 
    delay,
} from 'redux-saga/effects';


function* handleSnackBar(action) {

    const snackType = action.payload;

    console.log('HANDLE SNACK SAGA')

    switch(snackType){

        case SNACK_TYPE_SUCCESS:
            yield put(setSnackMessage_Action('Success!'))
            yield put(setSnackColor_Action('#C5FFDC'))
            yield put(setShowSnack_Action(true))
            yield delay(4000)
            yield put(setShowSnack_Action(false))

        case SNACK_TYPE_ERROR:
            yield put(setSnackMessage_Action('Oops, please try again!'))
            yield put(setSnackColor_Action('rgb(254, 200, 200)'))
            yield put(setShowSnack_Action(true))
            yield delay(4000)
            yield put(setShowSnack_Action(false))
        
        default: return;
    }

}


export default function* watchHandleSnackBar() {
    while(true) {
        let action = yield take(HANDLE_SNACKBAR_RENDER)
        yield handleSnackBar(action)    
    }
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////


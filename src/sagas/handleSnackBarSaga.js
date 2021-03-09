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

import { toast } from 'react-toastify';


function* handleSnackBar(action) {

    const snackType = action.payload;

    const snackOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    switch(snackType){

        case SNACK_TYPE_SUCCESS:
            return yield toast.success("Success!", snackOptions)

        case SNACK_TYPE_ERROR:
            return yield toast.error('Oops, please try again!', snackOptions)

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


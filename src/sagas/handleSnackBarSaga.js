import {
    HANDLE_SNACKBAR_RENDER,
    SNACK_TYPE_SUCCESS,
    SNACK_TYPE_ERROR,
    SNACK_TYPE_INFO,
    SNACK_DISMISS,
} from '../actions/types';

import { take } from 'redux-saga/effects';
import {LoadingToast} from '../components';
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
            if (action.message) return yield toast.error(action.message, snackOptions)
            else return yield toast.error('Oops, please try again!', snackOptions)

        case SNACK_TYPE_INFO:
            return yield toast.warning(
                LoadingToast, {
                    ...snackOptions, 
                    autoClose: false, 
                    closeButton: false
                }
            )
        
        case SNACK_DISMISS:
            return yield toast.dismiss()

        default: return;
    }
}


export default function* watchHandleSnackBar() {
    while(true) {
        let action = yield take(HANDLE_SNACKBAR_RENDER)
        yield handleSnackBar(action)    
    }
}


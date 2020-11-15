import {
    SET_USER_ITEMS,
    SET_ACTIVE_ITEM,
    SET_USER_PROFILE,
    SET_ACTIVE_THREAD,
    SET_INITIAL_CONFIG,
    SET_USER_IS_LOGGED,
    SET_USER_INITIAL_DATA,
    SET_THREAD_ARRAY,
    DELETE_USER_ENTRY,
    HANDLE_SAVE_ITEM,
    HANDLE_SAVE_IMAGE,
} from './types';


///////////////////////////////////////////////
////// THREADS REDUCER ACTIONS
///////////////////////////////////////////////

export const setActiveThread_Action = thread => {
    return { 
        type: SET_ACTIVE_THREAD, 
        payload: thread 
    }
}

export const setActiveItem_Action = item => {
    return { 
        type: SET_ACTIVE_ITEM, 
        payload: item 
    }
}

export const setThreadArray_Action = array => {
    return {
        type: SET_THREAD_ARRAY,
        payload: array
    }
}

export const deleteEntry_Action = (entry) => {
    return {
        type: DELETE_USER_ENTRY,
        payload: entry
    }
}

export const setUserItems_Action = address => {
    return { 
        type: SET_USER_ITEMS, 
        payload: address 
    }
}

export const handleSaveItem_Action = item => {
    return { 
        type: HANDLE_SAVE_ITEM, 
        payload: item 
    }
}

export const handleSaveImage_Action = object => {
    return { 
        type: HANDLE_SAVE_IMAGE, 
        payload: object 
    }
}

///////////////////////////////////////////////
////// USER REDUCER ACTIONS
///////////////////////////////////////////////

export const setInitialConfiguration_Action = () => {
    return {
        type: SET_INITIAL_CONFIG,
    }
}

export const setUserProfile_Action = (user) => {
    return {
        type: SET_USER_PROFILE,
        payload: user
    }
}

export const setInitialUserData_Action = (user) => {
    return {
        type: SET_USER_INITIAL_DATA,
        payload: user
    }
}

export const setUserIsLogged_Action = (object) => {
    return {
        type: SET_USER_IS_LOGGED,
        payload: object
    }
}



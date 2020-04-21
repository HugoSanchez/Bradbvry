import {
    SET_USER_ITEMS,
    SET_ACTIVE_ITEM,
    SET_USER_PROFILE,
    SET_ACTIVE_THREAD,
    SET_USER_INITIAL_DATA,

    DELETE_USER_ENTRY
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

///////////////////////////////////////////////
////// USER REDUCER ACTIONS
///////////////////////////////////////////////

export const setUserItems_Action = address => {
    return { 
        type: SET_USER_ITEMS, 
        payload: address 
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

export const deleteEntry_Action = (entry) => {
    return {
        type: DELETE_USER_ENTRY,
        payload: entry
    }
}

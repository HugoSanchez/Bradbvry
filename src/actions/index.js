import {
    SET_USER_INITIAL_DATA,
    SET_USER_PROFILE,
    SET_USER_ITEMS,
    DELETE_USER_ENTRY
} from './types';

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

import {

    //// SET
    SET_USER_MAILBOX,
    SET_USER_ITEMS,
    SET_ACTIVE_ITEM,
    SET_USER_PROFILE,
    SET_ACTIVE_THREAD,
    SET_INITIAL_CONFIG,
    SET_USER_IS_LOGGED,
    SET_USER_INITIAL_DATA,
    SET_THREAD_ARRAY,
    SET_THREAD_ITEMS,
    SET_MASTER_THREAD_ID,

    //// ADD
    ADD_ITEM_TO_THREAD_ITEMS,
    ADD_ITEM_TO_ITEMS_ARRAY,

    //// HANDLE
    HANDLE_THREADS,
    HANDLE_SAVE_ITEM,
    HANDLE_SAVE_IMAGE,
    HANDLE_DELETE_ITEM,
    HANDLE_ADD_COLLECTION,
    HANDLE_UPDATE_COLLECTION,
    HANDLE_CREATE_COLLECTION,
    HANDLE_DELETE_COLLECTION,
    HANDLE_ADD_ITEM_TO_PREVIEW,
    HANDLE_DELETE_FROM_PREVIEW,
    HANDLE_SNACKBAR_RENDER,

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


export const setUserItems_Action = address => {
    return { 
        type: SET_USER_ITEMS, 
        payload: address 
    }
}

export const setThreadItems_Action = array => {
    return { 
        type: SET_THREAD_ITEMS, 
        payload: array 
    }
}

export const setMasterThreadID_Action = id => {
    return { 
        type: SET_MASTER_THREAD_ID, 
        payload: id 
    }
}


export const addItemToThreadItems_Action = item => {
    return { 
        type: ADD_ITEM_TO_THREAD_ITEMS, 
        payload: item 
    }
}

export const addItemToItemsArray_Action = item => {
    return { 
        type: ADD_ITEM_TO_ITEMS_ARRAY, 
        payload: item 
    }
}


export const handleTheads_Action = (client, identity) => {
    return {
        type: HANDLE_THREADS,
        client: client,
        identity: identity
    }
}

export const handleSaveItem_Action = (item, callback) => {
    return { 
        type: HANDLE_SAVE_ITEM, 
        payload: item,
        callback: callback
    }
}

export const handleSaveImage_Action = (mainFile, poster) => {
    return { 
        type: HANDLE_SAVE_IMAGE, 
        payload: mainFile,
        poster: poster
    }
}

export const handleDeleteItem_Action = (item, callback) => {
    return { 
        type: HANDLE_DELETE_ITEM, 
        payload: item,
        callback: callback
    }
}

export const handleUpdateCollection_Action = (object, history, activeThread, callback) => {
    return {
        type: HANDLE_UPDATE_COLLECTION,
        payload: object,
        history: history,
        activeThread: activeThread,
        callback: (bool) => callback(bool),
    }
}

export const handleCreateCollection_Action = (object, callback) => {
    return {
        type: HANDLE_CREATE_COLLECTION,
        payload: object,
        callback: (bool) => callback(bool),
    }
}

export const handleAddItemToPreview_Action = (object, subType, callback) => {
    return {
        type: HANDLE_ADD_ITEM_TO_PREVIEW,
        payload: object,
        subType: subType,
        callback: () => callback(),
    }
}


export const handleDeleteFromPreview_Action = (object) => {
    return {
        type: HANDLE_DELETE_FROM_PREVIEW,
        payload: object,
    }
}

export const handleDeleteCollection_Action = (history) => {
    return {
        type: HANDLE_DELETE_COLLECTION,
        history: history,
    }
}

///////////////////////////////////////////////
////// USER REDUCER ACTIONS
///////////////////////////////////////////////

export const setInitialConfiguration_Action = (callbackFunction) => {
    return {
        type: SET_INITIAL_CONFIG,
        callback: callbackFunction
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

export const setUserIsLogged_Action = (bool) => {
    return {
        type: SET_USER_IS_LOGGED,
        payload: {isLogged: bool}
    }
} 

export const setUserMailbox_Action = (object) => {
    return {
        type: SET_USER_MAILBOX,
        payload: object
    }
}

export const handleAddCollectionToMaster_Action_Action = (object, history) => {
    return {
        type: HANDLE_ADD_COLLECTION,
        payload: object,
        history: history
    }
}

///////////////////////////////////////////////
////// SNACKBAR ACTIONS
///////////////////////////////////////////////

export const handleSnackBarRender_Action = (object, message) => {
    return {
        type: HANDLE_SNACKBAR_RENDER,
        payload: object,
        message: message
    }
}

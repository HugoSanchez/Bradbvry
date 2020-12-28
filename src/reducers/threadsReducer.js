import {

    SET_USER_ITEMS,
    SET_THREAD_ARRAY,
    SET_ACTIVE_ITEM,
    SET_ACTIVE_THREAD,
    SET_THREAD_ITEMS,
    DELETE_USER_ENTRY,
    
} from '../actions/types';
  
const initialState = {

    itemsArray: [],           // Preview items (entries)
    threadsArray: [],         // Array of user's threads
    threadItems: [],          // Entries for a given thread (activeThread)
    activeThread: null,       // Thread that the user has selected
    activeItem: null,         // Item that the user has selected within the thread.

}
  
const threadsReducer = (state = initialState, action) => {
	switch (action.type) {

		case SET_THREAD_ARRAY: 
		return {...state, threadsArray: action.payload}

		case SET_ACTIVE_THREAD: 
		return {...state, activeThread: action.payload}

		case SET_ACTIVE_ITEM: 
		return {...state, activeItem: action.payload}

		case SET_USER_ITEMS: 
		return {...state, itemsArray: action.payload}

		case SET_THREAD_ITEMS: 
		let currentItems = Array.from(state.threadItems)
		let updatedItems = [...action.payload, ...currentItems]
		return {...state, threadItems: updatedItems}
		
		case DELETE_USER_ENTRY: 
		return {...state, threadItems: action.payload}

		default: return state
    }
}
  
  
	export default threadsReducer;
  
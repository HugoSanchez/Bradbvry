import {

    SET_USER_ITEMS,
    SET_THREAD_ARRAY,
    SET_ACTIVE_ITEM,
    SET_ACTIVE_THREAD,
	SET_THREAD_ITEMS,
	SET_MASTER_THREAD_ID,
	ADD_ITEM_TO_ITEMS_ARRAY,
	ADD_ITEM_TO_THREAD_ITEMS,
	
} from '../actions/types';
  
const initialState = {

    itemsArray: [],           // Preview items (entries)
    threadsArray: null,         // Array of user's threads
	threadItems: [],          // Entries for a given thread (activeThread)
	masterThreadID: null, 	  // String ID of master thread
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

		case SET_MASTER_THREAD_ID: 
		return {...state, masterThreadID: action.payload}

		case SET_THREAD_ITEMS: 
		return {...state, threadItems: action.payload}

		case ADD_ITEM_TO_ITEMS_ARRAY: 	
		let updatedItems = Array.from(state.itemsArray)
		updatedItems.unshift(action.payload)
		return {...state, itemsArray: updatedItems}
		 

		case ADD_ITEM_TO_THREAD_ITEMS: 
		let includes = state.threadItems.includes(action.payload)
		if (!includes) {
			let updatedItems = Array.from(state.threadItems)
			updatedItems.unshift(action.payload)
			return {...state, threadItems: updatedItems}
		} else {
			return {...state, threadItems: []}
		}

		default: return state
    }
}
  
  
	export default threadsReducer;
  
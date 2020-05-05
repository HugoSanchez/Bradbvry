import {

    SET_USER_ITEMS,
    SET_THREAD_ARRAY,
    SET_ACTIVE_ITEM,
    SET_ACTIVE_THREAD,
    DELETE_USER_ENTRY
    
  } from '../actions/types';
  
  const initialState = {
    itemsArray: [],
    threadsArray: [],
    activeThread: null, 
    activeItem: null,
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
        
      case DELETE_USER_ENTRY: 
        let items = state.itemsArray
        let newItems = items.filter(item => item !== action.payload)
        return {...state, itemsArray: newItems}
  
      default: return state
    }
  }
  
  
  export default threadsReducer;
  
import {
    SET_THREAD_ARRAY,
    SET_ACTIVE_ITEM,
    SET_ACTIVE_THREAD,
  } from '../actions/types';
  
  const initialState = {
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
  
      default: return state
    }
  }
  
  
  export default threadsReducer;
  
import {
    SET_ACTIVE_ITEM,
    SET_ACTIVE_THREAD
  } from '../actions/types';
  
  const initialState = {
    activeThread: null, 
    activeItem: null,
  }
  
  const threadsReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case SET_ACTIVE_THREAD: 
        return {...state, activeThread: action.payload}
  
      case SET_ACTIVE_ITEM: 
        console.log('HERE!')
        return {...state, activeItem: action.payload}
  
      default: return state
    }
  }
  
  
  export default threadsReducer;
  
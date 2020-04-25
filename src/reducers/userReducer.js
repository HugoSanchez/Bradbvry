import {
  SET_USER_ITEMS,
  SET_USER_INITIAL_DATA,
  DELETE_USER_ENTRY,
} from '../actions/types';

const initialState = {
  data: {
    box: null, 
    space: null,
    profile: null,
    accounts: null,
    parsedItems: [], 
  }
}

const userProfileReducer = (state = initialState, action) => {
  let newstate = {...state}
  switch (action.type) {

    case DELETE_USER_ENTRY: 
      let items = newstate.data.parsedItems
      let newItems = items.filter(item => {
        return item !== action.payload})
      newstate.data.parsedItems = newItems
      return {...newstate}

    case SET_USER_ITEMS: 
      newstate.data.parsedItems = action.payload
      return {...newstate}

    case SET_USER_INITIAL_DATA: 
      return {...state, data: action.payload}

    default: return state
  }
}


export default userProfileReducer;

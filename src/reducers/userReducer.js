import {
  SET_USER_ITEMS,
  SET_USER_INITIAL_DATA
} from '../actions/types';

const initialState = {
  data: {
    box: null, 
    space: null,
    profile: null,
    accounts: null,
    parseditems: [], 
  }
}

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ITEMS: 
      let newstate = {...state}
      newstate.data.parseditems = action.payload
      return {...newstate}
    case SET_USER_INITIAL_DATA: 
      return {...state, data: action.payload}
    default: return state
  }
}

export default userProfileReducer;

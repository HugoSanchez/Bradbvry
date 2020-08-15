import {
  SET_USER_INITIAL_DATA,
} from '../actions/types';

const initialState = {
  data: {
    box: null, 
    space: null,
    profile: null,
    address: null,
    email: null,
  }
}

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER_INITIAL_DATA: 
      return {...state, data: action.payload}

    default: return state
  }
}


export default userProfileReducer;

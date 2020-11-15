import {
  SET_USER_IS_LOGGED,
  SET_USER_INITIAL_DATA,
} from '../actions/types';

const initialState = {
  isLogged: false,
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
    case SET_USER_IS_LOGGED: 
      return {...state, isLogged: action.payload}

    default: return state
  }
}


export default userProfileReducer;

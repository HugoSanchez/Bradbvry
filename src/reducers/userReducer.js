import {
  SET_USER_INITIAL_DATA,
} from '../actions/types';

const initialState = {
  data: {
    box: null, 
    space: null,
    profile: null,
    accounts: null,
  }
}

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER_INITIAL_DATA: 
    console.log('Data: ', action.payload)
      return {...state, data: action.payload}

    default: return state
  }
}


export default userProfileReducer;

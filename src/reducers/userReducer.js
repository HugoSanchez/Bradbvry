import {
  SET_ETHEREUM_ADDRESS,
  SET_USER_PROFILE
} from '../actions/types';

const initialState = {
    profile: null,
    address: null
}

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:     
      return {profile: action.payload}
    case SET_ETHEREUM_ADDRESS: 
      return {address: action.payload}
    default: return state
  }
}
export default userProfileReducer
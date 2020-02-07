import { userActions } from '../actions';
import { useReducer } from 'react';

import {
  SET_ETHEREUM_ADDRESS,
  SET_USER_PROFILE
} from '../actions/types';

const initialState = {
    user: null
}

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
        console.log('Action: ', action.type)
        console.log('Payload: ', action.payload)
      return {user: action.payload}
    default:
      return state
  }
}
export default userProfileReducer
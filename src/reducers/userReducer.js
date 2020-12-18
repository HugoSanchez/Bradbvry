import {
	SET_USER_IS_LOGGED,
	SET_USER_INITIAL_DATA,
} from '../actions/types';

const initialState = {
	isLogged: false,
	address: null,	// Ethereum address (Magic)
	email: null,	// Email address (Magic)
	profile: null, 	// Public 3box profile
	client: null,	// Textile threadsDB client
	identity: null, // Textile identity
}

const userProfileReducer = (state = initialState, action) => {
	console.log(action.payload)
	switch (action.type) {

		case SET_USER_INITIAL_DATA: 
			return {...state, ...action.payload}

		case SET_USER_IS_LOGGED: 
			return {
				...state, 
				isLogged: action.payload.bool,
				address: action.payload.address,
				email: action.payload.email,
			}

		default: return state
	}
}


export default userProfileReducer;

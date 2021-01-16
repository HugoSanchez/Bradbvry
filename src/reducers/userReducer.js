import {
	SET_USER_MAILBOX,
	SET_USER_IS_LOGGED,
	SET_USER_INITIAL_DATA,
} from '../actions/types';

const initialState = {
	isLogged: false,
	address: null,			// Ethereum address (Magic)
	email: null,			// Email address (Magic)
	profile: null, 			// Public 3box profile
	client: null,			// Textile threadsDB client
	identity: null, 		// Textile identity
	mailboxClient: null,		// Textile mailbox client
	inbox: [], 				// Textile user mailbox (received messages)
	sentBox: [],			// Textile user mailbox (sent messages)
}

const userProfileReducer = (state = initialState, action) => {
	switch (action.type) {

		case SET_USER_INITIAL_DATA: 
			return {
				...state, 
				...action.payload
			}

		case SET_USER_MAILBOX: 
			return {
				...state, 
				...action.payload
			}

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

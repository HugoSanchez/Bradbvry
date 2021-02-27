import {

   SET_SNACK_COLOR,
   SET_SHOW_SNACK_BAR,
   SET_SNACK_MESSAGE,

} from '../actions/types';
  
const initialState = {

    show: false,             // Weather or not to display snackbar
    color: null,             // Snackbar background color
	message: null,           // Message to display

}
  
const snackReducer = (state = initialState, action) => {

   

	switch (action.type) {

        case SET_SHOW_SNACK_BAR: 
		return {...state, show: action.payload}

		case SET_SNACK_COLOR: 
		return {...state, color: action.payload}

        case SET_SNACK_MESSAGE: 
		return {...state, message: action.payload}

		default: return state
    }
}
  
  
	export default snackReducer;
  
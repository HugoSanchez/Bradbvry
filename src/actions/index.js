import {
    SET_ETHEREUM_ADDRESS,
    SET_USER_PROFILE
} from './types';

export const setEthereumAddress_Action = address => {
    return { 
        type: SET_ETHEREUM_ADDRESS, 
        payload: address 
    }
}

export const setUserProfile_Action = user => {
    return {
        type: SET_USER_PROFILE,
        payload: user
    }
}

/*
 * Redux is not beig used at the moment, 
 * but it's already set up for the future.
 */
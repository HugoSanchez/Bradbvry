import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {handleSnackBarRender_Action} from '../../../actions';
import axios from 'axios';

import {
    SNACK_TYPE_SUCCESS,
    SNACK_TYPE_ERROR,
} from '../../../actions/types'


import {
    BText,
    Waitlist,
    WaitlistInput,
    WaitlistButton,
} from './styles';

export const JoinWaitlist = props => {    
    
    const dispatch = useDispatch()

    const handleEmail = async e => {
        e.preventDefault();
        const email = new FormData(e.target).get("email");
        await addUserToWaitlist(email)
	}

    const addUserToWaitlist = async (email) => {
        let apiKey = 'NVKPEI'
        let referral_link = "https://bradbvry.now.sh/landing"
        let url = 'https://getwaitlist.com/api/v1/waitlists/submit'
        axios.post(url, {api_key: apiKey, email, referral_link})
            .then(res => dispatch(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS)))
            .catch(e => dispatch(handleSnackBarRender_Action(SNACK_TYPE_ERROR)))
    }

    return (
        <Waitlist
         autoComplete="off" 
            onSubmit={handleEmail}>

            <WaitlistInput
                type="email" 
                name="email" 
                required="required"
                autoComplete="off" 
                />

            <WaitlistButton type="submit">
                <BText>Join Waitlist!</BText>
            </WaitlistButton>
        </Waitlist>
    )
}


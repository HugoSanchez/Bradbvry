import React, {useState, useEffect} from 'react';
import {parseToDisplayCollectionName} from '../../../utils/utils';
import {handleSnackBarRender_Action} from '../../../actions';
import {FormButton} from '../../common';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {
    SNACK_DISMISS,
    SNACK_TYPE_INFO,
    SNACK_TYPE_ERROR,
    SNACK_TYPE_SUCCESS
} from '../../../actions/types'

import {
    Gn,
    Note,
    Label,
    ModalTitle,
    FormBodyBox,
} from './styles';

import {
    NameInput,
    DrawerCont,
} from '../../index';

import {
    shareBaseUrl,
    joinCollectionUrl
} from '../../../constants';


export const AddMemberForm = props => {

    let [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const sender = useSelector(state => state.user.email)
    const identity = useSelector(state => state.user.identity)
    const senderAddress = useSelector(state => state.user.address)
    const activeThread = useSelector(state => state.threads.activeThread)

    const handleFormSubmit = async () => {
        props.onClose()
        dispatch(handleSnackBarRender_Action(SNACK_TYPE_INFO))
        try {
            let data = await parseRequestData()
            let res = await axios.post(shareBaseUrl, data)
            dispatch(handleSnackBarRender_Action(SNACK_DISMISS))
            dispatch(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS))

        }
        catch (e) {
            dispatch(handleSnackBarRender_Action(SNACK_DISMISS))
            dispatch(handleSnackBarRender_Action(SNACK_TYPE_ERROR))
        }
    }

    const parseRequestData = async () => {
        let recipientEmail = email
        let collectionName = parseToDisplayCollectionName(activeThread.name)
        let collectionAddress = activeThread.threadId
        let identityStr = identity.public.str

        let joinUrl = joinCollectionUrl(senderAddress, collectionAddress, activeThread.name)
        
        return {
            sender, 
            joinUrl,
            identityStr,
            senderAddress, 
            collectionName, 
            recipientEmail, 
            collectionAddress,
        }

    }

    return (
        <DrawerCont>          
            <ModalTitle>
                Add Member
            </ModalTitle>

            <Note>
                Members are able to read and post entries to this collection. If
                you'd like to share this collection with someone, this is the way to do it.

                
            </Note>

            <FormBodyBox>
                <Label><Gn>1.</Gn> Enter member's email </Label>
                <NameInput 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/> 

                <FormButton 
                    isActive={true}
                    text={'Send Invite!'}
                    onClick={handleFormSubmit}>
                </FormButton>
            </FormBodyBox>   
        </DrawerCont>
    )
}





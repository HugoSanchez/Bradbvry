import React, {useState} from 'react';
import {FormButton} from '../../common';
import {useSelector} from 'react-redux';
import {shareBaseUrl} from '../../../constants';

import axios from 'axios';

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
} from '../../common';

export const AddMemberForm = props => {

    let [email, setEmail] = useState('')
    let [loading, setLoading] = useState(false)

    const sender = useSelector(state => state.user.data.email)
    const senderAddress = useSelector(state => state.user.data.address)
    const collectionNameRaw = useSelector(state => state.threads.activeThread.config.name)


    const handleFormSubmit = async () => {
        setEmail('')
        setLoading(true)

        let joinUrl = 'http://localhost:3000/app/0xA425AC19545A9fe277673d317AEB20Cbe7aF6531'
        let collectionName = collectionNameRaw.replace(/-/g,' ').replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
        let recepientEmail = email
        
        let data = {
            sender, 
            senderAddress, 
            collectionName, 
            recepientEmail, 
            joinUrl
        }

        let req = await axios.post(shareBaseUrl, data)
        console.log(req)
        props.onClose()

    }

    return (
        <DrawerCont>          
            <ModalTitle>
                Add Member
            </ModalTitle>

            <Note>
                Collections are invite-only. To share your collection, 
                please type the email of the person you want to share this collection with.
            </Note>

            <FormBodyBox>
                <Label><Gn>1.</Gn> Enter member's email </Label>
                <NameInput 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/> 

                <FormButton 
                    text={'Send Invite!'}
                    loading={loading}
                    onClick={handleFormSubmit}>
                </FormButton>
            </FormBodyBox>               
        </DrawerCont>
    )
}





import React, {useState, useEffect} from 'react';
import {FormButton} from '../../common';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Textile} from '../../../utils';

import {
    Gn,
    Note,
    Label,
    MemberCont,
    ModalTitle,
    FormBodyBox,
} from './styles';

import {
    NameInput,
    ProfileRow,
    DrawerCont,
} from '../../index';

import {
    shareBaseUrl,
    joinCollectionUrl
} from '../../../constants';

const RenderProfiles = props => {

    return props.members.map((m, i) => {
        return <ProfileRow 
                    key={i} 
                    member={m} 
                    moderators={props.moderators}
                    handleAddModerator={member => {
                        props.handleAddModerator(member)}}
                />
    })
}


export const AddMemberForm = props => {

    let [email, setEmail] = useState('')
    let [loading, setLoading] = useState(false)
    let [profiles, setProfiles] = useState([])


    const sender = useSelector(state => state.user.email)
    const client = useSelector(state => state.user.client)
    const identity = useSelector(state => state.user.identity)
    const senderAddress = useSelector(state => state.user.address)
    const activeThread = useSelector(state => state.threads.activeThread)

    const handleFormSubmit = async () => {
        setEmail('')
        setLoading(true)
        let data = await parseRequestData()
        
        let res = await axios.post(shareBaseUrl, data)
        if (res.data.success) {props.onClose(true)}
        else {props.onClose(false)}
    }

    const parseRequestData = async () => {
        let recipientEmail = email
        let collectionName = activeThread.name
        let collectionAddress = activeThread.id
        let identityStr = identity.public.str
        let collectionID = Textile.getThreadID(activeThread)
        let collectionInfoRaw = await client.getDBInfo(collectionID)
        let collectionInfo = JSON.stringify(collectionInfoRaw)

        let joinUrl = joinCollectionUrl(senderAddress, activeThread.id, collectionName)
        
        return {
            sender, 
            joinUrl,
            identityStr,
            senderAddress, 
            collectionName, 
            recipientEmail, 
            collectionAddress,
            collectionInfo
        }

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

            <MemberCont>
                <Label>
                    Current Members ({profiles.length})
                </Label>
                {
                    profiles.length > 0 ?
                    null
                    :
                    null
                }  
            </MemberCont>
                      
        </DrawerCont>
    )
}





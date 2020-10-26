import React, {useState, useEffect} from 'react';
import {FormButton} from '../../common';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Box from '3box';

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
    let [moderators, setModerator] = useState([])

    const sender = useSelector(state => state.user.data.email)
    const senderAddress = useSelector(state => state.user.data.address)
    const activeThread = useSelector(state => state.threads.activeThread)


    useEffect(() => {
        const getMembers = async () => {
            let members = await activeThread.listMembers()
            console.log('Members: ', members)
            getProfilesAndSet(members)
        }
        getMembers()
        getModerators()
    }, [])

    const getModerators = async () => {
        let moderators = await activeThread.listModerators()
        setModerator(moderators)
    }

    const getProfilesAndSet = async members => {
        let profiles = []

        for (let i = 0; i < members.length; i++) {
            let profile = await Box.getProfile(members[i])
            profile.did = members[i]
            profiles.push(profile)
        }

        setProfiles(profiles)
    }

    const handleFormSubmit = async () => {
        setEmail('')
        setLoading(true)
        let recepientEmail = email
        let joinUrl = joinCollectionUrl(senderAddress, activeThread._address.slice(9))
        let collectionName = activeThread.config.name.replace(/-/g,' ').replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
        
        let data = {
            sender, 
            senderAddress, 
            collectionName, 
            recepientEmail, 
            joinUrl
        }
        
        let res = await axios.post(shareBaseUrl, data)
        if (res.data.success) {props.onClose(true)}
        else {props.onClose(false)}
    }

    const handleAddModerator = async member => {
        await activeThread.addModerator(member)
        getModerators()
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
                    <RenderProfiles 
                        members={profiles} 
                        moderators={moderators}
                        handleAddModerator={member => handleAddModerator(member)}
                        />
                    :
                    null
                }  
            </MemberCont>
                      
        </DrawerCont>
    )
}





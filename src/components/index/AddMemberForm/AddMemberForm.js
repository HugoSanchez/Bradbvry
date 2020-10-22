import React, {useState, useEffect} from 'react';
import {FormButton} from '../../common';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Box from '3box';

import styled from 'styled-components';
import {IconContext} from 'react-icons';
import {RiUserSmileLine} from 'react-icons/ri';

import {
    joinCollectionUrl,
    shareBaseUrl
} from '../../../constants';

import {
    Gn,
    Note,
    Label,
    ModalTitle,
    FormBodyBox,
} from './styles';

import {
    Text,
    NameInput,
    DrawerCont,
} from '../../common';

const RenderProfiles = props => {
   return props.members.map((m, i) => {
       return (
            <div className="test" key={i}>
                <div className="one">
                    <div className="avatar">
                        <IconContext.Provider value={{size: '25px', color: 'gray'}}>
                            <RiUserSmileLine /> 
                        </IconContext.Provider> 
                    </div>
                </div>
                <div className="two">
                    <ProfileName>{m.name || 'Unkown '}</ProfileName>
                </div>
                <div className="three">
                    <Gn>Allow Edit</Gn>
                </div>
            </div>
        )
    })
}

const ProfileName = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: rgba(150, 150, 150, 1);
`

export const AddMemberForm = props => {

    let [email, setEmail] = useState('')
    let [loading, setLoading] = useState(false)
    let [profiles, setProfiles] = useState([])

    const sender = useSelector(state => state.user.data.email)
    const senderAddress = useSelector(state => state.user.data.address)
    const activeThread = useSelector(state => state.threads.activeThread)


    useEffect(() => {
        const getMembers = async () => {
            let members = await activeThread.listMembers()
            console.log(members)

            getProfilesAndSet(members)
        }
        getMembers()
    }, [])

    const getProfilesAndSet = async members => {
        let profiles = []

        for (let i = 0; i < members.length; i++) {
            let profile = await Box.getProfile(members[i])
            profiles.push(profile)
        }

        setProfiles(profiles)
    }

    console.log(profiles)

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

            

            <div className="test2">
                <Label>
                    Current Members ({profiles.length})
                </Label>
                {
                    profiles.length > 0 ?
                    <RenderProfiles members={profiles}/>
                    :
                    null
                }  
            </div>
                      
        </DrawerCont>
    )
}





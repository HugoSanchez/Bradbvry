import React, {useEffect, useState} from 'react';
import Box from '3box';

import { UserAvatar } from '../UserAvatar';

import {
    Container,
    AvatarCont, 
    UserName,
    NameText,
    AdditionalInfo,
} from './styles';


export const UserCard = props => {
    console.log('render: ', props.user)

    const [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        let profile = await Box.getProfile(props.user)
        setUserProfile(profile)
        console.log(profile)
    }

    if (userProfile === null) {
        return null
    }

    return (
        <Container>
            <AvatarCont>
                <UserAvatar
                    placeholderColor={props.placeholderColor}
                    imageIPFSaddress={"https://ipfs.io/ipfs/" + userProfile.image[0].contentUrl["/"]}
                />
            </AvatarCont>
            <UserName>
                <NameText>{userProfile.name || 'Unkown User'}</NameText>
            </UserName>
            <AdditionalInfo>

            </AdditionalInfo>
        </Container>
    )
}
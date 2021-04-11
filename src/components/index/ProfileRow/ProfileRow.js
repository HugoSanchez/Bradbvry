import React, { useEffect, useState } from 'react';
import {IconContext} from 'react-icons';
import {RiUserSmileLine, RiInformationLine} from 'react-icons/ri';
import ReactTooltip from 'react-tooltip';
import { useHistory } from "react-router-dom";
import Box from '3box';


import {
    ProfileCont,
    ProfileName,
    IconWrapper,
    AvatarCont,
    NameCont,
    TypeCont,
    Avatar,
    Editor,
    Image,
    Address 
} from './styles';

export const ProfileRow = props => {

    // Deconstruct state.
    let {member} = props;
    let history = useHistory()
    let [profile, setProfile] = useState({})
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            let profileRes = await Box.getProfile(member)
            setProfile(profileRes)
            setLoading(false)
        }
        fetchProfile()
        return () => null
    }, [])


    // Get profile pic from IPFS.
    // IPFS is awesome.
    let imageIPFSaddress 
    if (profile.image) {
        imageIPFSaddress  = "https://ipfs.io/ipfs/" 
        + profile.image[0].contentUrl["/"]
    } 
    else {imageIPFSaddress = false}

    if (loading) {
        return <div></div>
    }

    return (
        <ProfileCont>
            <AvatarCont>
                <Avatar>
                    {
                        imageIPFSaddress ?
                        <Image src={imageIPFSaddress} alt=""/>
                        :
                        <IconContext.Provider value={{size: '25px', color: 'gray'}}>
                            <RiUserSmileLine /> 
                        </IconContext.Provider> 
                    }
                </Avatar>
            </AvatarCont>
            <NameCont onClick={() => history.push(`/app/${member}`)}>
                <ProfileName>{profile.name || 'Unkown '}</ProfileName>
                <Address>{member.slice(0, 8)}...</Address>
            </NameCont>

        </ProfileCont>
    )
}
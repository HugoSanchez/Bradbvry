import React from 'react';
import {IconContext} from 'react-icons';
import {RiUserSmileLine, RiInformationLine} from 'react-icons/ri';
import ReactTooltip from 'react-tooltip';
import {Text} from '../../common';

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
    GText 
} from './styles';

export const ProfileRow = props => {

    // Deconstruct state.
    let {member} = props;

    // Get profile pic from IPFS.
    // IPFS is awesome.
    let imageIPFSaddress 
    if (member.image) {
        imageIPFSaddress  = "https://ipfs.io/ipfs/" 
        + member.image[0].contentUrl["/"]
    } 
    else {imageIPFSaddress = false}


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
            <NameCont>
                <ProfileName>{member.name || 'Unkown '}</ProfileName>
            </NameCont>
            <TypeCont>
                
            </TypeCont>
        </ProfileCont>
    )
}
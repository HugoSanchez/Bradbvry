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
    let {member, moderators} = props;

    // Get profile pic from IPFS.
    // IPFS is awesome.
    let imageIPFSaddress 
    if (member.image) {
        imageIPFSaddress  = "https://ipfs.io/ipfs/" 
        + member.image[0].contentUrl["/"]
    } 
    else {imageIPFSaddress = false}

    let isModerator = moderators.includes(member.did)

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
                {
                    isModerator ?
                    <div>
                        <Editor>Editor</Editor>
                        <IconWrapper>
                            <IconContext.Provider
                                value={{size: '15px', color: 'gray'}}>
                                <RiInformationLine  data-tip data-for='editor-tip'/> 
                            </IconContext.Provider> 
                        </IconWrapper>
                        <ReactTooltip 
                            id='editor-tip' 
                            className='tooltip'>
                            <Text>This user can add and delete posts</Text>
                        </ReactTooltip>

                    </div>
                    :
                    <div>
                        <GText onClick={() => props.handleAddModerator(member.did)}>Allow Edit</GText>
                        <IconWrapper>
                            <IconContext.Provider
                                value={{size: '15px', color: 'gray'}}>
                                <RiInformationLine  data-tip data-for='allow-editor-tip'/> 
                            </IconContext.Provider> 
                        </IconWrapper>
                        <ReactTooltip 
                            id='allow-editor-tip' 
                            className='tooltip'>
                            <Text>Allow user to post to this Collection</Text>
                        </ReactTooltip>
                    </div>
                }
            </TypeCont>
        </ProfileCont>
    )
}
import React from 'react';
import styled from 'styled-components';
import {IconContext} from 'react-icons';
import {RiUserSmileLine, RiInformationLine} from 'react-icons/ri';
import ReactTooltip from 'react-tooltip';
import {Text} from '../../common';

const ProfileName = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: rgba(150, 150, 150, 1);
`

const Editor = styled(Text)`
    font-size: 16px;
    font-weight: 300;
    font-style: italic;
    color: rgba(150, 150, 150, 1);
`

export const ProfileRow = props => {

    // Get profile pic from IPFS.
    // IPFS is awesome.
    let imageIPFSaddress 
    if (props.member.image) {
        imageIPFSaddress  = "https://ipfs.io/ipfs/" 
        + props.member.image[0].contentUrl["/"]
    } 
    else {imageIPFSaddress = false}

    console.log(props.moderators)

    return (
        <div className='test'>
            <div className='one'>
                <div className='avatar'>
                    {
                        imageIPFSaddress ?
                        <img id="profile-image-2" src={imageIPFSaddress} alt=""/>
                        :
                        <IconContext.Provider value={{size: '25px', color: 'gray'}}>
                            <RiUserSmileLine /> 
                        </IconContext.Provider> 
                    }
                </div>
            </div>
            <div className='two'>
                <ProfileName>{props.member.name || 'Unkown '}</ProfileName>
            </div>
            <div className='three'>
                {
                    true ?
                    <div>
                        <Editor data-tip data-for='editor-tip'>Editor</Editor>
                        <ReactTooltip id='editor-tip' className='tooltip'>
                            <Text>This user can add and delete posts</Text>
                        </ReactTooltip>

                    </div>
                    :
                    <div>
                        <Text>Allow Edit</Text>
                        <span className='icon-wrapper'>
                            <IconContext.Provider
                                value={{size: '15px', color: 'gray'}}>
                                <RiInformationLine  data-tip data-for='allow-editor-tip'/> 
                            </IconContext.Provider> 
                        </span>
                        <ReactTooltip id='allow-editor-tip' className='tooltip'>
                            <Text>Allow user to post to this Collection</Text>
                        </ReactTooltip>
                    </div>
                }
            </div>
        </div>
    )
}
import React from 'react';
import {RiUserSmileLine} from 'react-icons/ri';
import {IconContext} from 'react-icons';

import {
    AvatarCont, 
    Avatar,
    Image
} from './styles';



export const UserAvatar = props => {
    return (
        <AvatarCont>
            <Avatar 
                placeholderColor={props.placeholderColor}>
                {
                    props.imageIPFSaddress ?
                    <Image src={props.imageIPFSaddress} alt=""/>
                    :
                    <IconContext.Provider value={{size: '25px', color: 'gray'}}>
                        <RiUserSmileLine /> 
                    </IconContext.Provider> 
                }
            </Avatar>
        </AvatarCont>
    )
}
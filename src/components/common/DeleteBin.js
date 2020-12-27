import React from 'react';
import {View} from './View';
import styled from 'styled-components';
import {IconContext} from 'react-icons';
import {RiDeleteBin6Line} from 'react-icons/ri';


/**
 * @param {isActive}: bool, wether or not to render.
 * @param {isModerator}: if user has "write"-access to the item.
 * @param {onClick}: function to execute on click if any. 
 */

const IconContainer = styled.div`
    width: 40px;
    height: 40px;
    align-self: flex-start;
`;

const size = window.innerWidth < 400 ? 18 : 22

const DeleteBin = props => {

    return (
        <IconContainer>
            {
                props.isActive ?
                    <View onClick={props.onClick}>
                        <IconContext.Provider value={{size: size, color: 'gray'}}>
                            <RiDeleteBin6Line /> 
                        </IconContext.Provider> 
                    </View>
                :
                null
            }
        </IconContainer>
    );
}

export {DeleteBin};

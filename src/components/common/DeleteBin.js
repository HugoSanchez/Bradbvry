import React from 'react';
import {View} from './View';
import styled from 'styled-components';
import {IconContext} from 'react-icons';
import {RiDeleteBin6Line} from 'react-icons/ri';


/**
 * @param {isActive}: bool, wether or not to render.
 * @param {onClick}: function to execute on click if any. 
 */

const IconContainer = styled.div`
    width: 40px;
    height: 40px;
    align-self: flex-start;
`;

const DeleteBin = props => {

    return (
        <IconContainer onClick={(e) => props.onClick(e) }>
            {
                props.isActive ?
                    <View>
                        <IconContext.Provider value={{size: 22, color: 'gray'}}>
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

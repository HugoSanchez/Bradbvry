import React from 'react';
import {View} from './View';
import styled from 'styled-components';
import {IconContext} from 'react-icons';
import {RiDeleteBinLine} from 'react-icons/ri';


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

const BinBox = styled(View)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    background: white;
`;

const DeleteBin = props => {

    return (
        <IconContainer>
            {
                props.isActive ?
                    <BinBox onClick={props.onClick}>
                        <IconContext.Provider value={{size: '18px', color: 'gray'}}>
                            <RiDeleteBinLine /> 
                        </IconContext.Provider> 
                    </BinBox>
                :
                null
            }
        </IconContainer>
    );
}

export {DeleteBin};

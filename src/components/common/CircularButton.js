import React from 'react';
import {IconContext} from 'react-icons';
import styled from 'styled-components';
import {
    RiArrowLeftLine, 
    RiImageAddLine,
    RiBallPenLine,
    RiAddLine
} from 'react-icons/ri'

import {primaryGray85} from '../../constants/colors'

/**
 * @param {onCLick}: function to execute.
 * @param {buttonId}: css id for the circle.
 * @param {iconId}: css id for the icon.
 * @param {arrow}: arrow-left icon. 
 * @param {plus}: plus sign icon.
 */

const CircularButton = props => {

    const  size  = props.size ? props.size : '30px'

    return (
        <Button 
            id={props.buttonId} 
            right={props.right}
            bottom={props.bottom}
            background={props.background}
            onClick={props.onClick}>
            <IconContext.Provider value={{size: size, color: primaryGray85}}>
                <IconContainer id={props.iconId}>
                    {props.imageAdd ? <RiImageAddLine /> : null }
                    {props.quillPen ? <RiBallPenLine /> : null }
                    {props.arrow ? <RiArrowLeftLine /> : null }
                    {props.plus ? <RiAddLine /> : null}
                </IconContainer>
            </IconContext.Provider> 
        </Button>
    );
}



const Button = styled.div`
    z-index: 2;
    position: fixed;
    bottom: ${props => props.bottom || '10vh'};
    right: ${props => props.right || '4vw'};
    width: 3rem; 
    height: 3rem; 
    border-radius: 1.5rem;
    background-color: ${props => props.background || 'white'}; 
    box-shadow: 0 0 10px rgba(0,0,0,0.1);    
    display: flex;
    align-items: center;
    justify-content: center; 
    cursor: pointer;

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
    }
`;


const IconContainer = styled.div`
`;

export {CircularButton};

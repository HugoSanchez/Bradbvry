import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {IconContext} from 'react-icons';
import {RiCloseLine} from 'react-icons/ri';
import {primaryGray85} from '../../constants/colors';
import {Text} from './Text';

/**
 * @param {isActive}: bool, wether or not to render.
 * @param {text}: text to display.
 */

const MessageBar = ({isActive, message, color, onActionClick}) => {

    let [isClosed, setIsClosed] = useState(false)

    const handleAction = () => {
        setIsClosed(true)
        onActionClick()
    }

    return (
        <MessageBox 
            color={color}
            isClosed={isClosed} 
            isActive={isActive}>
            <WarningText>
                {message}
            </WarningText>
            {
                onActionClick ? 
                <ActionBox onClick={handleAction}>
                    <ConfirmText>
                        Confirm
                    </ConfirmText>
                </ActionBox>
                :
                <CloseBox onClick={() => setIsClosed(true)}>
                    <IconContext.Provider value={{size: '20px', color: primaryGray85}}>
                        <RiCloseLine /> 
                    </IconContext.Provider> 
                </CloseBox>
            }
        </MessageBox>
    );
}

const fadeOut = keyframes`
  from {opacity: 1;}
  to {opacity: 0;}
`;

const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

const MessageBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0px;
	width: 100%;
	height: 60px;
    visibility: ${props => !props.isClosed && props.isActive ? 'visible' : 'hidden'};
    animation: ${props => !props.isClosed && props.isActive? fadeIn : fadeOut} 0.5s linear;
    background: ${props => props.color ? props.color : 'rgba(237, 202, 142, 0.8)'};
    transition: visibility 0s 0.5s, opacity 0.5s linear;
	z-index: 16;
`;

const WarningText = styled(Text)`
	font-weight: 500;
`;

const ConfirmText = styled(WarningText)`
	text-decoration: underline;
    margin-right: 20px;
    cursor: pointer;
`;

const CloseBox = styled.div`
	position: absolute;
	top: 0px;
	right: 10px;
	width: 60px;
	height: 60px; 
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ActionBox = styled.div`
    position: absolute;
    top: 0px;
    right: 50px;
    width: 60px;
    height: 60px; 
    display: flex;
    align-items: center;
    justify-content: center;
`;





export {MessageBar};

import styled from 'styled-components';
import {Text} from '../../common';
import {primaryGreen, lightGray150} from '../../../constants/colors';
import {device} from '../../../constants';

export const Waitlist = styled.form`
    border: 1px solid rgb(80, 80, 80);
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    @media ${device.mobileL} {
        width: 90vw;
        margin-left: 2%;
        margin-bottom: 15%;
    }
`;

export const WaitlistInput = styled.input`
    flex: 2;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-right: 2%;
    margin-left: 2%;
    font-family: Montserrat;
    font-weight: 300;
    font-size: 16px;
    color: ${lightGray150};
    border:0;
    :focus {
        outline-width: 0;
    }
    @media ${device.mobileL} {
        width: 100%;
        margin-right: 0px;
        margin-left: 0px;
        padding-left: 2%;
        padding-right: 2%;
    }
`;  

export const WaitlistButton = styled.button`
    flex: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(80, 80, 80);
    outline: none;
	border: none;
    padding: 2%;
`;

export const BText = styled(Text)`
    color: ${primaryGreen};
    font-weight: 400;
    font-size: 16px;
    @media ${device.mobileL} {
        font-size: 12px;

    }
`;
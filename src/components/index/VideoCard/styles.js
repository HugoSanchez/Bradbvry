import styled from 'styled-components';
import {device} from '../../../constants';
import {Title, Text} from '../../common';
import {primaryGreen} from '../../../constants/colors';

export const CardContainer = styled.div`
    position: relative;
    min-width: 100%;
    background-color: white;
    transition: 0.4s ease-out;
    border-radius: 5px;
    box-shadow: 0 0 80px rgba(0,0,0,0.1);
    margin-bottom: 4%;

    &:hover{
        box-shadow: 0 0 60px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

export const CardBody = styled.div`
    flex: 16;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const Video = styled.video`
    width: 100%;
    box-shadow: 0 0 80px rgba(0,0,0,0.1);

    border-radius: 5px;
    &:focus {
        outline: none;
    }
`;

export const DeleteBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.7);
    z-index: 5;
    cursor: pointer;
`;
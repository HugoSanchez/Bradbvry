import styled from 'styled-components';
import {device} from '../../../constants';
import {Title, Text} from '../../common';

export const ImageCardContainer = styled.div`
    position: relative;
    width: 95%;
    border-radius: 2px;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
    background: white;
    transition: 0.4s ease-out;
    opacity: 0.8;
    box-shadow: ${props => props.shadow ? '0 0 80px rgba(0,0,0,0.2)' : null};

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

export const ImageTitle = styled(Title)`
    text-transform: capitalize; 
    font-size: 3vh;
    z-indez: 1;
    flex: 1;

    @media ${device.mobileL} {
        margin-bottom: 50px;
        font-size: 16px;
    }
`

export const TextBox = styled.div`
    position: absolute;
    top: 10%;
    left: 10%;
    height: 70%;
    width: 70%;
    z-index: 1;
`;


export const Description = styled(Text)`
    font-size: 1.8vh;
    font-weight: 400;
    line-height: 1.6;
    margin-top: 5%;
    z-indez: 1;
    overflow: hidden;
    flex: 1;
`

export const Date = styled(Text)`
    position: absolute;
    bottom: 7%;
    left: 10%;
    width: 80%;
    font-size: 1.2vh;
    font-weight: 300;
    font-style: italic;
    line-height: 1.6;
    z-indez: 1;
`;

export const DeleteBox = styled.div`
    height: 15%;
    width: 15%;
    position: absolute;
    top: 10%;
    right: 5%;
    z-index: 3;

    @media ${device.mobileL} {
        padding-right: 40px;
    }
`;

export const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 2px;
    opacity: 1;
    z-index: 2;
    &:hover{
        opacity: 0.2; 
		transition: 0.7s;
    }
`;
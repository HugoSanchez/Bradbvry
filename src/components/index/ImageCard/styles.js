import styled from 'styled-components';
import {Title, Text} from '../../common';

export const ImageCardContainer = styled.div`
    position: relative;
    width: 95%;
    border-radius: 13px;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
    background: black;
    transition: 0.4s ease-out;
    opacity: 0.8;
    box-shadow: ${props => props.shadow ? '0 0 80px rgba(0,0,0,0.1)' : null};

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

export const ImageTitle = styled(Title)`
    text-transform: capitalize; 
    font-size: 3vh;
    color: white;
    position: absolute;
    top: 10%;
    left: 10%;
    height: 20%;
    width: 80%;
    z-indez: 1;
`

export const Description = styled(Text)`
    position: absolute;
    top: 25%;
    left: 10%;
    height: 40%;
    width: 80%;
    font-size: 1.6vh;
    font-weight: 400;
    color: white;
    line-height: 1.6;
    margin-top: 5%;
    z-indez: 1;
    overflow: hidden;
`

export const Date = styled(Text)`
    position: absolute;
    bottom: 7%;
    left: 10%;
    width: 80%;
    font-size: 1.2vh;
    font-weight: 300;
    font-style: italic;
    color: white;
    line-height: 1.6;
    z-indez: 1;
`;

export const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
    opacity: 1;
    z-index: 2;
    &:hover{
        opacity: 0.2; 
		transition: 0.7s;
    }
`;
import styled from 'styled-components';
import {device} from '../../../constants';


export const Container = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
`;

export const ProfileCardDiv = styled.div`
    position: fixed;
    top: 20%;
    height: 70vh;
    width: 20vw;
    border-radius: 1vh;
    overflow: hidden;
    box-shadow: 0 0 80px rgba(0,0,0,0.1);
    transition: 0.2s;
    &:hover{
        box-shadow: 0 0 25px rgba(0,0,0,0.1); 
    }

    @media ${device.tablet} {
        position: relative;
        display: flex;
        flex-direction: row;
        height: 20vh;
        width: 100%;
        box-shadow: 0 0 0px rgba(0,0,0,0);
    }
`;

export const CoverPhotoContainer = styled.div`
    height: 35%;
    width: inherit;
    background-color: rgb(231, 245, 241);
    
    @media ${device.tablet} {
        flex: 0;
        width: 100%;
        height: 100%;
    }
`;

export const ProfileImage = styled.img`
    position: relative;
    left: 2%;
    top: 35%;
    margin-top: -20%;
    margin-right: 50%;
    height: 14vh;
    width: 14vh;
    border-radius: 7vh;
    background-color: rgba(220, 220, 220, 0.8);

    @media ${device.tablet} {
        top: 25%;
        margin-top: -10px;
        margin-right: 0px;
        height: 10vh;
        width: 10vh;
        border-radius: 5vh;
    }
`;

export const NameTitle = styled.h1`
    font-family: 'Raleway';
    text-align: left;
    padding-left: 10%;
    margin-top: 5%;
    margin-bottom: 5%;
    font-size: 3.5vh;
    color: rgb(65, 65, 65);

    @media ${device.tablet} {
        font-size: 2.5vh;
    }
`;

export const Description = styled.p`
    font-family: 'Montserrat';
    font-weight: 300;
    font-size: 2.3vh;
    line-height: 1.6;
    text-align: left;
    inset-inline: 1.8;
    padding-left: 10%;
    padding-right: 10%;
    color: rgb(65, 65, 65);

    @media ${device.tablet} {
        font-size: 1.8vh;
    }
`;

export const NameAndDescription = styled.div`
    @media ${device.tablet} {
        flex: 2;
        display: flex;
        flex-direction: column;
    }
`;

export const NameBox = styled.div`
    @media ${device.tablet} {
        flex: 1;
    }
`;
export const DescriptionBox = styled.div`
    @media ${device.tablet} {
        flex: 3;
    }
`;

export const ImageBox = styled.div``;


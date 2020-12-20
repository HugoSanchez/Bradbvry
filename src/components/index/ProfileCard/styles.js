import {Text} from '../../common';
import {primaryGreen} from '../../../constants/colors';
import styled from 'styled-components';



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
`;

export const CoverPhotoContainer = styled.div`
    height: 35%;
    width: inherit;
    background-color: rgb(231, 245, 241);
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
`;

export const NameTitle = styled.h1`
    font-family: 'Raleway';
    text-align: left;
    padding-left: 10%;
    margin-top: 5%;
    margin-bottom: 5%;
    font-size: 3.5vh;
    color: rgb(65, 65, 65);
`;

export const Description = styled.p`
    font-family: 'Montserrat';
    font-weight: 300;
    font-size: 2.7vh;
    line-height: 1.6;
    text-align: left;
    inset-inline: 1.8;
    padding-left: 10%;
    padding-right: 10%;
    color: rgb(65, 65, 65);
`;

export const ImageBox = styled.div``;
export const NameBox = styled.div``;
export const DescriptionBox = styled.div``;

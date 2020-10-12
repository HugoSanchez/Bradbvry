import styled from 'styled-components';
import {primaryGreen, primaryGray85} from '../../constants/colors';

export const SignInCard = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 30%;
    border-radius: 12px;
    box-shadow: 0 0 80px rgba(0,0,0,0.1); 
    background-color: rgba(255, 255, 255, 1);
    padding-left: 2%;
    padding-right: 2%;
    overflow: hidden;
`;

export const Logo = styled.img`
    margin-top: 10%;
    width: 80px;
`;

export const Title = styled.h1`
    font-family: 'Montserrat';
    font-weight: 300;
    font-size: 2vw;
    margin-top: 5%;
    margin-bottom: 10%;
    color: rgb(75, 75, 75);
    padding-left: 2%;
    padding-right: 2%;
`;

export const Span = styled.span`
    font-weight: 600;
    white-space: pre;
`;

export const Text = styled.p`
    padding-left: 4%;
    padding-right: 4%;
    font-family: 'Montserrat';
    font-weight: 300;
    font-size: 1.2vw;
    color: rgb(55, 55, 55);
    line-height: 1.8;
    margin-bottom: 2%;  
`;

export const Button = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    margin-top: 5%;
    margin-bottom: 10%;
    height: 55px;
    width: 90%;
    background-color: ${primaryGray85};
    box-shadow: 0 0 10px rgba(0,0,0,0.1); 
    text-align: center;
    cursor: pointer;

    :hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.15); 
    }
`;

export const ButtonText = styled.p`
    color: ${primaryGreen};
    font-family: 'Montserrat';
    font-size: 18px;
    font-weight: 400;∫
`;

export const FormBody = styled.form``;
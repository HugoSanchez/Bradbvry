import styled from 'styled-components';
import {View, Title, Text} from '../../common';
import {device} from '../../../constants';



export const CollectionCardContainer = styled.div`
    position: fixed;
    top: 20%;
    width: 20vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
	border-radius: 10px;
	background: black;
    transition: 0.4s ease-out;
    opacity: 0.8;
    box-shadow: 0px 7px 10px rgba(black, 0.5);

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }

    @media ${device.tablet} {
        
        position: relative;
        display: flex;
        flex-direction: column;
        height: 20vh;
        width: 100%;
        margin-bottom: 45%;
        box-shadow: 0 0 0px rgba(0,0,0,0);
        border-radius: 0px;
        background: white;

        &:hover{
            box-shadow: 0 0 0px rgba(0,0,0,0); 
            transform: translateY(0px);
        }
    }
`;

export const CollectionTitle = styled(Title)`
    text-transform: capitalize; 
    font-size: 6vh;

    @media ${device.tablet} {
        color: rgb(85, 85, 85);
    }
`

export const Description = styled(Text)`
    font-size: 2.2vh;
    font-weight: 400;
    line-height: 1.6;
    margin-top: 5%;
    &:hover{
        color: red;
        text-decoration: underline;
    }

    @media ${device.tablet} {
        margin-top: 0%;
        color: rgb(85, 85, 85);
    }

`

export const TextBox = styled(View)`
    width: 100%;
    padding: 8%;
    margin-top: 5%;

    @media ${device.tablet} {
        flex: 1;
        margin: 0px;
        padding: 0px;
        margin-top: 5%;
    }
`;

export const DetailsBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
    width: 100%;
    height: 100px;
    padding-left: 8%;
`;

export const ProfilePic = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: rgb(155, 155, 155);
    margin: 10px;
`;

export const CollectionImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    opacity: 1;
    
    &:hover{
        opacity: 0.2; 
		transition: 0.7s;
    }

    @media ${device.tablet} {
        flex: 2;
        object-fit: none;
        position: relative;
        border-radius: 0px;
    }
`;
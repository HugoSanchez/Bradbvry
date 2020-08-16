import styled from 'styled-components';
import {View, Title, Text} from '../../common';


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
`;

export const CollectionTitle = styled(Title)`
    text-transform: capitalize; 
    font-size: 6vh;
`

export const Description = styled(Text)`
    font-size: 2.2vh;
    font-weight: 400;
    line-height: 1.6;
    margin-top: 5%;
`

export const TextBox = styled(View)`
    width: 100%;
    padding: 8%;
    margin-top: 5%;
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
    opacity: 0.2;
    
    &:hover{
        opacity: 1; 
		transition: 0.7s;
    }
`;
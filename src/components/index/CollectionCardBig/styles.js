import styled from 'styled-components';
import {View, Title, Text} from '../../common';
import {device} from '../../../constants';



export const CollectionCardContainer = styled.div`
    position: fixed;
    top: 20%;
    width: 20vw;
    height: 60vh;
    margin-right: 5%;
    display: flex;
    flex-direction: column;

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
    font-size: 5vh;
    color: rgb(85, 85, 85);

    @media ${device.tablet} {
        color: rgb(85, 85, 85);
    }
`

export const Description = styled(Text)`
    font-size: 2.5vh;
    font-weight: 400;
    line-height: 1.6;
    margin-top: 5%;
    color: rgb(85, 85, 85);

    @media ${device.tablet} {
        margin-top: 0%;
        color: rgb(85, 85, 85);
    }

`

export const TextBox = styled(View)`
    width: 100%;
    padding: 8%;
    margin-top: 50%;

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

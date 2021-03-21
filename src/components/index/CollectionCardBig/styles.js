import styled from 'styled-components';
import {View, Title, Text} from '../../common';
import {device} from '../../../constants';
import { primaryGray85, primaryGreen } from '../../../constants/colors';



export const CollectionCardContainer = styled.div`
    position: fixed;
    top: 20%;
    width: 20vw;
    height: 60vh;
    margin-right: 5%;

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
    margin-left: 0px;
    padding-left: 0px;

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
    margin-top: 45%;
    margin-bottom: 8%;

    @media ${device.tablet} {
        flex: 1;
        margin: 0px;
        padding: 0px;
        margin-top: 5%;
    }
`;

export const FollowContainer = styled.div`
    width: 100%;
    margin-top: 8%;
    margin-left: 2%;
`;

export const FollowButton = styled.div`
    background: ${primaryGreen};
    width: 90px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled(Text)`
    font-weight: 500;
    font-size: 14px;
    text-decoration: ${props => props.isActive ? 'underline' : null};
    color: ${primaryGray85} 
`;


import styled from 'styled-components';
import {View, Title, Text} from '../../common';
import {device} from '../../../constants';
import {primaryGray45} from '../../../constants/colors';


export const ColTitle = styled(Title)`
    color: ${primaryGray45};
    font-weight: 600;
    font-size: 5vh;
    text-transform: capitalize; 
    @media ${device.mobileL} {
        font-size: 5vh;
    }
`

export const PublicCard = styled.div`
    background-color: rgb(55, 55, 55);
    display: flex;
    flex-direction: column;
    height: 555px;
    transition: 0.4s ease-out;
    box-shadow: 0 0 100px rgba(0,0,0,0.2); 
    position: relative;
    cursor: pointer;

    &:hover{
        transform: translateY(5px);
    }

    @media ${device.laptop} {
        max-height: 500px;
    }

    @media ${device.mobileL} {
        max-height: 470px;
    }
`

export const ImageBox = styled.div`
    flex: 5;
    position: relative;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
`;

export const CardTitleBox = styled.div`
    flex: 0.5;
    padding-left: 5%;
    padding-top: 3%;
    opacity: 1;
    background-color: rgba(255, 255, 255, 1);
    z-index: 1;
`;

export const CardDetailsBox = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    padding-left: 5%;
    padding-right: 5%;
    opacity: 1;
    background-color: rgba(255, 255, 255, 1);
    z-index: 1;
`;

export const DescriptionBox = styled.div`
    flex: 2;
`;

export const UserBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2%;
`;





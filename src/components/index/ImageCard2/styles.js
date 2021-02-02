import styled from 'styled-components';
import {device} from '../../../constants';
import {Title, Text} from '../../common';
import {primaryGreen} from '../../../constants/colors';


export const CardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: 0.4s ease-out;
    box-shadow: ${props => props.shadow ? '0 0 80px rgba(0,0,0,0.1)' : null};

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

export const CardHeader = styled.div`
    position: absolute;
    top: 0%;
    left: 0%;
    height: 15%;
    width: 100%;
    z-index: 1;

    border: 1px solid red;
`;

export const NFTBox = styled.div`
    position: absolute;
    top: 15%;
    right: 10%;
    height: 30px;
    width: 50px;
    border: 1px solid blue;
`;

export const Image = styled.img`
    width: 100%;
    object-fit: cover;
    z-index: 2;
    transition: 0.1s ease-out;
    &:hover{
        opacity: 0;
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

export const NFTLogoImage = styled.img`
    position: absolute;
    top: 4%;
    right: 4%;
    height: 30px;
    width: 50px;
    object-fit: cover;
    z-index: 3;
`;

export const CreatorBox = styled.div`
    position: absolute;
    top: 5%;
    left: 8%;
    height: 30px;
    width: 50px;
    display: flex;
    flex-direction: column;
`

export const Placeholder = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CreatorPlaceholder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: rgb(190, 190, 190);
`;

export const CreatorTag = styled(Text)`
    margin-left: 12%;
    font-size: 1vh;
    font-weight: 300;
    font-style: italic;
`;

export const Creator = styled(Text)`
    margin-left: 4%;
    font-size: 1.8vh;
    font-weight: 300;
`

export const CardBody = styled.div`
    position: absolute;
    top: 20%;
    left: 0%;
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const TextCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export const NftTitle = styled(Title)`
    text-transform: capitalize; 
    font-size: 2.2vh;

    @media ${device.mobileL} {
        margin-bottom: 50px;
        font-size: 16px;
    }
`;

export const Description = styled(Text)`
    font-size: 1.7vh;
    font-weight: 300;
    line-height: 1.6;
    overflow: hidden;
`;

export const DateBox = styled.div`
    position: absolute;
    bottom: 3%;
    right: 3%;
    height: 30px;
    width: 50px;
    display: flex;
`

export const Date = styled(Text)`
    font-size: 1.2vh;
    font-weight: 300;
    font-style: italic;
    line-height: 1.6;
    margin-bottom: 14%;
`;

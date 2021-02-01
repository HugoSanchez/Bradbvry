import styled from 'styled-components';
import {device} from '../../../constants';
import {Title, Text} from '../../common';
import {primaryGreen} from '../../../constants/colors';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 350px;
    min-width: 100%;
    max-width: 300px;
    background-color: white;
    transition: 0.4s ease-out;

    box-shadow: 0 0 80px rgba(0,0,0,0.1);
    overflow: hidden;
    padding-top: 4%;

    &:hover{
        box-shadow: 0 0 60px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

export const CardHeader = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

export const CardBody = styled.div`
    flex: 16;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10%;

    min-height: 250px;
`;

export const CardFooter = styled.div`
    flex: 2;
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const CardSubFooter = styled.div`
    flex: 2;
    display: flex;
`;

export const CreatorBox = styled.div`
    flex: 3;
    display flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding-left: 6%;
`;

export const OwnerBox = styled.div`
    flex: 3;
    display flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding-right: 6%;
`;

export const EmptyBox = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DetailsBox = styled.div`
    flex: 3;
    display flex;
    flex-direction: column;
    justify-content: center;
`;

export const Placeholder = styled.div`
    display: flex;
    flex-direction: row;
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

export const NFTBox = styled.div`
    flex: 1;
    display flex;
    align-items: center;
    justify-content: center;
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
`

export const Date = styled(Text)`
    font-size: 1.2vh;
    font-weight: 300;
    font-style: italic;
    line-height: 1.6;
    margin-bottom: 14%;
`;

export const Image = styled.img`
    width: 70%;
    object-fit: cover;
    border-radius: 2px;
`;

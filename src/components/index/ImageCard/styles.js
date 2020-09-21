import styled from 'styled-components';
import {View, Title, Text} from '../../common';

export const ImageCardContainer = styled.div`
    position: relative;
    width: 95%;
    border-radius: 13px;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
    background: black;
    transition: 0.4s ease-out;
    opacity: 0.8;
    box-shadow: ${props => props.shadow ? '0 0 80px rgba(0,0,0,0.1)' : null};

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

export const ImageTitle = styled(Title)`
    text-transform: capitalize; 
    font-size: 3vh;
`

export const Description = styled(Text)`
    font-size: 1.2vh;
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

export const Image = styled.img`
    width: 100%;
    border-radius: 12px;
    opacity: 1;
    &:hover{
        opacity: 0.2; 
		transition: 0.7s;
    }
`;
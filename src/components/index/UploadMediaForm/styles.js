import {
    Row, 
    Title,
} from '../../common';

import {
    lightGray150,
    primaryGreen,
} from '../../../constants/colors';

import styled from 'styled-components';

export const ModalTitle = styled(Title)`
    width: 100%;
    text-align: center;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 38px;
    color: ${lightGray150};
`;

export const TypeBox = styled.div`
    flex: 1;
    display: flex;
`;

export const MediaType = styled(Row)`
    flex: 1;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-left: 2%;
    margin-right: 2%;
    border-radius: 2px;
    cursor: pointer;
    background: ${props => props.color};
    &:hover{
        opacity: 0.7; 
    }
`;

export const FormBodyBox = styled(Row)`
    flex: 2;
    flex-direction: column;
    justify-content: center;
`;

export const Label = styled.label`
    color: ${lightGray150};
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
    margin: 2%;
    margin-bottom: 4%;
    margin-top: 8%;
`;

export const Gn = styled.span`
    color: ${primaryGreen}
`;

export const Button = styled.div`
    background: ${primaryGreen};
    margin-top: 4%;
    margin-right: 2%;
    margin-left: 2%;
    height: 50px;
`;



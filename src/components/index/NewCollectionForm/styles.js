import {
    Row, 
    Title,
} from '../../common';

import {
    lightGray150,
    primaryGray85,
    primaryGreen,
} from '../../../constants/colors';

import styled from 'styled-components';

export const Container = styled.div`
    padding-top: 6%;
    padding-right: 6%;
    padding-left: 6%;
    width: 500px;
    height: 100%;
    dislay: flex;
    overflow: scroll;
    background: #191919;
    opacity: 0.9;
    ::-webkit-scrollbar {
        width: 0px;  
    }
`;

export const ModalTitle = styled(Title)`
    width: 100%;
    text-align: center;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 38px;
    color: ${lightGray150};
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

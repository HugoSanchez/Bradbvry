import {
    Row,
    Text,
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

export const CloseTab = styled(Title)`
    position: fixed;
    top: 2%;
    right: 2%;
`;

export const Warning = styled(Text)`
    color: white;
    padding: 2%;
    padding-bottom: 4%;
`
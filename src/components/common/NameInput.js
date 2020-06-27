import styled from 'styled-components';
import {lightGray150} from '../../constants/colors';

const NameInput = styled.input`
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-right: 2%;
    margin-left: 2%;
    height: 50px;
    font-family: Montserrat;
    font-weight: 300;
    font-size: 16px;
    font-style: italic;
    border-radius: 3px;
    background: rgb(30,30, 30);
    color: ${lightGray150};
    border:0;
    :focus {
        outline-width: 0;
    }
`;

export {NameInput};
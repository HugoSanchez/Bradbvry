import styled from 'styled-components';
import {lightGray150} from '../../constants/colors';

const DescriptionInput = styled.textarea`
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-right: 2%;
    margin-left: 2%;
    font-family: Montserrat;
    font-weight: 300;
    font-size: 16px;
    font-style: italic;
    border-radius: 3px;
    background: rgb(30,30, 30);
    color: ${lightGray150};
    resize: none;
    border:0;
    :focus {
    outline-width: 0;
    }
    ::-webkit-scrollbar {
    width: 0px;  
    }
`;

export {DescriptionInput};
import React from 'react';
import styled from 'styled-components';
import {device} from '../../constants';

const Title = styled.h1`
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 4vh;
    text-align: left;
    margin-bottom: 2%;
    color: ${ props => props.color ? props.color : 'rgb(85, 85, 85)'};
    @media ${device.mobileL} {
        font-size: 18px;
    }
`;

export {Title};
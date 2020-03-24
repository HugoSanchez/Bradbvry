import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
    font-family: 'Montserrat';
    font-weight: 300;
    line-height: 1.5;
    text-align: ${props => props.textAlign ? props.textAlign : 'left'};
    color:rgb(85, 85, 85);
`;

export {Text}
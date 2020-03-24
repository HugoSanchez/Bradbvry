import React from 'react';
import styled from 'styled-components';

const Underline = styled.p`
    width: ${props => props.width? props.width : "4vw"};
    margin-bottom: 2%;
    border-top-style: solid;
    border-top-width: 1px;
    color:rgb(85, 85, 85);
`;

export {Underline};
import React from 'react';
import styled from 'styled-components';
import {Row} from './Row';

const Card = styled(Row)`
    height: ${props => props.height || '32vh'};
    width: ${props => props.width || '100%'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-bottom: ${props => props.marginBottom || '5vh'};
    border-radius: ${props => props.borderRadius || '10px'};
    vertical-align: ${props => props.verticalAlign || 'middle'};
    
    &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.1); 
    }
`;

export {Card};
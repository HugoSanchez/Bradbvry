import styled from 'styled-components';
import {device} from '../../constants';
import {Row} from './Row';

const Card = styled(Row)`
    cursor: pointer;
    height: ${props => props.height || '32vh'};
    width: ${props => props.width || '100%'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-bottom: ${props => props.marginBottom || '5vh'};
    border-radius: ${props => props.borderRadius || '10px'};
    vertical-align: ${props => props.verticalAlign || 'middle'};
    background-color: ${props => props.backgroundColor || 'white'};
    transition: 0.4s ease-out;
    box-shadow: ${props => props.shadow ? '0 0 80px rgba(0,0,0,0.1);' : null}; 

    &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.1); 
        transform: translateY(5px);
    }

    @media ${device.mobileL} {
        height: ${props => props.height || '22vh'};
    }
`;

export {Card};
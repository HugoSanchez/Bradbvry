import styled from 'styled-components';
import {device} from '../../constants';

const Title = styled.h1`
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 4vh;
    font-style: ${ props => props.fontStyle ? props.fontStyle : null};
    text-align: left;
    margin-bottom: 2%;
    margin-top: ${ props => props.marginTop ? props.marginTop : null};
    color: ${ props => props.color ? props.color : 'rgb(85, 85, 85)'};
    @media ${device.mobileL} {
        font-size: 22px;
    }
`;

export {Title};
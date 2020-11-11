import styled from 'styled-components';
import {device} from '../../constants';

const Underline = styled.p`
    width: ${props => props.width? props.width : "4vw"};
    margin-bottom: 2%;
    border-top-style: solid;
    border-top-width: 1px;
    color:rgb(85, 85, 85);

    @media ${device.mobileL} {
        margin-bottom: 20px;
    }
`;

export {Underline};
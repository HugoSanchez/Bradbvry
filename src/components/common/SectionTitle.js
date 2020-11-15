import styled from 'styled-components';
import {device} from '../../constants';

const SectionTitle = styled.p`
    padding: 10%;
    padding-top: 15%;
    padding-bottom: 1%;
    font-size: 7vh;
    font-family: 'Montserrat';
    font-weight: 500;
    font-style: italic;
    @media ${device.mobileL} {
        font-size: 5vh;
        margin-top: 180px;
    }
`;

export {SectionTitle}
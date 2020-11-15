
import styled from 'styled-components';
import {device} from '../../constants';

const SectionSubTitle = styled.p`
    margin-bottom: 200px;
    padding-right: 10%;
    padding-left: 10%;
    font-size: 3.5vh;
    font-family: 'Montserrat', sans-serif;
    font-weight: 200;
    font-style: oblique;
    @media ${device.mobileL} {
        font-size: 3vh;
        margin-bottom: 200px;
    }
`;

export {SectionSubTitle}


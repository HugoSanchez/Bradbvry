import styled from 'styled-components';
import {primaryGreen, primaryGray45} from '../../constants/colors';
import {device} from '../../constants';
import {Title} from '../../components';

export const ColContainer = styled.div`
    margin: 0 auto;
    margin-top: 10%;
    max-width: 85%;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(3, 1fr); 
    margin-bottom: 10%;

    @media ${device.laptop} {
        grid-template-columns: repeat(2, 1fr); 
    }

    @media ${device.mobileL} {
        max-width: 98%;
        grid-gap: 1rem;
        grid-template-columns: repeat(1, 1fr); 
    }
`;


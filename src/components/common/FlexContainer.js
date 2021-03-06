import styled from 'styled-components';
import {device} from '../../constants';

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 15vh;
    padding-left: 8vw;
    padding-right: 8vw;

    @media ${device.tablet} {
        flex-direction: column;
        padding-top: 10vh;
        padding-left: 2vw;
        padding-right: 2vw;
    }
`;

import styled from 'styled-components';
import {device} from '../../constants';
import {primaryGreen, primaryGray85} from '../../constants/colors';

export const Wrapper = styled.div`
    border: 10px solid red;
`;

export const SimpleMasonry = styled.div`
    margin: auto;
    column-gap: 0em;
    column-count: 3;
    max-width: 80%;
    margin-top: 20%;
`;

export const MasonryItems = styled.div`
    background: #fff;
    padding: 0.5em;
    margin: 0 0 0em;
`;
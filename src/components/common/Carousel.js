import styled from 'styled-components';
import {Row} from './Row';

export const Carousel = styled(Row)`
    overflow: hidden;
    overflow-x: scroll;
    height: 290px;
    width: 100%;
    ::-webkit-scrollbar {
        display: none;
    }
`;
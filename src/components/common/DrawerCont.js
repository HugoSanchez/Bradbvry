import styled from 'styled-components';
import {device} from '../../constants';

export const DrawerCont = styled.div`
    padding-top: 6%;
    padding-right: 6%;
    padding-left: 6%;
    width: 500px;
    height: 100%;
    dislay: flex;
    overflow: scroll;
    background: #191919;
    opacity: 0.9;
    ::-webkit-scrollbar {
        width: 0px;  
    }

    @media ${device.tablet} {
        width: ${window.innerWidth}px;
    }
`;
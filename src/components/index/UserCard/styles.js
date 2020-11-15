import styled from 'styled-components';
import {device} from '../../../constants';
import {Text} from '../../common';

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

export const AvatarCont = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    align-content: flex-start;
`;

export const NameText = styled(Text)`
    font-weight: 400;
    font-style: italic;
    @media ${device.mobileL} {
        margin-left: 2%;
    }
`;

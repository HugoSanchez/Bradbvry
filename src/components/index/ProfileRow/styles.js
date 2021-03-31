import {Text} from '../../common';
import {primaryGreen} from '../../../constants/colors';
import styled from 'styled-components';

export const ProfileCont = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    margin-left: 2%;
    flex-direction: row;
`;

export const AvatarCont = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const Avatar = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 25px;
    background-color: rgba(180, 180, 180, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.img`
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 25px;
`;

export const NameCont = styled.div`
    overflow: hidden;
    padding-left: 3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ProfileName = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: rgba(120, 120, 120, 1);
    cursor: pointer;
`;

export const Editor = styled(Text)`
    font-size: 16px;
    font-weight: 300;
    font-style: italic;
    display: inline-block;
    color: rgba(150, 150, 150, 1);
`;

export const Address = styled(Text)`
    font-weight: 300;
    font-style: italic;
    font-size: 11px;
    cursor: pointer;
`;

export const TypeCont = styled.div`
    flex: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
`;

export const IconWrapper = styled.div`
    margin: 10%;
    display: inline-block;
`;
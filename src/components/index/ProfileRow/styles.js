import {Text} from '../../common';
import {primaryGreen} from '../../../constants/colors';
import styled from 'styled-components';

export const ProfileCont = styled.div`
    height: 50px;
    width: 100%;
    border-radius: 4px;
    margin-top: 3%;
    display: flex;
    flex-direction: row;
    background: rgb(30,30, 30);
`;

export const AvatarCont = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Avatar = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background-color: rgba(220, 220, 220, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.img`
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 20px;
`;

export const NameCont = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
`;

export const ProfileName = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: rgba(150, 150, 150, 1);
`;

export const Editor = styled(Text)`
    font-size: 16px;
    font-weight: 300;
    font-style: italic;
    display: inline-block;
    color: rgba(150, 150, 150, 1);
`;

export const GText = styled(Text)`
    color: ${primaryGreen};
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
    &:hover{
        text-decoration: underline;
    }
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
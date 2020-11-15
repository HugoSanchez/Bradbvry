import styled from 'styled-components';

export const AvatarCont = styled.div`
    flex: 1;
    display: flex;
`;

export const Avatar = styled.div`
    height: 36px;
    width: 36px;
    border-radius: 18px;
    background-color: ${props => props.placeholderColor ? props.placeholderColor : 'rgba(220, 220, 220, 0.1)'};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.img`
    position: relative;
    height: 36px;
    width: 36px;
    border-radius: 18px;
`;
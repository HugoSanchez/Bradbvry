import styled from 'styled-components';
import {device} from '../../../constants';

export const  LoadingCardBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);


`;

export const Logo = styled.img`
  margin-top: 10%;
  width: 80px;
`;

export const Title = styled.h1`
  font-family: 'Montserrat';
  font-weight: 300;
  font-size: 18px;
  margin-top: 5%;
  margin-bottom: 10%;
  color: rgb(75, 75, 75);
  padding-bottom: 20%;

  @media ${device.mobileL} {
    margin-bottom: 50px;
    font-size: 16px;
  }
`;
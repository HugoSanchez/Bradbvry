import styled from 'styled-components';

export const LoadingCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-height: 80%;
  width: 30%;
  border-radius: 12px;
  box-shadow: 0 0 80px rgba(0,0,0,0.1); 
  background-color: rgba(255, 255, 255, 1);
`;

export const Logo = styled.img`
  margin-top: 10%;
  width: 80px;
`;

export const Title = styled.h1`
  font-family: 'Montserrat';
  font-weight: 300;
  font-size: 30px;
  margin-top: 5%;
  margin-bottom: 10%;
  color: rgb(75, 75, 75);
`;

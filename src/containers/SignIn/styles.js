import styled from 'styled-components';
import {primaryGreen, primaryGray85} from '../../constants/colors';

export const SignInCard = styled.div`
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

export const Text = styled.p`
  padding-left: 10%;
  padding-right: 10%;
  font-family: 'Montserrat';
  font-weight: 300;
  font-size: 2.2vh;
  color: rgb(55, 55, 55);
  line-height: 1.8;
  margin-bottom: 10%;

`;

export const Input = styled.input`
  margin-top: 5%;
  width: 80%;
  height: 55px;
  box-sizing: border-box;
  outline: none;
  border: 0.5px solid rgb(220, 220, 220);
  border-radius: 5px;
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: 400;
  text-align: center;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: gray;
    font-family: 'Montserrat';
    font-size: 15px;
    font-weight: 300;
    font-style: italic;
  },

  ::-webkit-autofill,
  ::-webkit-autofill:hover,
  ::-webkit-autofill:focus,
  ::-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
  }

`;

export const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  margin-top: 5%;
  margin-bottom: 10%;
  height: 55px;
  width: 80%;
  background-color: ${primaryGray85};
  box-shadow: 0 0 10px rgba(0,0,0,0.1); 

  :hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.15); 
  }
`;

export const ButtonText = styled.p`
  color: ${primaryGreen};
  font-family: 'Montserrat';
  font-size: 18px;
  font-weight: 400;
`;
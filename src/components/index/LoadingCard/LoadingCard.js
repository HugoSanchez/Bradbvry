import React from 'react';
import logo from '../../../resources/favicon.png';

import {
    LoadingCardBox,
    Logo, 
    Title, 
} from './styles';

export const LoadingCard = props => {
  return (
    <LoadingCardBox>
      <Logo src={logo} alt=''/>
      <Title>Please wait...</Title>
    </LoadingCardBox>
  )
}


import React from 'react';
import logo from '../../../resources/favicon.png';
import {primaryGray85} from '../../../constants/colors';
import {WaveLoading} from 'react-loadingg';


import {
    LoadingCardBox,
    Logo, 
    Title, 
} from './styles';

export const LoadingCard = props => {
  return (
    <LoadingCardBox>
		<Title>This usually takes a while. Please wait!</Title>
		<WaveLoading 
			speed={2}
			size='small' 
			color={primaryGray85}/>
    </LoadingCardBox>
  )
}


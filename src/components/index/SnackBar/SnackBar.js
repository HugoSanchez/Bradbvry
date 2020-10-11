import React from 'react';
import {MessageBox} from './styles';
import {Text} from '../../common';
import styled from 'styled-components';

export const SnackBar = props => {
  
  return (
	<div id="Snackbar" className={props.className}> 
		<MessageBox success={props.success}>
			{props.success && <SnackText>{props.message}</SnackText>}
			{!props.success && <SnackText>{props.message}</SnackText>}
		</MessageBox>
	</div>
  )
}

const SnackText = styled(Text)`
	font-weight: 500;
	margin-top: 3%;
	margin-bottom: 3%;  
`;
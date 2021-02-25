import React from 'react';
import {MessageBox, SnackText} from './styles';


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


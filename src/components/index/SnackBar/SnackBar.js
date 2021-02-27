import React from 'react';
import {MessageBox, SnackText} from './styles';
import {useSelector} from 'react-redux';
import {WaveLoading} from 'react-loadingg';
import {primaryGray85} from '../../../constants/colors';


export const SnackBar = props => {
	
	const loading = false
	const show = useSelector(state => state.snack.show)
	const color = useSelector(state => state.snack.color)
	const message = useSelector(state => state.snack.message)
  
	return (
		<div id="Snackbar" className={show ? 'show' : ''}> 
			<MessageBox color={color}>
				{
					loading ? 
					<WaveLoading 
						speed={2}
						size='small' 
						color={primaryGray85}/>
					:
					<SnackText>{message}</SnackText>
				}
			</MessageBox>
		</div>
	)
}


import React, {useEffect, useState, Fragment} from 'react';
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import logo from '../../resources/favicon.png';

import {
	SnackBar,
	LoadingCard
} from '../../components';

import {
    SignInCard,
    Logo, 
    Title, 
    Text,
    Button,
    ButtonText
} from './styles';

import {
	setInitialConfiguration_Action
} from '../../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const AddMember = props => {

    let {
      email,
      thread,
      threadName,
      memberAddress,
	} = props.match.params
	
	const collectionName = threadName
							.slice(27)
							.replace(/-/g,' ')
							.replace(/(?:^|\s|["'([{])+\S/g, 
								match => match.toUpperCase())

	const dispatch = useDispatch()
    const history = useHistory();
	const [openSnack, setOpenSnack] = useState('')
	const space = useSelector(state => state.user.data.space)

	
    useEffect(() => {
      checkLoginAndRedirect()},
    [])

    const checkLoginAndRedirect = async () => {
		let isLogged = await magic.user.isLoggedIn();
		if (!isLogged) {history.push(`/signin`)} 
		else if (!space) { dispatch(setInitialConfiguration_Action())}
    }

    const handleConfirmMember = async e => {
		console.log('hello')
		let data = await magic.user.getMetadata()
		let threadAddress = `/orbitdb/${thread}/${threadName}`
		let threadInstance = await space.joinThreadByAddress(threadAddress, {members: true})
		await threadInstance.addMember(memberAddress)
		console.log('here')
		
		showSnackBarAndRedirect(data.publicAddress)
    }

    const showSnackBarAndRedirect = address => {
		setOpenSnack('show')
		setTimeout(() => {
			setOpenSnack('')
			history.push(`/app/${address}`)
		}, 3500)
	}
	
	if (!space) {
		return <LoadingCard />
	}

    return (
		<Fragment>
			<SnackBar 
				className={openSnack} 
				success={true} 
				message={'New member added successfully!'}/>

			<SignInCard>
				<Logo src={logo} alt=''/>
				<Title>Confirm New Membership</Title>
				<Text>
					<span style={{fontWeight: 600}}>{email} </span> 
					has accepted your invitation to join 
					<span style={{fontWeight: 600, whiteSpace: 'pre'}}>{' ' + collectionName}. </span>     
				</Text>
				
				<Button type="submit" onClick={handleConfirmMember}>
					<ButtonText>Confirm Membership</ButtonText>
				</Button>
			</SignInCard>
		</Fragment>
    )
}


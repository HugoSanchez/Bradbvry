import React, {useEffect, useState, Fragment} from 'react';
import {useHistory} from "react-router-dom";
import logo from '../../resources/favicon.png';

import {
	useSelector, 
	useDispatch
} from 'react-redux';

import {
	SnackBar,
	LoadingCard
} from '../../components';

import {
    Logo, 
    Title, 
    Text,
    Button,
	ButtonText,
	SignInCard,
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
	const [loading, setLoading] = useState(false)
	const space = useSelector(state => state.user.data.space)


    useEffect(() => {
		const checkLoginAndRedirect = async () => {
			let isLogged = await magic.user.isLoggedIn();
			if (!isLogged) {history.push(`/signin`, {redirect: props.match.url})} 
			else if (!space) { dispatch(setInitialConfiguration_Action())}
		}
      	checkLoginAndRedirect()},
    [history, dispatch, props.match.url, space])

    

    const handleConfirmMember = async e => {
		setLoading(true)
		let data = await magic.user.getMetadata()
		let threadAddress = `/orbitdb/${thread}/${threadName}`
		try {
			let threadInstance = await space.joinThreadByAddress(threadAddress, {members: true})
			await threadInstance.addMember(memberAddress)	
		}
		catch (error) {console.log(error)}
		showSnackBarAndRedirect(data.publicAddress)
    }

    const showSnackBarAndRedirect = address => {
		setOpenSnack('show')
		setTimeout(() => {
			setOpenSnack('')
			history.push(`/app/${address}`)
		}, 3500)
	}
	
	if (!space || loading) {
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


import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import logo from '../../resources/favicon.png';
import {LoadingCard} from '../../components';
import {Eth} from '../../utils';

import {
	setInitialConfiguration_Action
} from '../../actions';

import {
    SignInCard,
    Logo, 
    Title, 
    Text,
    Input,
    Button,
	Connect,
    ButtonText
} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const SignIn = props => {


	const history = useHistory();
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [isInputFocused, setInputFocused] = useState(false)

	useEffect(() => {
		const LogUserOut = async () => {
			localStorage.removeItem('textile-identity')
			await magic.user.logout();
		}
		LogUserOut()
	}, [])

    const handleLogin = async e => {
		setLoading(true)
        e.preventDefault();
        const email = new FormData(e.target).get("email");

        if (email) {
			await magic.auth.loginWithMagicLink({ email });
			await magic.user.isLoggedIn();
			dispatch(setInitialConfiguration_Action())
			conditionalUserRedirect()	
        }
	}

	const handleMetamaskWallet = async () => {
		let provider = await Eth.getProvider()
		let addresses = await provider.enable()
		dispatch(setInitialConfiguration_Action(null, provider))
		conditionalUserRedirect(addresses)	
	}

	const conditionalUserRedirect = async (addresses) => {
		if (!!props.location.state) {history.push(props.location.state.redirect)}
		else if (addresses) {history.push(`/app/${addresses[0].substring(0, 42)}`)}
		else { handleMagicRedirect() }
	}

	const handleMagicRedirect = async () => {
		let data = await magic.user.getMetadata()
		let route = `/app/${data.publicAddress}`
		history.push(route)
	}
	
	if (loading) {
		return <LoadingCard />
	}

    return (
		<SignInCard>
			<Logo src={logo} alt=''/>
			<Title>Hey, welcome!</Title>
			<Text>
				Enter your email here to either log in or sign up. 
				The process might take a few seconds, so please be patient.
			</Text>
			<form 
				autoComplete="off" 
				onSubmit={handleLogin}>
				<Input 
					
					type="email" 
					name="email" 
					required="required"
					autoComplete="off" 
					onBlur={() => setInputFocused(false)}
					onFocus={() => setInputFocused(true)}
					placeholder={
						isInputFocused ? 
						'' :
						"your@email.com" 
					}/>

				<br></br>
				<Button type="submit">
					<ButtonText>Sign In</ButtonText>
				</Button>
				<Connect onClick={() => handleMetamaskWallet()}>or connect Metamask</Connect>
			</form>
		</SignInCard>
	)
}


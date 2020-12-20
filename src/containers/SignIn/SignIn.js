import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import logo from '../../resources/favicon.png';
import {
	setInitialConfiguration_Action
} from '../../actions';
import {LoadingCard} from '../../components'

import {
    SignInCard,
    Logo, 
    Title, 
    Text,
    Input,
    Button,
    ButtonText
} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const SignIn = props => {

	useEffect(() => {
		const func = async () => {
			await magic.user.logout();
		}
		func()
	}, [])

    const history = useHistory();
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [isInputFocused, setInputFocused] = useState(false)

    const handleLogin = async e => {
		setLoading(true)
        e.preventDefault();
        const email = new FormData(e.target).get("email");

        if (email) {
			await magic.auth.loginWithMagicLink({ email });
			await magic.user.isLoggedIn();

			dispatch(setInitialConfiguration_Action())

			
			
			if (!!props.location.state) {
				history.push(props.location.state.redirect)
			} else {
				let data = await magic.user.getMetadata()
				let route = `/app/${data.publicAddress}`
				history.push(route)
			}
        }
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
						"thomas.pynchon@email.com" 
					}/>

				<br></br>
				<Button type="submit">
					<ButtonText>Sign In</ButtonText>
				</Button>
			</form>
		</SignInCard>
	)
}


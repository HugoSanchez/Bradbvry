import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {LoadingCard} from '../../components';
import logo from '../../resources/favicon.png';
import {Textile, parseToDisplayCollectionName} from '../../utils';
import axios from 'axios';

import {
	addMemberUrl,
	acceptBaseUrl
} from '../../constants';

import {
	SignInCard,
	Span,
	Logo, 
	Title, 
	Text,
	Input,
	FormBody, 
	Button,
	ButtonText
} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const JoinCollection = props => {

	console.log(props.match.params)

	let {
		user,
		threadId,
		threadName,
	} = props.match.params

	const history = useHistory();
	const [loading, setLoading] = useState(false)

	const collectionName = parseToDisplayCollectionName(threadName)
							
	
	const handleLogin = async e => {
		setLoading(true)	
		e.preventDefault();
		const email = new FormData(e.target).get("email");

		if (email) {
			// First log the user in if he isn't.
			await magic.auth.loginWithMagicLink({ email });
			// await magic.user.isLoggedIn();
			
			// Get the user data and instantiate 3Box.
			let data = await magic.user.getMetadata()
			let identity = await Textile.getIdentity(magic) 

			console.log('Identity: ', identity.public.toString())
			
			// Send acceptance email and redirect.
			// await sendAcceptedMessage(data)
		}
	}

	const sendAcceptedMessage = async (data) => {
		let inviter = user
		let sender = data.email
		let senderAddress = data.publicAddress
		let acceptUrl = addMemberUrl(data, threadName)
		
		let DATA = {
			inviter,
			sender, 
			acceptUrl, 
			senderAddress, 
			collectionName, 
		}

		let req = await axios.post(acceptBaseUrl, DATA)
		if (req.data.success) {history.push(`/app/${data.publicAddress}`)}
		else {setLoading(false)}
	}

	if (loading) {
		return <LoadingCard />
	}

	return (
		<SignInCard>
			<Logo src={logo} alt=''/>
			<Title>You've been invited to 
				<Span>{' ' + collectionName}</Span>
			</Title>
			<Text>
				{collectionName + ' '} is a members-only collection. 
				To join this collection please sign in here.      
			</Text>
			<FormBody onSubmit={handleLogin}>
				<Input 
					type="email" 
					name="email" 
					required="required" 
					placeholder="thomas.pynchon@email.com" />
				<Button type="submit">
					<ButtonText>Accept Invite</ButtonText>
				</Button>
			</FormBody>
		</SignInCard>
	)
}



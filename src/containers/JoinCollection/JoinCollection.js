import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {LoadingCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {parseToDisplayCollectionName, Textile} from '../../utils';
import logo from '../../resources/favicon.png';
import axios from 'axios';

import {
	setInitialConfiguration_Action,
	handleSnackBarRender_Action,
	handleAddCollection_Action,
} from '../../actions';

import {
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

import { 
	SNACK_TYPE_ERROR, 
	SNACK_TYPE_SUCCESS 
} from '../../actions/types';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const JoinCollection = props => {

	let {
		user,
		threadId,
		threadName,
	} = props.match.params

	const history = useHistory();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true)
	const [isLogged, setisLogged] = useState(false)
	const [invitationSecret, setinvitationSecret] = useState(null)

	const client = useSelector(state => state.user.client)
	const identity = useSelector(state => state.user.identity)
	const identityString = useSelector(state => state.user.identityString)
	const masterThreadID = useSelector(state => state.threads.masterThreadID)
	const collectionName = parseToDisplayCollectionName(threadName)

	useEffect(() => {
		const checkIfLogged = async () => {
			let isLogged = await magic.user.isLoggedIn();
			if (isLogged && !identity) {dispatch(setInitialConfiguration_Action())}
			setisLogged(isLogged)
			setLoading(false)
		}
		checkIfLogged()
	}, [])

	useEffect(() => {
		if (identity && invitationSecret) {
			addCollection(invitationSecret)
		}
	}, [invitationSecret])
	
	const handleLogin = async e => {
		setLoading(true)	
		e.preventDefault();
		const email = new FormData(e.target).get("email");
		const secret = new FormData(e.target).get("secret");

		if (email) {
			// setinvitationSecret(secret)
			// First log the user in if he isn't.
			await magic.auth.loginWithMagicLink({ email });
			// If user wasen't logged in, we need to set the initial config.
			// once initial config is set, we can add the collection to "pending".
			if (!isLogged) {
				dispatch(setInitialConfiguration_Action(() => handleSetinvitationSecret(secret)))}
			// Else, if user is logged but no client exists, it means he is refreshing
			// and this initialConfig must be dispatched
			else if (isLogged && !masterThreadID) {
				dispatch(setInitialConfiguration_Action(() => handleSetinvitationSecret(secret)))}
			// If he was logged in, we just execute the addCollection function
			// because the client and the masterThreadID are accessible.
			else {
				await addCollection(secret)
			}
		}
	}

	const handleSetinvitationSecret = (secret) => {
		return setinvitationSecret(secret)
	}

	const addCollection = async (secret) => {
		if (masterThreadID) {
			let request = await handleJoinCollection(secret)	
			console.log('1')
			let redirect = history.push(`/app/${user}/${threadId}`)
			console.log('2')
			if (request.data.success) {
				console.log('3')
				let threadID = Textile.getThreadIDFromString(threadId)
				console.log('4')
				let config = await client.find(threadID, 'config', {})
				console.log('5')
				dispatch(handleAddCollection_Action(config[0], redirect))
				console.log('6')
				dispatch(handleSnackBarRender_Action(SNACK_TYPE_SUCCESS))
			} else dispatch(handleSnackBarRender_Action(SNACK_TYPE_ERROR))
		}
	}

	const handleJoinCollection = async (secret) => {
		let data = await magic.user.getMetadata()
		let object = parseReqObject(data, secret)
		return await axios.post(acceptBaseUrl, object)
	}

	const parseReqObject = (data, secret) => {

		let inviter = user
		let acceptantID = identityString
		let acceptantPubkey = identity ? identity.public.toString() : null
		let acceptantEmail = data.email
		let acceptantEthAddress = data.publicAddress
		let collectionAddress = threadId
		
		return {
			secret,
			inviter,
			acceptantID, 
			acceptantPubkey, 
			acceptantEmail,
			acceptantEthAddress,
			collectionAddress,
		}
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
				Please note that you will need to wait for the owner to confirm
				tour memebership.
			</Text>
			<FormBody onSubmit={handleLogin}>

				<Input 
					type="text" 
					name="secret" 
					required="required" 
					placeholder="Type here the secret" />

				<Input 
					type="email" 
					name="email" 
					required="required" 
					placeholder="thomas.pynchon@email.com" />

				<Button type="submit">
					<ButtonText>Sign in to Accept</ButtonText>
				</Button>
			</FormBody>
		</SignInCard>
	)
}



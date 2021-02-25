import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {LoadingCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {parseToDisplayCollectionName, Textile} from '../../utils';
import logo from '../../resources/favicon.png';
import {ThreadID} from '@textile/hub';
import axios from 'axios';

import {
	setInitialConfiguration_Action,
	handleAddCollectionToMaster_Action_Action
} from '../../actions';

import {
	pendingObject,
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
	const masterThreadID = useSelector(state => state.threads.masterThreadID)
	const collectionName = parseToDisplayCollectionName(threadName)

	useEffect(() => {
		const checkIfLogged = async () => {
			let isLogged = await magic.user.isLoggedIn();
			if (isLogged && !masterThreadID) {dispatch(setInitialConfiguration_Action())}
			setisLogged(isLogged)
			setLoading(false)
		}
		checkIfLogged()
	}, [])
	
	const handleLogin = async e => {
		setLoading(true)	
		e.preventDefault();
		const email = new FormData(e.target).get("email");
		const secret = new FormData(e.target).get("secret");

		if (email) {
			setinvitationSecret(secret)
			// First log the user in if he isn't.
			await magic.auth.loginWithMagicLink({ email });
			// If user wasen't logged in, we need to set the initial config.
			// once initial config is set, we can add the collection to "pending".
			if (!isLogged) {dispatch(setInitialConfiguration_Action(handleFireAddCollection(secret)))}
			// Else, if user is logged but no client exists, it means he is refreshing
			// and this initialConfig must be dispatched
			else if (isLogged && !masterThreadID) {dispatch(setInitialConfiguration_Action(handleFireAddCollection(secret)))}
			// If he was logged in, we just execute the addCollection function
			// because the client and the masterThreadID are accessible.
			else {await addCollection(secret)}
		}
	}

	const handleFireAddCollection = (secret) => {
		return addCollection(secret)
	}

	const addCollection = async (secret) => {
		if (masterThreadID) {
			console.log('Mast')
			// let details = await getCollectionDetails(secret)	
			dispatch(handleAddCollectionToMaster_Action_Action(threadId, props.history))
		}
	}

	const getCollectionDetails = async (secret) => {
		let data = await magic.user.getMetadata()
		let object = parseReqObject(data, secret)
		
		let req = await axios.post(acceptBaseUrl, object)
		return req.data
		/**
		if (req.data.success) {history.push(`/app/${data.publicAddress}`)}
		else {setLoading(false)}
		 */
	}

	const parseReqObject = (data, secret) => {
		let inviter = user
		let sender = data.email
		let senderAddress = data.publicAddress
		let collectionAddress = threadId
		
		return {
			secret,
			inviter,
			sender, 
			senderAddress, 
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



import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {LoadingCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {parseToDisplayCollectionName} from '../../utils';
import logo from '../../resources/favicon.png';
import axios from 'axios';

import {
	setInitialConfiguration_Action
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

	const [isLogged, setisLogged] = useState(false)
	const [loading, setLoading] = useState(true)
	const [fireAddCollection, setFireAddCollection] = useState(false)

	const client = useSelector(state => state.user.client)
	const identity = useSelector(state => state.user.identity)
	const masterThreadID = useSelector(state => state.threads.masterThreadID)
	const collectionName = parseToDisplayCollectionName(threadName)

	useEffect(() => {
		const checkIfLogged = async () => {
			let isLogged = await magic.user.isLoggedIn();
			setisLogged(isLogged)
			setLoading(false)
		}
		checkIfLogged()
	}, [])

	useEffect(() => {
		addCollection()
	}, [fireAddCollection])
				
	const addCollection = async () => {
		if (masterThreadID) {
			sendAcceptedMessage()	

			/** 
			let newEntry = Object.assign(pendingObject, {})
			newEntry.owner = user
			newEntry.threadId = threadId
			newEntry.threadName = threadName

			await client.create(masterThreadID, 'pending-to-join', [newEntry])
			*/
		}
	}
	
	const handleLogin = async e => {
		setLoading(true)	
		e.preventDefault();
		const email = new FormData(e.target).get("email");

		if (email) {
			// First log the user in if he isn't.
			await magic.auth.loginWithMagicLink({ email });
			// await magic.user.isLoggedIn();
			if (isLogged) {dispatch(setInitialConfiguration_Action(handleFireAddCollection))}

			
			// Send acceptance email and redirect.
			// await sendAcceptedMessage(data)
		}
	}

	const handleFireAddCollection = bool => {
		setFireAddCollection(bool)
	}

	const sendAcceptedMessage = async () => {
		let data = await magic.user.getMetadata()
		let object = parseReqObject(data, identity)
		console.log('Object: ', object)

		/** 
		let req = await axios.post(acceptBaseUrl, DATA)
		if (req.data.success) {history.push(`/app/${data.publicAddress}`)}
		else {setLoading(false)}
		*/
	}

	const parseReqObject = (data, identity) => {
		let inviter = user
		let sender = data.email
		let senderAddress = data.publicAddress
		let senderID = identity.public.toString()
		let acceptUrl = addMemberUrl(data, identity, threadName)
		
		return {
			inviter,
			sender, 
			senderID,
			acceptUrl, 
			senderAddress, 
			collectionName, 
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



import React, {useEffect, useState, Fragment} from 'react';
import { useHistory } from "react-router-dom";
import logo from '../../resources/favicon.png';
//import {magicKey} from '../../../config';
import axios from 'axios';

import {
	SignInCard,
	Logo, 
	Title, 
	Text,
	Input,
	Button,
	ButtonText
} from './styles';

//const Box = require('3box');
//const { Magic } = require('magic-sdk');
//const magic = new Magic(magicKey);

export const JoinCollection = props => {

	let {
	  thread,
	  threadName,
	} = props.match.params

	const history = useHistory();

	const [loading, setLoading] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const collectionName = threadName.slice(27).replace(/-/g,' ').replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())

	useEffect(() => {
	  checkLoginAndRedirect()
	},[])

	const checkLoginAndRedirect = async () => {
		/** 
		let isLogged = await magic.user.isLoggedIn();
		setIsLoggedIn(isLogged)
		
		if (isLogged) {
			let data = await magic.user.getMetadata()

		} else {
			console.log(props.match)
		}
	  */
	}
	// http://localhost:3000/add-member/0xCf2E58CEFFE93fB2C1649aeC69778D491aEEB7Ee/zdpuB2DZmZN8v2YFQsMMd69QjShFv7LTZ8WfJEpv7pSc1cvmk/3box.thread.bradbvry--main.Something/hugo@bradbvry.com
	
	const handleLogin = async e => {
		/** 
	  e.preventDefault();
	  const email = new FormData(e.target).get("email");
	  console.log(email)

	  if (email) {
		await magic.auth.loginWithMagicLink({ email });
		await magic.user.isLoggedIn();

		let data = await magic.user.getMetadata()
		let threadAddress = `/orbitdb/${thread}/${threadName}`
		let box = await Box.openBox(data.publicAddress, magic.rpcProvider); 
		let space = await box.openSpace('bradbvry--main')
		await space.subscribeThread(threadAddress, {members: true})

		await box.syncDone
		const subscribedThreads = await space.subscribedThreads()

		console.log('here')
		await sendAcceptedMessage(data)
		console.log('there')
		
		console.log('Threads: ', subscribedThreads)
		history.push(`/app/${data.publicAddress}`)

	  }
	  */
	}

	const sendAcceptedMessage = async (data) => {
		/** 
	  let baseUrl = 'http://localhost:3000/add-member'
	  let acceptUrl = baseUrl + `/${data.publicAddress}/${thread}/${threadName}/${data.email}`
	  let sender = data.email
	  let senderAddress = data.publicAddress
	  let collectionName = threadName.slice(27)
	  let inviter = user
	  
	  // http://localhost:3000/add-member/0xCf2E58CEFFE93fB2C1649aeC69778D491aEEB7Ee/zdpuB2DZmZN8v2YFQsMMd69QjShFv7LTZ8WfJEpv7pSc1cvmk/3box.thread.bradbvry--main.Something/hugo@bradbvry.com
	  let reqData = {acceptUrl, sender, senderAddress, collectionName, inviter}
	  console.log(reqData)
	  let req = await axios.post('http://localhost:1000/api/share/add-invited-member', reqData)
	  console.log(req)
	  */
	}

	return (
	  <SignInCard>
		<Logo src={logo} alt=''/>
		<Title>You've been invited to 
				<span style={{fontWeight: 600, whiteSpace: 'pre'}}>
					{
						' ' + collectionName
					}
				</span>
		</Title>
		<Text>
		  {collectionName + ' '} is a members-only collection. To join this collection please sign in here.      
		</Text>
		<form onSubmit={handleLogin}>
		  <Input type="email" name="email" required="required" placeholder="thomas.pynchon@email.com" />
		  <br></br>
		  <Button type="submit">
			<ButtonText>Sign In</ButtonText>
		  </Button>
		</form>
	  </SignInCard>
	)
}



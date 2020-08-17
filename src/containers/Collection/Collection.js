import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';

import {
  CollectionCardBig,
  UploadImageForm,
  CircularButton,
  LoadingCard,
  ItemsList, 
  Header
} from '../../components';

import {
  setActiveThread_Action, 
  setInitialConfiguration_Action
} from '../../actions';

import {
  FlexContainer,
  LeftContainer,
  RightContainer
} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Collection = props => {

	let {
		threadAddress, 
		threadName
	} = props.match.params

	const dispatch = useDispatch()

	// Try to fix this:
	// This makes the component re-render everytime the modal is opened and closed.
	const [renderForm, setRenderForm] = useState(false) 

	const threadsArray = useSelector(state => state.threads.threadsArray)
	const itemsArray = useSelector(state => state.threads.itemsArray)
	const activeThread = useSelector(state => state.threads.activeThread)
	
	// Filter all items from this thread/collection
	// and keep them as a const.
	const threadItems = itemsArray.filter(item => item.threadName === threadName)

	useEffect(() => {
		isLoggedIn()
		checkActiveThread()
	})

	// Check if user is logged in. 
	// If not, redirect to sign in url
	// Else handle config.
	const isLoggedIn = async () => {
		let isLogged = await magic.user.isLoggedIn();
		if (!isLogged) { props.history.push(`/signin`)} 
		else { handleConfig() }
	}

	// If state is empty, set initial configuration.
	// Else, make sure selectedThread is properly set.
	const handleConfig = async () => {
		if (threadsArray.length < 1) {
		dispatch(setInitialConfiguration_Action())}
	}

	// Check selectedThread is correct.
	// If activeThread is not set, user is reloading and should be set.
	const checkActiveThread = async () => {
		if (!activeThread) {
			let paramsThreadAddress = `/orbitdb/${threadAddress}/${threadName}`
			let thread = threadsArray.find(thread => thread._address === paramsThreadAddress)
			dispatch(setActiveThread_Action(thread))
		}
	}

	const onImageUpload = () => {
		setRenderForm(false)
	}


	if (threadItems.length < 1 && !activeThread){
		return (
			<LoadingCard />
		)
	}

  	return (
		<Fragment>
			<Header />
			<Drawer 
				anchor={'right'} 
				open={renderForm} 
				onClose={() => setRenderForm(false)} >
					<UploadImageForm onClose={() => onImageUpload()}/>
			</Drawer>

			<FlexContainer>
				<LeftContainer>
					<CollectionCardBig thread={activeThread} />
				</LeftContainer>
				<RightContainer>
					<ItemsList items={threadItems} shadow={true}/>
				</RightContainer>
			</FlexContainer>

			<CircularButton
				imageAdd
				size={'25px'}
				bottom={'18vh'} 
				onClick={() => setRenderForm(true)}
			/>
			<CircularButton
				quillPen
				size={'25px'}
				onClick={() => props.history.push('/editor')}
			/>
		</Fragment>
  	)
}


import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Box from '3box';

import {
	CollectionButtons,
	CollectionCardBig,
	UploadImageForm,
	AddMemberForm,
	LoadingCard,
	ItemsList, 
	SnackBar,
	Header
} from '../../components';

import {
	setActiveItem_Action,
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
	const [renderMemberForm, setRenderMemberForm] = useState(false) 
	const [openSnack, setOpenSnack] = useState('')
	const [uploadSuccess, setUploadSuccess] = useState(false)
	const [message, setMessage] = useState(null)
	const [isModerator, setIsModerator] = useState(false)

    const address = useSelector(state => state.user.data.address)
	const threadsArray = useSelector(state => state.threads.threadsArray)
	const itemsArray = useSelector(state => state.threads.itemsArray)
	const activeThread = useSelector(state => state.threads.activeThread)
	const threadItems = itemsArray.filter(item => item.threadName === threadName)

	useEffect(() => {
		// Check if user is logged in. 
		// If not, redirect to sign in url
		// Else handle config.
		const isLoggedIn = async () => {
			let isLogged = await magic.user.isLoggedIn();
			if (!isLogged) { props.history.push(`/signin`)} 
			else { handleConfig() }
		}
		isLoggedIn()
	}, [props.history])

	useEffect(() => {
		// Check selectedThread is correct.
		// If activeThread is not set, user is reloading and should be set.
		const checkActiveThread = async () => {
			if (!activeThread) {
				let paramsThreadAddress = `/orbitdb/${threadAddress}/${threadName}`
				let thread = threadsArray.find(thread => thread._address === paramsThreadAddress)
				dispatch(setActiveThread_Action(thread))
			}
		}
		checkActiveThread()
	})

	useEffect(() => {
		// Check whether a user has "write"-acces to the collection
		// And sets permissions accordingly (publish and delete). 
		const checkAndSetModerator = async (thread) => {
			if (activeThread) {
				let config = await Box.getConfig(address) 
				let did = config.spaces['bradbvry--main'].DID
				let moderators = await activeThread.listModerators();
				let includes = moderators.includes(did) || moderators.includes(address)
				setIsModerator(includes)
			}
		}
		checkAndSetModerator()
	})

	
	// If state is empty, set initial configuration.
	// Else, make sure selectedThread is properly set.
	const handleConfig = async () => {
		if (threadsArray.length < 1) {
		dispatch(setInitialConfiguration_Action())}
	}
	
	const handleShowSnackbar = bool => {
		if (bool) {setMessage('Success !')}
		else {setMessage('Something went wrong, please try again.')}
	
        setUploadSuccess(bool)
        setOpenSnack('show')
        setTimeout(() => setOpenSnack(''), 4000)
	}
	
	const handleCloseMemberForm = bool => {
		handleShowSnackbar(bool)
		setRenderMemberForm(false)
	}

	const handleNewEditor = async () => {
		dispatch(setActiveItem_Action(null))
		props.history.push('/editor', {onlyRead: !isModerator})
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

			<Drawer 
				anchor={'right'} 
				open={renderMemberForm} 
				onClose={() => setRenderMemberForm(false)} >
					<AddMemberForm onClose={(bool) => handleCloseMemberForm(bool)}/>
			</Drawer>

			<SnackBar className={openSnack} success={uploadSuccess} message={message}/>

			<FlexContainer>
				<LeftContainer>
					<CollectionCardBig thread={activeThread} />
				</LeftContainer>
				<RightContainer>
					<ItemsList 
						items={threadItems} 
						shadow={true} 
						isModerator={isModerator}/>
				</RightContainer>
			</FlexContainer>

			<CollectionButtons 
				addMember={() => setRenderMemberForm(true)}
				addImage={() => setRenderForm(true)}
				openEditor={() => handleNewEditor}
				activeThread={activeThread}/>
		</Fragment>
  	)
}


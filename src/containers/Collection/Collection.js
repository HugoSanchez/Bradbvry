import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Dropzone from 'react-dropzone';
import {ThreadID} from '@textile/hub';
import axios from 'axios';

import {

	getCollectionItemsUrl, 
	updateCollectionMessage,
	WaitingForOwnerConfirmMessage

} from '../../constants';

import {

	useMixpanel,
	useIsLogged

} from '../../hooks'

import {

	FlexContainer,
	LeftContainer,
	RightContainer,
	NewCollectionForm,
	CollectionButtons,
	CollectionCardBig,
	UploadMediaForm,
	AddMemberForm,
	LoadingCard,
	MessageBar,
	MoreButton,
	ItemsList, 
	Header,
	
} from '../../components';

import {

	setActiveItem_Action,
	setActiveThread_Action, 
	setThreadItems_Action,
	handleSaveImage_Action,
	handleConfirmNewMember_Action,
	setInitialConfiguration_Action,

} from '../../actions';

import {

	DropZoneCont,
	MoreOptionsPositioner

} from './styles';
import { primaryGreen } from '../../constants/colors';


export const Collection = props => {


	useMixpanel('COLLECTION')
	const {threadID, user} = props.match.params

	const dispatch = useDispatch()
	const [isLogged, isOwner] = useIsLogged(user)

	const [loading, setLoading] = useState(true)
	const [followers, setFollowers] = useState([])
	const [renderForm, setRenderForm] = useState(false) 
	const [keyOwners, setKeyOwners] = useState(null) 
	const [isKeyOwner, setIsKeyOwner] = useState(null) 
	const [renderUpdate, setRenderUpdate] = useState(false) 
	const [isPendingMember, setIsPendingMember] = useState(false)
	const [renderMemberForm, setRenderMemberForm] = useState(false) 
	const [renderCollectionForm, setRenderCollectionForm] = useState(false)

	const client = useSelector(state => state.user.client)
	const address = useSelector(state => state.user.address)
	const threadItems = useSelector(state => state.threads.threadItems)
	const activeThread = useSelector(state => state.threads.activeThread)

	useEffect(() => {
		if (isLogged) {handleComponentConfig()}
		else if (isLogged === false) {fetchThreadEntries()}
	}, [isLogged, client])

	useEffect(() => {
		return () => cleanUpFunction()
	}, [])

	useEffect(() => {
		// We check wether the current user is a member/keyowner
		// for this collections and wether she's been acknowledged or not.
		// We also check whether she's an acknowledged user and there's
		// pending members. In this case, we render update message.
		if (activeThread && address) {
			let keyOwners = activeThread.keyOwners
			let checkIsKeyOwner = keyOwners.filter(keyOwner => keyOwner.memberAddress === address)
			let checkIfPending = keyOwners.filter(keyOwner => keyOwner.acknowledged === false)
			if (!!checkIsKeyOwner[0]) setIsPendingMember(!checkIsKeyOwner[0].acknowledged)
			if (!!checkIsKeyOwner[0] && checkIfPending[0]) {setRenderUpdate(true)}
			setIsKeyOwner(!!checkIsKeyOwner[0])
			setKeyOwners(keyOwners)
		}
	}, [activeThread, address])

	const handleComponentConfig =  async () => {
		// If state is empty, set initial configuration.
		// Else, fetch thread data and set listeners.
		if (isLogged && client) {fetchThreadData()}
		else if (isLogged && !client) {dispatch(setInitialConfiguration_Action())}
		if (activeThread && threadItems) {setLoading(false)}
	}

	const fetchThreadData = async () => {
		// If selected thread exists, 
		// Fetch entries and set up listener.
		let threadId = ThreadID.fromString(threadID)
		let items = await client.find(threadId, 'entries', {})
		let collection = await client.find(threadId, 'config', {})
		try {let followers = await client.find(threadId, 'followers', {})}
		catch (e) {console.log(e)}
		// Manage and set state.
		dispatch(setActiveThread_Action(collection[0]))
		dispatch(setThreadItems_Action(items.reverse()))
		setFollowers(followers)
		setLoading(false)
	}

	const fetchThreadEntries = async () => {
		// This functions only gets called if user is not logged.
		// It fetches the collection entries from the backend.
		console.log('here')
		let fetchUrl = getCollectionItemsUrl(user, threadID)
		let {data} = await axios.get(fetchUrl)
		console.log('d: ', data)
		dispatch(setActiveThread_Action(data.collection[0]))
		dispatch(setThreadItems_Action(data.entries.reverse()))
		setLoading(false)
	}

	const cleanUpFunction = () => {
		// Clean state when component unmounts
		// Here we also clean redux.
		dispatch(setThreadItems_Action([]))
		dispatch(setActiveThread_Action(null))
	}
	
	const handleCloseMemberForm = bool => {
		setRenderMemberForm(false)
	}

	const handleCloseCollectionForm = bool => {
		setRenderCollectionForm(false)
	}

	const handleNewEditor = async () => {
		dispatch(setActiveItem_Action(null))
		props.history.push(`/app/${user}/${threadID}/new`, 
			{onlyRead: !isOwner})
	}

	const onImageUpload = () => {
		setRenderForm(false)
	}
	
	const onDrop = (files) => {
		const formData = new FormData();
		formData.append('files', files);
		dispatch(handleSaveImage_Action(files))
	}

	if (loading){
		return (
			<Fragment>
				<Header />
				<LoadingCard />
			</Fragment>
		)
	}

  	return (
		<Fragment>
			<Header />
			<MessageBar 
				isActive={isPendingMember}
				message={WaitingForOwnerConfirmMessage}/>

			<MessageBar
				color={primaryGreen}
				message={updateCollectionMessage}
				isActive={renderUpdate && !isPendingMember}
				onActionClick={() => dispatch(handleConfirmNewMember_Action(activeThread))}/>

			<Drawer 
				anchor={'right'} 
				open={renderForm} 
				onClose={() => setRenderForm(false)} >
					<UploadMediaForm onClose={() => onImageUpload()}/>
			</Drawer>

			<Drawer 
				anchor={'right'} 
				open={renderMemberForm} 
				onClose={() => setRenderMemberForm(false)} >
					<AddMemberForm onClose={(bool) => handleCloseMemberForm(bool)}/>
			</Drawer>

			<Drawer 
				anchor={'right'} 
				open={renderCollectionForm} 
				onClose={() => setRenderCollectionForm(false)} >
					<NewCollectionForm 
						history={props.history}
						collection={activeThread}
						onClose={(bool) => handleCloseCollectionForm(bool)}/>
			</Drawer>			

			<MoreOptionsPositioner>
				<MoreButton 
					history={props.history}
					isOwner={isKeyOwner || isOwner}
					renderForm={() => setRenderCollectionForm(true)}/>
			</MoreOptionsPositioner>


				<FlexContainer>
					<LeftContainer>
						<CollectionCardBig
							member={user}
							followers={followers}
							isOwner={isOwner}
							isLogged={isLogged} 
							history={props.history}
							match={props.match}
							thread={activeThread} />
					</LeftContainer>

					<RightContainer>
						<Dropzone 
							onDrop={onDrop}
							accept={'image/jpeg, image/png, image/gif, video/mp4, video/mpeg, video/3gpp, video/ogg'}
							maxSize={2000000000}
							multiple={true}>

							{(
								{getRootProps, getInputProps}) => (
									<DropZoneCont {...getRootProps()}>
										<input {...getInputProps()} />

												<ItemsList 
													shadow={true} 
													items={threadItems} 
													isModerator={isOwner}/>
											
									</DropZoneCont>
							)}
						</Dropzone>
					</RightContainer>
				</FlexContainer>

			<CollectionButtons 

				addMember={() => setRenderMemberForm(true)}
				addImage={() => setRenderForm(true)}
				openEditor={() => handleNewEditor}
				activeThread={activeThread}
				isOwner={isKeyOwner && !isPendingMember}/>

		</Fragment>
  	)
}

